// Centralized affiliate link management system
// Follows FindFerries pattern with Sanity fallback chain

import { getEntry } from 'astro:content';
import { getConfig, findAffiliateLinkForLocale } from '../lib/sanity';
import type { SupportedLanguage } from '../i18n/config';

/**
 * Get the affiliate booking link for a flower service
 * Fallback chain: Sanity affiliate link (locale-aware) → Service website → Internal link
 * @param serviceId - The ID of the flower service
 * @param locale - Optional locale for language-specific affiliate links
 * @returns The affiliate URL or fallback URL
 */
export async function getAffiliateLink(serviceId: string, locale?: SupportedLanguage): Promise<string> {
  try {
    // 1. Try Sanity first for affiliate link (with locale awareness)
    const sanityConfig = await getConfig();
    if (sanityConfig && Array.isArray(sanityConfig.affiliateLinks)) {
      // Use helper function to find best matching link for locale
      const affiliateEntry = findAffiliateLinkForLocale(
        sanityConfig.affiliateLinks,
        serviceId,
        locale
      );
      if (affiliateEntry?.affiliateUrl) {
        return affiliateEntry.affiliateUrl;
      }
    }

    // 2. Fall back to service website from content collection
    // Try to get locale-specific service entry
    try {
      let entryId = serviceId;
      if (locale) {
        // Content collections are organized as locale/slug
        entryId = `${locale}/${serviceId}`;
      }

      const serviceData = await getEntry('services', entryId);
      if (serviceData?.data?.affiliate?.url) {
        return serviceData.data.affiliate.url;
      }
    } catch (error) {
      // Service entry not found - this is expected for some services
      // Try without locale if locale-specific entry not found
      if (locale) {
        try {
          const serviceData = await getEntry('services', serviceId);
          if (serviceData?.data?.affiliate?.url) {
            return serviceData.data.affiliate.url;
          }
        } catch (error) {
          // Ignore - will fall through to last resort
        }
      }
    }

    // 3. Last resort: internal link (with locale prefix if provided)
    const prefix = locale ? `/${locale}` : '';
    return `${prefix}/services/${serviceId}`;
  } catch (error) {
    console.warn(`Error getting affiliate link for ${serviceId}:`, error);
    const prefix = locale ? `/${locale}` : '';
    return `${prefix}/services/${serviceId}`;
  }
}

/**
 * Get multiple affiliate links at once
 * @param serviceIds - Array of service IDs
 * @param locale - Optional locale for language-specific affiliate links
 * @returns Object mapping service IDs to their affiliate URLs
 */
export async function getAffiliateLinks(
  serviceIds: string[],
  locale?: SupportedLanguage
): Promise<Record<string, string>> {
  const links: Record<string, string> = {};

  // Process each service individually using the same fallback chain
  for (const serviceId of serviceIds) {
    links[serviceId] = await getAffiliateLink(serviceId, locale);
  }

  return links;
}


// Add affiliate disclosure if needed
export function shouldShowAffiliateDisclosure(content: string): boolean {
  // Check if content contains affiliate links
  const affiliateKeywords = [
    'affiliate',
    'commission',
    'partner',
    'sponsored',
    'compensation'
  ];

  return affiliateKeywords.some(keyword =>
    content.toLowerCase().includes(keyword)
  );
}

// Get affiliate disclosure text
export function getAffiliateDisclosure(): string {
  return `Florize Flowers may earn a commission from purchases made through links on this page.
    This doesn't affect our reviews or your price. Learn more about how we make money.`;
}

