#!/usr/bin/env node

/**
 * Migration script: Add Blumenshop.de flower delivery service to Sanity CMS (German only)
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/add-service-blumenshop.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: 'vm53xzke',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function addService() {
  const slug = 'blumenshop';
  const today = new Date().toISOString().split('T')[0];

  // --- Upload logo ---
  console.log('Uploading logo...');
  const logoStream = fs.createReadStream(path.join(__dirname, 'blumenshop-logo.svg'));
  const logoAsset = await client.assets.upload('image', logoStream, {
    filename: 'blumenshop-logo.svg',
    contentType: 'image/svg+xml',
  });
  console.log(`Logo uploaded: ${logoAsset._id}`);

  // --- German Document ---
  const deDoc = {
    _id: `service-de-${slug}`,
    _type: 'service',
    language: 'de',
    base: {
      id: slug,
      name: 'Blumenshop.de',
      title: 'Blumenshop.de Bewertung 2025 – Frische Blumen direkt vom Züchter | Florize',
      description:
        'Blumenshop.de im Test: 7-Tage-Frischegarantie, Lieferung zum Wunschtermin, gratis Grußkarte oder Videobotschaft. Mehrfach ausgezeichneter Blumenversand.',
      logo: { _type: 'image', asset: { _ref: logoAsset._id, _type: 'reference' } },
      rating: 4.6,
      priceRange: '€19,95–€49,95',
      deliveryOptions: ['Standardversand (1-2 Werktage)', 'Expresslieferung zum Wunschtermin', 'Versand nach Deutschland, Belgien & Niederlande'],
      keyFeatures: [
        '7-Tage-Frischegarantie',
        'Lieferung zum Wunschtermin',
        'Gratis Grußkarte oder Videobotschaft',
        'Frisch direkt vom Züchter',
        'Chrysal-Blumennahrung inklusive',
      ],
    },
    seo: {
      keywords:
        'Blumenshop.de Bewertung, Blumenshop Erfahrungen, Blumenversand, Blumen verschicken, frische Blumen online bestellen, Blumen zum Wunschtermin',
      datePublished: today,
      dateModified: today,
    },
    summary: {
      bestFor: 'Termingenaue Lieferung frischer Sträuße in Deutschland, Belgien und den Niederlanden',
      delivery: 'Versand zum Wunschtermin, Standardversand 1-2 Werktage, Expressoption am gewählten Liefertag',
      ratingText:
        'Mehrfach ausgezeichneter Blumenversand mit hervorragender Frischequalität, persönlichen Extras und zuverlässiger Terminlieferung',
    },
    overview: {
      positioning:
        'Blumenshop.de ist ein mehrfach ausgezeichneter Blumenversand, der frische Sträuße direkt vom Züchter zum Wunschtermin liefert. Durch regionale Bindereien und kurze Transportwege bleiben die Blumen besonders frisch — die 7-Tage-Frischegarantie unterstreicht diesen Qualitätsanspruch. Jede Bestellung kann mit einer kostenlosen Grußkarte oder einer persönlichen Videobotschaft versehen werden, was das Verschenken besonders persönlich macht. Auszeichnungen wie der Deutschland Test 2025 als bester Online-Blumenhändler und der DtGV-Testsieg 2024 belegen die Marktposition.',
    },
    components: {
      prosTitle: 'Warum wir Blumenshop.de empfehlen',
      consTitle: 'Verbesserungspotential',
      pros: [
        {
          _key: 'p1',
          label: 'Termingenau zum Wunschtag',
          description: 'Lieferung exakt zum gewählten Wunschtermin — ideal für Geburtstage, Jahrestage und besondere Anlässe',
        },
        {
          _key: 'p2',
          label: '7-Tage-Frischegarantie',
          description: 'Garantierte Frische über mindestens 7 Tage nach Lieferung — andernfalls erfolgt eine Erstattung',
        },
        {
          _key: 'p3',
          label: 'Persönliche Videobotschaft',
          description: 'Kostenlose Videobotschaft oder Grußkarte zur Personalisierung jeder Bestellung',
        },
        {
          _key: 'p4',
          label: 'Frisch vom Züchter',
          description: 'Direkter Bezug von Erzeugern und regionale Bindereien sorgen für kurze Transportwege und maximale Frische',
        },
        {
          _key: 'p5',
          label: 'Mehrfach ausgezeichnet',
          description: 'Testsieger bei Deutschland Test 2025, DtGV 2024 und ComputerBild TopShop — bestätigt durch über 30.000 positive Trusted-Shops-Bewertungen',
        },
      ],
      cons: [
        {
          _key: 'c1',
          label: 'Versandkosten extra',
          description: 'Standardversand kostet 5,95 €, Expresslieferung 11,95 € — andere Anbieter bieten gelegentlich kostenfreien Versand',
        },
        {
          _key: 'c2',
          label: 'Begrenztes Liefergebiet',
          description: 'Versand nur nach Deutschland, Belgien und in die Niederlande — keine internationale Lieferung',
        },
        {
          _key: 'c3',
          label: 'Kein Abo-Service',
          description: 'Aktuell wird kein regelmäßiges Blumenabonnement angeboten',
        },
      ],
      faqs: [
        {
          _key: 'f1',
          question: 'Liefert Blumenshop.de zum Wunschtermin?',
          answer:
            'Ja, Blumenshop.de bietet eine termingenaue Lieferung am gewählten Wunschtag. Bei Bestellung vor 15 Uhr werktags ist auch ein schneller Versand möglich.',
        },
        {
          _key: 'f2',
          question: 'Was beinhaltet die 7-Tage-Frischegarantie?',
          answer:
            'Blumenshop.de garantiert, dass die gelieferten Blumen mindestens 7 Tage frisch bleiben. Sollten die Blumen vorher welken, erstattet der Kundenservice den Kaufpreis oder schickt einen Ersatzstrauß.',
        },
        {
          _key: 'f3',
          question: 'Was kostet der Versand bei Blumenshop.de?',
          answer:
            'Der Standardversand kostet 5,95 € (1-2 Werktage), die Expresslieferung mit DPD zum gewählten Wunschtermin kostet 11,95 €.',
        },
        {
          _key: 'f4',
          question: 'In welche Länder liefert Blumenshop.de?',
          answer:
            'Blumenshop.de liefert nach Deutschland, Belgien und in die Niederlande. Eine Lieferung in andere Länder ist derzeit nicht möglich.',
        },
        {
          _key: 'f5',
          question: 'Kann ich eine persönliche Nachricht hinzufügen?',
          answer:
            'Ja, jeder Bestellung kann eine kostenlose Grußkarte oder sogar eine persönliche Videobotschaft beigelegt werden, die der Empfänger über einen QR-Code abrufen kann.',
        },
      ],
    },
    affiliate: {
      url: 'https://www.blumenshop.de',
    },
  };

  // --- Create document ---
  console.log('Creating German service document...');
  await client.createOrReplace(deDoc);
  console.log(`Created: ${deDoc._id}`);

  console.log('\nDone! Blumenshop.de service added successfully.');
  console.log(`\nReview at:`);
  console.log(`  DE: http://localhost:4321/de/services/${slug}`);
}

addService().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
