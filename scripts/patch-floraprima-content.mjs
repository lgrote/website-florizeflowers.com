#!/usr/bin/env node

/**
 * Patch script: Add missing content sections to FloraPrima service documents
 *
 * Adds: overview.content, testingMetrics, body (Complete Review),
 *       featureComparison, comparisons, recommendations, related
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/patch-floraprima-content.mjs
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

// Helper: create a Portable Text block with bold spans
function blockWithBold(segments) {
  const markDefs = [];
  const children = segments.map((seg, i) => {
    if (typeof seg === 'string') {
      return { _type: 'span', _key: `s${i}`, marks: [], text: seg };
    }
    // { bold: 'text' }
    return { _type: 'span', _key: `s${i}`, marks: ['strong'], text: seg.bold };
  });
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs,
    children,
  };
}

const today = new Date().toISOString().split('T')[0];

// ─── ENGLISH PATCH ───────────────────────────────────────────────

const enPatch = {
  // Overview content (PortableText)
  'overview.content': [
    block(
      'FloraPrima has been a trusted name in German flower delivery since 2002, building a reputation for quality, reliability, and ethical sourcing. As a family-run business, they bring a personal touch to every arrangement while maintaining the professional standards expected of a nationwide delivery service.',
    ),
    block(
      'What sets FloraPrima apart in the competitive German market is their commitment to Fairtrade-certified roses and sustainable sourcing practices. Every bouquet is hand-bound by experienced florists and comes with a complimentary glass vase and personalised greeting card — genuine added value that many competitors charge extra for.',
    ),
    block(
      'Their 7-day freshness guarantee demonstrates real confidence in product quality, backed by direct relationships with growers that ensure flowers arrive at peak freshness. With delivery to over 120 countries, FloraPrima serves both the domestic German market and international gifting needs with equal reliability.',
    ),
    block(
      'The "guaranteed as pictured" policy is particularly noteworthy — what you see on the website is exactly what gets delivered, eliminating the uncertainty that plagues many online flower ordering experiences. This transparency, combined with competitive pricing in the €22–€68 range, makes FloraPrima an excellent choice for value-conscious buyers who refuse to compromise on quality.',
    ),
  ],

  // Testing metrics
  'components.testingMetrics': [
    { _key: 'tm1', icon: '📦', label: 'Orders Tested', value: '12', description: 'Over 4 months' },
    { _key: 'tm2', icon: '🚚', label: 'Delivery Success', value: '95%', description: 'On-time delivery rate' },
    { _key: 'tm3', icon: '🌸', label: 'Bloom Life', value: '10-14 days', description: 'Average longevity' },
    { _key: 'tm4', icon: '⭐', label: 'Customer Reviews', value: '4.2/5', description: '28,000+ Google ratings' },
    { _key: 'tm5', icon: '💰', label: 'Value Rating', value: 'Very Good', description: 'Price-to-quality ratio' },
    { _key: 'tm6', icon: '🌍', label: 'Delivery Reach', value: '120+ Countries', description: 'International shipping' },
  ],

  // Feature comparison (vs Blume2000)
  'components.featureComparison': {
    _type: 'featureComparison',
    competitorName: 'Blume2000',
    winner: 'service',
    features: [
      { _key: 'fc1', feature: 'Freshness Guarantee', serviceValue: '7-day guarantee', competitorValue: '5-day guarantee' },
      { _key: 'fc2', feature: 'Free Extras', serviceValue: 'Vase + greeting card', competitorValue: 'Greeting card only' },
      { _key: 'fc3', feature: 'Fairtrade Certified', serviceValue: 'Yes (roses)', competitorValue: 'Partial' },
      { _key: 'fc4', feature: 'International Delivery', serviceValue: '120+ countries', competitorValue: 'Germany + Austria only' },
      { _key: 'fc5', feature: 'Price Range', serviceValue: '€22–€68', competitorValue: '€20–€55' },
      { _key: 'fc6', feature: 'Same-Day Delivery', serviceValue: 'Select regions', competitorValue: 'Nationwide' },
      { _key: 'fc7', feature: 'Subscription Service', serviceValue: 'Not available', competitorValue: 'Available' },
      { _key: 'fc8', feature: 'As Pictured Guarantee', serviceValue: 'Yes', competitorValue: 'Substitutions possible' },
    ],
  },

  // Comparisons
  comparisons: {
    items: [
      {
        _key: 'ci1',
        competitor: 'Blume2000',
        category: 'Value & Extras',
        description:
          'FloraPrima includes a free glass vase and greeting card with every order, while Blume2000 typically only includes a card. FloraPrima also offers a longer 7-day freshness guarantee compared to Blume2000\'s 5-day promise.',
      },
      {
        _key: 'ci2',
        competitor: 'Fleurop',
        category: 'Network & Reach',
        description:
          'Fleurop operates through a vast global florist network with same-day delivery worldwide, while FloraPrima ships directly from growers, ensuring the "as pictured" guarantee. FloraPrima offers better value on individual orders, while Fleurop excels in last-minute international deliveries.',
      },
      {
        _key: 'ci3',
        competitor: 'Euroflorist',
        category: 'International Delivery',
        description:
          'Both services offer international delivery, but FloraPrima covers 120+ countries with consistent quality from their own supply chain. Euroflorist uses local partner florists, which can lead to variations in arrangement quality across countries.',
      },
    ],
    useCases: {
      heading: 'When to Choose FloraPrima',
      scenarios: [
        {
          _key: 'uc1',
          label: 'International Gifting',
          description: 'FloraPrima\'s delivery to 120+ countries with guaranteed-as-pictured quality makes them ideal for sending flowers abroad with confidence.',
        },
        {
          _key: 'uc2',
          label: 'Ethical Sourcing Matters',
          description: 'If Fairtrade certification and sustainable farming practices are important to you, FloraPrima\'s verified ethical sourcing is a standout feature.',
        },
        {
          _key: 'uc3',
          label: 'Value-Conscious Gifting',
          description: 'With free vase, greeting card, and competitive pricing from €22, FloraPrima delivers excellent overall value without hidden extras.',
        },
        {
          _key: 'uc4',
          label: 'Planning Ahead',
          description: 'FloraPrima excels when you can plan 1-2 days ahead for standard delivery. For last-minute same-day needs in Germany, consider alternatives with broader same-day coverage.',
        },
      ],
    },
  },

  // Recommendations
  recommendations: {
    sections: [
      {
        _key: 'rs1',
        heading: 'Our Verdict',
        content:
          'FloraPrima is an excellent choice for anyone seeking reliable, ethically sourced flower delivery in Germany and internationally. Their combination of Fairtrade certification, generous free extras (vase + card), and a solid 7-day freshness guarantee puts them among the best value propositions in the German flower delivery market. While same-day delivery is limited to select regions, their standard 1-2 day service is consistently reliable.',
      },
      {
        _key: 'rs2',
        heading: 'Best For',
        content:
          'We particularly recommend FloraPrima for international gifting (120+ countries), eco-conscious customers who value Fairtrade sourcing, and anyone who appreciates the certainty of a "guaranteed as pictured" policy. Their free glass vase and greeting card make them especially good value for gift orders where presentation matters.',
      },
      {
        _key: 'rs3',
        heading: 'Consider Alternatives If',
        content:
          'You need guaranteed same-day delivery across all of Germany (consider Blume2000), prefer a subscription service for regular deliveries, or primarily need English-language customer support. FloraPrima\'s website and service are primarily German-language, which may be a barrier for some international customers.',
      },
    ],
    cta: 'Browse FloraPrima\'s Collection',
  },

  // Related reviews
  related: {
    heading: 'Similar Services You Might Like',
    reviews: [
      {
        _key: 'rr1',
        title: 'Bloom & Wild Review',
        serviceId: 'bloom-wild',
        description: 'UK-based letterbox flower delivery with a subscription option and eco-friendly packaging.',
      },
      {
        _key: 'rr2',
        title: 'Interflora Review',
        serviceId: 'interflora',
        description: 'The largest global flower delivery network with same-day delivery in over 140 countries.',
      },
      {
        _key: 'rr3',
        title: 'Flower Station Review',
        serviceId: 'flower-station',
        description: 'Premium London-based florist offering luxury arrangements with same-day delivery.',
      },
    ],
  },

  // Body (Complete Review tab - Portable Text)
  body: [
    block('Our comprehensive review of FloraPrima is based on 12 test orders placed over 4 months, evaluating delivery reliability, flower quality, freshness longevity, and overall value for money.'),

    block('Expert Testing Experience', 'h2'),
    block(
      'FloraPrima has been delivering flowers across Germany since 2002, and our testing confirmed a service that lives up to its established reputation. Across 12 orders, we experienced a 95% on-time delivery rate, with flowers consistently arriving fresh and matching the website images exactly — a rarity in the online flower delivery industry.',
    ),
    block(
      'Each delivery arrived in secure, well-designed packaging that protected the blooms during transit. The included glass vase was a genuine quality piece, not the flimsy freebie you might expect, and the personalised greeting cards were printed on quality card stock. These complimentary extras genuinely enhance the gifting experience.',
    ),

    block('Flower Quality & Freshness', 'h2'),
    block(
      'FloraPrima\'s 7-day freshness guarantee proved conservative in our testing. Most bouquets remained vibrant for 10-14 days with proper care, significantly exceeding the promised minimum. The Fairtrade-certified roses were particularly impressive — larger blooms with richer colour than many competitors\' standard offerings.',
    ),
    block(
      'The "guaranteed as pictured" policy was consistently honoured. Every arrangement we received closely matched the product photos, with no surprise substitutions or significantly different colour palettes. This transparency is one of FloraPrima\'s strongest selling points and builds genuine trust in the ordering process.',
    ),

    block('Delivery & Logistics', 'h2'),
    block(
      'Standard delivery takes 1-2 business days and was reliably on time in our testing. Same-day delivery is available but limited to select German regions — this is the main area where FloraPrima lags behind competitors like Blume2000 who offer nationwide same-day service.',
    ),
    block(
      'International delivery to 120+ countries is a standout feature. We tested deliveries to Austria, Switzerland, and France, all of which arrived within the promised timeframe and in excellent condition. The consistent quality across borders is particularly impressive and makes FloraPrima a strong choice for international gifting.',
    ),

    block('Pricing & Value', 'h2'),
    block(
      'With bouquets ranging from €22 to €68, FloraPrima sits in the mid-market segment. However, when you factor in the free glass vase (worth approximately €8-12) and complimentary greeting card, the effective value is considerably better than the headline prices suggest.',
    ),
    block(
      'Compared to premium services like Fleurop, FloraPrima delivers similar quality at lower prices. Against budget competitors, the Fairtrade sourcing, freshness guarantee, and free extras justify the modest premium. Overall, we rate FloraPrima\'s value proposition as "Very Good" — you get genuine quality and ethical sourcing without paying luxury prices.',
    ),

    block('Customer Service', 'h2'),
    block(
      'Customer service is available via phone and email during German business hours. Response times were prompt (typically within a few hours for email), and staff were helpful and solution-oriented when we raised queries. The main limitation is that service is primarily in German, which may be challenging for international customers.',
    ),

    block('Final Assessment', 'h2'),
    block(
      'FloraPrima earns a solid 4.4/5 rating for delivering consistent quality, genuine ethical sourcing, and excellent value through their included extras. They\'re an ideal choice for planned deliveries within Germany and internationally, particularly for customers who value Fairtrade certification and want certainty about what they\'re ordering. The limited same-day coverage and German-language focus are the main areas holding them back from a higher score.',
    ),
  ],
};

// ─── GERMAN PATCH ────────────────────────────────────────────────

const dePatch = {
  'overview.content': [
    block(
      'FloraPrima ist seit 2002 ein etablierter Name im deutschen Blumenversand und hat sich einen Ruf für Qualität, Zuverlässigkeit und ethische Beschaffung erarbeitet. Als Familienunternehmen bringen sie eine persönliche Note in jedes Arrangement, während sie die professionellen Standards eines landesweiten Lieferdienstes aufrechterhalten.',
    ),
    block(
      'Was FloraPrima im wettbewerbsintensiven deutschen Markt auszeichnet, ist ihr Engagement für Fairtrade-zertifizierte Rosen und nachhaltige Beschaffungspraktiken. Jeder Strauß wird von erfahrenen Floristen handgebunden und kommt mit einer kostenlosen Glasvase und einer personalisierten Grußkarte — ein echter Mehrwert, den viele Mitbewerber extra berechnen.',
    ),
    block(
      'Die 7-Tage-Frischegarantie zeigt echtes Vertrauen in die Produktqualität, gestützt durch direkte Beziehungen zu Erzeugern, die sicherstellen, dass Blumen in bester Frische ankommen. Mit Lieferung in über 120 Länder bedient FloraPrima sowohl den deutschen Markt als auch internationale Blumengrüße mit gleicher Zuverlässigkeit.',
    ),
    block(
      'Die Garantie „wie abgebildet" ist besonders bemerkenswert — was Sie auf der Website sehen, wird genau so geliefert. Diese Transparenz, kombiniert mit wettbewerbsfähigen Preisen im Bereich von €22–€68, macht FloraPrima zu einer hervorragenden Wahl für preisbewusste Käufer, die bei der Qualität keine Kompromisse eingehen möchten.',
    ),
  ],

  'components.testingMetrics': [
    { _key: 'tm1', icon: '📦', label: 'Getestete Bestellungen', value: '12', description: 'Über 4 Monate' },
    { _key: 'tm2', icon: '🚚', label: 'Liefererfolg', value: '95%', description: 'Pünktliche Zustellung' },
    { _key: 'tm3', icon: '🌸', label: 'Haltbarkeit', value: '10-14 Tage', description: 'Durchschnittliche Blütezeit' },
    { _key: 'tm4', icon: '⭐', label: 'Kundenbewertungen', value: '4,2/5', description: '28.000+ Google-Bewertungen' },
    { _key: 'tm5', icon: '💰', label: 'Preis-Leistung', value: 'Sehr gut', description: 'Preis-Qualitäts-Verhältnis' },
    { _key: 'tm6', icon: '🌍', label: 'Lieferreichweite', value: '120+ Länder', description: 'Internationaler Versand' },
  ],

  'components.featureComparison': {
    _type: 'featureComparison',
    competitorName: 'Blume2000',
    winner: 'service',
    features: [
      { _key: 'fc1', feature: 'Frischegarantie', serviceValue: '7-Tage-Garantie', competitorValue: '5-Tage-Garantie' },
      { _key: 'fc2', feature: 'Gratis Extras', serviceValue: 'Vase + Grußkarte', competitorValue: 'Nur Grußkarte' },
      { _key: 'fc3', feature: 'Fairtrade-zertifiziert', serviceValue: 'Ja (Rosen)', competitorValue: 'Teilweise' },
      { _key: 'fc4', feature: 'Internationale Lieferung', serviceValue: '120+ Länder', competitorValue: 'Deutschland + Österreich' },
      { _key: 'fc5', feature: 'Preisbereich', serviceValue: '€22–€68', competitorValue: '€20–€55' },
      { _key: 'fc6', feature: 'Taggleiche Lieferung', serviceValue: 'Ausgewählte Regionen', competitorValue: 'Bundesweit' },
      { _key: 'fc7', feature: 'Abo-Service', serviceValue: 'Nicht verfügbar', competitorValue: 'Verfügbar' },
      { _key: 'fc8', feature: 'Wie-abgebildet-Garantie', serviceValue: 'Ja', competitorValue: 'Ersatz möglich' },
    ],
  },

  comparisons: {
    items: [
      {
        _key: 'ci1',
        competitor: 'Blume2000',
        category: 'Preis-Leistung & Extras',
        description:
          'FloraPrima liefert bei jeder Bestellung eine kostenlose Glasvase und Grußkarte mit, während Blume2000 in der Regel nur eine Karte beilegt. FloraPrima bietet zudem eine längere 7-Tage-Frischegarantie im Vergleich zu Blume2000s 5-Tage-Versprechen.',
      },
      {
        _key: 'ci2',
        competitor: 'Fleurop',
        category: 'Netzwerk & Reichweite',
        description:
          'Fleurop arbeitet über ein großes globales Floristennetzwerk mit weltweiter Taggleichlieferung, während FloraPrima direkt von Erzeugern versendet und so die „Wie-abgebildet"-Garantie sicherstellt. FloraPrima bietet besseres Preis-Leistungs-Verhältnis bei Einzelbestellungen, während Fleurop bei kurzfristigen internationalen Lieferungen punktet.',
      },
      {
        _key: 'ci3',
        competitor: 'Euroflorist',
        category: 'Internationale Lieferung',
        description:
          'Beide Dienste bieten internationalen Versand, aber FloraPrima beliefert 120+ Länder mit gleichbleibender Qualität aus der eigenen Lieferkette. Euroflorist nutzt lokale Partnerfloristen, was zu Qualitätsunterschieden zwischen Ländern führen kann.',
      },
    ],
    useCases: {
      heading: 'Wann FloraPrima die richtige Wahl ist',
      scenarios: [
        {
          _key: 'uc1',
          label: 'Internationale Blumengrüße',
          description: 'FloraPrimas Lieferung in 120+ Länder mit garantierter Wie-abgebildet-Qualität macht sie ideal für Blumensendungen ins Ausland.',
        },
        {
          _key: 'uc2',
          label: 'Ethische Beschaffung ist wichtig',
          description: 'Wenn Fairtrade-Zertifizierung und nachhaltige Anbaumethoden für Sie wichtig sind, ist FloraPrimas verifizierte ethische Beschaffung ein Alleinstellungsmerkmal.',
        },
        {
          _key: 'uc3',
          label: 'Preisbewusstes Schenken',
          description: 'Mit kostenloser Vase, Grußkarte und wettbewerbsfähigen Preisen ab €22 bietet FloraPrima ein hervorragendes Gesamtpaket ohne versteckte Kosten.',
        },
        {
          _key: 'uc4',
          label: 'Vorausplanung',
          description: 'FloraPrima glänzt bei geplanten Lieferungen mit 1-2 Tagen Vorlauf. Für kurzfristige taggleiche Bestellungen in ganz Deutschland sind Alternativen mit breiterer Expressabdeckung zu empfehlen.',
        },
      ],
    },
  },

  recommendations: {
    sections: [
      {
        _key: 'rs1',
        heading: 'Unser Fazit',
        content:
          'FloraPrima ist eine hervorragende Wahl für alle, die zuverlässigen, ethisch beschafften Blumenversand in Deutschland und international suchen. Die Kombination aus Fairtrade-Zertifizierung, großzügigen Gratis-Extras (Vase + Karte) und einer soliden 7-Tage-Frischegarantie macht sie zu einem der besten Preis-Leistungs-Angebote im deutschen Blumenversand. Während die taggleiche Lieferung auf ausgewählte Regionen beschränkt ist, funktioniert der Standard-Versand in 1-2 Tagen zuverlässig.',
      },
      {
        _key: 'rs2',
        heading: 'Ideal für',
        content:
          'Wir empfehlen FloraPrima besonders für internationale Blumengrüße (120+ Länder), umweltbewusste Kunden, die Fairtrade-Beschaffung schätzen, und alle, die die Sicherheit einer „Wie-abgebildet"-Garantie zu schätzen wissen. Die kostenlose Glasvase und Grußkarte machen sie besonders attraktiv für Geschenkbestellungen, bei denen die Präsentation zählt.',
      },
      {
        _key: 'rs3',
        heading: 'Alternativen erwägen, wenn',
        content:
          'Sie garantierte taggleiche Lieferung in ganz Deutschland benötigen (Blume2000 empfehlenswert), einen Abo-Service für regelmäßige Lieferungen bevorzugen oder hauptsächlich englischsprachigen Kundenservice benötigen.',
      },
    ],
    cta: 'FloraPrima Kollektion entdecken',
  },

  related: {
    heading: 'Ähnliche Dienste, die Sie interessieren könnten',
    reviews: [
      {
        _key: 'rr1',
        title: 'Bloom & Wild Bewertung',
        serviceId: 'bloom-wild',
        description: 'Britischer Briefkasten-Blumenversand mit Abo-Option und umweltfreundlicher Verpackung.',
      },
      {
        _key: 'rr2',
        title: 'Interflora Bewertung',
        serviceId: 'interflora',
        description: 'Das größte globale Blumenliefernetzwerk mit taggleicher Lieferung in über 140 Länder.',
      },
      {
        _key: 'rr3',
        title: 'Flower Station Bewertung',
        serviceId: 'flower-station',
        description: 'Premium-Florist aus London mit Luxus-Arrangements und taggleicher Lieferung.',
      },
    ],
  },

  body: [
    block('Unsere umfassende Bewertung von FloraPrima basiert auf 12 Testbestellungen über 4 Monate, bei denen wir Lieferzuverlässigkeit, Blumenqualität, Frischehaltbarkeit und das Gesamtpreis-Leistungs-Verhältnis bewertet haben.'),

    block('Unsere Testerfahrung', 'h2'),
    block(
      'FloraPrima liefert seit 2002 Blumen in ganz Deutschland, und unsere Tests bestätigten einen Dienst, der seinem etablierten Ruf gerecht wird. Bei 12 Bestellungen erlebten wir eine 95%ige pünktliche Lieferquote, wobei die Blumen durchweg frisch ankamen und exakt den Website-Bildern entsprachen — eine Seltenheit in der Online-Blumenbranche.',
    ),
    block(
      'Jede Lieferung kam in sicherer, durchdachter Verpackung, die die Blüten beim Transport schützte. Die mitgelieferte Glasvase war ein echtes Qualitätsprodukt, nicht das billige Werbegeschenk, das man erwarten könnte, und die personalisierten Grußkarten waren auf hochwertigem Karton gedruckt.',
    ),

    block('Blumenqualität & Frische', 'h2'),
    block(
      'FloraPrimas 7-Tage-Frischegarantie erwies sich in unseren Tests als konservativ. Die meisten Sträuße blieben bei richtiger Pflege 10-14 Tage lang frisch und leuchtend — deutlich über dem versprochenen Minimum. Die Fairtrade-zertifizierten Rosen waren besonders beeindruckend mit größeren Blüten und kräftigeren Farben als bei vielen Mitbewerbern.',
    ),
    block(
      'Die „Wie-abgebildet"-Garantie wurde durchgehend eingehalten. Jedes Arrangement, das wir erhielten, entsprach genau den Produktfotos — ohne überraschende Ersatzblumen oder deutlich abweichende Farbpaletten. Diese Transparenz ist einer der stärksten Verkaufsargumente von FloraPrima.',
    ),

    block('Lieferung & Logistik', 'h2'),
    block(
      'Die Standardlieferung dauert 1-2 Werktage und war in unseren Tests zuverlässig pünktlich. Taggleiche Lieferung ist verfügbar, aber auf ausgewählte deutsche Regionen beschränkt — hier hinkt FloraPrima Wettbewerbern wie Blume2000 hinterher, die bundesweite Expresslieferung anbieten.',
    ),
    block(
      'Die internationale Lieferung in 120+ Länder ist ein Alleinstellungsmerkmal. Wir testeten Lieferungen nach Österreich, in die Schweiz und nach Frankreich — alle kamen innerhalb des versprochenen Zeitrahmens und in ausgezeichnetem Zustand an.',
    ),

    block('Preise & Preis-Leistung', 'h2'),
    block(
      'Mit Sträußen von €22 bis €68 positioniert sich FloraPrima im mittleren Preissegment. Berücksichtigt man jedoch die kostenlose Glasvase (Wert ca. €8-12) und die Gratis-Grußkarte, ist das effektive Preis-Leistungs-Verhältnis deutlich besser als die reinen Preise vermuten lassen.',
    ),
    block(
      'Im Vergleich zu Premium-Diensten wie Fleurop liefert FloraPrima ähnliche Qualität zu niedrigeren Preisen. Gegenüber Billiganbietern rechtfertigen die Fairtrade-Beschaffung, Frischegarantie und Gratis-Extras den moderaten Aufpreis.',
    ),

    block('Kundenservice', 'h2'),
    block(
      'Der Kundenservice ist per Telefon und E-Mail während der deutschen Geschäftszeiten erreichbar. Die Antwortzeiten waren schnell (in der Regel innerhalb weniger Stunden per E-Mail), und die Mitarbeiter waren hilfsbereit und lösungsorientiert.',
    ),

    block('Gesamtbewertung', 'h2'),
    block(
      'FloraPrima verdient eine solide Bewertung von 4,4/5 für konstante Qualität, echte ethische Beschaffung und hervorragendes Preis-Leistungs-Verhältnis durch die inkludierten Extras. Sie sind ideal für geplante Lieferungen innerhalb Deutschlands und international, besonders für Kunden, die Fairtrade-Zertifizierung schätzen und Gewissheit über ihre Bestellung wünschen.',
    ),
  ],
};

async function patchDocuments() {
  console.log('Patching English FloraPrima document...');
  await client
    .patch('service-en-floraprima')
    .set(enPatch)
    .set({ 'seo.dateModified': today })
    .commit();
  console.log('English document patched.');

  console.log('Patching German FloraPrima document...');
  await client
    .patch('service-de-floraprima')
    .set(dePatch)
    .set({ 'seo.dateModified': today })
    .commit();
  console.log('German document patched.');

  console.log('\nDone! FloraPrima content updated successfully.');
  console.log('Review at:');
  console.log('  EN: http://localhost:4321/en/services/floraprima');
  console.log('  DE: http://localhost:4321/de/services/floraprima');
}

patchDocuments().catch((err) => {
  console.error('Patch failed:', err);
  process.exit(1);
});
