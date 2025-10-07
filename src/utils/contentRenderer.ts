// Dynamic content rendering utilities
import type { ContentSection } from '../types/content';

/**
 * Check if a section should be rendered based on its content
 * @param section - Content section to check
 * @returns true if section has required content, false otherwise
 */
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
