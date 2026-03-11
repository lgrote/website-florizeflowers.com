#!/usr/bin/env node

/**
 * Patch script: Localize German content for the German market
 *
 * Removes UK/British references from German documents and replaces them
 * with Germany-focused or market-neutral alternatives.
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/localize-german-content.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vm53xzke',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper: create a Portable Text block
function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: 'a', marks: [], text }],
  };
}

// ─── PATCHES ────────────────────────────────────────────────────

const patches = [
  // ── Homepage Sections ───────────────────────────────────────

  {
    id: 'homepageSection-de-hero',
    fields: {
      title: 'Finden Sie den perfekten Blumenlieferdienst',
      subtitle:
        'Vergleichen Sie die besten Online-Blumenversand-Anbieter — unabhängig getestet und bewertet, damit Sie den idealen Service für jeden Anlass finden.',
    },
  },

  {
    id: 'homepageSection-de-introduction',
    fields: {
      title: 'Ihr vertrauenswürdiger Blumenlieferdienst-Vergleich',
      paragraphs: [
        'Florize Flowers bietet unabhängige, experten-geprüfte Vergleiche der besten Blumenlieferdienste. Unser Team bewertet jeden Service anhand von Qualität, Zuverlässigkeit, Preis-Leistung und Kundenerfahrung.',
        'Wir haben zahlreiche Blumenlieferdienste getestet und verglichen, um Ihnen bei der richtigen Wahl zu helfen — ganz gleich, ob Sie Blumen zum Geburtstag, Jubiläum oder einfach so verschenken möchten.',
      ],
    },
  },

  // homepageSection-de-methodology — already neutral, no UK refs

  {
    id: 'homepageSection-de-seo',
    fields: {
      title: 'Blumenlieferdienste im Vergleich',
      description:
        'Vergleichen Sie die besten Blumenlieferdienste. Unabhängige Experten-Bewertungen helfen Ihnen, den perfekten Service zu finden.',
      keywords: [
        'blumenlieferung deutschland',
        'bester blumenversand',
        'blumenlieferdienst vergleich',
        'blumen online bestellen',
        'blumenversand test',
      ],
    },
  },

  {
    id: 'homepageSection-de-footer',
    set: async (doc) => {
      const current = await client.getDocument('homepageSection-de-footer');
      if (!current?.description) {
        console.log('  ⚠ No description found on footer section');
        return null;
      }
      return {
        description: current.description
          .replace(/für den britischen Markt/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim(),
      };
    },
  },

  // ── Pages ───────────────────────────────────────────────────

  {
    id: 'page-de-about',
    set: async () => {
      const current = await client.getDocument('page-de-about');
      if (!current) return null;

      const fields = {};

      // Title: drop "in Großbritannien"
      if (current.title) {
        fields.title = current.title
          .replace(/\s*in Großbritannien/g, '')
          .replace(/\s*in ganz Großbritannien/g, '');
      }

      // SEO keywords: remove UK-related terms (comma-separated string)
      if (current.seo?.keywords) {
        fields['seo.keywords'] = current.seo.keywords
          .split(',')
          .map((kw) => kw.trim())
          .filter((kw) => !kw.toLowerCase().includes('uk') && !kw.toLowerCase().includes('großbritannien'))
          .join(', ');
      }

      // Body: replace UK refs
      if (current.body) {
        fields.body = current.body.map((b) => {
          if (b._type !== 'block') return b;
          return {
            ...b,
            children: b.children.map((child) => ({
              ...child,
              text: child.text
                ?.replace(/Großbritanniens\s*/g, '')
                .replace(/in Großbritannien\s*/g, '')
                .replace(/britischer\s*/g, '')
                .replace(/britischen\s*/g, '')
                .replace(/britische\s*/g, ''),
            })),
          };
        });
      }

      return fields;
    },
  },

  {
    id: 'page-de-services-index',
    set: async () => {
      const current = await client.getDocument('page-de-services-index');
      if (!current) return null;

      const fields = {};

      if (current.title) {
        fields.title = current.title
          .replace(/\s*britischer\s*/g, ' ')
          .replace(/\s*britische\s*/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      if (current.description) {
        fields.description = current.description
          .replace(/britischer\s*/g, '')
          .replace(/britischen\s*/g, '')
          .replace(/in Großbritannien\s*/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      if (current.seo?.keywords) {
        fields['seo.keywords'] = current.seo.keywords
          .split(',')
          .map((kw) => kw.trim())
          .filter((kw) => !kw.toLowerCase().includes('uk') && !kw.toLowerCase().includes('großbritannien'))
          .join(', ');
      }

      if (current.body) {
        fields.body = current.body.map((b) => {
          if (b._type !== 'block') return b;
          return {
            ...b,
            children: b.children.map((child) => ({
              ...child,
              text: child.text
                ?.replace(/britischen Markt/g, 'Markt')
                .replace(/britischer\s*/g, '')
                .replace(/britischen\s*/g, '')
                .replace(/in Großbritannien\s*/g, ''),
            })),
          };
        });
      }

      return fields;
    },
  },

  {
    id: 'page-de-occasions-index',
    set: async () => {
      const current = await client.getDocument('page-de-occasions-index');
      if (!current) return null;

      const fields = {};

      if (current.title) {
        fields.title = current.title
          .replace(/\s*UK\s*/g, ' ')
          .replace(/\s*in Großbritannien/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      if (current.description) {
        fields.description = current.description
          .replace(/\s*in Großbritannien/g, '')
          .replace(/\s*UK\s*/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      // Replace tips[2] with German cultural context
      if (current.tips && current.tips.length > 2) {
        const updatedTips = [...current.tips];
        updatedTips[2] = {
          ...updatedTips[2],
          title: 'Deutsche Blumenschenk-Traditionen',
          description:
            'In Deutschland gibt es besondere Blumentraditionen: Verschenken Sie immer eine ungerade Anzahl Blumen — gerade Zahlen sind Beerdigungen vorbehalten. Rote Rosen stehen für romantische Liebe, weiße Lilien für Trauer. Topfpflanzen sind ein beliebtes Gastgeschenk, und zum Muttertag am zweiten Sonntag im Mai sind Blumensträuße besonders gefragt.',
        };
        fields.tips = updatedTips;
      }

      return fields;
    },
  },

  {
    id: 'page-de-guides-index',
    set: async () => {
      const current = await client.getDocument('page-de-guides-index');
      if (!current) return null;

      const fields = {};

      if (current.title) {
        fields.title = current.title
          .replace(/\s*britische Kunden/g, '')
          .replace(/\s*für britische\s*/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      if (current.description) {
        fields.description = current.description
          .replace(/\s*britische Kunden/g, '')
          .replace(/\s*für britische\s*/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      if (current.seo?.keywords) {
        fields['seo.keywords'] = current.seo.keywords
          .split(',')
          .map((kw) => kw.trim())
          .filter((kw) => !kw.toLowerCase().includes('uk') && !kw.toLowerCase().includes('großbritannien'))
          .join(', ');
      }

      return fields;
    },
  },

  {
    id: 'page-de-affiliate-disclosure',
    set: async () => {
      const current = await client.getDocument('page-de-affiliate-disclosure');
      if (!current) return null;

      const fields = {};

      if (current.body) {
        fields.body = current.body.map((b) => {
          if (b._type !== 'block') return b;
          return {
            ...b,
            children: b.children.map((child) => ({
              ...child,
              text: child.text
                ?.replace(/britischen Blumenlieferdiensten/g, 'Blumenlieferdiensten')
                .replace(/britischen\s*/g, '')
                .replace(
                  /FTC-Konformität/g,
                  'Gesetzliche Grundlagen'
                )
                .replace(
                  /FTC[- ]Richtlinien/g,
                  'gesetzliche Vorgaben (TMG, UWG)'
                )
                .replace(
                  /FTC/g,
                  'TMG/UWG'
                ),
            })),
          };
        });
      }

      return fields;
    },
  },

  // ── Updates ─────────────────────────────────────────────────

  {
    id: 'update-de-mothers-day-2025',
    set: async () => {
      const current = await client.getDocument('update-de-mothers-day-2025');
      if (!current) return null;

      const fields = {};

      // Fix body: replace "30. März" with "11. Mai" (German Muttertag 2025 = 11. Mai)
      if (current.body) {
        fields.body = current.body.map((b) => {
          if (b._type !== 'block') return b;
          return {
            ...b,
            children: b.children.map((child) => ({
              ...child,
              text: child.text
                ?.replace(/30\.\s*März/g, '11. Mai')
                .replace(/March\s*30/g, 'May 11'),
            })),
          };
        });
      }

      if (current.description) {
        fields.description = current.description
          .replace(/30\.\s*März/g, '11. Mai')
          .replace(/March\s*30/g, 'May 11');
      }

      // Fix date field if present
      if (current.date) {
        // Mother's Day 2025 in Germany is May 11
        fields.date = '2025-05-11';
      }

      return fields;
    },
  },
];

// ─── EXECUTE ──────────────────────────────────────────────────

async function patchDocuments() {
  console.log('Localizing German content for the German market...\n');

  for (const patch of patches) {
    console.log(`Patching ${patch.id}...`);

    try {
      if (patch.fields) {
        // Simple field set
        await client.patch(patch.id).set(patch.fields).commit();
        console.log(`  ✓ Done`);
      } else if (patch.set) {
        // Dynamic patch — fetch doc first, compute fields
        const fields = await patch.set();
        if (fields) {
          await client.patch(patch.id).set(fields).commit();
          console.log(`  ✓ Done`);
        } else {
          console.log(`  ⚠ Skipped (document not found or no changes needed)`);
        }
      }
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  console.log('\nDone! German content localized.');
  console.log('Review at:');
  console.log('  Homepage: http://localhost:4321/de/');
  console.log('  About:    http://localhost:4321/de/about');
  console.log('  Services: http://localhost:4321/de/services');
  console.log('  Occasions: http://localhost:4321/de/occasions');
  console.log('  Guides:   http://localhost:4321/de/guides');
}

patchDocuments().catch((err) => {
  console.error('Patch failed:', err);
  process.exit(1);
});
