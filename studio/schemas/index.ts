import florizeConfig from './florizeConfig';

// Object schemas
import seoFields from './objects/seoFields';
import ctaButton from './objects/ctaButton';
import faqItem from './objects/faqItem';
import prosConsItem from './objects/prosConsItem';
import testingMetric from './objects/testingMetric';
import bestForScenario from './objects/bestForScenario';
import featureComparison from './objects/featureComparison';
import stat from './objects/stat';
import serviceFeature from './objects/serviceFeature';
import deliveryTimelineStep from './objects/deliveryTimelineStep';
import callout from './objects/callout';
import flowerRecommendation from './objects/flowerRecommendation';
import colorMeaning from './objects/colorMeaning';
import seasonalGuideSeason from './objects/seasonalGuideSeason';
import comparison from './objects/comparison';
import recommendationSection from './objects/recommendationSection';
import relatedReview from './objects/relatedReview';
import budgetGuide from './objects/budgetGuide';

// Section schemas
import overviewSection from './objects/sections/overviewSection';
import featuresGridSection from './objects/sections/featuresGridSection';
import assessmentSection from './objects/sections/assessmentSection';
import quickFactsSection from './objects/sections/quickFactsSection';
import prosConsSection from './objects/sections/prosConsSection';
import comparisonSection from './objects/sections/comparisonSection';
import pricingGuideSection from './objects/sections/pricingGuideSection';
import faqSection from './objects/sections/faqSection';
import visualComponentsSection from './objects/sections/visualComponentsSection';
import tabContentSection from './objects/sections/tabContentSection';
import contentProseSection from './objects/sections/contentProseSection';

// Document schemas
import service from './documents/service';
import occasion from './documents/occasion';
import guide from './documents/guide';
import page from './documents/page';
import update from './documents/update';
import homepageSection from './documents/homepageSection';

export const schemaTypes = [
  // Existing
  florizeConfig,

  // Objects
  seoFields,
  ctaButton,
  faqItem,
  prosConsItem,
  testingMetric,
  bestForScenario,
  featureComparison,
  stat,
  serviceFeature,
  deliveryTimelineStep,
  callout,
  flowerRecommendation,
  colorMeaning,
  seasonalGuideSeason,
  comparison,
  recommendationSection,
  relatedReview,
  budgetGuide,

  // Sections
  overviewSection,
  featuresGridSection,
  assessmentSection,
  quickFactsSection,
  prosConsSection,
  comparisonSection,
  pricingGuideSection,
  faqSection,
  visualComponentsSection,
  tabContentSection,
  contentProseSection,

  // Documents
  service,
  occasion,
  guide,
  page,
  update,
  homepageSection,
];
