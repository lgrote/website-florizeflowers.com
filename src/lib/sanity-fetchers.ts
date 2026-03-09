import { sanityClient } from './sanity';
import {
  SERVICES_BY_LANG,
  SERVICE_BY_ID,
  OCCASIONS_BY_LANG,
  OCCASION_BY_ID,
  GUIDES_BY_LANG,
  GUIDE_BY_ID,
  PAGE_BY_SLUG,
  PAGES_BY_LANG,
  HOMEPAGE_SECTION,
  HOMEPAGE_SECTIONS_BY_LANG,
} from './sanity-queries';
import type {
  SanityService,
  SanityOccasion,
  SanityGuide,
  SanityPage,
  SanityHomepageSection,
} from '../types/sanity';

// --- Services ---

export async function getServices(lang: string): Promise<SanityService[]> {
  return sanityClient.fetch(SERVICES_BY_LANG, { lang }) || [];
}

export async function getServiceById(id: string, lang: string): Promise<SanityService | null> {
  return sanityClient.fetch(SERVICE_BY_ID, { id, lang });
}

// --- Occasions ---

export async function getOccasions(lang: string): Promise<SanityOccasion[]> {
  return sanityClient.fetch(OCCASIONS_BY_LANG, { lang }) || [];
}

export async function getOccasionById(id: string, lang: string): Promise<SanityOccasion | null> {
  return sanityClient.fetch(OCCASION_BY_ID, { id, lang });
}

// --- Guides ---

export async function getGuides(lang: string): Promise<SanityGuide[]> {
  return sanityClient.fetch(GUIDES_BY_LANG, { lang }) || [];
}

export async function getGuideById(id: string, lang: string): Promise<SanityGuide | null> {
  return sanityClient.fetch(GUIDE_BY_ID, { id, lang });
}

// --- Pages ---

export async function getPageBySlug(slug: string, lang: string): Promise<SanityPage | null> {
  return sanityClient.fetch(PAGE_BY_SLUG, { slug, lang });
}

export async function getPages(lang: string): Promise<SanityPage[]> {
  return sanityClient.fetch(PAGES_BY_LANG, { lang }) || [];
}

// --- Homepage Sections ---

export async function getHomepageSection(sectionType: string, lang: string): Promise<SanityHomepageSection | null> {
  return sanityClient.fetch(HOMEPAGE_SECTION, { sectionType, lang });
}

export async function getHomepageSections(lang: string): Promise<SanityHomepageSection[]> {
  return sanityClient.fetch(HOMEPAGE_SECTIONS_BY_LANG, { lang }) || [];
}
