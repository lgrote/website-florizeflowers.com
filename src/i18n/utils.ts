/**
 * i18n Utility Functions
 * Helper functions for internationalization
 */

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, type SupportedLanguage } from './config';
import type { CollectionEntry } from 'astro:content';

/**
 * Get language from URL pathname
 * @param url - The current URL object
 * @returns Language code (en or de)
 */
export function getLanguageFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
    ? (lang as SupportedLanguage)
    : DEFAULT_LANGUAGE;
}

/**
 * Get localized path for a given path and language
 * @param path - The base path
 * @param lang - Language code
 * @returns Localized path
 */
export function getLocalizedPath(path: string, lang: SupportedLanguage): string {
  // Always add language prefix for both languages
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `/${lang}${normalizedPath}`;
}

/**
 * Remove language prefix from path
 * @param pathname - The full pathname
 * @returns Path without language prefix
 */
export function removeLanguagePrefix(pathname: string): string {
  for (const lang of SUPPORTED_LANGUAGES) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.replace(`/${lang}`, '') || '/';
    }
  }
  return pathname;
}

/**
 * Get all alternate language links for hreflang tags
 * @param currentPath - Current page path (without language prefix)
 * @param baseUrl - Base URL of the site
 * @returns Array of alternate links
 */
export function getAlternateLinks(currentPath: string, baseUrl: string): Array<{ lang: SupportedLanguage; url: string }> {
  return SUPPORTED_LANGUAGES.map(lang => ({
    lang,
    url: `${baseUrl}${getLocalizedPath(currentPath, lang)}`,
  }));
}

/**
 * Filter collection entries by language
 * @param entries - Collection entries
 * @param lang - Language code
 * @returns Filtered entries
 */
export function getLocalizedCollection<T extends CollectionEntry<any>>(
  entries: T[],
  lang: SupportedLanguage
): T[] {
  return entries.filter(entry => entry.data.lang === lang);
}

/**
 * Format date based on locale
 * @param date - Date string or Date object
 * @param lang - Language code
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, lang: SupportedLanguage): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const locale = lang === 'de' ? 'de-DE' : 'en-GB';

  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format currency based on locale
 * Note: Keep UK pricing (£) for both languages, but format differently
 * @param amount - Amount in GBP
 * @param lang - Language code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, lang: SupportedLanguage): string {
  const locale = lang === 'de' ? 'de-DE' : 'en-GB';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

/**
 * Get language label for language switcher
 * @param lang - Language code
 * @param currentLang - Current language (for native name display)
 * @returns Language display name
 */
export function getLanguageLabel(lang: SupportedLanguage, currentLang: SupportedLanguage): string {
  const labels = {
    en: { en: 'English', de: 'Englisch' },
    de: { en: 'German', de: 'Deutsch' },
  };

  return labels[lang][currentLang];
}

/**
 * Check if a path needs language prefix
 * @param path - Path to check
 * @returns Whether path needs language handling
 */
export function isLocalizedPath(path: string): boolean {
  return !path.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|json|xml|txt)$/i);
}

/**
 * Get collection slug from URL
 * Extracts the slug from a localized or non-localized URL
 * @param pathname - Full pathname
 * @returns Slug (last segment)
 */
export function getSlugFromPathname(pathname: string): string {
  const pathWithoutLang = removeLanguagePrefix(pathname);
  const segments = pathWithoutLang.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

/**
 * Build breadcrumb path that respects language
 * @param segments - Array of breadcrumb segments with labels
 * @param lang - Current language
 * @returns Array of breadcrumb items with localized paths
 */
export function buildBreadcrumbs(
  segments: Array<{ path: string; label: string }>,
  lang: SupportedLanguage
): Array<{ path: string; label: string }> {
  return segments.map(segment => ({
    ...segment,
    path: getLocalizedPath(segment.path, lang),
  }));
}
