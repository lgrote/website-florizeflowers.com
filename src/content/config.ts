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
} from '../schemas/shared';

// ============================================================================
// SERVICES COLLECTION
// ============================================================================

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // LANGUAGE: Content language
    lang: z.enum(['en', 'de']).default('en'),

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
    // LANGUAGE: Content language
    lang: z.enum(['en', 'de']).default('en'),

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
// UPDATES COLLECTION
// ============================================================================

const updatesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'de']).default('en'),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    publishedDate: z.string(),
    order: z.number().optional(), // For display ordering
  })
});

// ============================================================================
// PAGES COLLECTION
// ============================================================================

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'de']).default('en'),
    title: z.string(),
    description: z.string(),
    seo: seoGroup.optional(),
    // For index pages with hero sections
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      primaryCta: z.object({
        text: z.string(),
        href: z.string(),
      }).optional(),
      secondaryCta: z.object({
        text: z.string(),
        href: z.string(),
      }).optional(),
      backgroundImage: z.string().optional(),
    }).optional(),
    // For page intro/overview sections
    intro: z.object({
      heading: z.string(),
      paragraph: z.string(),
    }).optional(),
    // For section headings
    sections: z.object({
      main: z.string().optional(),
      services: z.string().optional(),
      occasions: z.string().optional(),
      legal: z.string().optional(),
    }).optional(),
    // For tips/cards arrays
    tips: z.array(z.object({
      title: z.string(),
      content: z.string(),
    })).optional(),
    // For UI labels
    labels: z.object({
      seasonal: z.string().optional(),
      popularFlowers: z.string().optional(),
      from: z.string().optional(),
      viewGuide: z.string().optional(),
      cantFind: z.string().optional(),
      contactHelp: z.string().optional(),
    }).optional(),
  })
});

// ============================================================================
// RECOMMENDATIONS COLLECTION
// ============================================================================

const recommendationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'de']).default('en'),
    title: z.string(),
    description: z.string(),
    serviceId: z.string(), // Links to services collection
    category: z.string(), // e.g., "budget", "luxury", "convenience", "reliability"
    order: z.number().optional(),
    ctaText: z.string().default("Read Full Review"),
    column: z.enum(['left', 'right']).optional(), // For layout positioning
  })
});

// ============================================================================
// GUIDES COLLECTION
// ============================================================================

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'de']).default('en'),
    title: z.string(),
    description: z.string(),
    category: z.string(), // e.g., "essential", "quick-tip", "seasonal"
    icon: z.string().optional(),
    order: z.number().optional(),
    tips: z.array(z.string()).optional(), // For bullet-point tips
  })
});

// ============================================================================
// HOMEPAGE SECTIONS COLLECTION
// ============================================================================

const homepageSectionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'de']).default('en'),
    title: z.string(),
    description: z.string().optional(),
    sectionType: z.string(), // "methodology", "trust-signals", "introduction", "hero", "seo"
    // For SEO section
    keywords: z.string().optional(),
    // For sections with cards (methodology, trust-signals)
    cards: z.array(z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      icon: z.string().optional(),
    })).optional(),
    // For sections with paragraphs (introduction)
    paragraphs: z.array(z.string()).optional(),
    footerText: z.string().optional(),
    // For hero section
    subtitle: z.string().optional(),
    backgroundImage: z.string().optional(),
    primaryCta: z.object({
      text: z.string(),
      href: z.string(),
    }).optional(),
    secondaryCta: z.object({
      text: z.string(),
      href: z.string(),
    }).optional(),
  })
});

// ============================================================================
// EXPORTS
// ============================================================================

export const collections = {
  'services': servicesCollection,
  'occasions': occasionsCollection,
  'updates': updatesCollection,
  'pages': pagesCollection,
  'recommendations': recommendationsCollection,
  'guides': guidesCollection,
  'homepage-sections': homepageSectionsCollection,
};
