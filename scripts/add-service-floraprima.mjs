#!/usr/bin/env node

/**
 * Migration script: Add FloraPrima flower delivery service to Sanity CMS
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/add-service-floraprima.mjs
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
  const slug = 'floraprima';
  const today = new Date().toISOString().split('T')[0];

  // --- Upload images to Sanity ---
  console.log('Uploading logo...');
  const logoStream = fs.createReadStream(path.join(__dirname, 'floraprima-logo.svg'));
  const logoAsset = await client.assets.upload('image', logoStream, {
    filename: 'floraprima-logo.svg',
    contentType: 'image/svg+xml',
  });
  console.log(`Logo uploaded: ${logoAsset._id}`);

  console.log('Uploading hero image...');
  const heroStream = fs.createReadStream(path.join(__dirname, 'floraprima-hero.jpg'));
  const heroAsset = await client.assets.upload('image', heroStream, {
    filename: 'floraprima-hero.jpg',
    contentType: 'image/jpeg',
  });
  console.log(`Hero image uploaded: ${heroAsset._id}`);

  // --- English Document ---
  const enDoc = {
    _id: `service-en-${slug}`,
    _type: 'service',
    language: 'en',
    base: {
      id: slug,
      name: 'FloraPrima',
      title: 'FloraPrima Review 2025 – Reliable German Flower Delivery | Florize',
      description:
        'FloraPrima review: family-run German florist since 2002 with Fairtrade roses, 7-day freshness guarantee, free vase & card, and delivery to 120+ countries.',
      logo: { _type: 'image', asset: { _ref: logoAsset._id, _type: 'reference' } },
      heroImage: { _type: 'image', asset: { _ref: heroAsset._id, _type: 'reference' } },
      rating: 4.4,
      priceRange: '€22–€68',
      deliveryOptions: ['Standard (1-2 days)', 'Same-Day (select regions)', 'International (120+ countries)'],
      keyFeatures: [
        '7-day freshness guarantee',
        'Free glass vase & greeting card',
        'Fairtrade-certified roses',
        'Delivery to 120+ countries',
        'Guaranteed as pictured',
      ],
      founded: 2002,
    },
    seo: {
      keywords:
        'FloraPrima review, FloraPrima Blumenversand, German flower delivery, Fairtrade flowers, international flower delivery, flower delivery Germany',
      datePublished: today,
      dateModified: today,
    },
    summary: {
      bestFor: 'Reliable flower delivery across Germany and internationally, with ethically sourced arrangements',
      delivery: 'Standard 1-2 day delivery nationwide; same-day available in select regions; ships to 120+ countries',
      ratingText:
        'A well-established mid-range service offering excellent value with Fairtrade sourcing, freshness guarantees, and generous free extras',
    },
    overview: {
      positioning:
        'FloraPrima is a trusted German flower delivery service that has been operating since 2002. Known for their commitment to quality and fair trade practices, they offer hand-bound bouquets sourced directly from growers, ensuring both freshness and fair pricing. Every order comes with a complimentary glass vase and personalised greeting card, adding genuine value to their competitively priced arrangements.',
    },
    components: {
      prosTitle: 'Why We Recommend FloraPrima',
      consTitle: 'Areas for Improvement',
      pros: [
        {
          _key: 'p1',
          label: 'Fairtrade Certified',
          description: 'Ethically sourced roses with independent verification and sustainable farming practices',
        },
        {
          _key: 'p2',
          label: 'Freshness Guarantee',
          description: '7-day freshness promise on all bouquets, giving peace of mind with every order',
        },
        {
          _key: 'p3',
          label: 'Free Extras Included',
          description: 'Every order includes a complimentary glass vase and personalised greeting card at no extra cost',
        },
        {
          _key: 'p4',
          label: 'Global Reach',
          description: 'Delivers to over 120 countries worldwide, ideal for international gifting',
        },
        {
          _key: 'p5',
          label: 'Guaranteed as Pictured',
          description: 'What you see on the website is exactly what gets delivered — no substitutions',
        },
      ],
      cons: [
        {
          _key: 'c1',
          label: 'Germany-Focused',
          description: 'Website and primary service are German-language, which may be less accessible for international customers',
        },
        {
          _key: 'c2',
          label: 'Limited Same-Day',
          description: 'Same-day delivery is only available in select regions, not nationwide',
        },
        {
          _key: 'c3',
          label: 'No Subscription Service',
          description: 'Does not currently offer recurring flower subscription plans',
        },
      ],
      faqs: [
        {
          _key: 'f1',
          question: 'Does FloraPrima offer same-day delivery?',
          answer:
            'Yes, FloraPrima offers same-day delivery in select German regions. For most areas, standard delivery takes 1-2 business days.',
        },
        {
          _key: 'f2',
          question: 'Are FloraPrima flowers Fairtrade?',
          answer:
            'Yes, FloraPrima sources their roses from Fairtrade-certified farms and practices sustainable farming with independent verification.',
        },
        {
          _key: 'f3',
          question: 'Does FloraPrima deliver internationally?',
          answer:
            'Yes, FloraPrima delivers to over 120 countries worldwide through their international shipping network.',
        },
        {
          _key: 'f4',
          question: 'What is included with a FloraPrima order?',
          answer:
            'Every FloraPrima order comes with a free glass vase and a personalised greeting card, included at no additional cost.',
        },
        {
          _key: 'f5',
          question: 'What is the FloraPrima freshness guarantee?',
          answer:
            'FloraPrima guarantees their flowers will stay fresh for at least 7 days after delivery. If they do not, you can contact customer service for a resolution.',
        },
      ],
    },
    affiliate: {
      url: 'https://www.floraprima.de',
    },
  };

  // --- German Document ---
  const deDoc = {
    _id: `service-de-${slug}`,
    _type: 'service',
    language: 'de',
    base: {
      id: slug,
      name: 'FloraPrima',
      title: 'FloraPrima Bewertung 2025 – Zuverlässiger Blumenversand | Florize',
      description:
        'FloraPrima im Test: Familienunternehmen seit 2002 mit Fairtrade-Rosen, 7-Tage-Frischegarantie, gratis Vase & Grußkarte und Lieferung in über 120 Länder.',
      logo: { _type: 'image', asset: { _ref: logoAsset._id, _type: 'reference' } },
      heroImage: { _type: 'image', asset: { _ref: heroAsset._id, _type: 'reference' } },
      rating: 4.4,
      priceRange: '€22–€68',
      deliveryOptions: ['Standardversand (1-2 Werktage)', 'Expresslieferung (regional)', 'Internationaler Versand (120+ Länder)'],
      keyFeatures: [
        '7-Tage-Frischegarantie',
        'Gratis Glasvase & Grußkarte',
        'Fairtrade-zertifizierte Rosen',
        'Lieferung in 120+ Länder',
        'Garantiert wie abgebildet',
      ],
      founded: 2002,
    },
    seo: {
      keywords:
        'FloraPrima Bewertung, FloraPrima Erfahrungen, Blumenversand Deutschland, Fairtrade Blumen, internationaler Blumenversand',
      datePublished: today,
      dateModified: today,
    },
    summary: {
      bestFor: 'Zuverlässiger Blumenversand in Deutschland und weltweit mit nachhaltig bezogenen Arrangements',
      delivery: 'Standardversand in 1-2 Werktagen bundesweit; Expresslieferung in ausgewählten Regionen; Versand in 120+ Länder',
      ratingText:
        'Ein bewährter Blumenversand im mittleren Preissegment mit hervorragendem Preis-Leistungs-Verhältnis, Fairtrade-Beschaffung und großzügigen Gratiszugaben',
    },
    overview: {
      positioning:
        'FloraPrima ist ein bewährter deutscher Blumenversand, der seit 2002 für Qualität und fairen Handel steht. Durch den Direktbezug von Erzeugern bieten sie handgebundene Sträuße, die sowohl in Frische als auch im Preis überzeugen. Jede Bestellung enthält eine kostenlose Glasvase und eine persönliche Grußkarte — ein echtes Mehrwertversprechen zu wettbewerbsfähigen Preisen.',
    },
    components: {
      prosTitle: 'Warum wir FloraPrima empfehlen',
      consTitle: 'Verbesserungspotential',
      pros: [
        {
          _key: 'p1',
          label: 'Fairtrade-zertifiziert',
          description: 'Nachhaltig bezogene Rosen mit unabhängiger Prüfung und fairen Anbaumethoden',
        },
        {
          _key: 'p2',
          label: 'Frischegarantie',
          description: '7-Tage-Frischeversprechen auf alle Sträuße — für maximale Freude an jeder Bestellung',
        },
        {
          _key: 'p3',
          label: 'Gratis Extras inklusive',
          description: 'Jede Bestellung enthält eine kostenlose Glasvase und eine persönliche Grußkarte',
        },
        {
          _key: 'p4',
          label: 'Weltweiter Versand',
          description: 'Lieferung in über 120 Länder weltweit — ideal für internationale Blumengrüße',
        },
        {
          _key: 'p5',
          label: 'Garantiert wie abgebildet',
          description: 'Was Sie auf der Website sehen, wird genau so geliefert — keine Ersatzblumen',
        },
      ],
      cons: [
        {
          _key: 'c1',
          label: 'Deutschsprachig fokussiert',
          description: 'Website und Service sind primär auf Deutsch — für internationale Kunden weniger zugänglich',
        },
        {
          _key: 'c2',
          label: 'Begrenzte Expresslieferung',
          description: 'Taggleiche Lieferung ist nur in ausgewählten Regionen verfügbar, nicht bundesweit',
        },
        {
          _key: 'c3',
          label: 'Kein Abo-Service',
          description: 'Aktuell werden keine regelmäßigen Blumenabo-Modelle angeboten',
        },
      ],
      faqs: [
        {
          _key: 'f1',
          question: 'Bietet FloraPrima eine taggleiche Lieferung an?',
          answer:
            'Ja, FloraPrima bietet in ausgewählten deutschen Regionen eine Expresslieferung am selben Tag. In den meisten Gebieten beträgt die Standardlieferzeit 1-2 Werktage.',
        },
        {
          _key: 'f2',
          question: 'Sind die Blumen von FloraPrima Fairtrade?',
          answer:
            'Ja, FloraPrima bezieht ihre Rosen von Fairtrade-zertifizierten Farmen und setzt auf nachhaltige Anbaumethoden mit unabhängiger Prüfung.',
        },
        {
          _key: 'f3',
          question: 'Liefert FloraPrima auch ins Ausland?',
          answer:
            'Ja, FloraPrima liefert in über 120 Länder weltweit über ihr internationales Versandnetzwerk.',
        },
        {
          _key: 'f4',
          question: 'Was ist bei einer FloraPrima-Bestellung enthalten?',
          answer:
            'Jede Bestellung enthält eine kostenlose Glasvase und eine persönliche Grußkarte — ohne Aufpreis.',
        },
        {
          _key: 'f5',
          question: 'Was beinhaltet die FloraPrima-Frischegarantie?',
          answer:
            'FloraPrima garantiert, dass ihre Blumen mindestens 7 Tage nach der Lieferung frisch bleiben. Sollte dies nicht der Fall sein, können Sie den Kundenservice für eine Lösung kontaktieren.',
        },
      ],
    },
    affiliate: {
      url: 'https://www.floraprima.de',
    },
  };

  // --- Create documents ---
  console.log('Creating English service document...');
  await client.createOrReplace(enDoc);
  console.log(`Created: ${enDoc._id}`);

  console.log('Creating German service document...');
  await client.createOrReplace(deDoc);
  console.log(`Created: ${deDoc._id}`);

  // --- Translation metadata ---
  const metaDoc = {
    _id: `translation.metadata.service-${slug}`,
    _type: 'translation.metadata',
    schemaTypes: ['service'],
    translations: [
      {
        _key: 'en',
        value: {
          _ref: `service-en-${slug}`,
          _type: 'reference',
          _weak: true,
          _strengthenOnPublish: { type: 'service' },
        },
      },
      {
        _key: 'de',
        value: {
          _ref: `service-de-${slug}`,
          _type: 'reference',
          _weak: true,
          _strengthenOnPublish: { type: 'service' },
        },
      },
    ],
  };

  console.log('Creating translation metadata...');
  await client.createOrReplace(metaDoc);
  console.log('Created translation metadata');

  console.log('\nDone! FloraPrima service added successfully.');
  console.log(`\nReview at:`);
  console.log(`  EN: http://localhost:4321/en/services/${slug}`);
  console.log(`  DE: http://localhost:4321/de/services/${slug}`);
}

addService().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
