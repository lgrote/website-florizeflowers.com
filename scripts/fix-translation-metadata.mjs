#!/usr/bin/env node
/**
 * Fix translation.metadata documents to use weak references
 * as expected by @sanity/document-internationalization plugin.
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/fix-translation-metadata.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vm53xzke',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function fixMetadata() {
  const metaDocs = await client.fetch('*[_type == "translation.metadata"]');
  console.log(`Found ${metaDocs.length} metadata docs to fix`);

  let fixed = 0;
  for (const doc of metaDocs) {
    const schemaType = doc.schemaTypes?.[0] || 'document';
    const needsFix = doc.translations?.some(t => !t.value?._weak);

    if (!needsFix) {
      console.log(`Skip (already correct): ${doc._id}`);
      continue;
    }

    const fixedTranslations = doc.translations.map(t => ({
      _key: t._key,
      value: {
        _ref: t.value._ref,
        _type: 'reference',
        _weak: true,
        _strengthenOnPublish: {
          type: schemaType,
        },
      },
    }));

    await client.patch(doc._id).set({ translations: fixedTranslations }).commit();
    console.log(`Fixed: ${doc._id}`);
    fixed++;
  }

  console.log(`\nDone! Fixed ${fixed}/${metaDocs.length} documents.`);
}

fixMetadata().catch(console.error);
