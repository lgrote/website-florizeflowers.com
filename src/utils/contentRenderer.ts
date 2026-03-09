// Dynamic content rendering utilities
import type { SanityContentSection } from '../types/sanity';

/**
 * Check if a section should be rendered based on its content
 * @param section - Content section to check
 * @returns true if section has required content, false otherwise
 */
export function shouldRenderSection(section: SanityContentSection): boolean {
  if (!section) return false;

  switch (section._type) {
    case 'featuresGridSection':
      return Array.isArray(section.items) && section.items.length > 0;
    case 'prosConsSection':
      return (Array.isArray(section.pros) && section.pros.length > 0) ||
             (Array.isArray(section.cons) && section.cons.length > 0);
    case 'faqSection':
      return Array.isArray(section.questions) && section.questions.length > 0;
    case 'tabContentSection':
      return Array.isArray(section.tabs) && section.tabs.length > 0;
    case 'contentProseSection':
      return !!section.content;
    default:
      return true;
  }
}
