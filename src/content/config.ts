import { defineCollection, z } from 'astro:content';
import {
  baseMetaGroup,
  seoGroup,
  affiliateGroup,
  faqArray,
  prosConsArray,
  testingMetricsArray,
  bestForScenariosArray,
  featureComparisonObject,
  useCasesObject,
  comparisonsArray,
  recommendationSectionsArray,
  relatedReviewsArray,
  contentSectionsArray,
  statsArray,
  serviceFeaturesArray,
  deliveryTimelineArray,
  calloutsArray,
  flowerRecommendationsArray,
  colorMeaningsArray,
  seasonalGuideArray,
  recommendedFlowersArray,
  budgetGuideObject,
} from './schemas/shared';

// ============================================================================
// SERVICES COLLECTION
// ============================================================================

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // BASE: Core service information
    base: z.object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
      description: z.string(),
      logo_path: z.string(),
      hero_image: z.string().optional(),
      rating: z.number().min(0).max(5),
      price_range: z.string(),
      winner_badge: z.string().optional(),
      delivery_options: z.array(z.string()),
      key_features: z.array(z.string()),
      founded: z.number().optional(),
    }),

    // SEO: Search engine optimization metadata
    seo: seoGroup.optional(),

    // SUMMARY: Quick summary information
    summary: z.object({
      best_for: z.string().optional(),
      delivery: z.string().optional(),
      rating_text: z.string().optional(),
    }).optional(),

    // OVERVIEW: Service overview content
    overview: z.object({
      positioning: z.string().optional(),
      content: z.string().optional(),
    }).optional(),

    // COMPONENTS: Visual component data
    components: z.object({
      pros_title: z.string().optional(),
      cons_title: z.string().optional(),
      pros: prosConsArray.optional(),
      cons: prosConsArray.optional(),
      faqs: faqArray.optional(),
      testing_metrics: testingMetricsArray.optional(),
      best_for_scenarios: bestForScenariosArray.optional(),
      feature_comparison: featureComparisonObject.optional(),
    }).optional(),

    // AFFILIATE: Affiliate marketing information
    affiliate: affiliateGroup.optional(),

    // COMPARISONS: Competitor comparison data
    comparisons: z.object({
      items: comparisonsArray.optional(),
      use_cases: useCasesObject.optional(),
    }).optional(),

    // RECOMMENDATIONS: Final recommendation section
    recommendations: z.object({
      sections: recommendationSectionsArray.optional(),
      cta: z.string().optional(),
    }).optional(),

    // RELATED: Related content
    related: z.object({
      heading: z.string().optional(),
      reviews: relatedReviewsArray.optional(),
    }).optional(),

    // CONTENT_SECTIONS: Dynamic flexible content (FindFerries pattern)
    content_sections: contentSectionsArray.optional(),
  })
});

// ============================================================================
// OCCASIONS COLLECTION
// ============================================================================

const occasionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // BASE: Core occasion information
    base: z.object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
      description: z.string(),
      hero_image: z.string(),
      icon: z.string().optional(),
      seasonal: z.boolean().default(false),
      typical_date: z.string().optional(),
    }),

    // SEO: Search engine optimization metadata
    seo: seoGroup.optional(),

    // RECOMMENDATIONS: Service and flower recommendations
    recommendations: z.object({
      services: z.array(z.string()),
      flowers: recommendedFlowersArray,
      budget_guide: budgetGuideObject.optional(),
    }),

    // COMPONENTS: Visual component data
    components: z.object({
      stats: statsArray.optional(),
      service_features: serviceFeaturesArray.optional(),
      delivery_timeline: deliveryTimelineArray.optional(),
      callouts: calloutsArray.optional(),
      faqs: faqArray.optional(),
      flower_recommendations: flowerRecommendationsArray.optional(),
      color_meanings: colorMeaningsArray.optional(),
      seasonal_guide: seasonalGuideArray.optional(),
    }).optional(),

    // TABS: Tab content for tabbed sections
    tabs: z.object({
      gift_enhancements: z.array(z.object({
        item: z.string(),
        description: z.string(),
        priceRange: z.string(),
      })).optional(),
      card_messages: z.array(z.object({
        recipient: z.string(),
        message: z.string(),
      })).optional(),
      special_scenarios: z.array(z.object({
        title: z.string(),
        icon: z.string().optional(),
        tips: z.array(z.string()),
      })).optional(),
      delivery_locations: z.array(z.object({
        location: z.string(),
        tips: z.array(z.string()),
      })).optional(),
      cost_saving_tips: z.array(z.string()).optional(),
    }).optional(),

    // CONTENT_SECTIONS: Dynamic flexible content (FindFerries pattern)
    content_sections: contentSectionsArray.optional(),
  })
});

// ============================================================================
// EXPORTS
// ============================================================================

export const collections = {
  'services': servicesCollection,
  'occasions': occasionsCollection,
};
