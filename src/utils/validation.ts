// Runtime validation utilities for content and data

import type { ContentSection } from '../types/content';
import type { FlowerService, FlowerOccasion } from '../types/flower';

// Validation result type
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

// Validation rule type
export type ValidationRule<T> = (value: T) => ValidationResult;

// Common validation functions
export const validators = {
  // String validations
  isNonEmptyString: (value: any): boolean => {
    return typeof value === 'string' && value.trim().length > 0;
  },

  isUrl: (value: any): boolean => {
    if (typeof value !== 'string') return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  isEmail: (value: any): boolean => {
    if (typeof value !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  // Number validations
  isPositiveNumber: (value: any): boolean => {
    return typeof value === 'number' && value > 0;
  },

  isInRange: (value: any, min: number, max: number): boolean => {
    return typeof value === 'number' && value >= min && value <= max;
  },

  // Array validations
  isNonEmptyArray: (value: any): boolean => {
    return Array.isArray(value) && value.length > 0;
  },

  hasMinLength: (value: any[], minLength: number): boolean => {
    return Array.isArray(value) && value.length >= minLength;
  },

  // Object validations
  hasRequiredFields: (obj: any, fields: string[]): boolean => {
    if (!obj || typeof obj !== 'object') return false;
    return fields.every(field => field in obj);
  }
};

// Validate flower service data
export function validateFlowerService(service: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!validators.isNonEmptyString(service.id)) {
    errors.push('Service ID is required');
  }

  if (!validators.isNonEmptyString(service.name)) {
    errors.push('Service name is required');
  }

  if (!validators.isNonEmptyString(service.description)) {
    errors.push('Service description is required');
  }

  // Rating validation
  if (!validators.isInRange(service.rating, 0, 5)) {
    errors.push('Service rating must be between 0 and 5');
  }

  // Price range validation
  if (!validators.isNonEmptyString(service.price_range)) {
    warnings.push('Service price range is recommended');
  }

  // Arrays validation
  if (service.delivery_options && !Array.isArray(service.delivery_options)) {
    errors.push('Delivery options must be an array');
  }

  if (service.key_features && !Array.isArray(service.key_features)) {
    errors.push('Key features must be an array');
  }

  // Pros and cons validation
  if (service.pros) {
    if (!Array.isArray(service.pros)) {
      errors.push('Pros must be an array');
    } else {
      service.pros.forEach((pro: any, index: number) => {
        if (!pro.label || !pro.description) {
          errors.push(`Pro at index ${index} must have label and description`);
        }
      });
    }
  }

  if (service.cons) {
    if (!Array.isArray(service.cons)) {
      errors.push('Cons must be an array');
    } else {
      service.cons.forEach((con: any, index: number) => {
        if (!con.label || !con.description) {
          errors.push(`Con at index ${index} must have label and description`);
        }
      });
    }
  }

  // URL validation
  if (service.website && !validators.isUrl(service.website)) {
    warnings.push('Service website should be a valid URL');
  }

  if (service.affiliate_url && !validators.isUrl(service.affiliate_url)) {
    errors.push('Affiliate URL must be a valid URL');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

// Validate flower occasion data
export function validateFlowerOccasion(occasion: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!validators.isNonEmptyString(occasion.id)) {
    errors.push('Occasion ID is required');
  }

  if (!validators.isNonEmptyString(occasion.name)) {
    errors.push('Occasion name is required');
  }

  if (!validators.isNonEmptyString(occasion.description)) {
    errors.push('Occasion description is required');
  }

  // Boolean validation
  if (typeof occasion.seasonal !== 'boolean') {
    warnings.push('Seasonal flag should be a boolean');
  }

  // Arrays validation
  if (!validators.isNonEmptyArray(occasion.recommended_services)) {
    warnings.push('Recommended services should not be empty');
  }

  if (!validators.isNonEmptyArray(occasion.recommended_flowers)) {
    warnings.push('Recommended flowers should not be empty');
  } else {
    occasion.recommended_flowers.forEach((flower: any, index: number) => {
      if (!flower.flower || !flower.reason) {
        errors.push(`Recommended flower at index ${index} must have flower and reason`);
      }
    });
  }

  // Budget guide validation
  if (occasion.budget_guide) {
    const requiredBudgetFields = ['budget_friendly', 'mid_range', 'luxury'];
    if (!validators.hasRequiredFields(occasion.budget_guide, requiredBudgetFields)) {
      warnings.push('Budget guide should have all price tiers');
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

// Validate content section
export function validateContentSection(section: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic validation
  if (!section.type) {
    errors.push('Content section must have a type');
  }

  if (!section.title && section.type !== 'content_prose') {
    warnings.push('Content section should have a title');
  }

  // Type-specific validation
  switch (section.type) {
    case 'features_grid':
      if (!validators.isNonEmptyArray(section.items)) {
        errors.push('Features grid must have items');
      }
      break;

    case 'pros_cons':
      if (!section.pros || !section.cons) {
        errors.push('Pros/cons section must have both pros and cons');
      }
      break;

    case 'faq':
      if (!validators.isNonEmptyArray(section.questions)) {
        errors.push('FAQ section must have questions');
      } else {
        section.questions.forEach((q: any, index: number) => {
          if (!q.question || !q.answer) {
            errors.push(`FAQ question at index ${index} must have question and answer`);
          }
        });
      }
      break;

    case 'comparison':
      if (!validators.isNonEmptyArray(section.competitors)) {
        errors.push('Comparison section must have competitors');
      }
      break;

    case 'assessment':
      if (!section.expert_conclusion && !section.value_justification) {
        warnings.push('Assessment should have expert conclusion or value justification');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

// Validate SEO metadata
export function validateSEOMetadata(meta: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Title validation
  if (!validators.isNonEmptyString(meta.title)) {
    errors.push('Page title is required');
  } else if (meta.title.length > 60) {
    warnings.push('Page title should be under 60 characters for optimal SEO');
  }

  // Description validation
  if (!validators.isNonEmptyString(meta.description)) {
    errors.push('Page description is required');
  } else if (meta.description.length > 160) {
    warnings.push('Page description should be under 160 characters for optimal SEO');
  }

  // Keywords validation
  if (meta.keywords && typeof meta.keywords === 'string') {
    const keywordCount = meta.keywords.split(',').length;
    if (keywordCount > 10) {
      warnings.push('Avoid using more than 10 keywords');
    }
  }

  // Open Graph validation
  if (meta.ogImage && !validators.isUrl(meta.ogImage) && !meta.ogImage.startsWith('/')) {
    warnings.push('OG image should be a valid URL or absolute path');
  }

  // Canonical URL validation
  if (meta.canonicalURL && !validators.isUrl(meta.canonicalURL)) {
    errors.push('Canonical URL must be a valid URL');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

// Batch validation helper
export function validateBatch<T>(
  items: T[],
  validator: (item: T) => ValidationResult
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  items.forEach((item, index) => {
    const result = validator(item);
    if (result.errors) {
      allErrors.push(...result.errors.map(e => `Item ${index}: ${e}`));
    }
    if (result.warnings) {
      allWarnings.push(...result.warnings.map(w => `Item ${index}: ${w}`));
    }
  });

  return {
    valid: allErrors.length === 0,
    errors: allErrors.length > 0 ? allErrors : undefined,
    warnings: allWarnings.length > 0 ? allWarnings : undefined
  };
}

// Create custom validator
export function createValidator<T>(rules: ValidationRule<T>[]): ValidationRule<T> {
  return (value: T): ValidationResult => {
    const allErrors: string[] = [];
    const allWarnings: string[] = [];

    for (const rule of rules) {
      const result = rule(value);
      if (result.errors) allErrors.push(...result.errors);
      if (result.warnings) allWarnings.push(...result.warnings);
    }

    return {
      valid: allErrors.length === 0,
      errors: allErrors.length > 0 ? allErrors : undefined,
      warnings: allWarnings.length > 0 ? allWarnings : undefined
    };
  };
}