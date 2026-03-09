#!/usr/bin/env node

/**
 * Migration script: Astro Content Collections → Sanity CMS
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/migrate-to-sanity.mjs [--dry-run] [--images-only] [--content-only]
 *
 * Requires a Sanity write token with editor permissions.
 */

import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src/content');
const IMAGES_DIR = path.join(ROOT, 'public/images');

// --- Config ---
const PROJECT_ID = 'vm53xzke';
const DATASET = 'production';
const API_VERSION = '2024-01-01';
const DRY_RUN = process.argv.includes('--dry-run');
const IMAGES_ONLY = process.argv.includes('--images-only');
const CONTENT_ONLY = process.argv.includes('--content-only');

const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error('Error: SANITY_API_TOKEN environment variable required (or use --dry-run)');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
});

// --- Image assets excluded from upload (favicons, brand) ---
const EXCLUDED_IMAGES = new Set([
  'florize-android-chrome-192x192.png',
  'florize-android-chrome-512x512.png',
  'florize-apple-touch-icon.png',
  'florize-favicon-16x16.png',
  'florize-favicon-32x32.png',
  'florize-icon.svg',
  'florize-og-image.png',
  'florizeflowers-logo-white.svg',
  'florizeflowers-logo.jpeg',
  'florizeflowers-logo.svg',
]);

// --- Helpers ---

function readMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return matter(raw);
}

function getAllFiles(dir, ext = '.md') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

