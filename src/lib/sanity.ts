import { createClient } from '@sanity/client';

// Sanity client - conditionally create based on environment
let sanityClient: any;

try {
  // Get environment variables with hardcoded fallbacks (these are public, non-sensitive)
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'vm53xzke';
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
  const readToken = import.meta.env.SANITY_API_READ_TOKEN;

  // Try to create the real Sanity client when environment is configured
  if (projectId && dataset) {
    sanityClient = createClient({
      projectId,
      dataset,
      useCdn: false, // Disable CDN for fresh content
      apiVersion: '2024-01-01',
      token: readToken, // Optional token for private data
    });
  } else {
    // Fallback stub when not configured
    sanityClient = {
      fetch: async () => {
        console.info('Sanity not configured, using content collection fallback');
        return null;
      }
    };
  }
} catch (error) {
  // Fallback stub when import fails
  sanityClient = {
    fetch: async () => {
      console.info('Sanity client creation failed, using content collection fallback');
      return null;
    }
  };
}

export { sanityClient };

// Types for our Sanity documents
export interface AffiliateBanner {
  code: string;
  description?: string;
  enabled: boolean;
}

export interface AffiliateLink {
  serviceId: string;
  affiliateUrl: string;
  locale?: string; // Empty string or undefined = all locales, 'en', 'de', etc.
  banner?: AffiliateBanner;
  notes?: string;
}

export interface GlobalHeaderTag {
  tag: {
    code: string;
    language: string;
  };
  description?: string;
  active: boolean;
}

export interface FlorizeConfig {
  _id: string;
  _type: 'florizeConfig';
  title: string;
  lastUpdated: string;
  affiliateLinks: AffiliateLink[];
  globalHeaderTags: GlobalHeaderTag[];
}

// Query Functions

/**
 * Get the main configuration document
 */
export async function getConfig(): Promise<FlorizeConfig | null> {
  const query = `*[_type == "florizeConfig"][0]`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching Florize config:', error);
    return null;
  }
}

/**
 * Helper function to find the best matching affiliate link for a service and locale
 * Priority: 1) Exact locale match, 2) All-locales link (empty locale), 3) null
 */
export function findAffiliateLinkForLocale(
  links: AffiliateLink[],
  serviceId: string,
  locale?: string
): AffiliateLink | null {
  if (!links || links.length === 0) return null;

  const serviceLinks = links.filter(link => link.serviceId === serviceId);
  if (serviceLinks.length === 0) return null;

  // First, try to find exact locale match
  if (locale) {
    const exactMatch = serviceLinks.find(link => link.locale === locale);
    if (exactMatch) return exactMatch;
  }

  // Fall back to all-locales link (empty or undefined locale)
  const allLocalesLink = serviceLinks.find(link => !link.locale || link.locale === '');
  if (allLocalesLink) return allLocalesLink;

  // No match found
  return null;
}

/**
 * Get affiliate link for a specific service
 * Returns URL with tracking parameters or null
 */
export async function getAffiliateLink(serviceId: string, locale?: string): Promise<string | null> {
  const config = await getConfig();
  if (!config?.affiliateLinks) return null;

  // Use helper function to find best matching link for locale
  const affiliate = findAffiliateLinkForLocale(
    config.affiliateLinks,
    serviceId,
    locale
  );

  return affiliate?.affiliateUrl || null;
}

/**
 * Get enabled affiliate banners
 * @param serviceId - Optional filter for specific service
 * @param locale - Optional locale filter
 */
export async function getAffiliateBanners(
  serviceId?: string,
  locale?: string
): Promise<{ serviceId: string; htmlCode: string; description?: string }[]> {
  const config = await getConfig();
  if (!config?.affiliateLinks) return [];

  return config.affiliateLinks
    .filter((link: any) => {
      // Must have banner configured with code
      if (!link.banner?.code) return false;
      // Banner must be enabled
      if (link.banner.enabled === false) return false;
      // If serviceId specified, filter to that service
      if (serviceId && link.serviceId !== serviceId) return false;
      // Locale filtering: match specific locale or links with no locale (all locales)
      if (locale && link.locale && link.locale !== locale) return false;
      return true;
    })
    .map((link: any) => ({
      serviceId: link.serviceId,
      htmlCode: link.banner.code,
      description: link.banner.description,
    }));
}

/**
 * Get active global header tags
 * Returns array of HTML/JS code strings to inject in <head>
 */
export async function getActiveHeaderTags(): Promise<string[]> {
  const config = await getConfig();
  if (!config?.globalHeaderTags) return [];

  return config.globalHeaderTags
    .filter((tag: any) => tag.active !== false)
    .map((tag: any) => tag.tag?.code)
    .filter(Boolean);
}
