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

  console.log('Uploading hero image...');
  const heroStream = fs.createReadStream(path.join(__dirname, 'blumenshop-hero.jpg'));
  const heroAsset = await client.assets.upload('image', heroStream, {
    filename: 'blumenshop-hero.jpg',
    contentType: 'image/jpeg',
  });
  console.log(`Hero image uploaded: ${heroAsset._id}`);

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
      heroImage: { _type: 'image', asset: { _ref: heroAsset._id, _type: 'reference' } },
      rating: 4.6,
      priceRange: '€19,95–€49,95',
      deliveryOptions: ['Standardversand (1-2 Werktage)', 'Expresslieferung zum Wunschtermin', 'Versand nach DE, BE & NL'],
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
        'Mehrfach ausgezeichneter Blumenversand mit Wunschtermin-Lieferung',
      content: [
        block(
          'Blumenshop.de zählt zu den bekanntesten deutschen Online-Blumenversendern und überzeugt seit Jahren mit einer Kombination aus Frische, Termintreue und persönlicher Note. Der Anbieter liefert Sträuße zum exakt gewünschten Wunschtermin nach Deutschland, Belgien und in die Niederlande — ein Service, der besonders bei Geburtstagen, Jahrestagen und Trauerfeiern entscheidend ist.',
        ),
        block(
          'Was Blumenshop.de von vielen Wettbewerbern abhebt, ist das Konzept "Frisch vom Züchter": Die Blumen kommen direkt aus europäischen Gärtnereien und werden in regionalen Bindereien zu Sträußen verarbeitet. Diese kurzen Wege sorgen dafür, dass die Blumen länger halten — die 7-Tage-Frischegarantie ist ein Versprechen, das auf einem stabilen Liefermodell basiert.',
        ),
        block(
          'Ein weiteres Alleinstellungsmerkmal ist die kostenlose Videobotschaft per QR-Code: Empfänger können einen persönlichen Videogruß direkt am Strauß abrufen. Zusammen mit der inklusiven Chrysal-Blumennahrung und der hochwertigen Verpackung entsteht ein Premium-Erlebnis zu fairen Preisen.',
        ),
        block(
          'Die zahlreichen Auszeichnungen — Deutschland Test 2025 als bester Online-Blumenhändler, DtGV-Testsieg 2024, ComputerBild TopShop 2024-2026 sowie das Trusted-Shops-Excellent-Siegel mit über 30.000 Bewertungen — bestätigen die Konstanz der Servicequalität über Jahre hinweg.',
        ),
      ],
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
          description: 'Kostenlose Videobotschaft per QR-Code oder klassische Grußkarte zur Personalisierung jeder Bestellung',
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
      testingMetrics: [
        { _key: 'tm1', icon: '🏆', label: 'Auszeichnungen', value: '5+', description: 'Deutschland Test, DtGV u.a.' },
        { _key: 'tm2', icon: '🚚', label: 'Termintreue', value: 'Sehr hoch', description: 'Lieferung zum Wunschtag' },
        { _key: 'tm3', icon: '🌸', label: 'Frischegarantie', value: '7 Tage', description: 'Garantiert oder Erstattung' },
        { _key: 'tm4', icon: '⭐', label: 'Trusted Shops', value: 'Excellent', description: '30.000+ Bewertungen' },
        { _key: 'tm5', icon: '💰', label: 'Preisbereich', value: '€19,95+', description: 'Sträuße ab knapp 20 €' },
        { _key: 'tm6', icon: '🌍', label: 'Liefergebiet', value: 'DE, BE, NL', description: 'Drei Länder im Versand' },
      ],
      featureComparison: {
        _type: 'featureComparison',
        competitorName: 'FloraPrima',
        winner: 'service',
        features: [
          { _key: 'fc1', feature: 'Frischegarantie', serviceValue: '7-Tage-Garantie', competitorValue: '7-Tage-Garantie' },
          { _key: 'fc2', feature: 'Termingenaue Lieferung', serviceValue: 'Wunschtermin-Versand', competitorValue: 'Standard 1-2 Werktage' },
          { _key: 'fc3', feature: 'Persönliche Videobotschaft', serviceValue: 'Kostenlos per QR-Code', competitorValue: 'Nicht verfügbar' },
          { _key: 'fc4', feature: 'Liefergebiet', serviceValue: 'DE, BE, NL', competitorValue: '120+ Länder' },
          { _key: 'fc5', feature: 'Einstiegspreis', serviceValue: '€19,95', competitorValue: '€22' },
          { _key: 'fc6', feature: 'Frisch vom Züchter', serviceValue: 'Ja, regionale Bindereien', competitorValue: 'Direktbezug' },
          { _key: 'fc7', feature: 'Auszeichnungen', serviceValue: 'Mehrfach (DtGV, Dt. Test)', competitorValue: 'Vereinzelte' },
          { _key: 'fc8', feature: 'Versandkosten', serviceValue: '5,95 € / 11,95 €', competitorValue: 'Variabel' },
        ],
      },
    },
    comparisons: {
      items: [
        {
          _key: 'ci1',
          competitor: 'FloraPrima',
          category: 'Termintreue & Personalisierung',
          description:
            'Blumenshop.de punktet mit termingenauer Lieferung am Wunschtag und kostenlosen Videobotschaften per QR-Code. FloraPrima bietet dafür einen größeren internationalen Versand. Wer Wert auf das genaue Lieferdatum und persönliche Extras legt, ist bei Blumenshop.de besser aufgehoben.',
        },
        {
          _key: 'ci2',
          competitor: 'Blume2000',
          category: 'Auszeichnungen & Frische',
          description:
            'Während Blume2000 mit bundesweiter taggleicher Lieferung punktet, glänzt Blumenshop.de mit zahlreichen Testsiegen (Deutschland Test 2025, DtGV 2024) und der direkten Beschaffung vom Züchter. Beide sind etablierte deutsche Marken — Blumenshop.de hat aktuell den besseren Track Record bei unabhängigen Tests.',
        },
        {
          _key: 'ci3',
          competitor: 'Fleurop',
          category: 'Geschäftsmodell',
          description:
            'Fleurop arbeitet mit einem Floristennetzwerk, das taggleiche Lieferung weltweit ermöglicht. Blumenshop.de versendet selbst direkt vom Züchter mit garantierter "wie abgebildet"-Qualität. Für planbare Geschenke ist Blumenshop.de zuverlässiger und günstiger, Fleurop ist die Wahl bei spontanen internationalen Sendungen.',
        },
      ],
      useCases: {
        heading: 'Wann Blumenshop.de die richtige Wahl ist',
        scenarios: [
          {
            _key: 'uc1',
            label: 'Termingebundene Anlässe',
            description: 'Wenn der Strauß exakt am Geburtstag oder Jahrestag ankommen muss, ist die Wunschtermin-Lieferung von Blumenshop.de unschlagbar.',
          },
          {
            _key: 'uc2',
            label: 'Persönliche Geschenke',
            description: 'Die kostenlose Videobotschaft per QR-Code ist ein einmaliges Feature, das jedem Strauß eine sehr persönliche Note verleiht.',
          },
          {
            _key: 'uc3',
            label: 'Qualitätsbewusste Käufer',
            description: 'Mehrfache Testsiege und eine 7-Tage-Frischegarantie sprechen für Käufer, die bei Blumen keine Kompromisse eingehen wollen.',
          },
          {
            _key: 'uc4',
            label: 'Versand in DE, BE, NL',
            description: 'Innerhalb des Liefergebiets ist Blumenshop.de eine erste Wahl. Für internationale Sendungen außerhalb dieser drei Länder ist FloraPrima die bessere Alternative.',
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
            'Blumenshop.de ist einer der stärksten deutschen Blumenversender, wenn es auf Termintreue, Frische und persönliche Extras ankommt. Die Kombination aus mehrfachen Testsiegen, der kostenlosen Videobotschaft, der Lieferung zum Wunschtermin und der 7-Tage-Frischegarantie macht den Service zu einer hervorragenden Wahl für geplante Geschenkanlässe in Deutschland, Belgien und den Niederlanden.',
        },
        {
          _key: 'rs2',
          heading: 'Ideal für',
          content:
            'Besonders empfehlenswert für termingebundene Anlässe wie Geburtstage, Jahrestage oder Trauerfeiern, bei denen die Lieferung exakt am gewünschten Tag eintreffen muss. Die persönliche Videobotschaft per QR-Code macht den Service außerdem zur ersten Wahl, wenn das Geschenk besonders emotional sein soll.',
        },
        {
          _key: 'rs3',
          heading: 'Alternativen erwägen, wenn',
          content:
            'Sie internationalen Versand außerhalb von Deutschland, Belgien und den Niederlanden benötigen (FloraPrima ist hier stärker), ein regelmäßiges Blumenabo bevorzugen oder bundesweite taggleiche Lieferung an einem beliebigen Werktag suchen (Blume2000 oder Fleurop).',
        },
      ],
      cta: 'Blumenshop.de Sortiment entdecken',
    },
    related: {
      heading: 'Ähnliche Dienste, die Sie interessieren könnten',
      reviews: [
        {
          _key: 'rr1',
          title: 'FloraPrima Bewertung',
          serviceId: 'floraprima',
          description: 'Deutscher Blumenversand mit Fairtrade-Rosen, gratis Vase und Lieferung in über 120 Länder.',
        },
        {
          _key: 'rr2',
          title: 'Interflora Bewertung',
          serviceId: 'interflora',
          description: 'Das größte globale Blumenliefernetzwerk mit taggleicher Lieferung in über 140 Länder.',
        },
        {
          _key: 'rr3',
          title: 'Bloom & Wild Bewertung',
          serviceId: 'bloom-wild',
          description: 'Briefkasten-Blumenversand mit Abo-Option und umweltfreundlicher Verpackung.',
        },
      ],
    },
    affiliate: {
      url: 'https://www.blumenshop.de',
    },
    body: [
      block(
        'Unser umfassender Test von Blumenshop.de bewertet das Angebot eines der renommiertesten deutschen Online-Blumenversender — mit Fokus auf Frische, Termintreue, Personalisierungsoptionen und Preis-Leistungs-Verhältnis im Wettbewerbsumfeld.',
      ),

      block('Markenposition und Auszeichnungen', 'h2'),
      block(
        'Blumenshop.de hat sich in den letzten Jahren als einer der führenden deutschen Online-Blumenshops etabliert. Die zahlreichen Auszeichnungen sprechen eine klare Sprache: Deutschland Test 2025 als bester Online-Blumenhändler, DtGV-Testsieg 2024 als Gesamtkategoriesieger sowie das Prädikat ComputerBild TopShop für die Jahre 2024 bis 2026.',
      ),
      block(
        'Hinzu kommt das Trusted-Shops-Siegel "Excellent", basierend auf über 30.000 Kundenbewertungen mit fünf aufeinanderfolgenden Jahren der Auszeichnung. Diese Konsistenz ist im umkämpften Blumenversandmarkt selten und ein starkes Vertrauenssignal.',
      ),

      block('Frische und Qualität: "Frisch vom Züchter"', 'h2'),
      block(
        'Das Geschäftsmodell basiert auf einem Direktbezug von Blumen aus europäischen Gärtnereien, die anschließend in regionalen Bindereien zu Sträußen verarbeitet werden. Diese verkürzten Transportwege sind der Kern der 7-Tage-Frischegarantie: Sollten die Blumen vor Ablauf dieser Frist welken, erstattet Blumenshop.de den Kaufpreis oder schickt einen Ersatzstrauß.',
      ),
      block(
        'Jeder Lieferung liegt zudem Chrysal-Blumennahrung bei — ein Profi-Standard in der Floristikbranche, der die Haltbarkeit deutlich verlängert. Die Verpackung erfolgt in auslaufsicheren Frischehaltetaschen, was insbesondere für längere Versandwege ein Pluspunkt ist.',
      ),

      block('Lieferung und Termintreue', 'h2'),
      block(
        'Blumenshop.de bietet zwei Versandoptionen: Standardversand für 5,95 € (1-2 Werktage über DHL GoGreen) und Expresslieferung für 11,95 € (zugesichert am gewählten Wunschtermin über DPD). Letztere ist das Aushängeschild des Anbieters: Die termingenaue Lieferung am gewählten Tag ist in der Branche keine Selbstverständlichkeit und macht Blumenshop.de zur ersten Wahl für planbare Anlässe.',
      ),
      block(
        'Bei Bestellung bis 15 Uhr werktags wird der Strauß noch am selben Tag versandt. Das Liefergebiet umfasst Deutschland, Belgien und die Niederlande — eine sinnvolle Eingrenzung, die hohe Servicequalität ermöglicht, aber Kunden mit internationalen Empfängern einschränkt.',
      ),

      block('Personalisierung: Videobotschaft als USP', 'h2'),
      block(
        'Ein Alleinstellungsmerkmal von Blumenshop.de ist die kostenlose Videobotschaft per QR-Code: Empfänger können einen persönlichen Videogruß direkt vom Strauß abrufen. Alternativ steht die klassische Grußkarte zur Verfügung — ebenfalls kostenlos. Beide Optionen sind ab dem ersten Strauß inklusive und müssen nicht extra zugebucht werden.',
      ),
      block(
        'Die Briefcase-Box-Option erlaubt darüber hinaus die Zustellung direkt in den Briefkasten — praktisch, wenn der Empfänger nicht zu Hause ist. Diese Flexibilität wertet das Geschenkerlebnis spürbar auf.',
      ),

      block('Sortiment und Preise', 'h2'),
      block(
        'Das Sortiment startet bei 19,95 € für klassische Sträuße und reicht über Standardbouquets im Bereich von 27,95 € bis 42,95 € hinauf bis zu Premium-Rosenarrangements für bis zu 299 €. Die Preisspanne deckt sowohl Spontangeschenke als auch hochwertige Anlässe wie Hochzeiten oder Trauerfeiern ab.',
      ),
      block(
        'Im Vergleich zum Wettbewerb ist die Einstiegspreislage attraktiv. Wer den durchschnittlichen Strauß für 30-40 € plus Versandkosten kauft, bleibt im mittleren Marktsegment. Premium-Rosen sind teurer, dafür erhält man tatsächlich Premium-Qualität — kein Discount-Strauß im Premium-Mantel.',
      ),

      block('Kundenservice und Erfahrungen', 'h2'),
      block(
        'Der deutschsprachige Kundenservice ist über E-Mail und Telefon erreichbar. Die hohe Trusted-Shops-Bewertung mit dem "Excellent"-Siegel über fünf Jahre hinweg zeigt, dass Reklamationen in der Regel kulant und schnell bearbeitet werden — ein wichtiger Faktor bei einem verderblichen Produkt wie Schnittblumen.',
      ),

      block('Gesamtbewertung', 'h2'),
      block(
        'Blumenshop.de erhält eine Bewertung von 4,6/5. Die Kombination aus Termintreue, Frischegarantie, persönlichen Extras wie der Videobotschaft sowie den unabhängig bestätigten Auszeichnungen macht den Service zu einer der besten Optionen für Kunden in Deutschland, Belgien und den Niederlanden. Hauptmanko bleiben die Versandkosten und das eingeschränkte Liefergebiet — innerhalb dieser Grenzen ist Blumenshop.de jedoch eine klare Empfehlung.',
      ),
    ],
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
