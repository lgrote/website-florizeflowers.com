/**
 * Content Accessor Utilities
 *
 * Helper functions to simplify access to grouped content data.
 * These utilities provide a cleaner API for templates while maintaining
 * type safety and handling optional groups gracefully.
 */

import type { CollectionEntry } from 'astro:content';

type Service = CollectionEntry<'services'>['data'];
type Occasion = CollectionEntry<'occasions'>['data'];

// ============================================================================
// SERVICE ACCESSORS
// ============================================================================

/**
 * Get service base information
 */
export function getServiceBase(service: Service) {
  return service.base;
}

/**
 * Get service ID
 */
export function getServiceId(service: Service): string {
  return service.base.id;
}

/**
 * Get service name
 */
export function getServiceName(service: Service): string {
  return service.base.name;
}

/**
 * Get service title (for page titles)
 */
export function getServiceTitle(service: Service): string {
  return service.base.title;
}

/**
 * Get service description
 */
export function getServiceDescription(service: Service): string {
  return service.base.description;
}

/**
 * Get service rating
 */
export function getServiceRating(service: Service): number {
  return service.base.rating;
}

/**
 * Get service price range
 */
export function getServicePriceRange(service: Service): string {
  return service.base.price_range;
}

/**
 * Get service logo path
 */
export function getServiceLogo(service: Service): string {
  return service.base.logo_path;
}

/**
 * Get service hero image
 */
export function getServiceHeroImage(service: Service): string | undefined {
  return service.base.hero_image;
}

/**
 * Get service delivery options
 */
export function getServiceDeliveryOptions(service: Service): string[] {
  return service.base.delivery_options;
}

/**
 * Get service key features
 */
export function getServiceKeyFeatures(service: Service): string[] {
  return service.base.key_features;
}

/**
 * Get service SEO data (with fallbacks)
 */
export function getServiceSEO(service: Service) {
  return service.seo || {};
}

/**
 * Get service summary data
 */
export function getServiceSummary(service: Service) {
  return service.summary || {};
}

/**
 * Get service components data
 */
export function getServiceComponents(service: Service) {
  return service.components || {};
}

/**
 * Get service affiliate data
 */
export function getServiceAffiliate(service: Service) {
  return service.affiliate || {};
}

/**
 * Get service affiliate URL
 */
export function getServiceAffiliateUrl(service: Service): string | undefined {
  return service.affiliate?.url;
}

/**
 * Get service FAQs
 */
export function getServiceFAQs(service: Service) {
  return service.components?.faqs || [];
}

/**
 * Get service pros
 */
export function getServicePros(service: Service) {
  return service.components?.pros || [];
}

/**
 * Get service cons
 */
export function getServiceCons(service: Service) {
  return service.components?.cons || [];
}

/**
 * Get service testing metrics
 */
export function getServiceTestingMetrics(service: Service) {
  return service.components?.testing_metrics || [];
}

// ============================================================================
// OCCASION ACCESSORS
// ============================================================================

/**
 * Get occasion base information
 */
export function getOccasionBase(occasion: Occasion) {
  return occasion.base;
}

/**
 * Get occasion ID
 */
export function getOccasionId(occasion: Occasion): string {
  return occasion.base.id;
}

/**
 * Get occasion name
 */
export function getOccasionName(occasion: Occasion): string {
  return occasion.base.name;
}

/**
 * Get occasion title (for page titles)
 */
export function getOccasionTitle(occasion: Occasion): string {
  return occasion.base.title;
}

/**
 * Get occasion description
 */
export function getOccasionDescription(occasion: Occasion): string {
  return occasion.base.description;
}

/**
 * Get occasion hero image
 */
export function getOccasionHeroImage(occasion: Occasion): string {
  return occasion.base.hero_image;
}

/**
 * Get whether occasion is seasonal
 */
export function isOccasionSeasonal(occasion: Occasion): boolean {
  return occasion.base.seasonal;
}

/**
 * Get occasion SEO data (with fallbacks)
 */
export function getOccasionSEO(occasion: Occasion) {
  return occasion.seo || {};
}

/**
 * Get occasion recommendations
 */
export function getOccasionRecommendations(occasion: Occasion) {
  return occasion.recommendations;
}

/**
 * Get recommended services for occasion
 */
export function getOccasionRecommendedServices(occasion: Occasion): string[] {
  return occasion.recommendations.services;
}

/**
 * Get recommended flowers for occasion
 */
export function getOccasionRecommendedFlowers(occasion: Occasion) {
  return occasion.recommendations.flowers;
}

/**
 * Get occasion components data
 */
export function getOccasionComponents(occasion: Occasion) {
  return occasion.components || {};
}

/**
 * Get occasion FAQs
 */
export function getOccasionFAQs(occasion: Occasion) {
  return occasion.components?.faqs || [];
}

/**
 * Get occasion tabs data
 */
export function getOccasionTabs(occasion: Occasion) {
  return occasion.tabs || {};
}

// ============================================================================
// SHARED ACCESSORS (works for both services and occasions)
// ============================================================================

/**
 * Get content sections (dynamic FindFerries-style sections)
 */
export function getContentSections(content: Service | Occasion) {
  return content.content_sections || [];
}

/**
 * Get OG image with fallback
 */
export function getOGImage(content: Service | Occasion, fallback: string = '/images/florize-og-image.png'): string {
  if ('seo' in content && content.seo?.og_image) {
    return content.seo.og_image;
  }
  return fallback;
}

/**
 * Get keywords with fallback
 */
export function getKeywords(content: Service | Occasion): string | undefined {
  if ('seo' in content && content.seo?.keywords) {
    return content.seo.keywords;
  }
  return undefined;
}
