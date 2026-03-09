#!/usr/bin/env node
/**
 * Migrate standalone recommendation documents into homepageSection documents.
 * Usage: SANITY_API_TOKEN=xxx node scripts/migrate-recommendations.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vm53xzke',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function migrate() {
  // 1. Fetch all recommendation documents
  const recs = await client.fetch('*[_type == "recommendation"]');
  console.log(`Found ${recs.length} recommendation documents`);

  // 2. Group by language
  const byLang = {};
  for (const rec of recs) {
    const lang = rec.language || 'en';
    if (!byLang[lang]) byLang[lang] = [];
    byLang[lang].push({
      _key: `rec-${rec.serviceId}`,
      title: rec.title,
      description: rec.description,
      serviceId: rec.serviceId,
      category: rec.category,
      order: rec.order,
      ctaText: rec.ctaText || 'Read Full Review',
      column: rec.column,
    });
  }

  // 3. Create homepageSection for each language
  for (const [lang, items] of Object.entries(byLang)) {
    const docId = `homepageSection-${lang}-quick-selection`;
    const doc = {
      _id: docId,
      _type: 'homepageSection',
      language: lang,
      sectionType: 'quick-selection',
      title: lang === 'de' ? 'Schnelle Auswahlhilfe' : 'Quick Selection Guide',
      recommendations: items.sort((a, b) => (a.order || 999) - (b.order || 999)),
    };

    await client.createOrReplace(doc);
    console.log(`Created: ${docId} with ${items.length} recommendations`);
  }

  // 4. Link translations
  const metaDoc = {
    _id: 'translation.metadata.homepageSection-quick-selection',
    _type: 'translation.metadata',
    schemaTypes: ['homepageSection'],
    translations: Object.keys(byLang).map(lang => ({
      _key: lang,
      value: {
        _ref: `homepageSection-${lang}-quick-selection`,
        _type: 'reference',
        _weak: true,
        _strengthenOnPublish: { type: 'homepageSection' },
      },
    })),
  };
  await client.createOrReplace(metaDoc);
  console.log('Created translation metadata');

  // 5. Delete old recommendation documents
  const ids = recs.map(r => r._id);
  if (ids.length > 0) {
    let tx = client.transaction();
    for (const id of ids) {
      tx = tx.delete(id);
    }
    // Also delete any recommendation translation metadata
    const recMeta = await client.fetch('*[_type == "translation.metadata" && "recommendation" in schemaTypes]._id');
    for (const metaId of recMeta) {
      tx = tx.delete(metaId);
    }
    await tx.commit();
    console.log(`Deleted ${ids.length} recommendation docs and ${recMeta.length} metadata docs`);
  }

  console.log('\nDone!');
}

migrate().catch(console.error);
