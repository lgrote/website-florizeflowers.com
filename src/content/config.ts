import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic Info
    title: z.string(),
    description: z.string(),
    service_id: z.string(),
    service_name: z.string(),

    // Display
    logo_path: z.string(),
    hero_image: z.string().optional(),

    // Ratings & Features
    rating: z.number().min(0).max(5),
    price_range: z.string(),
    winner_badge: z.string().optional(),

    // Service Details
    delivery_options: z.array(z.string()),
    key_features: z.array(z.string()),
    founded: z.number().optional(),

    // Affiliate
    affiliate_url: z.string().url().optional(),

    // Quick Summary
    best_for: z.string().optional(),
    summary_delivery: z.string().optional(),
    summary_rating: z.string().optional(),

    // Service Overview
    overview_positioning: z.string().optional(),
    overview_content: z.string().optional(),

    // Pros & Cons
    pros_title: z.string().optional(),
    cons_title: z.string().optional(),
    pros: z.array(z.object({
      label: z.string(),
      description: z.string(),
    })).optional(),
    cons: z.array(z.object({
      label: z.string(),
      description: z.string(),
    })).optional(),

    // Comparisons
    comparisons: z.array(z.object({
      competitor: z.string(),
      category: z.string(),
      description: z.string(),
    })).optional(),
    use_cases: z.object({
      heading: z.string(),
      scenarios: z.array(z.object({
        label: z.string(),
        description: z.string(),
      })),
    }).optional(),

    // Final Recommendation
    recommendation_sections: z.array(z.object({
      heading: z.string(),
      content: z.string(),
    })).optional(),
    recommendation_cta: z.string().optional(),

    // Related Reviews
    related_heading: z.string().optional(),
    related_reviews: z.array(z.object({
      title: z.string(),
      serviceId: z.string(),
      description: z.string(),
    })).optional(),

    // SEO
    og_image: z.string().optional(),
    keywords: z.string().optional(),
    date_published: z.string().optional(),
    date_modified: z.string().optional(),

    // FAQs
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),

    // Best For Scenarios
    best_for_scenarios: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
      highlight: z.boolean().optional(),
    })).optional(),

    // Promo Code
    promo_code: z.object({
      code: z.string(),
      description: z.string(),
      expiry_date: z.string().optional(),
    }).optional(),

    // Feature Comparison
    feature_comparison: z.object({
      competitor_name: z.string(),
      winner: z.enum(['service', 'competitor']).optional(),
      features: z.array(z.object({
        feature: z.string(),
        service_value: z.union([z.string(), z.boolean()]),
        competitor_value: z.union([z.string(), z.boolean()]),
      })),
    }).optional(),

    // Testing Metrics
    testing_metrics: z.array(z.object({
      icon: z.string(),
      label: z.string(),
      value: z.string(),
      description: z.string().optional(),
    })).optional(),

    // Dynamic content sections (FindFerries pattern)
    // Allows flexible content organization
    content_sections: z.array(z.object({
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
      // Additional fields based on type
      items: z.array(z.any()).optional(),
      facts: z.array(z.object({
        label: z.string(),
        value: z.string()
      })).optional(),
      questions: z.array(z.object({
        question: z.string(),
        answer: z.string()
      })).optional(),
      pros: z.array(z.any()).optional(),
      cons: z.array(z.any()).optional(),
      tabs: z.array(z.any()).optional(),
      // Assessment specific
      expert_conclusion: z.any().optional(),
      value_justification: z.any().optional(),
      recommended_for: z.array(z.string()).optional(),
      consider_alternatives: z.array(z.string()).optional()
    })).optional(),
  })
});

const occasionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic Info
    title: z.string(),
    description: z.string(),
    occasion_id: z.string(),
    occasion_name: z.string(),

    // Display
    hero_image: z.string(),
    icon: z.string().optional(),

    // Timing & Seasonality
    seasonal: z.boolean().default(false),
    typical_date: z.string().optional(),

    // Recommendations
    recommended_services: z.array(z.string()),
    recommended_flowers: z.array(z.object({
      flower: z.string(),
      reason: z.string(),
    })),

    // Budget Guidance
    budget_guide: z.object({
      budget_friendly: z.string(),
      mid_range: z.string(),
      luxury: z.string(),
    }).optional(),

    // Design Components Data
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      icon: z.string().optional(),
      description: z.string().optional(),
    })).optional(),

    service_features: z.array(z.object({
      icon: z.string().optional(),
      title: z.string(),
      description: z.string(),
    })).optional(),

    delivery_timeline: z.array(z.object({
      time: z.string(),
      title: z.string(),
      description: z.string(),
      tip: z.string().optional(),
    })).optional(),

    callouts: z.array(z.object({
      variant: z.enum(['info', 'warning', 'tip', 'success']),
      title: z.string().optional(),
      content: z.string(),
    })).optional(),

    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),

    // Visual Components
    flower_recommendations: z.array(z.object({
      icon: z.string(),
      recipient: z.string(),
      description: z.string(),
      flowers: z.array(z.string()),
      colors: z.array(z.string()),
      priceRange: z.string(),
    })).optional(),

    color_meanings: z.array(z.object({
      color: z.string(),
      hex: z.string(),
      meaning: z.string(),
      emotions: z.array(z.string()),
      bestFor: z.string(),
    })).optional(),

    seasonal_guide: z.array(z.object({
      season: z.string(),
      icon: z.string(),
      months: z.string(),
      popularFlowers: z.array(z.string()),
      availability: z.enum(['Excellent', 'Good', 'Fair', 'Limited']),
      pricing: z.enum(['Budget-friendly', 'Moderate', 'Premium', 'Variable']),
      tips: z.array(z.string()),
    })).optional(),

    // Tab Content Fields
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

    // Dynamic content sections (FindFerries pattern)
    content_sections: z.array(z.object({
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
      questions: z.array(z.object({
        question: z.string(),
        answer: z.string()
      })).optional()
    })).optional(),

    // SEO
    og_image: z.string().optional(),
    keywords: z.string().optional(),
  })
});

export const collections = {
  'services': servicesCollection,
  'occasions': occasionsCollection,
};