function getImageFiles(dir) {
  const results = [];
  const exts = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getImageFiles(fullPath));
    } else if (exts.some(e => entry.name.toLowerCase().endsWith(e))) {
      if (!EXCLUDED_IMAGES.has(entry.name)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Convert markdown string to Portable Text blocks.
 * Uses a simple approach: parse markdown to HTML, then convert HTML to blocks.
 */
function markdownToPortableText(markdown) {
  if (!markdown || !markdown.trim()) return [];

  // Simple markdown → HTML conversion (handles common patterns)
  let html = markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p>')
    // Wrap remaining text in paragraphs
    ;

  // Wrap list items in ul tags
  html = html.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/gs, '<ul>$1</ul>');

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  return htmlToPortableText(html);
}

/**
 * Convert HTML string to Portable Text blocks.
 */
function htmlToPortableText(html) {
  if (!html || !html.trim()) return [];

  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`);
  const doc = dom.window.document;
  const body = doc.body;
  const blocks = [];

  function processInlineChildren(node) {
    const children = [];
    const markDefs = [];

    function walk(el, marks = []) {
      for (const child of el.childNodes) {
        if (child.nodeType === 3) { // Text node
          const text = child.textContent;
          if (text) {
            children.push({
              _type: 'span',
              _key: generateKey(),
              text,
              marks: [...marks],
            });
          }
        } else if (child.nodeType === 1) { // Element
          const tag = child.tagName.toLowerCase();
          if (tag === 'strong' || tag === 'b') {
            walk(child, [...marks, 'strong']);
          } else if (tag === 'em' || tag === 'i') {
            walk(child, [...marks, 'em']);
          } else if (tag === 'a') {
            const key = generateKey();
            markDefs.push({
              _type: 'link',
              _key: key,
              href: child.getAttribute('href') || '',
            });
            walk(child, [...marks, key]);
          } else {
            walk(child, marks);
          }
        }
      }
    }

    walk(node);
    return { children, markDefs };
  }

  for (const node of body.childNodes) {
    if (node.nodeType === 3) { // Text node
      const text = node.textContent?.trim();
      if (text) {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
        });
      }
    } else if (node.nodeType === 1) { // Element
      const tag = node.tagName.toLowerCase();

      if (tag === 'p') {
        const { children, markDefs } = processInlineChildren(node);
        if (children.length > 0) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            markDefs,
            children,
          });
        }
      } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        const { children, markDefs } = processInlineChildren(node);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: tag,
          markDefs,
          children,
        });
      } else if (tag === 'ul' || tag === 'ol') {
        const listStyle = tag === 'ul' ? 'bullet' : 'number';
        for (const li of node.querySelectorAll('li')) {
          const { children, markDefs } = processInlineChildren(li);
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listStyle,
            level: 1,
            markDefs,
            children,
          });
        }
      } else if (tag === 'blockquote') {
        const { children, markDefs } = processInlineChildren(node);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'blockquote',
          markDefs,
          children,
        });
      } else {
        // Fallback: treat as paragraph
        const { children, markDefs } = processInlineChildren(node);
        if (children.length > 0) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            markDefs,
            children,
          });
        }
      }
    }
  }

  return blocks;
}

let keyCounter = 0;
function generateKey() {
  return `k${(keyCounter++).toString(36).padStart(6, '0')}`;
}

// ============================================================================
// IMAGE UPLOAD
// ============================================================================

/** @type {Map<string, {_type: 'image', asset: {_type: 'reference', _ref: string}}>} */
const imageMap = new Map();

async function uploadImages() {
  const imageFiles = getImageFiles(IMAGES_DIR);
  console.log(`\nFound ${imageFiles.length} content images to upload`);

  for (const filePath of imageFiles) {
    const relativePath = '/' + path.relative(ROOT + '/public', filePath);

    if (DRY_RUN) {
      console.log(`  [dry-run] Would upload: ${relativePath}`);
      imageMap.set(relativePath, {
        _type: 'image',
        asset: { _type: 'reference', _ref: `image-dry-run-${path.basename(filePath)}` },
      });
      continue;
    }

    try {
      const stream = fs.createReadStream(filePath);
      const asset = await client.assets.upload('image', stream, {
        filename: path.basename(filePath),
      });
      imageMap.set(relativePath, {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      });
      console.log(`  ✓ Uploaded: ${relativePath} → ${asset._id}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${relativePath}:`, err.message);
    }
  }

  console.log(`Uploaded ${imageMap.size} images`);
}

function resolveImage(imagePath) {
  if (!imagePath) return undefined;
  return imageMap.get(imagePath) || undefined;
}

// ============================================================================
// CONTENT MIGRATION
// ============================================================================

function makeDocId(type, lang, slug) {
  return `${type}-${lang}-${slug}`;
}

function extractLangSlug(filePath, collectionDir) {
  const rel = path.relative(collectionDir, filePath);
  const parts = rel.split(path.sep);
  const lang = parts[0]; // en or de
  const slug = parts[1].replace('.md', '');
  return { lang, slug };
}

// --- Services ---
async function migrateServices() {
  const dir = path.join(CONTENT_DIR, 'services');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} service files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('service', lang, data.base?.id || slug);

    const doc = {
      _id: id,
      _type: 'service',
      language: lang,
      base: {
        id: data.base?.id,
        name: data.base?.name,
        title: data.base?.title,
        description: data.base?.description,
        logo: resolveImage(data.base?.logo_path),
        heroImage: resolveImage(data.base?.hero_image),
        rating: data.base?.rating,
        priceRange: data.base?.price_range,
        winnerBadge: data.base?.winner_badge,
        deliveryOptions: data.base?.delivery_options,
        keyFeatures: data.base?.key_features,
        founded: data.base?.founded,
      },
      seo: data.seo ? {
        _type: 'seoFields',
        keywords: data.seo.keywords,
        datePublished: data.seo.date_published,
        dateModified: data.seo.date_modified,
      } : undefined,
      summary: data.summary ? {
        bestFor: data.summary.best_for,
        delivery: data.summary.delivery,
        ratingText: data.summary.rating_text,
      } : undefined,
      overview: data.overview ? {
        positioning: data.overview.positioning,
        content: data.overview.content ? htmlToPortableText(data.overview.content) : undefined,
      } : undefined,
      components: data.components ? {
        prosTitle: data.components.pros_title,
        consTitle: data.components.cons_title,
        pros: data.components.pros,
        cons: data.components.cons,
        faqs: data.components.faqs,
        testingMetrics: data.components.testing_metrics?.map(m => ({
          icon: m.icon,
          label: m.label,
          value: m.value,
          description: m.description,
        })),
        bestForScenarios: data.components.best_for_scenarios?.map(s => ({
          icon: s.icon,
          title: s.title,
          description: s.description,
          highlight: s.highlight,
        })),
        featureComparison: data.components.feature_comparison ? {
          _type: 'featureComparison',
          competitorName: data.components.feature_comparison.competitor_name,
          winner: data.components.feature_comparison.winner,
          features: data.components.feature_comparison.features?.map(f => ({
            feature: f.feature,
            serviceValue: String(f.service_value),
            competitorValue: String(f.competitor_value),
          })),
        } : undefined,
      } : undefined,
      affiliate: data.affiliate ? {
        url: data.affiliate.url,
        promoCode: data.affiliate.promo_code ? {
          code: data.affiliate.promo_code.code,
          description: data.affiliate.promo_code.description,
          expiryDate: data.affiliate.promo_code.expiry_date,
        } : undefined,
      } : undefined,
      comparisons: data.comparisons ? {
        items: data.comparisons.items,
        useCases: data.comparisons.use_cases ? {
          heading: data.comparisons.use_cases.heading,
          scenarios: data.comparisons.use_cases.scenarios,
        } : undefined,
      } : undefined,
      recommendations: data.recommendations ? {
        sections: data.recommendations.sections,
        cta: data.recommendations.cta,
      } : undefined,
      related: data.related ? {
        heading: data.related.heading,
        reviews: data.related.reviews,
      } : undefined,
      contentSections: data.content_sections?.map(mapContentSection),
      body: markdownToPortableText(content),
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Occasions ---
async function migrateOccasions() {
  const dir = path.join(CONTENT_DIR, 'occasions');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} occasion files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('occasion', lang, data.base?.id || slug);

    const doc = {
      _id: id,
      _type: 'occasion',
      language: lang,
      base: {
        id: data.base?.id,
        name: data.base?.name,
        title: data.base?.title,
        description: data.base?.description,
        heroImage: resolveImage(data.base?.hero_image),
        icon: data.base?.icon,
        seasonal: data.base?.seasonal,
        typicalDate: data.base?.typical_date,
      },
      seo: data.seo ? {
        _type: 'seoFields',
        keywords: data.seo.keywords,
        datePublished: data.seo.date_published,
        dateModified: data.seo.date_modified,
      } : undefined,
      recommendations: data.recommendations ? {
        services: data.recommendations.services,
        flowers: data.recommendations.flowers,
        budgetGuide: data.recommendations.budget_guide ? {
          _type: 'budgetGuide',
          budgetFriendly: data.recommendations.budget_guide.budget_friendly,
          midRange: data.recommendations.budget_guide.mid_range,
          luxury: data.recommendations.budget_guide.luxury,
        } : undefined,
      } : undefined,
      components: data.components ? {
        stats: data.components.stats,
        serviceFeatures: data.components.service_features,
        deliveryTimeline: data.components.delivery_timeline,
        callouts: data.components.callouts,
        faqs: data.components.faqs,
        flowerRecommendations: data.components.flower_recommendations,
        colorMeanings: data.components.color_meanings?.map(cm => ({
          color: cm.color,
          hex: cm.hex,
          meaning: cm.meaning,
          emotions: cm.emotions,
          bestFor: cm.bestFor,
        })),
        seasonalGuide: data.components.seasonal_guide?.map(sg => ({
          season: sg.season,
          icon: sg.icon,
          months: sg.months,
          popularFlowers: sg.popularFlowers,
          availability: sg.availability,
          pricing: sg.pricing,
          tips: sg.tips,
        })),
      } : undefined,
      tabs: data.tabs ? {
        giftEnhancements: data.tabs.gift_enhancements,
        cardMessages: data.tabs.card_messages,
        specialScenarios: data.tabs.special_scenarios,
        deliveryLocations: data.tabs.delivery_locations,
        costSavingTips: data.tabs.cost_saving_tips,
      } : undefined,
      contentSections: data.content_sections?.map(mapContentSection),
      body: markdownToPortableText(content),
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Guides ---
async function migrateGuides() {
  const dir = path.join(CONTENT_DIR, 'guides');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} guide files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('guide', lang, data.base?.id || slug);

    const doc = {
      _id: id,
      _type: 'guide',
      language: lang,
      base: {
        id: data.base?.id,
        name: data.base?.name,
      },
      title: data.title,
      description: data.description,
      category: data.category,
      icon: data.icon,
      order: data.order,
      tips: data.tips,
      body: markdownToPortableText(content),
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Pages ---
async function migratePages() {
  const dir = path.join(CONTENT_DIR, 'pages');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} page files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('page', lang, slug);

    const doc = {
      _id: id,
      _type: 'page',
      language: lang,
      title: data.title,
      description: data.description,
      slug: { _type: 'slug', current: slug },
      seo: data.seo ? {
        _type: 'seoFields',
        keywords: data.seo.keywords,
        datePublished: data.seo.date_published,
        dateModified: data.seo.date_modified,
      } : undefined,
      hero: data.hero ? {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        primaryCta: data.hero.primaryCta ? {
          _type: 'ctaButton',
          text: data.hero.primaryCta.text,
          href: data.hero.primaryCta.href,
        } : undefined,
        secondaryCta: data.hero.secondaryCta ? {
          _type: 'ctaButton',
          text: data.hero.secondaryCta.text,
          href: data.hero.secondaryCta.href,
        } : undefined,
        backgroundImage: resolveImage(data.hero.backgroundImage),
      } : undefined,
      intro: data.intro,
      sections: data.sections,
      tips: data.tips,
      labels: data.labels,
      body: markdownToPortableText(content),
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Recommendations ---
async function migrateRecommendations() {
  const dir = path.join(CONTENT_DIR, 'recommendations');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} recommendation files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('recommendation', lang, slug);

    const doc = {
      _id: id,
      _type: 'recommendation',
      language: lang,
      title: data.title,
      description: data.description,
      serviceId: data.serviceId,
      category: data.category,
      order: data.order,
      ctaText: data.ctaText,
      column: data.column,
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Updates ---
async function migrateUpdates() {
  const dir = path.join(CONTENT_DIR, 'updates');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} update files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('update', lang, slug);

    const doc = {
      _id: id,
      _type: 'update',
      language: lang,
      title: data.title,
      description: data.description,
      image: resolveImage(data.image),
      imageAlt: data.imageAlt,
      publishedDate: data.publishedDate,
      order: data.order,
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Homepage Sections ---
async function migrateHomepageSections() {
  const dir = path.join(CONTENT_DIR, 'homepage-sections');
  const files = getAllFiles(dir);
  console.log(`\nMigrating ${files.length} homepage section files...`);

  for (const file of files) {
    const { lang, slug } = extractLangSlug(file, dir);
    const { data, content } = readMarkdownFile(file);
    const id = makeDocId('homepageSection', lang, slug);

    const doc = {
      _id: id,
      _type: 'homepageSection',
      language: lang,
      sectionType: data.sectionType,
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      cards: data.cards?.map(card => ({
        title: card.title,
        description: card.description,
        image: resolveImage(card.image),
        imageAlt: card.imageAlt,
        icon: card.icon,
      })),
      paragraphs: data.paragraphs,
      footerText: data.footerText,
      subtitle: data.subtitle,
      backgroundImage: resolveImage(data.backgroundImage),
      primaryCta: data.primaryCta ? {
        _type: 'ctaButton',
        text: data.primaryCta.text,
        href: data.primaryCta.href,
      } : undefined,
      secondaryCta: data.secondaryCta ? {
        _type: 'ctaButton',
        text: data.secondaryCta.text,
        href: data.secondaryCta.href,
      } : undefined,
    };

    await createOrReplaceDoc(doc);
  }
}

// --- Content Section Mapper ---
function mapContentSection(section) {
  if (!section) return null;

  const base = {
    _key: generateKey(),
    title: section.title,
    content: section.content,
  };

  switch (section.type) {
    case 'overview':
      return { ...base, _type: 'overviewSection', items: section.items };
    case 'features_grid':
      return { ...base, _type: 'featuresGridSection', items: section.items };
    case 'assessment':
      return {
        ...base,
        _type: 'assessmentSection',
        expertConclusion: section.expert_conclusion ? {
          title: section.expert_conclusion.title,
          content: section.expert_conclusion.content,
          ratingDisplay: section.expert_conclusion.rating_display,
          subtitle: section.expert_conclusion.subtitle,
        } : undefined,
        valueJustification: section.value_justification ? {
          title: section.value_justification.title,
          content: section.value_justification.content,
          ctaText: section.value_justification.cta_text,
        } : undefined,
        recommendedFor: section.recommended_for,
        considerAlternatives: section.consider_alternatives,
      };
    case 'quick_facts':
      return { ...base, _type: 'quickFactsSection', facts: section.facts };
    case 'pros_cons':
      return { ...base, _type: 'prosConsSection', pros: section.pros, cons: section.cons };
    case 'comparison':
      return { ...base, _type: 'comparisonSection', competitors: section.competitors };
    case 'pricing_guide':
      return { ...base, _type: 'pricingGuideSection', pricingTiers: section.pricing_tiers };
    case 'faq':
      return { ...base, _type: 'faqSection', questions: section.questions };
    case 'visual_components':
      return {
        ...base,
        _type: 'visualComponentsSection',
        componentType: section.component_type,
        flowerRecommendations: section.component_type === 'flower_recommendations' ? section.data : undefined,
        colorMeanings: section.component_type === 'color_meanings' ? section.data : undefined,
        seasonalGuide: section.component_type === 'seasonal_guide' ? section.data : undefined,
      };
    case 'tab_content':
      return { ...base, _type: 'tabContentSection', tabs: section.tabs };
    case 'content_prose':
      return { ...base, _type: 'contentProseSection', content: markdownToPortableText(section.content) };
    default:
      console.warn(`  Unknown section type: ${section.type}`);
      return null;
  }
}

// --- Document creation ---
async function createOrReplaceDoc(doc) {
  // Remove undefined values recursively
  const cleaned = JSON.parse(JSON.stringify(doc));

  if (DRY_RUN) {
    console.log(`  [dry-run] Would create: ${cleaned._id} (${cleaned._type})`);
    return;
  }

  try {
    await client.createOrReplace(cleaned);
    console.log(`  ✓ Created: ${cleaned._id}`);
  } catch (err) {
    console.error(`  ✗ Failed: ${cleaned._id}:`, err.message);
  }
}

// ============================================================================
// TRANSLATION LINKING
// ============================================================================

async function linkTranslations() {
  console.log('\nLinking translations...');

  const types = ['service', 'occasion', 'guide', 'page', 'recommendation', 'update', 'homepageSection'];

  for (const type of types) {
    if (DRY_RUN) {
      console.log(`  [dry-run] Would link translations for ${type}`);
      continue;
    }

    // Query all docs of this type
    const docs = await client.fetch(`*[_type == $type]{ _id, language }`, { type });

    // Group by base ID (strip lang prefix)
    const groups = {};
    for (const doc of docs) {
      // ID format: type-lang-slug → base = type-slug
      const parts = doc._id.split('-');
      const lang = parts[1]; // 'en' or 'de'
      const baseId = [parts[0], ...parts.slice(2)].join('-');

      if (!groups[baseId]) groups[baseId] = {};
      groups[baseId][lang] = doc._id;
    }

    // Create translation metadata documents
    for (const [baseId, langs] of Object.entries(groups)) {
      if (Object.keys(langs).length < 2) continue;

      const metaId = `translation.metadata.${baseId}`;
      const translations = Object.entries(langs).map(([lang, docId]) => ({
        _key: lang,
        value: { _type: 'reference', _ref: docId },
      }));

      try {
        await client.createOrReplace({
          _id: metaId,
          _type: 'translation.metadata',
          translations,
          schemaTypes: [type],
        });
        console.log(`  ✓ Linked: ${baseId} (${Object.keys(langs).join(', ')})`);
      } catch (err) {
        console.error(`  ✗ Failed linking ${baseId}:`, err.message);
      }
    }
  }
}

// ============================================================================
// VALIDATION
// ============================================================================

async function validate() {
  console.log('\nValidation:');

  const expected = {
    service: { en: 14, de: 14 },
    occasion: { en: 12, de: 12 },
    guide: { en: 8, de: 8 },
    page: { en: 9, de: 9 },
    recommendation: { en: 5, de: 5 },
    update: { en: 3, de: 3 },
    homepageSection: { en: 6, de: 6 },
  };

  if (DRY_RUN) {
    console.log('  [dry-run] Skipping validation');
    return;
  }

  for (const [type, counts] of Object.entries(expected)) {
    for (const [lang, expectedCount] of Object.entries(counts)) {
      const count = await client.fetch(
        `count(*[_type == $type && language == $lang])`,
        { type, lang }
      );
      const status = count === expectedCount ? '✓' : '✗';
      console.log(`  ${status} ${type} [${lang}]: ${count}/${expectedCount}`);
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('Florize Flowers - Content Migration to Sanity');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Project: ${PROJECT_ID} / ${DATASET}\n`);

  if (!CONTENT_ONLY) {
    await uploadImages();
  }

  if (!IMAGES_ONLY) {
    await migrateServices();
    await migrateOccasions();
    await migrateGuides();
    await migratePages();
    await migrateRecommendations();
    await migrateUpdates();
    await migrateHomepageSections();
    await linkTranslations();
    await validate();
  }

  console.log('\nMigration complete!');
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
