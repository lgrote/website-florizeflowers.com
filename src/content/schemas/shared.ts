import { z } from 'astro:content';

// ============================================================================
// REUSABLE SCHEMA GROUPS
// These groups organize content by concern/component for better maintainability
// ============================================================================

// Base metadata shared across all content types
export const baseMetaGroup = z.object({
  title: z.string(),
  description: z.string(),
});

// SEO-related fields
export const seoGroup = z.object({
  og_image: z.string().optional(),
  keywords: z.string().optional(),
  date_published: z.string().optional(),
  date_modified: z.string().optional(),
});

// Affiliate-related fields
export const affiliateGroup = z.object({
  url: z.string().url().optional(),
  promo_code: z.object({
    code: z.string(),
    description: z.string(),
    expiry_date: z.string().optional(),
  }).optional(),
});

// Reusable array types
export const faqArray = z.array(z.object({
  question: z.string(),
  answer: z.string(),
}));

export const prosConsItem = z.object({
  label: z.string(),
  description: z.string(),
});

export const prosConsArray = z.array(prosConsItem);

// Testing metrics for services
export const testingMetricsArray = z.array(z.object({
  icon: z.string(),
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
}));

// Best-for scenarios
export const bestForScenariosArray = z.array(z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  highlight: z.boolean().optional(),
}));

// Feature comparison structure
export const featureComparisonObject = z.object({
  competitor_name: z.string(),
  winner: z.enum(['service', 'competitor']).optional(),
  features: z.array(z.object({
    feature: z.string(),
    service_value: z.union([z.string(), z.boolean()]),
    competitor_value: z.union([z.string(), z.boolean()]),
  })),
});

// Use cases structure
export const useCasesObject = z.object({
  heading: z.string(),
  scenarios: z.array(z.object({
    label: z.string(),
    description: z.string(),
  })),
});

// Comparisons array
export const comparisonsArray = z.array(z.object({
  competitor: z.string(),
  category: z.string(),
  description: z.string(),
}));

// Recommendation sections
export const recommendationSectionsArray = z.array(z.object({
  heading: z.string(),
  content: z.string(),
}));

// Related reviews
export const relatedReviewsArray = z.array(z.object({
  title: z.string(),
  serviceId: z.string(),
  description: z.string(),
}));

// Dynamic content sections (FindFerries pattern)
export const contentSectionsArray = z.array(z.object({
  type: z.enum([
    'overview',
    'features_grid',
    'assessment',
    'quick_facts',
    'pros_cons',
    'comparison',
    'pricing_guide',
    'faq',
    'visual_components',
    'tab_content',
    'content_prose'
  ]),
  title: z.string(),
  content: z.string().optional(),
  items: z.array(z.any()).optional(),
  facts: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  questions: faqArray.optional(),
  pros: z.array(z.any()).optional(),
  cons: z.array(z.any()).optional(),
  tabs: z.array(z.any()).optional(),
  expert_conclusion: z.any().optional(),
  value_justification: z.any().optional(),
  recommended_for: z.array(z.string()).optional(),
  consider_alternatives: z.array(z.string()).optional()
}));

// Stats for occasions
export const statsArray = z.array(z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  description: z.string().optional(),
}));

// Service features
export const serviceFeaturesArray = z.array(z.object({
  icon: z.string().optional(),
  title: z.string(),
  description: z.string(),
}));

// Delivery timeline
export const deliveryTimelineArray = z.array(z.object({
  time: z.string(),
  title: z.string(),
  description: z.string(),
  tip: z.string().optional(),
}));

// Callouts
export const calloutsArray = z.array(z.object({
  variant: z.enum(['info', 'warning', 'tip', 'success']),
  title: z.string().optional(),
  content: z.string(),
}));

// Flower recommendations
export const flowerRecommendationsArray = z.array(z.object({
  icon: z.string(),
  recipient: z.string(),
  description: z.string(),
  flowers: z.array(z.string()),
  colors: z.array(z.string()),
  priceRange: z.string(),
}));

// Color meanings
export const colorMeaningsArray = z.array(z.object({
  color: z.string(),
  hex: z.string(),
  meaning: z.string(),
  emotions: z.array(z.string()),
  bestFor: z.string(),
}));

// Seasonal guide
export const seasonalGuideArray = z.array(z.object({
  season: z.string(),
  icon: z.string(),
  months: z.string(),
  popularFlowers: z.array(z.string()),
  availability: z.enum(['Excellent', 'Good', 'Fair', 'Limited']),
  pricing: z.enum(['Budget-friendly', 'Moderate', 'Premium', 'Variable']),
  tips: z.array(z.string()),
}));

// Recommended flowers
export const recommendedFlowersArray = z.array(z.object({
  flower: z.string(),
  reason: z.string(),
}));

// Budget guide
export const budgetGuideObject = z.object({
  budget_friendly: z.string(),
  mid_range: z.string(),
  luxury: z.string(),
});
