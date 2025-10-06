// SEO Utilities
export {
  generateServiceSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  formatMetaDescription,
  generateCanonicalUrl,
  generateOgImage,
  generateKeywords,
  generateTwitterCard,
  generateOpenGraph,
  VERIFICATION_TAGS
} from './seo';

// Service Data Utilities
export type { Service } from './serviceData';
export {
  getTopServices,
  sortServicesByRating,
  sortServicesByPrice,
  getServicesByPriceCategory,
  getServiceById,
  getServicesByFeature,
  getServicesForUseCase,
  getAwardWinners,
  searchServices,
  getServiceCountByPrice
} from './serviceData';

// Occasion Data Utilities
export type { Occasion } from './occasionData';
export {
  getAllOccasions,
  getSeasonalOccasions,
  getEvergreenOccasions,
  getOccasionsByMonth,
  getUpcomingOccasions,
  getOccasionById,
  getOccasionsByService,
  getOccasionsByBudget,
  getOccasionsByFlower,
  searchOccasions,
  getPopularOccasions,
  getOccasionCountByType
} from './occasionData';

// Design System
export {
  colors,
  typography,
  spacing,
  breakpoints,
  container,
  borderRadius,
  boxShadow,
  zIndex,
  transitions,
  components,
  getColor,
  getSpacing,
  hexToRgb,
  rgba
} from './design-system';
