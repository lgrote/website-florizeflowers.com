// ============================================================================
// COMPONENT TYPES
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'affiliate';
export type ButtonSize = 'sm' | 'md' | 'lg';

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface MenuItem {
  label: string;
  href: string;
  divider?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string; // No href means current page (last item)
}

// ============================================================================
// PRICE TYPES
// ============================================================================

export type PriceRange = '£' | '££' | '£££' | '££-£££';

export interface PriceTier {
  name: 'budget' | 'mid-range' | 'luxury';
  symbol: PriceRange;
  min: number;
  max: number;
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// ============================================================================
// RATING TYPES
// ============================================================================

export interface Rating {
  value: number; // 0-5
  max: number;   // typically 5
  count?: number; // number of reviews
}

// ============================================================================
// IMAGE TYPES
// ============================================================================

export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// ============================================================================
// CTA (Call to Action) TYPES
// ============================================================================

export interface CTAButton {
  text: string;
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
}

// ============================================================================
// FILTER & SORT TYPES
// ============================================================================

export type SortOrder = 'asc' | 'desc';

export type ServiceSortField = 'rating' | 'price' | 'name';
export type OccasionSortField = 'name' | 'date';

export interface FilterOptions {
  priceRange?: PriceRange[];
  minRating?: number;
  features?: string[];
  seasonal?: boolean;
}

// ============================================================================
// GENERIC COLLECTION TYPES
// ============================================================================

export interface PaginationOptions {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
