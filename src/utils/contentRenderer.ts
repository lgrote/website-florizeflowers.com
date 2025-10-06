// Dynamic content rendering system
// Maps content section types to their corresponding components
// Enhanced with FindFerries-style data preparation

import type { ContentSection, ValidationResult } from '../types/content';
import { getAffiliateLink } from './affiliateLinks';

// Component mapping configuration
export const SECTION_COMPONENT_MAP: Record<string, string> = {
  'overview': 'sections/dynamic/OverviewSection.astro',
  'features_grid': 'sections/dynamic/FeaturesGrid.astro',
  'assessment': 'sections/dynamic/AssessmentSection.astro',
  'quick_facts': 'sections/dynamic/QuickFacts.astro',
  'pros_cons': 'sections/ProsConsGrid.astro',
  'comparison': 'sections/ComparisonSection.astro',
  'pricing_guide': 'sections/dynamic/PricingGuide.astro',
  'faq': 'ui/AccordionFAQ.astro',
  'visual_components': 'sections/dynamic/VisualComponents.astro',
  'tab_content': 'ui/TabSection.astro',
  'content_prose': 'sections/dynamic/ContentProse.astro'
};

// Get component path for a content section type
export function getComponentPath(sectionType: string): string | null {
  return SECTION_COMPONENT_MAP[sectionType] || null;
}

// Validate and transform content sections
export function processContentSections(sections: any[]): ContentSection[] {
  if (!Array.isArray(sections)) {
    console.warn('Content sections should be an array');
    return [];
  }

  return sections
    .map(section => {
      // Validate section structure
      const validation = validateSection(section);
      if (!validation.valid) {
        console.warn(`Invalid content section:`, validation.errors);
        return null;
      }

      // Transform section data if needed
      return transformSection(section);
    })
    .filter((section): section is ContentSection => section !== null);
}

