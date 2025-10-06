// Data transformation utilities for processing and normalizing content

import type { CollectionEntry } from 'astro:content';
import type { FlowerService, ServiceRating, TestingMetric } from '../types/flower';

/**
 * Transform service data for display
 */
export function transformServiceData(service: CollectionEntry<'services'>): FlowerService {
  const data = service.data;

  return {
    id: data.service_id,
    name: data.service_name,
    description: data.description,
    rating: data.rating,
    founded: data.founded,
    price_range: data.price_range,
    delivery_options: data.delivery_options || [],
    key_features: data.key_features || [],
    website: data.affiliate_url,
    pros: data.pros || [],
    cons: data.cons || [],
    best_for: data.best_for,
    winner_badge: data.winner_badge
  };
}

/**
 * Sort services by rating
 */
export function sortServicesByRating(services: CollectionEntry<'services'>[]): CollectionEntry<'services'>[] {
  return [...services].sort((a, b) => (b.data.rating || 0) - (a.data.rating || 0));
}

/**
 * Filter services by price range
 */
export function filterServicesByPrice(
  services: CollectionEntry<'services'>[],
  priceRange: 'Budget' | 'Mid-Range' | 'Premium' | 'Luxury'
): CollectionEntry<'services'>[] {
  return services.filter(service => {
    const range = service.data.price_range;
    switch (priceRange) {
      case 'Budget':
        return range?.includes('£') && !range?.includes('£££');
      case 'Mid-Range':
        return range?.includes('££') && !range?.includes('££££');
      case 'Premium':
        return range?.includes('£££');
      case 'Luxury':
        return range?.includes('££££');
      default:
        return true;
    }
  });
}

/**
 * Group services by feature
 */
export function groupServicesByFeature(services: CollectionEntry<'services'>[]): Record<string, CollectionEntry<'services'>[]> {
  const grouped: Record<string, CollectionEntry<'services'>[]> = {};

  services.forEach(service => {
    service.data.key_features?.forEach(feature => {
      if (!grouped[feature]) {
        grouped[feature] = [];
      }
      grouped[feature].push(service);
    });
  });

  return grouped;
}

/**
 * Calculate aggregate ratings from multiple sources
 */
export function calculateAggregateRating(ratings: Partial<ServiceRating>): number {
  const weights = {
    overall: 0.4,
    value_for_money: 0.2,
    delivery_reliability: 0.2,
    flower_quality: 0.15,
    customer_service: 0.05
  };

  let totalWeight = 0;
  let weightedSum = 0;

  Object.entries(weights).forEach(([key, weight]) => {
    const value = ratings[key as keyof ServiceRating];
    if (typeof value === 'number') {
      weightedSum += value * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? Number((weightedSum / totalWeight).toFixed(1)) : 0;
}

/**
 * Format price range for display
 */
export function formatPriceRange(min: number, max: number, currency = 'GBP'): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  if (min === max) {
    return formatter.format(min);
  }

  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

/**
 * Generate comparison table data
 */
export function generateComparisonData(
  services: CollectionEntry<'services'>[],
  features: string[]
): Array<{ feature: string; values: Record<string, string | boolean> }> {
  return features.map(feature => {
    const values: Record<string, string | boolean> = {};

    services.forEach(service => {
      const serviceFeatures = service.data.key_features || [];
      values[service.data.service_id] = serviceFeatures.includes(feature);
    });

    return { feature, values };
  });
}

/**
 * Transform testing metrics for display
 */
export function transformTestingMetrics(metrics: any[]): TestingMetric[] {
  return metrics.map(metric => ({
    icon: metric.icon || '📊',
    label: metric.label || 'Metric',
    value: String(metric.value),
    description: metric.description
  }));
}

/**
 * Normalize service names for URLs
 */
export function normalizeServiceSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract unique features from all services
 */
export function extractUniqueFeatures(services: CollectionEntry<'services'>[]): string[] {
  const features = new Set<string>();

  services.forEach(service => {
    service.data.key_features?.forEach(feature => features.add(feature));
  });

  return Array.from(features).sort();
}

/**
 * Get recommended services for an occasion
 */
export function getRecommendedServices(
  occasionId: string,
  services: CollectionEntry<'services'>[],
  limit = 3
): CollectionEntry<'services'>[] {
  // First, filter by occasion-specific criteria
  let recommended = services;

  // Special handling for different occasions
  switch (occasionId) {
    case 'birthday':
      recommended = services.filter(s =>
        s.data.key_features?.includes('Same Day Delivery') ||
        s.data.key_features?.includes('Gift Add-ons')
      );
      break;

    case 'anniversary':
      recommended = services.filter(s =>
        s.data.price_range?.includes('£££') ||
        s.data.key_features?.includes('Luxury Arrangements')
      );
      break;

    case 'funeral':
      recommended = services.filter(s =>
        s.data.key_features?.includes('Sympathy Flowers') ||
        s.data.key_features?.includes('Traditional Arrangements')
      );
      break;

    case 'corporate':
      recommended = services.filter(s =>
        s.data.key_features?.includes('Corporate Accounts') ||
        s.data.key_features?.includes('Bulk Orders')
      );
      break;
  }

  // Sort by rating and return top N
  return sortServicesByRating(recommended).slice(0, limit);
}

/**
 * Calculate delivery time estimate
 */
export function calculateDeliveryEstimate(options: string[]): string {
  if (options.includes('Same Day')) return 'Today';
  if (options.includes('Next Day')) return 'Tomorrow';
  if (options.includes('2-Day')) return '2 business days';
  return '3-5 business days';
}

/**
 * Generate SEO-friendly title
 */
export function generateSEOTitle(
  serviceName: string,
  type: 'review' | 'comparison' | 'guide'
): string {
  const year = new Date().getFullYear();

  switch (type) {
    case 'review':
      return `${serviceName} Review ${year} - Expert Analysis & Honest Rating`;
    case 'comparison':
      return `${serviceName} vs Competitors - Detailed Comparison ${year}`;
    case 'guide':
      return `${serviceName} Complete Guide - Everything You Need to Know`;
    default:
      return `${serviceName} - Florize Flowers`;
  }
}

/**
 * Generate meta description
 */
export function generateMetaDescription(
  serviceName: string,
  rating: number,
  keyFeatures: string[]
): string {
  const featuresText = keyFeatures.slice(0, 3).join(', ');
  return `${serviceName} scores ${rating}/5 in our expert review. Features: ${featuresText}. Read our in-depth analysis, pros & cons, and pricing comparison.`;
}

/**
 * Transform date for display
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}