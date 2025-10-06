import type { BreadcrumbItem } from "../components/navigation/BreadcrumbNavigation.astro";

// ============================================================================
// STRUCTURED DATA GENERATORS
// ============================================================================

/**
 * Generate Review schema for service pages
 * @param service - Service data from content collection
 * @returns Schema.org Review object
 */
export function generateServiceSchema(service: any): object {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      "@context": "https://schema.org",
      name: service.service_name,
      description: service.description,
      url: service.affiliate_url || "#",
      category: "Flower Delivery Service",
      areaServed: "United Kingdom",
      priceRange: service.price_range || "££-£££",
    },
    author: {
      "@type": "Organization",
      name: "Florize Flowers",
      url: "https://florizeflowers.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: service.rating?.toString() || "4.5",
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: service.description,
    datePublished:
      service.date_published || new Date().toISOString().split("T")[0],
    dateModified:
      service.date_modified || new Date().toISOString().split("T")[0],
  };
}

/**
 * Generate Organization schema (typically for homepage)
 * @returns Schema.org Organization object
 */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Florize Flowers",
    description:
      "UK's most trusted independent flower delivery comparison platform",
    url: "https://florizeflowers.com",
    logo: {
      "@type": "ImageObject",
      url: "https://florizeflowers.com/images/florizeflowers-logo-white.svg",
    },
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@florizeflowers.com",
    },
  };
}

/**
 * Generate WebSite schema with search action (for homepage)
 * @param siteUrl - Base URL of the site
 * @returns Schema.org WebSite object
 */
export function generateWebSiteSchema(siteUrl: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Florize Flowers",
    url: siteUrl,
    description:
      "Expert reviews and comparisons of UK flower delivery services",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList schema
 * @param items - Array of breadcrumb items
 * @param siteUrl - Base URL for creating absolute URLs
 * @returns Schema.org BreadcrumbList object
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl: string,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${siteUrl}${item.href}` }),
    })),
  };
}

/**
 * Generate ItemList schema for service comparison pages
 * @param services - Array of service data
 * @returns Schema.org ItemList object
 */
export function generateItemListSchema(services: any[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.service_name,
        description: service.description,
        url: `/services/${service.service_id}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: service.rating,
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),
  };
}

// ============================================================================
// META TAG HELPERS
// ============================================================================

/**
 * Format and truncate meta description to optimal length
 * @param text - Description text
 * @param maxLength - Maximum length (default 155 characters)
 * @returns Truncated description
 */
export function formatMetaDescription(
  text: string,
  maxLength: number = 155,
): string {
  if (text.length <= maxLength) return text;

  // Truncate at last complete word before maxLength
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Generate canonical URL from pathname
 * @param pathname - Path from Astro.url.pathname
 * @param siteUrl - Base site URL
 * @returns Canonical URL
 */
export function generateCanonicalUrl(
  pathname: string,
  siteUrl: string = "https://florizeflowers.com",
): string {
  // Remove trailing slash unless it's the root
  const cleanPath = pathname === "/" ? pathname : pathname.replace(/\/$/, "");
  return `${siteUrl}${cleanPath}`;
}

/**
 * Generate OG image URL based on page type
 * @param type - Page type (service, occasion, guide, etc.)
 * @param title - Page title for dynamic images
 * @returns OG image URL
 */
export function generateOgImage(type: string, title?: string): string {
  // For now, return default OG image
  // In the future, this could generate dynamic images
  const baseUrl = "https://florizeflowers.com";

  const imageMap: Record<string, string> = {
    service: `${baseUrl}/images/florize-og-image.png`,
    occasion: `${baseUrl}/images/florize-og-image.png`,
    guide: `${baseUrl}/images/florize-og-image.png`,
    default: `${baseUrl}/images/florize-og-image.png`,
  };

  return imageMap[type] || imageMap.default;
}

/**
 * Generate page-specific keywords
 * @param baseKeywords - Base keywords for the page
 * @param additional - Additional keywords to append
 * @returns Comma-separated keyword string
 */
export function generateKeywords(
  baseKeywords: string[],
  additional: string[] = [],
): string {
  const allKeywords = [...baseKeywords, ...additional];
  return allKeywords.join(", ");
}

// ============================================================================
// SOCIAL SHARING HELPERS
// ============================================================================

/**
 * Generate Twitter Card metadata
 * @param title - Tweet title
 * @param description - Tweet description
 * @param image - Image URL
 * @returns Twitter Card object
 */
export function generateTwitterCard(
  title: string,
  description: string,
  image: string,
) {
  return {
    card: "summary_large_image",
    title: title,
    description: formatMetaDescription(description, 200),
    image: image,
  };
}

/**
 * Generate Open Graph metadata
 * @param title - OG title
 * @param description - OG description
 * @param url - Page URL
 * @param image - OG image URL
 * @param type - OG type (website, article, etc.)
 * @returns Open Graph object
 */
export function generateOpenGraph(
  title: string,
  description: string,
  url: string,
  image: string,
  type: "website" | "article" = "website",
) {
  return {
    title: title,
    description: formatMetaDescription(description),
    url: url,
    image: image,
    type: type,
  };
}
