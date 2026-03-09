// GROQ queries for fetching content from Sanity CMS

export const SERVICES_BY_LANG = `*[_type == "service" && language == $lang] | order(base.rating desc)`;

export const SERVICE_BY_ID = `*[_type == "service" && base.id == $id && language == $lang][0]`;

export const OCCASIONS_BY_LANG = `*[_type == "occasion" && language == $lang] | order(base.name asc)`;

export const OCCASION_BY_ID = `*[_type == "occasion" && base.id == $id && language == $lang][0]`;

export const GUIDES_BY_LANG = `*[_type == "guide" && language == $lang] | order(order asc)`;

export const GUIDE_BY_ID = `*[_type == "guide" && base.id == $id && language == $lang][0]`;

export const PAGE_BY_SLUG = `*[_type == "page" && slug.current == $slug && language == $lang][0]`;

export const PAGES_BY_LANG = `*[_type == "page" && language == $lang]`;

export const HOMEPAGE_SECTION = `*[_type == "homepageSection" && sectionType == $sectionType && language == $lang][0]`;

export const HOMEPAGE_SECTIONS_BY_LANG = `*[_type == "homepageSection" && language == $lang]`;

