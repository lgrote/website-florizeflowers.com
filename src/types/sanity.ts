import type { PortableTextBlock } from '@portabletext/types';

// --- Existing config types (kept for backwards compatibility) ---

export interface FlorizeConfig {
  _id: string;
  _type: 'florizeConfig';
  title?: string;
  lastUpdated?: string;
  affiliateLinks?: AffiliateLink[];
  globalHeaderTags?: GlobalHeaderTag[];
}

export interface AffiliateLink {
  serviceId: string;
  affiliateUrl?: string;
  banner?: {
    code?: string;
    description?: string;
    enabled?: boolean;
  };
  notes?: string;
}

export interface GlobalHeaderTag {
  tag: {
    code: string;
    language: 'html' | 'javascript';
  };
  description?: string;
  active?: boolean;
}

export interface AffiliateBanner {
  serviceId: string;
  htmlCode: string;
  description: string;
}

// --- Sanity Image Reference ---

export interface SanityImageRef {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// --- Shared Object Types ---

export interface SanitySeoFields {
  ogImage?: SanityImageRef;
  keywords?: string;
  datePublished?: string;
  dateModified?: string;
}

export interface SanityCtaButton {
  text: string;
  href: string;
}

export interface SanityFaqItem {
  question: string;
  answer: string;
}

export interface SanityProsConsItem {
  label: string;
  description: string;
}

export interface SanityTestingMetric {
  icon: string;
  label: string;
  value: string;
  description?: string;
}

export interface SanityBestForScenario {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface SanityFeatureComparison {
  competitorName: string;
  winner?: 'service' | 'competitor';
  features: Array<{
    feature: string;
    serviceValue: string;
    competitorValue: string;
  }>;
}

export interface SanityStat {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface SanityServiceFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface SanityDeliveryTimelineStep {
  time: string;
  title: string;
  description: string;
  tip?: string;
}

export interface SanityCallout {
  variant: 'info' | 'warning' | 'tip' | 'success';
  title?: string;
  content: string;
}

export interface SanityFlowerRecommendation {
  icon: string;
  recipient: string;
  description: string;
  flowers: string[];
  colors: string[];
  priceRange: string;
}

export interface SanityColorMeaning {
  color: string;
  hex: string;
  meaning: string;
  emotions: string[];
  bestFor: string;
}

export interface SanitySeasonalGuideSeason {
  season: string;
  icon: string;
  months: string;
  popularFlowers: string[];
  availability: 'Excellent' | 'Good' | 'Fair' | 'Limited';
  pricing: 'Budget-friendly' | 'Moderate' | 'Premium' | 'Variable';
  tips: string[];
}

export interface SanityComparison {
  competitor: string;
  category: string;
  description: string;
}

export interface SanityRecommendationSection {
  heading: string;
  content: string;
}

export interface SanityRelatedReview {
  title: string;
  serviceId: string;
  description: string;
}

export interface SanityBudgetGuide {
  budgetFriendly: string;
  midRange: string;
  luxury: string;
}

// --- Content Sections ---

export interface SanityOverviewSection {
  _type: 'overviewSection';
  _key: string;
  title: string;
  content?: string;
  items?: Array<{ title: string; description: string; icon?: string }>;
}

export interface SanityFeaturesGridSection {
  _type: 'featuresGridSection';
  _key: string;
  title: string;
  content?: string;
  items: Array<{ title: string; description: string; icon?: string }>;
}

export interface SanityAssessmentSection {
  _type: 'assessmentSection';
  _key: string;
  title: string;
  content?: string;
  expertConclusion?: {
    title: string;
    content: string;
    ratingDisplay?: string;
    subtitle?: string;
  };
  valueJustification?: {
    title: string;
    content: string;
    ctaText: string;
  };
  recommendedFor?: string[];
  considerAlternatives?: string[];
}

export interface SanityQuickFactsSection {
  _type: 'quickFactsSection';
  _key: string;
  title: string;
  content?: string;
  facts: Array<{ label: string; value: string }>;
}

export interface SanityProsConsSection {
  _type: 'prosConsSection';
  _key: string;
  title: string;
  content?: string;
  pros: Array<{ title: string; description: string; icon?: string }>;
  cons: Array<{ title: string; description: string; icon?: string }>;
}

export interface SanityComparisonSection {
  _type: 'comparisonSection';
  _key: string;
  title: string;
  content?: string;
  competitors: Array<{
    name: string;
    rating: number;
    description: string;
    link?: string;
  }>;
}

export interface SanityPricingGuideSection {
  _type: 'pricingGuideSection';
  _key: string;
  title: string;
  content?: string;
  pricingTiers: Array<{
    tier: string;
    description: string;
    priceRange?: string;
  }>;
}

export interface SanityFaqSection {
  _type: 'faqSection';
  _key: string;
  title: string;
  content?: string;
  questions: SanityFaqItem[];
}

export interface SanityVisualComponentsSection {
  _type: 'visualComponentsSection';
  _key: string;
  title: string;
  content?: string;
  componentType: 'flower_recommendations' | 'color_meanings' | 'seasonal_guide';
  flowerRecommendations?: SanityFlowerRecommendation[];
  colorMeanings?: SanityColorMeaning[];
  seasonalGuide?: SanitySeasonalGuideSeason[];
}

export interface SanityTabContentSection {
  _type: 'tabContentSection';
  _key: string;
  title: string;
  content?: string;
  tabs: Array<{ id: string; label: string; content: string }>;
}

export interface SanityContentProseSection {
  _type: 'contentProseSection';
  _key: string;
  title: string;
  content: PortableTextBlock[];
}

export type SanityContentSection =
  | SanityOverviewSection
  | SanityFeaturesGridSection
  | SanityAssessmentSection
  | SanityQuickFactsSection
  | SanityProsConsSection
  | SanityComparisonSection
  | SanityPricingGuideSection
  | SanityFaqSection
  | SanityVisualComponentsSection
  | SanityTabContentSection
  | SanityContentProseSection;

// --- Document Types ---

export interface SanityService {
  _id: string;
  _type: 'service';
  language: string;
  base: {
    id: string;
    name: string;
    title: string;
    description: string;
    logo?: SanityImageRef;
    heroImage?: SanityImageRef;
    rating: number;
    priceRange: string;
    winnerBadge?: string;
    deliveryOptions: string[];
    keyFeatures: string[];
    founded?: number;
  };
  seo?: SanitySeoFields;
  summary?: {
    bestFor?: string;
    delivery?: string;
    ratingText?: string;
  };
  overview?: {
    positioning?: string;
    content?: PortableTextBlock[];
  };
  components?: {
    prosTitle?: string;
    consTitle?: string;
    pros?: SanityProsConsItem[];
    cons?: SanityProsConsItem[];
    faqs?: SanityFaqItem[];
    testingMetrics?: SanityTestingMetric[];
    bestForScenarios?: SanityBestForScenario[];
    featureComparison?: SanityFeatureComparison;
  };
  affiliate?: {
    url?: string;
    promoCode?: {
      code: string;
      description: string;
      expiryDate?: string;
    };
  };
  comparisons?: {
    items?: SanityComparison[];
    useCases?: {
      heading: string;
      scenarios: Array<{ label: string; description: string }>;
    };
  };
  recommendations?: {
    sections?: SanityRecommendationSection[];
    cta?: string;
  };
  related?: {
    heading?: string;
    reviews?: SanityRelatedReview[];
  };
  contentSections?: SanityContentSection[];
  body?: PortableTextBlock[];
}

export interface SanityOccasion {
  _id: string;
  _type: 'occasion';
  language: string;
  base: {
    id: string;
    name: string;
    title: string;
    description: string;
    heroImage: SanityImageRef;
    icon?: string;
    seasonal: boolean;
    typicalDate?: string;
  };
  seo?: SanitySeoFields;
  recommendations: {
    services: string[];
    flowers: Array<{ flower: string; reason: string }>;
    budgetGuide?: SanityBudgetGuide;
  };
  components?: {
    stats?: SanityStat[];
    serviceFeatures?: SanityServiceFeature[];
    deliveryTimeline?: SanityDeliveryTimelineStep[];
    callouts?: SanityCallout[];
    faqs?: SanityFaqItem[];
    flowerRecommendations?: SanityFlowerRecommendation[];
    colorMeanings?: SanityColorMeaning[];
    seasonalGuide?: SanitySeasonalGuideSeason[];
  };
  tabs?: {
    giftEnhancements?: Array<{ item: string; description: string; priceRange: string }>;
    cardMessages?: Array<{ recipient: string; message: string }>;
    specialScenarios?: Array<{ title: string; icon?: string; tips: string[] }>;
    deliveryLocations?: Array<{ location: string; tips: string[] }>;
    costSavingTips?: string[];
  };
  contentSections?: SanityContentSection[];
  body?: PortableTextBlock[];
}

export interface SanityGuide {
  _id: string;
  _type: 'guide';
  language: string;
  base: {
    id: string;
    name: string;
  };
  title: string;
  description: string;
  category: string;
  icon?: string;
  order?: number;
  tips?: string[];
  body?: PortableTextBlock[];
}

export interface SanityPage {
  _id: string;
  _type: 'page';
  language: string;
  title: string;
  description: string;
  slug: { current: string };
  seo?: SanitySeoFields;
  hero?: {
    title: string;
    subtitle: string;
    primaryCta?: SanityCtaButton;
    secondaryCta?: SanityCtaButton;
    backgroundImage?: SanityImageRef;
  };
  intro?: {
    heading: string;
    paragraph: string;
  };
  sections?: {
    main?: string;
    services?: string;
    occasions?: string;
    legal?: string;
  };
  tips?: Array<{ title: string; content: string }>;
  labels?: {
    seasonal?: string;
    popularFlowers?: string;
    from?: string;
    viewGuide?: string;
    cantFind?: string;
    contactHelp?: string;
  };
  body?: PortableTextBlock[];
}

export interface SanityHomepageSection {
  _id: string;
  _type: 'homepageSection';
  language: string;
  sectionType: string;
  title: string;
  description?: string;
  keywords?: string;
  cards?: Array<{
    title: string;
    description: string;
    image?: SanityImageRef;
    imageAlt?: string;
    icon?: string;
  }>;
  paragraphs?: string[];
  footerText?: string;
  subtitle?: string;
  backgroundImage?: SanityImageRef;
  primaryCta?: SanityCtaButton;
  secondaryCta?: SanityCtaButton;
  recommendations?: SanityRecommendationItem[];
  updates?: Array<{
    title: string;
    description: string;
    image?: SanityImageRef;
    imageAlt: string;
    order?: number;
  }>;
}

export interface SanityRecommendationItem {
  title: string;
  description: string;
  serviceId: string;
  category?: string;
  order?: number;
  ctaText: string;
  column?: 'left' | 'right';
}

