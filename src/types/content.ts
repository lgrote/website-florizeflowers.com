// Content section types using discriminated unions for type safety
// Based on FindFerries architecture pattern

import type { z } from 'astro:content';

// Base content section interface
export interface BaseContentSection {
  type: string;
  title: string;
  content?: string;
}

// Overview section with optional items
export interface OverviewSection extends BaseContentSection {
  type: 'overview';
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Features grid for displaying feature lists
export interface FeaturesGridSection extends BaseContentSection {
  type: 'features_grid';
  items: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Assessment section for final recommendations
export interface AssessmentSection extends BaseContentSection {
  type: 'assessment';
  expert_conclusion?: {
    title: string;
    content: string;
    rating_display?: string;
    subtitle?: string;
  };
  value_justification?: {
    title: string;
    content: string;
    cta_text: string;
  };
  recommended_for?: string[];
  consider_alternatives?: string[];
}

// Quick facts section
export interface QuickFactsSection extends BaseContentSection {
  type: 'quick_facts';
  facts: Array<{
    label: string;
    value: string;
  }>;
}

// Pros and cons analysis
export interface ProsConsSection extends BaseContentSection {
  type: 'pros_cons';
  pros: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  cons: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Comparison section
export interface ComparisonSection extends BaseContentSection {
  type: 'comparison';
  competitors: Array<{
    name: string;
    rating: number;
    description: string;
    link?: string;
  }>;
}

// Pricing guide section
export interface PricingSection extends BaseContentSection {
  type: 'pricing_guide';
  pricing_tiers: Array<{
    tier: string;
    description: string;
    price_range?: string;
  }>;
}

// FAQ section
export interface FAQSection extends BaseContentSection {
  type: 'faq';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// Visual components section for flower-specific content
export interface VisualComponentsSection extends BaseContentSection {
  type: 'visual_components';
  component_type: 'flower_recommendations' | 'color_meanings' | 'seasonal_guide';
  data: any; // This will be typed based on component_type
}

// Tab content section
export interface TabContentSection extends BaseContentSection {
  type: 'tab_content';
  tabs: Array<{
    id: string;
    label: string;
    content: string | any; // Can be string or structured data
  }>;
}

// Generic content prose section
export interface ContentProseSection extends BaseContentSection {
  type: 'content_prose';
  content: string;
}

// Union type of all possible content sections
export type ContentSection =
  | OverviewSection
  | FeaturesGridSection
  | AssessmentSection
  | QuickFactsSection
  | ProsConsSection
  | ComparisonSection
  | PricingSection
  | FAQSection
  | VisualComponentsSection
  | TabContentSection
  | ContentProseSection;

// Type guard functions
export const isOverviewSection = (section: ContentSection): section is OverviewSection =>
  section.type === 'overview';

export const isFeaturesGridSection = (section: ContentSection): section is FeaturesGridSection =>
  section.type === 'features_grid';

export const isAssessmentSection = (section: ContentSection): section is AssessmentSection =>
  section.type === 'assessment';

export const isQuickFactsSection = (section: ContentSection): section is QuickFactsSection =>
  section.type === 'quick_facts';

export const isProsConsSection = (section: ContentSection): section is ProsConsSection =>
  section.type === 'pros_cons';

export const isComparisonSection = (section: ContentSection): section is ComparisonSection =>
  section.type === 'comparison';

export const isPricingSection = (section: ContentSection): section is PricingSection =>
  section.type === 'pricing_guide';

export const isFAQSection = (section: ContentSection): section is FAQSection =>
  section.type === 'faq';

export const isVisualComponentsSection = (section: ContentSection): section is VisualComponentsSection =>
  section.type === 'visual_components';

export const isTabContentSection = (section: ContentSection): section is TabContentSection =>
  section.type === 'tab_content';

export const isContentProseSection = (section: ContentSection): section is ContentProseSection =>
  section.type === 'content_prose';

// Content validation result type
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

// Validate content section structure
export function validateContentSection(section: any): ValidationResult {
  const errors: string[] = [];

  if (!section.type) {
    errors.push('Content section missing required "type" field');
  }

  if (!section.title) {
    errors.push('Content section missing required "title" field');
  }

  // Type-specific validation
  switch (section.type) {
    case 'features_grid':
      if (!section.items || !Array.isArray(section.items)) {
        errors.push('Features grid section requires an "items" array');
      }
      break;
    case 'quick_facts':
      if (!section.facts || !Array.isArray(section.facts)) {
        errors.push('Quick facts section requires a "facts" array');
      }
      break;
    case 'pros_cons':
      if (!section.pros || !section.cons) {
        errors.push('Pros/cons section requires both "pros" and "cons" arrays');
      }
      break;
    case 'faq':
      if (!section.questions || !Array.isArray(section.questions)) {
        errors.push('FAQ section requires a "questions" array');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}