// Validate a single content section
function validateSection(section: any): ValidationResult {
  const errors: string[] = [];

  // Basic validation
  if (!section || typeof section !== 'object') {
    errors.push('Section must be an object');
    return { valid: false, errors };
  }

  if (!section.type || typeof section.type !== 'string') {
    errors.push('Section must have a type field');
  }

  if (!section.title && section.type !== 'content_prose') {
    errors.push('Section must have a title field');
  }

  // Type-specific validation
  switch (section.type) {
    case 'features_grid':
      if (!Array.isArray(section.items)) {
        errors.push('Features grid must have items array');
      }
      break;

    case 'pros_cons':
      if (!Array.isArray(section.pros) || !Array.isArray(section.cons)) {
        errors.push('Pros/cons section must have pros and cons arrays');
      }
      break;

    case 'faq':
      if (!Array.isArray(section.questions)) {
        errors.push('FAQ section must have questions array');
      }
      break;

    case 'tab_content':
      if (!Array.isArray(section.tabs)) {
        errors.push('Tab content must have tabs array');
      }
      break;

    case 'visual_components':
      if (!section.component_type || !section.data) {
        errors.push('Visual components must have component_type and data');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

// Transform section data to ensure consistency
function transformSection(section: any): ContentSection {
  // Clean up common fields
  const transformed: any = {
    type: section.type,
    title: section.title || '',
    content: section.content || undefined
  };

  // Type-specific transformations
  switch (section.type) {
    case 'overview':
      transformed.items = section.items || [];
      break;

    case 'features_grid':
      transformed.items = (section.items || []).map((item: any) => ({
        title: item.title || '',
        description: item.description || '',
        icon: item.icon || undefined
      }));
      break;

    case 'assessment':
      transformed.expert_conclusion = section.expert_conclusion;
      transformed.value_justification = section.value_justification;
      transformed.recommended_for = section.recommended_for || [];
      transformed.consider_alternatives = section.consider_alternatives || [];
      break;

    case 'quick_facts':
      transformed.facts = (section.facts || []).map((fact: any) => ({
        label: fact.label || '',
        value: fact.value || ''
      }));
      break;

    case 'pros_cons':
      transformed.pros = ensureArrayWithDescriptions(section.pros);
      transformed.cons = ensureArrayWithDescriptions(section.cons);
      break;

    case 'comparison':
      transformed.competitors = (section.competitors || []).map((comp: any) => ({
        name: comp.name || '',
        rating: comp.rating || 0,
        description: comp.description || '',
        link: comp.link || undefined
      }));
      break;

    case 'pricing_guide':
      transformed.pricing_tiers = section.pricing_tiers || [];
      break;

    case 'faq':
      transformed.questions = (section.questions || section.faqs || []).map((q: any) => ({
        question: q.question || '',
        answer: q.answer || ''
      }));
      break;

    case 'visual_components':
      transformed.component_type = section.component_type;
      transformed.data = section.data;
      break;

    case 'tab_content':
      transformed.tabs = (section.tabs || []).map((tab: any) => ({
        id: tab.id || generateId(tab.label),
        label: tab.label || '',
        content: tab.content || ''
      }));
      break;

    case 'content_prose':
      transformed.content = section.content || '';
      break;

    default:
      // Pass through unknown sections as-is
      Object.assign(transformed, section);
  }

  return transformed as ContentSection;
}

// Helper to ensure pros/cons have proper structure
function ensureArrayWithDescriptions(items: any): any[] {
  if (!Array.isArray(items)) return [];

  return items.map(item => {
    if (typeof item === 'string') {
      // Convert string to object format
      return {
        title: item,
        description: '',
        icon: undefined
      };
    }
    return {
      title: item.title || item.label || '',
      description: item.description || '',
      icon: item.icon || undefined
    };
  });
}

// Generate ID from label
function generateId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Group sections by category for rendering
export function groupSections(sections: ContentSection[]): Record<string, ContentSection[]> {
  const groups: Record<string, ContentSection[]> = {
    hero: [],
    overview: [],
    features: [],
    comparison: [],
    assessment: [],
    additional: []
  };

  sections.forEach(section => {
    switch (section.type) {
      case 'overview':
      case 'quick_facts':
        groups.overview.push(section);
        break;
      case 'features_grid':
      case 'pros_cons':
        groups.features.push(section);
        break;
      case 'comparison':
      case 'pricing_guide':
        groups.comparison.push(section);
        break;
      case 'assessment':
        groups.assessment.push(section);
        break;
      default:
        groups.additional.push(section);
    }
  });

  return groups;
}

// Check if a section should be rendered
export function shouldRenderSection(section: ContentSection): boolean {
  // Don't render empty sections
  if (!section) return false;

  // Check for required content based on type
  switch (section.type) {
    case 'features_grid':
      return Array.isArray(section.items) && section.items.length > 0;
    case 'pros_cons':
      return (Array.isArray(section.pros) && section.pros.length > 0) ||
             (Array.isArray(section.cons) && section.cons.length > 0);
    case 'faq':
      return Array.isArray(section.questions) && section.questions.length > 0;
    case 'tab_content':
      return Array.isArray(section.tabs) && section.tabs.length > 0;
    case 'content_prose':
      return !!section.content;
    default:
      return true;
  }
}

// Get section priority for ordering
export function getSectionPriority(type: string): number {
  const priorities: Record<string, number> = {
    'overview': 1,
    'quick_facts': 2,
    'features_grid': 3,
    'pros_cons': 4,
    'comparison': 5,
    'pricing_guide': 6,
    'visual_components': 7,
    'tab_content': 8,
    'faq': 9,
    'assessment': 10,
    'content_prose': 11
  };
  return priorities[type] || 99;
}

// Sort sections by priority
export function sortSectionsByPriority(sections: ContentSection[]): ContentSection[] {
  return [...sections].sort((a, b) => {
    return getSectionPriority(a.type) - getSectionPriority(b.type);
  });
}

// ===== FindFerries-style Data Preparation Functions =====

/**
 * Prepare breadcrumb items for service/occasion pages
 */
export function prepareBreadcrumbs(
  type: 'service' | 'occasion',
  name: string
): Array<{ label: string; href?: string; current?: boolean }> {
  const base = [{ label: 'Home', href: '/' }];

  if (type === 'service') {
    return [
      ...base,
      { label: 'Services', href: '/services' },
      { label: `${name} Review`, current: true }
    ];
  } else {
    return [
      ...base,
      { label: 'Occasions', href: '/occasions' },
      { label: name, current: true }
    ];
  }
}

/**
 * Prepare hero section data
 */
export async function prepareHeroData(data: any): Promise<any> {
  const affiliateUrl = await getAffiliateLink(data.service_id || data.occasion_id);

  return {
    title: data.title || data.service_name || data.occasion_name,
    subtitle: data.description,
    rating: data.rating,
    badge: data.winner_badge,
    backgroundImage: data.hero_image,
    affiliateUrl,
    ctaButtons: data.service_id ? [
      {
        text: 'Compare Services',
        href: '#comparison',
        variant: 'primary'
      },
      {
        text: `Visit ${data.service_name}`,
        href: affiliateUrl,
        variant: 'secondary'
      }
    ] : undefined
  };
}

/**
 * Generate quick facts from service/occasion data
 */
export function generateQuickFacts(
  type: 'service' | 'occasion',
  data: any
): Array<{ label: string; value: string }> {
  if (type === 'service') {
    const facts = [];

    if (data.founded) {
      facts.push({ label: 'Established', value: data.founded.toString() });
    }
    if (data.price_range) {
      facts.push({ label: 'Price Range', value: data.price_range });
    }
    if (data.delivery_options?.length > 0) {
      facts.push({ label: 'Delivery', value: data.delivery_options[0] });
    }
    if (data.rating) {
      facts.push({ label: 'Our Rating', value: `${data.rating}/5` });
    }

    return facts;
  } else {
    return [
      { label: 'Type', value: data.seasonal ? 'Seasonal' : 'Year-round' },
      { label: 'Budget Range', value: data.budget_guide?.mid_range || 'Variable' },
      { label: 'Services', value: `${data.recommended_services?.length || 0} Recommended` }
    ];
  }
}

/**
 * Prepare unified section data from flat fields
 * Transforms existing content structure to content_sections array
 */
export function prepareSectionData(data: any, type: 'service' | 'occasion' = 'service'): ContentSection[] {
  const sections: ContentSection[] = [];

  // Add existing content_sections if present
  if (data.content_sections && Array.isArray(data.content_sections)) {
    sections.push(...data.content_sections);
  } else {
    // Transform flat fields into content sections

    // Quick Facts section
    if (!sections.find(s => s.type === 'quick_facts')) {
      const facts = data.quick_facts || generateQuickFacts(type, data);
      if (facts.length > 0) {
        sections.push({
          type: 'quick_facts',
          title: 'Quick Facts',
          facts
        });
      }
    }

    // Overview section
    if (data.overview_content && !sections.find(s => s.type === 'overview')) {
      sections.push({
        type: 'overview',
        title: 'Overview',
        content: data.overview_content,
        items: data.overview_positioning ? [{
          title: data.overview_positioning,
          description: data.overview_content,
          icon: '🌟'
        }] : undefined
      });
    }

    // Features Grid (from key_features)
    if (data.key_features && data.key_features.length > 0 && !sections.find(s => s.type === 'features_grid')) {
      sections.push({
        type: 'features_grid',
        title: 'Key Features',
        items: data.key_features.map((feature: string) => ({
          title: feature,
          description: '',
          icon: '✓'
        }))
      });
    }

    // Pros & Cons section
    if (data.pros && data.cons && !sections.find(s => s.type === 'pros_cons')) {
      sections.push({
        type: 'pros_cons',
        title: `${data.pros_title || 'Strengths'} & ${data.cons_title || 'Considerations'}`,
        pros: data.pros,
        cons: data.cons
      });
    }

    // Assessment/Recommendation section
    if (data.recommendation_sections && data.recommendation_sections.length > 0) {
      sections.push({
        type: 'assessment',
        title: 'Final Recommendation',
        expert_conclusion: {
          title: 'Expert Verdict',
          content: data.recommendation_sections[0].content,
          rating_display: `${data.rating}/5`,
          subtitle: data.winner_badge
        },
        value_justification: data.recommendation_cta ? {
          title: 'Why Choose This Service',
          content: data.recommendation_sections[1]?.content || '',
          cta_text: data.recommendation_cta
        } : undefined,
        recommended_for: data.best_for ? [data.best_for] : []
      });
    }

    // FAQ section
    if (data.faqs && data.faqs.length > 0 && !sections.find(s => s.type === 'faq')) {
      sections.push({
        type: 'faq',
        title: 'Frequently Asked Questions',
        questions: data.faqs
      });
    }
  }

  return sortSectionsByPriority(sections);
}

/**
 * Get section by type - utility to find specific sections
 */
export function getSectionByType(sections: ContentSection[], type: string): ContentSection | undefined {
  return sections.find(s => s.type === type);
}

/**
 * Get multiple sections by types
 */
export function getSectionsByTypes(sections: ContentSection[], types: string[]): ContentSection[] {
  return sections.filter(s => types.includes(s.type));
}

/**
 * Prepare TOC items from content sections
 */
export function prepareTOCItems(sections: ContentSection[]): Array<{ id: string; text: string; level: number }> {
  return sections
    .filter(section => section.title)
    .map(section => ({
      id: section.type.replace(/_/g, '-'),
      text: section.title,
      level: 2
    }));
}