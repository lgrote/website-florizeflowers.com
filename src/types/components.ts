// Component prop type definitions
// Ensures type safety across all components

import type { CollectionEntry } from 'astro:content';
import type { FlowerService, FlowerOccasion, TestingMetric, PromoCode } from './flower';

// Navigation component props
export interface NavigationProps {
  currentPath?: string;
  showMobileMenu?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// Hero component props
export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  overlay?: boolean;
}

export interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  rating?: number;
  badge?: string;
  backgroundImage?: string;
}

// Card component props
export interface CardProps {
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export interface ServiceCardProps {
  service: CollectionEntry<'services'>;
  featured?: boolean;
  showFullDescription?: boolean;
}

export interface OccasionCardProps {
  occasion: CollectionEntry<'occasions'>;
  featured?: boolean;
}

// Button component props
export interface ButtonProps {
  text: string;
  href?: string;
  variant?: 'primary' | 'primary-hero' | 'secondary' | 'affiliate';
  size?: 'sm' | 'md' | 'lg';
  target?: string;
  rel?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Badge component props
export interface BadgeProps {
  text: string;
  variant?: 'default' | 'winner' | 'new' | 'sale';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Rating component props
export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumeric?: boolean;
  className?: string;
}

// Comparison component props
export interface ComparisonTableProps {
  services: CollectionEntry<'services'>[];
  features?: string[];
  highlightBest?: boolean;
  maxServices?: number;
  showViewAllButton?: boolean;
}

export interface VSComparisonProps {
  service1Name: string;
  service2Name: string;
  features: Array<{
    feature: string;
    service1: string | boolean;
    service2: string | boolean;
  }>;
  winner?: 1 | 2;
}

// Content section props
export interface QuickSummaryProps {
  bestFor: string;
  priceRange: string;
  delivery: string;
  rating: string;
  serviceName: string;
  affiliateUrl: string;
}

export interface ServiceOverviewProps {
  positioning: string;
  content: string;
  serviceName: string;
  logo?: string;
}

export interface ProsConsGridProps {
  prosTitle?: string;
  consTitle?: string;
  pros: Array<{
    label: string;
    description: string;
  }>;
  cons: Array<{
    label: string;
    description: string;
  }>;
}

// FAQ component props
export interface FAQItem {
  question: string;
  answer: string;
}

export interface AccordionFAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

// Testing metrics props
export interface TestingMetricsProps {
  metrics: TestingMetric[];
  title?: string;
}

// Promo code props
export interface PromoCodeProps {
  code: string;
  description: string;
  expiryDate?: string;
  className?: string;
}

// Best for cards props
export interface BestForScenario {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface BestForCardsProps {
  scenarios: BestForScenario[];
  title?: string;
}

// Tab section props
export interface TabItem {
  id: string;
  label: string;
  content: any; // Can be string or component
}

export interface TabSectionProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

// SEO component props
export interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalURL?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface StructuredDataProps {
  type: 'Organization' | 'Product' | 'Review' | 'FAQPage' | 'BreadcrumbList' | 'WebSite';
  data: any; // Schema.org structured data
}

// Layout props
export interface BaseLayoutProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  showBreadcrumbs?: boolean;
  structuredData?: object | object[];
}

export interface ServiceLayoutProps extends BaseLayoutProps {
  service: CollectionEntry<'services'>;
  showTOC?: boolean;
  showProgress?: boolean;
}

export interface OccasionLayoutProps extends BaseLayoutProps {
  occasion: CollectionEntry<'occasions'>;
}

// Utility component props
export interface ReadingProgressProps {
  className?: string;
}

export interface StickyTOCProps {
  items: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  className?: string;
}

export interface StickyCTAProps {
  text: string;
  href: string;
  serviceName: string;
  className?: string;
}

// Trust signals props
export interface TrustSignal {
  title: string;
  description: string;
  icon?: string;
}

export interface TrustSignalsProps {
  signals?: TrustSignal[];
  className?: string;
}

// Related content props
export interface RelatedReviewsProps {
  currentServiceId: string;
  reviews?: Array<{
    title: string;
    serviceId: string;
    description: string;
  }>;
  maxItems?: number;
}

// Affiliate banner props
export interface AffiliateBannerProps {
  title?: string;
  description?: string;
  services?: CollectionEntry<'services'>[];
  variant?: 'default' | 'compact' | 'featured';
}