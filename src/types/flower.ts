// Domain models for flower delivery services
// TypeScript definitions for Florize Flowers data structures

export interface ServiceFeatures {
  same_day_delivery: boolean;
  next_day_delivery: boolean;
  subscription_service: boolean;
  international_delivery: boolean;
  eco_friendly_options: boolean;
  gift_add_ons: boolean;
  custom_arrangements: boolean;
}

export interface FlowerService {
  id: string;
  name: string;
  description: string;
  rating: number;
  founded?: number;
  price_range: string;
  delivery_options: string[];
  key_features: string[];
  website?: string;
  features?: ServiceFeatures;
  pros: Array<{
    label: string;
    description: string;
  }>;
  cons: Array<{
    label: string;
    description: string;
  }>;
  best_for?: string;
  winner_badge?: string;
}

export interface FlowerOccasion {
  id: string;
  name: string;
  description: string;
  seasonal: boolean;
  typical_date?: string;
  recommended_services: string[];
  recommended_flowers: Array<{
    flower: string;
    reason: string;
  }>;
  budget_guide?: {
    budget_friendly: string;
    mid_range: string;
    luxury: string;
  };
}

export interface FlowerRecommendation {
  icon: string;
  recipient: string;
  description: string;
  flowers: string[];
  colors: string[];
  priceRange: string;
}

export interface ColorMeaning {
  color: string;
  hex: string;
  meaning: string;
  emotions: string[];
  bestFor: string;
}

export interface SeasonalGuide {
  season: string;
  icon: string;
  months: string;
  popularFlowers: string[];
  availability: 'Excellent' | 'Good' | 'Fair' | 'Limited';
  pricing: 'Budget-friendly' | 'Moderate' | 'Premium' | 'Variable';
  tips: string[];
}

export interface DeliveryOption {
  type: 'same-day' | 'next-day' | 'standard' | 'scheduled';
  availability: string;
  cutoff_time?: string;
  price_modifier?: string;
  areas_covered?: string[];
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  typical: number;
}

export interface ServiceComparison {
  service1: string;
  service2: string;
  winner?: 1 | 2;
  features: Array<{
    feature: string;
    service1_value: string | boolean;
    service2_value: string | boolean;
  }>;
}

export interface TestingMetric {
  icon: string;
  label: string;
  value: string;
  description?: string;
}

export interface PromoCode {
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed' | 'freebie';
  discount_value?: number;
  expiry_date?: string;
  terms?: string[];
}

export interface CustomerReview {
  id: string;
  service_id: string;
  rating: number;
  reviewer_name: string;
  review_date: string;
  verified_purchase: boolean;
  review_text: string;
  pros?: string[];
  cons?: string[];
  helpful_count?: number;
}

export interface ServiceRating {
  service_id: string;
  overall: number;
  value_for_money: number;
  delivery_reliability: number;
  flower_quality: number;
  customer_service: number;
  review_count: number;
}

// Collection types for Astro content
export interface ServiceContent {
  title: string;
  description: string;
  service: FlowerService;
  hero_image?: string;
  last_updated?: string;
  structured_data?: any;
}

export interface OccasionContent {
  title: string;
  description: string;
  occasion: FlowerOccasion;
  hero_image: string;
  last_updated?: string;
}

// Helper functions
export function calculateOverallRating(ratings: ServiceRating): number {
  const weights = {
    value_for_money: 0.25,
    delivery_reliability: 0.25,
    flower_quality: 0.3,
    customer_service: 0.2
  };

  return Number((
    ratings.value_for_money * weights.value_for_money +
    ratings.delivery_reliability * weights.delivery_reliability +
    ratings.flower_quality * weights.flower_quality +
    ratings.customer_service * weights.customer_service
  ).toFixed(1));
}

export function getPriceRangeSymbol(range: string): string {
  const symbols: Record<string, string> = {
    'Budget': '£',
    'Budget-Mid': '££',
    'Mid-Range': '££',
    'Mid-Premium': '£££',
    'Premium': '££££',
    'Luxury': '£££££'
  };
  return symbols[range] || '££';
}

export function getDeliverySpeed(options: string[]): string {
  if (options.includes('Same Day')) return 'Same Day Available';
  if (options.includes('Next Day')) return 'Next Day Available';
  if (options.includes('2-Day')) return '2-Day Delivery';
  return 'Standard Delivery';
}