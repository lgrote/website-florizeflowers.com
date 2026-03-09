/**
 * Content Accessor Utilities
 *
 * Helper functions to simplify access to grouped content data.
 * These utilities provide a cleaner API for templates while maintaining
 * type safety and handling optional groups gracefully.
 */

import type { SanityService, SanityOccasion, SanityContentSection } from '../types/sanity';

// ============================================================================
// SERVICE ACCESSORS
// ============================================================================

export function getServiceBase(service: SanityService) {
  return service.base;
}

export function getServiceId(service: SanityService): string {
  return service.base.id;
}

export function getServiceName(service: SanityService): string {
  return service.base.name;
}

export function getServiceTitle(service: SanityService): string {
  return service.base.title;
}

export function getServiceDescription(service: SanityService): string {
  return service.base.description;
}

export function getServiceRating(service: SanityService): number {
  return service.base.rating;
}

export function getServicePriceRange(service: SanityService): string {
  return service.base.priceRange;
}

export function getServiceDeliveryOptions(service: SanityService): string[] {
  return service.base.deliveryOptions;
}

export function getServiceKeyFeatures(service: SanityService): string[] {
  return service.base.keyFeatures;
}

export function getServiceSEO(service: SanityService) {
  return service.seo || {};
}

export function getServiceSummary(service: SanityService) {
  return service.summary || {};
}

export function getServiceComponents(service: SanityService) {
  return service.components || {};
}

export function getServiceAffiliate(service: SanityService) {
  return service.affiliate || {};
}

export function getServiceAffiliateUrl(service: SanityService): string | undefined {
  return service.affiliate?.url;
}

export function getServiceFAQs(service: SanityService) {
  return service.components?.faqs || [];
}

export function getServicePros(service: SanityService) {
  return service.components?.pros || [];
}

export function getServiceCons(service: SanityService) {
  return service.components?.cons || [];
}

export function getServiceTestingMetrics(service: SanityService) {
  return service.components?.testingMetrics || [];
}

// ============================================================================
// OCCASION ACCESSORS
// ============================================================================

export function getOccasionBase(occasion: SanityOccasion) {
  return occasion.base;
}

export function getOccasionId(occasion: SanityOccasion): string {
  return occasion.base.id;
}

export function getOccasionName(occasion: SanityOccasion): string {
  return occasion.base.name;
}

export function getOccasionTitle(occasion: SanityOccasion): string {
  return occasion.base.title;
}

export function getOccasionDescription(occasion: SanityOccasion): string {
  return occasion.base.description;
}

export function isOccasionSeasonal(occasion: SanityOccasion): boolean {
  return occasion.base.seasonal;
}

export function getOccasionSEO(occasion: SanityOccasion) {
  return occasion.seo || {};
}

export function getOccasionRecommendations(occasion: SanityOccasion) {
  return occasion.recommendations;
}

export function getOccasionRecommendedServices(occasion: SanityOccasion): string[] {
  return occasion.recommendations.services;
}

export function getOccasionRecommendedFlowers(occasion: SanityOccasion) {
  return occasion.recommendations.flowers;
}

export function getOccasionComponents(occasion: SanityOccasion) {
  return occasion.components || {};
}

export function getOccasionFAQs(occasion: SanityOccasion) {
  return occasion.components?.faqs || [];
}

export function getOccasionTabs(occasion: SanityOccasion) {
  return occasion.tabs || {};
}

// ============================================================================
// SHARED ACCESSORS
// ============================================================================

export function getContentSections(content: SanityService | SanityOccasion): SanityContentSection[] {
  return content.contentSections || [];
}

export function getKeywords(content: SanityService | SanityOccasion): string | undefined {
  if ('seo' in content && content.seo?.keywords) {
    return content.seo.keywords;
  }
  return undefined;
}
