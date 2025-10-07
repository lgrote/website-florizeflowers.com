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
