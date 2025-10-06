// Centralized affiliate link management system
// Follows FindFerries pattern with Sanity fallback chain

import { getEntry } from 'astro:content';
import { getConfig } from '../lib/sanity';

/**
 * Get the affiliate booking link for a flower service
 * Fallback chain: Sanity affiliate link → Service website → Internal link
 * @param serviceId - The ID of the flower service
 * @returns The affiliate URL or fallback URL
 */
export async function getAffiliateLink(serviceId: string): Promise<string> {
  try {
    // 1. Try Sanity first for affiliate link
    const sanityConfig = await getConfig();
    if (sanityConfig && Array.isArray(sanityConfig.affiliateLinks)) {
      const affiliateEntry = sanityConfig.affiliateLinks.find(
        (link: any) => link.serviceId === serviceId
      );
      if (affiliateEntry?.affiliateUrl) {
        return affiliateEntry.affiliateUrl;
      }
    }

    // 2. Fall back to service website from content collection
    try {
      const serviceData = await getEntry('services', serviceId);
      if (serviceData?.data?.affiliate_url) {
        return serviceData.data.affiliate_url;
      }
    } catch (error) {
      console.warn(`Could not load service data for ${serviceId}`);
    }

    // 3. Last resort: internal link
    return `/services/${serviceId}`;
  } catch (error) {
    console.warn(`Error getting affiliate link for ${serviceId}:`, error);
    return `/services/${serviceId}`;
  }
}

/**
 * Get multiple affiliate links at once
 * @param serviceIds - Array of service IDs
 * @returns Object mapping service IDs to their affiliate URLs
 */
export async function getAffiliateLinks(serviceIds: string[]): Promise<Record<string, string>> {
  const links: Record<string, string> = {};

  // Process each service individually using the same fallback chain
  for (const serviceId of serviceIds) {
    links[serviceId] = await getAffiliateLink(serviceId);
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

