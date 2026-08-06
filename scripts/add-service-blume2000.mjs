#!/usr/bin/env node

/**
 * Migration script: Add Blume2000 flower delivery service to Sanity CMS (German only)
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/add-service-blume2000.mjs
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
  const slug = 'blume2000';
  const today = new Date().toISOString().split('T')[0];

  // --- Upload logo ---
  console.log('Uploading logo...');
  const logoStream = fs.createReadStream(path.join(__dirname, 'blume2000-logo.png'));
  const logoAsset = await client.assets.upload('image', logoStream, {
    filename: 'blume2000-logo.png',
    contentType: 'image/png',
  });
  console.log(`Logo uploaded: ${logoAsset._id}`);

  console.log('Uploading hero image...');
  const heroStream = fs.createReadStream(path.join(__dirname, 'blume2000-hero.jpg'));
  const heroAsset = await client.assets.upload('image', heroStream, {
    filename: 'blume2000-hero.jpg',
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
      name: 'Blume2000',
      title: 'Blume2000 Bewertung 2025 – Blumenversand mit Filialnetz & Blitzlieferung | Florize',
      description:
        'Blume2000 im Test: Über 50 Jahre Erfahrung, rund 250 Filialen, 7-Tage-Frische-Garantie und taggleiche Blitzlieferung in vielen Städten. Blumenversand ab 19,99 €.',
      logo: { _type: 'image', asset: { _ref: logoAsset._id, _type: 'reference' } },
      heroImage: { _type: 'image', asset: { _ref: heroAsset._id, _type: 'reference' } },
      rating: 4.7,
      priceRange: '€19,99–€44,99',
      deliveryOptions: [
        'DHL Standardversand (nächster Werktag möglich)',
        'DHL Express zum Wunschtermin',
        'Taggleiche Blitzlieferung in vielen Städten',
      ],
      keyFeatures: [
        '7-Tage-Frische-Garantie',
        'Rund 250 Filialen in Deutschland',
        'Von Floristen handgebunden',
        'Regional, plastikfrei, nachhaltig',
        'Bestellung bis 18 Uhr für Lieferung am nächsten Werktag',
      ],
      founded: 1974,
    },
    seo: {
      keywords:
        'Blume2000 Bewertung, Blume2000 Erfahrungen, Blumenversand, Blumen verschicken, Blumen online bestellen, Blitzlieferung Blumen, Blumen same day',
      datePublished: today,
      dateModified: today,
    },
    summary: {
      bestFor: 'Schnelle, unkomplizierte Blumenlieferung in ganz Deutschland — auch taggleich in vielen Städten',
      delivery: 'DHL-Versand am nächsten Werktag (Bestellung bis 18 Uhr), Express zum Wunschtermin, Blitzlieferung über das Filialnetz',
      ratingText:
        'Traditionsmarke mit über 50 Jahren Erfahrung, dichtem Filialnetz, verlässlicher Frische und fairen Preisen',
    },
    overview: {
      positioning:
        'Deutschlands bekannteste Blumenmarke mit Filialnetz und Online-Versand',
      content: [
        block(
          'Blume2000 ist seit 1974 im Blumengeschäft und damit eine der ältesten und bekanntesten Blumenmarken Deutschlands. Was als Hamburger Fachgeschäft begann, ist heute ein Omnichannel-Anbieter mit rund 250 Filialen und einem bundesweiten Online-Blumenversand. Diese Kombination aus stationärem Handel und Versandservice unterscheidet Blume2000 von reinen Online-Anbietern.',
        ),
        block(
          'Der Online-Versand liefert per DHL bundesweit — bei Bestellung bis 18 Uhr werktags ist die Zustellung bereits am nächsten Werktag möglich. In vielen Städten geht es noch schneller: Über das Filialnetz bietet Blume2000 eine taggleiche Blitzlieferung an, bei der der Strauß aus einer Filiale vor Ort zugestellt wird.',
        ),
        block(
          'Alle Sträuße werden von Floristen handgebunden und kommen mit einer 7-Tage-Frische-Garantie. Beim Einkauf setzt Blume2000 zunehmend auf regionale Gärtnereien und wirbt mit dem Dreiklang "regional, plastikfrei, nachhaltig" — die Filialen, Lager und die Zentrale werden mit erneuerbarer Energie betrieben.',
        ),
        block(
          'Preislich bewegt sich Blume2000 im zugänglichen Mittelfeld: Sträuße starten bei rund 19,99 € und reichen bis etwa 44,99 € für Premium-Arrangements. Damit ist die Marke eine solide Wahl für alle, die ohne Umwege frische Blumen verschicken möchten — vom spontanen Gruß bis zum Geburtstagsstrauß.',
        ),
      ],
    },
    components: {
      prosTitle: 'Warum wir Blume2000 empfehlen',
      consTitle: 'Verbesserungspotential',
      pros: [
        {
          _key: 'p1',
          label: 'Taggleiche Blitzlieferung',
          description: 'In vielen deutschen Städten wird der Strauß über das Filialnetz noch am selben Tag zugestellt',
        },
        {
          _key: 'p2',
          label: '7-Tage-Frische-Garantie',
          description: 'Garantierte Frische über mindestens 7 Tage nach Lieferung — von Floristen handgebundene Sträuße',
        },
        {
          _key: 'p3',
          label: 'Über 50 Jahre Erfahrung',
          description: 'Seit 1974 am Markt und mit rund 250 Filialen eine der vertrautesten Blumenmarken Deutschlands',
        },
        {
          _key: 'p4',
          label: 'Schneller Standardversand',
          description: 'Bestellung bis 18 Uhr werktags ermöglicht die Zustellung per DHL bereits am nächsten Werktag',
        },
        {
          _key: 'p5',
          label: 'Nachhaltiger Einkauf',
          description: 'Zunehmend regionale Gärtnereien, plastikfreie Verpackung und erneuerbare Energie in Filialen und Logistik',
        },
      ],
      cons: [
        {
          _key: 'c1',
          label: 'Versandkosten extra',
          description: 'DHL-Standardversand kostet 5,95 €, der Express-Aufschlag für die Wunschtermin-Garantie 6,55 €',
        },
        {
          _key: 'c2',
          label: 'Terminzusage nur per Express',
          description: 'Beim Standardversand sind Verzögerungen von 1-2 Werktagen möglich — die garantierte Wunschtermin-Lieferung kostet Aufpreis',
        },
        {
          _key: 'c3',
          label: 'Kein internationaler Versand',
          description: 'Der Versand konzentriert sich auf Deutschland und Österreich — weltweite Lieferung ist nicht möglich',
        },
      ],
      faqs: [
        {
          _key: 'f1',
          question: 'Liefert Blume2000 noch am selben Tag?',
          answer:
            'Ja, in vielen deutschen Städten bietet Blume2000 eine taggleiche Blitzlieferung über das Filialnetz an. Die Bestellfrist liegt je nach Stadt bei 12 bzw. 16 Uhr an Werktagen.',
        },
        {
          _key: 'f2',
          question: 'Was kostet der Versand bei Blume2000?',
          answer:
            'Der DHL-Standardversand kostet 5,95 €. Für die garantierte Lieferung zum Wunschtermin fällt ein DHL-Express-Aufschlag von 6,55 € an.',
        },
        {
          _key: 'f3',
          question: 'Wie schnell liefert Blume2000?',
          answer:
            'Bei Bestellung bis 18 Uhr werktags ist die Zustellung per DHL bereits am nächsten Werktag möglich. Geliefert wird Montag bis Samstag, nicht an Sonn- und Feiertagen.',
        },
        {
          _key: 'f4',
          question: 'Was beinhaltet die 7-Tage-Frische-Garantie?',
          answer:
            'Blume2000 garantiert, dass die gelieferten Blumen mindestens 7 Tage frisch bleiben. Sollte das nicht der Fall sein, hilft der Kundenservice mit Ersatz oder Erstattung.',
        },
        {
          _key: 'f5',
          question: 'Hat Blume2000 auch Ladengeschäfte?',
          answer:
            'Ja, Blume2000 betreibt rund 250 Filialen in ganz Deutschland. Die Kombination aus Filialnetz und Online-Versand ermöglicht unter anderem die taggleiche Blitzlieferung in vielen Städten.',
        },
      ],
      testingMetrics: [
        { _key: 'tm1', icon: '🏬', label: 'Filialnetz', value: '~250', description: 'Filialen in ganz Deutschland' },
        { _key: 'tm2', icon: '⚡', label: 'Blitzlieferung', value: 'Taggleich', description: 'In vielen Städten verfügbar' },
        { _key: 'tm3', icon: '🌸', label: 'Frischegarantie', value: '7 Tage', description: 'Garantiert oder Ersatz' },
        { _key: 'tm4', icon: '📅', label: 'Erfahrung', value: '50+ Jahre', description: 'Gegründet 1974 in Hamburg' },
        { _key: 'tm5', icon: '💰', label: 'Preisbereich', value: '€19,99+', description: 'Sträuße ab knapp 20 €' },
        { _key: 'tm6', icon: '🌱', label: 'Nachhaltigkeit', value: 'Hoch', description: 'Regional, plastikfrei, Ökostrom' },
      ],
      featureComparison: {
        _type: 'featureComparison',
        competitorName: 'Blumenshop.de',
        winner: 'service',
        features: [
          { _key: 'fc0', feature: 'Bewertung', serviceValue: '4,7/5', competitorValue: '4,6/5' },
          { _key: 'fc1', feature: 'Frischegarantie', serviceValue: '7-Tage-Garantie', competitorValue: '7-Tage-Garantie' },
          { _key: 'fc2', feature: 'Taggleiche Lieferung', serviceValue: 'Blitzlieferung in vielen Städten', competitorValue: 'Nicht verfügbar' },
          { _key: 'fc3', feature: 'Filialnetz', serviceValue: '~250 Filialen', competitorValue: 'Nur online' },
          { _key: 'fc4', feature: 'Wunschtermin-Garantie', serviceValue: 'Per DHL Express (+6,55 €)', competitorValue: 'Expresslieferung (11,95 €)' },
          { _key: 'fc5', feature: 'Liefergebiet', serviceValue: 'DE, AT', competitorValue: 'DE, BE, NL' },
          { _key: 'fc6', feature: 'Einstiegspreis', serviceValue: '€19,99', competitorValue: '€19,95' },
          { _key: 'fc7', feature: 'Videobotschaft', serviceValue: 'Nicht verfügbar', competitorValue: 'Kostenlos per QR-Code' },
          { _key: 'fc8', feature: 'Versandkosten', serviceValue: '5,95 € / +6,55 €', competitorValue: '5,95 € / 11,95 €' },
        ],
      },
    },
    comparisons: {
      items: [
        {
          _key: 'ci1',
          competitor: 'Blumenshop.de',
          category: 'Geschwindigkeit & Filialnetz',
          description:
            'Blume2000 punktet mit der taggleichen Blitzlieferung über das eigene Filialnetz — das bietet Blumenshop.de nicht. Dafür glänzt Blumenshop.de mit mehr Testsiegen und der kostenlosen Videobotschaft. Wer es eilig hat, wählt Blume2000; wer termingenau plant, fährt mit beiden gut.',
        },
        {
          _key: 'ci2',
          competitor: 'FloraPrima',
          category: 'Reichweite & Frische',
          description:
            'FloraPrima liefert in über 120 Länder und legt eine Gratis-Vase bei, versendet aber nur per Paketdienst. Blume2000 konzentriert sich auf Deutschland und Österreich, bietet dafür aber taggleiche Lieferung und ein stationäres Filialnetz mit über 50 Jahren Markengeschichte.',
        },
        {
          _key: 'ci3',
          competitor: 'Fleurop',
          category: 'Liefermodell',
          description:
            'Beide setzen auf lokale Zustellung: Fleurop über ein Partnernetz selbstständiger Floristen weltweit, Blume2000 über eigene Filialen in Deutschland. Blume2000 ist im Schnitt günstiger und die Sträuße sind standardisiert "wie abgebildet", während Fleurop bei internationalen Sendungen die Nase vorn hat.',
        },
      ],
      useCases: {
        heading: 'Wann Blume2000 die richtige Wahl ist',
        scenarios: [
          {
            _key: 'uc1',
            label: 'Spontane Geschenke',
            description: 'Dank taggleicher Blitzlieferung in vielen Städten und nächster-Werktag-Versand bis 18 Uhr ist Blume2000 ideal für kurzfristige Anlässe.',
          },
          {
            _key: 'uc2',
            label: 'Vertraute Marke',
            description: 'Wer eine seit Jahrzehnten etablierte Marke mit Filialen vor Ort bevorzugt, findet bei Blume2000 die Sicherheit eines bekannten Namens.',
          },
          {
            _key: 'uc3',
            label: 'Nachhaltigkeitsbewusste Käufer',
            description: 'Regionale Gärtnereien, plastikfreie Verpackung und erneuerbare Energie machen Blume2000 zu einer der nachhaltigeren Optionen im Markt.',
          },
          {
            _key: 'uc4',
            label: 'Preisbewusste Bestellungen',
            description: 'Mit Sträußen ab 19,99 € und moderaten Versandkosten bleibt Blume2000 auch für kleinere Budgets attraktiv.',
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
            'Blume2000 kombiniert die Stärken eines Traditionsunternehmens mit einem modernen Online-Versand. Die taggleiche Blitzlieferung über das Filialnetz, die 7-Tage-Frische-Garantie und faire Preise ab 19,99 € machen den Anbieter zu einer der zuverlässigsten Adressen für Blumenversand innerhalb Deutschlands.',
        },
        {
          _key: 'rs2',
          heading: 'Ideal für',
          content:
            'Besonders empfehlenswert für spontane Anlässe, bei denen der Strauß noch heute oder morgen ankommen soll, sowie für Käufer, die einer etablierten Marke mit Ladengeschäften vor Ort vertrauen. Auch nachhaltigkeitsbewusste Kunden werden durch regionalen Einkauf und plastikfreie Verpackung gut bedient.',
        },
        {
          _key: 'rs3',
          heading: 'Alternativen erwägen, wenn',
          content:
            'Sie international verschicken möchten (FloraPrima oder Fleurop sind hier stärker), eine kostenlose Videobotschaft wünschen oder eine garantierte Wunschtermin-Lieferung ohne Express-Aufpreis suchen (Blumenshop.de).',
        },
      ],
      cta: 'Blume2000 Sortiment entdecken',
    },
    related: {
      heading: 'Ähnliche Dienste, die Sie interessieren könnten',
      reviews: [
        {
          _key: 'rr1',
          title: 'Blumenshop.de Bewertung',
          serviceId: 'blumenshop',
          description: 'Mehrfach ausgezeichneter Blumenversand mit Wunschtermin-Lieferung und kostenloser Videobotschaft.',
        },
        {
          _key: 'rr2',
          title: 'FloraPrima Bewertung',
          serviceId: 'floraprima',
          description: 'Deutscher Blumenversand mit Fairtrade-Rosen, gratis Vase und Lieferung in über 120 Länder.',
        },
        {
          _key: 'rr3',
          title: 'Interflora Bewertung',
          serviceId: 'interflora',
          description: 'Das größte globale Blumenliefernetzwerk mit taggleicher Lieferung in über 140 Länder.',
        },
      ],
    },
    affiliate: {
      url: 'https://www.awin1.com/cread.php?awinmid=11886&awinaffid=1978379',
    },
    body: [
      block(
        'Unser umfassender Test von Blume2000 bewertet das Angebot einer der bekanntesten deutschen Blumenmarken — mit Fokus auf Liefergeschwindigkeit, Frische, Nachhaltigkeit und Preis-Leistungs-Verhältnis im Wettbewerbsumfeld.',
      ),

      block('Markenposition und Geschichte', 'h2'),
      block(
        'Blume2000 wurde 1974 in Hamburg gegründet und hat sich in über 50 Jahren zu einer der vertrautesten Blumenmarken Deutschlands entwickelt. Die BLUME2000 SE mit Sitz in Norderstedt betreibt heute rund 250 Filialen im gesamten Bundesgebiet — vom Bahnhofsgeschäft bis zum Einkaufszentrum. Kaum ein anderer Anbieter verbindet stationären Blumenhandel und Online-Versand in dieser Größenordnung.',
      ),
      block(
        'Diese Omnichannel-Aufstellung ist mehr als ein Marketingargument: Das Filialnetz ermöglicht die taggleiche Blitzlieferung in vielen Städten und gibt Kunden die Sicherheit, hinter dem Online-Shop ein greifbares Unternehmen mit jahrzehntelanger Floristik-Erfahrung zu wissen.',
      ),

      block('Frische und Qualität', 'h2'),
      block(
        'Alle Sträuße werden von Floristen handgebunden — im Versandzentrum oder direkt in der Filiale. Blume2000 gewährt eine 7-Tage-Frische-Garantie: Welken die Blumen vorher, hilft der Kundenservice mit Ersatz oder Erstattung. Beim Einkauf setzt das Unternehmen nach eigenen Angaben zunehmend auf regionale Gärtnereien und langjährige Lieferbeziehungen mit zertifizierten Anbaustandards.',
      ),

      block('Lieferung: Standard, Express und Blitzlieferung', 'h2'),
      block(
        'Der Standardversand läuft über DHL und kostet 5,95 €. Bei Bestellung bis 18 Uhr werktags ist die Zustellung am nächsten Werktag möglich; geliefert wird Montag bis Samstag. Wichtig zu wissen: Beim Standardversand kann sich die Zustellung um 1-2 Werktage verschieben — wer eine garantierte Lieferung zum Wunschtermin braucht, wählt den DHL-Express-Aufschlag von 6,55 €.',
      ),
      block(
        'Das Alleinstellungsmerkmal ist die Blitzlieferung: In vielen deutschen Städten wird der Strauß aus einer Filiale vor Ort noch am selben Tag zugestellt. Die Bestellfristen liegen je nach Stadt bei 12 bzw. 16 Uhr an Werktagen. Für spontane Geburtstagsgrüße oder Entschuldigungen ist das ein echter Vorteil gegenüber reinen Versand-Anbietern.',
      ),

      block('Nachhaltigkeit', 'h2'),
      block(
        'Blume2000 positioniert sich mit dem Dreiklang "regional, plastikfrei, nachhaltig". Der Anteil an Blumen und Pflanzen aus regionalen Gärtnereien wächst jährlich, die Verpackung kommt ohne Plastik aus, und Filialen, Lager sowie die Zentrale werden mit erneuerbarer Energie betrieben. Über Produktpartnerschaften unterstützt das Unternehmen zudem Naturschutzprojekte wie den Verein Flowers4Bees.',
      ),

      block('Sortiment und Preise', 'h2'),
      block(
        'Das Sortiment umfasst Schnittblumen, Sträuße, Trockenblumen, Kränze, Topfpflanzen und Geschenksets. Klassische Sträuße starten bei rund 19,99 €, Premium-Arrangements reichen bis etwa 44,99 € — kleinere Aufmerksamkeiten gibt es schon für unter 10 €. Damit liegt Blume2000 preislich im zugänglichen Mittelfeld und unterbietet viele Premium-Versender.',
      ),
      block(
        'Wer regelmäßig bestellt, profitiert vom Newsletter-Rabatt von 15 % auf die erste Bestellung und der Blume2000-App für iOS und Android, über die sich auch die Blitzlieferung unkompliziert buchen lässt.',
      ),

      block('Kundenservice und Erfahrungen', 'h2'),
      block(
        'Der deutschsprachige Kundenservice ist per E-Mail und Telefon erreichbar. Durch das Filialnetz gibt es zudem eine Anlaufstelle vor Ort — ein Vorteil, den reine Online-Versender nicht bieten. Reklamationen im Rahmen der Frische-Garantie werden nach unserer Einschätzung kulant behandelt, wie es sich für eine Marke mit diesem Bekanntheitsgrad gehört.',
      ),

      block('Gesamtbewertung', 'h2'),
      block(
        'Blume2000 erhält eine Bewertung von 4,7/5. Die Kombination aus taggleicher Blitzlieferung, schnellem Standardversand, 7-Tage-Frische-Garantie und über 50 Jahren Markengeschichte macht den Anbieter zu einer der besten Optionen für Blumenversand innerhalb Deutschlands. Abstriche gibt es beim fehlenden internationalen Versand und der nur gegen Aufpreis garantierten Wunschtermin-Lieferung — innerhalb Deutschlands ist Blume2000 jedoch eine klare Empfehlung.',
      ),
    ],
  };

  // --- Create document ---
  console.log('Creating German service document...');
  await client.createOrReplace(deDoc);
  console.log(`Created: ${deDoc._id}`);

  console.log('\nDone! Blume2000 service added successfully.');
  console.log(`\nReview at:`);
  console.log(`  DE: http://localhost:4321/de/services/${slug}`);
}

addService().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
