// Centralized affiliate link management system
// Fallback chain: Sanity config → Sanity service document → Internal link

import { getConfig, findAffiliateLinkForLocale } from '../lib/sanity';
import { getServiceById } from '../lib/sanity-fetchers';
import type { SupportedLanguage } from '../i18n/config';

/**
 * Get the affiliate booking link for a flower service
 * Fallback chain: Sanity affiliate link (locale-aware) → Service document → Internal link
 * @param serviceId - The ID of the flower service
 * @param locale - Optional locale for language-specific affiliate links
 * @returns The affiliate URL or fallback URL
 */
export async function getAffiliateLink(serviceId: string, locale?: SupportedLanguage): Promise<string> {
  try {
    // 1. Try Sanity config first for affiliate link (with locale awareness)
    const sanityConfig = await getConfig();
    if (sanityConfig && Array.isArray(sanityConfig.affiliateLinks)) {
      const affiliateEntry = findAffiliateLinkForLocale(
        sanityConfig.affiliateLinks,
        serviceId,
        locale
      );
      if (affiliateEntry?.affiliateUrl) {
        return affiliateEntry.affiliateUrl;
      }
    }

    // 2. Fall back to service document's affiliate URL
    if (locale) {
      const serviceData = await getServiceById(serviceId, locale);
      if (serviceData?.affiliate?.url) {
        return serviceData.affiliate.url;
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

