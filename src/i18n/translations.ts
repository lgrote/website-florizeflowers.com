/**
 * UI Translations
 * All user-facing strings for the application
 */

import type { SupportedLanguage } from "./config";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    occasions: string;
    guides: string;
    about: string;
    contact: string;
    allServices: string;
    allOccasions: string;
    review: string; // Suffix for service names
    flowers: string; // Suffix for occasion names
    aboutFlorize: string;
    contactUs: string;
    privacyPolicy: string;
    termsOfUse: string;
    affiliateDisclosure: string;
    sitemap: string;
  };

  // Buttons & CTAs
  buttons: {
    readReview: string;
    visitService: string;
    viewGuide: string;
    browseServices: string;
    browseOccasions: string;
    learnMore: string;
    compareServices: string;
    getStarted: string;
    seeAll: string;
  };

  // Comparison Table
  table: {
    service: string;
    priceRange: string;
    deliveryOptions: string;
    keyFeatures: string;
    rating: string;
    ourRating: string;
    visitService: string;
  };

  // Service Reviews
  service: {
    bestFor: string;
    priceRange: string;
    delivery: string;
    rating: string;
    overview: string;
    testingResults: string;
    quickReference: string;
    howItCompares: string;
    faqs: string;
    pros: string;
    cons: string;
    expertConclusion: string;
    recommendations: string;
    alternatives: string;
    atAGlance: string;
    visitService: string;
  };

  // Occasion Guides
  occasion: {
    atAGlance: string;
    budgetGuide: string;
    recommendedFlowers: string;
    colorMeanings: string;
    seasonalGuide: string;
    planningTimeline: string;
    tips: string;
    popularFlowers: string;
    from: string;
    seasonal: string;
  };

  // Common Labels
  common: {
    readMore: string;
    showLess: string;
    loading: string;
    error: string;
    notFound: string;
    comingSoon: string;
    updated: string;
    published: string;
    lastUpdated: string;
  };

  // Footer
  footer: {
    serviceReviews: string;
    occasionGuides: string;
    companyInfo: string;
    allRightsReserved: string;
    expertComparisons: string;
  };

  // Forms
  forms: {
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    sent: string;
    required: string;
  };

  // SEO & Meta
  meta: {
    readTime: string;
    minutes: string;
    author: string;
    reviewedBy: string;
    expertTested: string;
  };

  // Badges
  badges: {
    bestOverall: string;
    bestValue: string;
    mostInnovative: string;
    premiumQuality: string;
    budgetOption: string;
    recommended: string;
  };

  // Budget Guide
  budget: {
    budgetFriendly: string;
    midRange: string;
    luxury: string;
  };

  // Homepage Sections
  homepage: {
    comparisonHeading: string;
    viewAllServices: string;
    quickSelectionHeading: string;
    quickSelectionIntro: string;
    bestForOccasions: string;
    bestForOccasionsText: string;
    viewOccasionGuides: string;
    updatesHeading: string;
    updatesFooter: string;
  };

  // Affiliate Banner & CTA
  affiliate: {
    partnersTitle: string;
    partnersSubtitle: string;
    disclosure: string;
    learnMore: string;
    readyToOrder: string;
    visitWebsite: string;
    visitButton: string;
    commissionNotice: string;
    seeDisclosure: string;
    checkPrices: string;
  };

  // Page Headings
  pages: {
    about: string;
    aboutFlorize: string;
  };

  // Table of Contents
  toc: {
    title: string;
    toggle: string;
  };

  // Layout Sections
  layout: {
    // Service Layout
    serviceOverview: string;
    perfectFor: string;
    testingResults: string;
    completeReview: string;
    quickReference: string;
    howItCompares: string;
    faqsMore: string;
    expertAnalysis: string;
    qualityDelivery: string;
    strengths: string;
    considerations: string;
    prosConsComingSoon: string;
    comparisonComingSoon: string;
    additionalInfoComingSoon: string;
    compareOtherServices: string;

    // Occasion Layout
    budgetGuide: string;
    budgetFriendlyLabel: string;
    midRangeLabel: string;
    luxuryLabel: string;
    recommendedFlowers: string;
    atAGlance: string;
    flowerRecommendations: string;
    flowerColorMeanings: string;
    seasonalGuide: string;
    completeGuide: string;
    topServices: string;
    planningTimeline: string;
    tipsFaqs: string;
    topServicesFor: string;
    noServiceRecommendations: string;
    orderPlanningTimeline: string;
    deliveryLocationTips: string;
    noPlanningTimeline: string;
    additionalGiftEnhancements: string;
    personalizedCardMessages: string;
    for: string;
    specialScenarios: string;
    costSavingTips: string;
    frequentlyAskedQuestions: string;

    // Breadcrumbs
    home: string;
    services: string;
    occasions: string;
    review: string;
  };

  // Misc
  misc: {
    skipToContent: string;
    backToTop: string;
    shareThisPage: string;
    printPage: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      occasions: "Occasions",
      guides: "Guides",
      about: "About",
      contact: "Contact",
      allServices: "All Service Reviews",
      allOccasions: "All Occasion Guides",
      review: "Review",
      flowers: "Flowers",
      aboutFlorize: "About Florize",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      affiliateDisclosure: "Affiliate Disclosure",
      sitemap: "Sitemap",
    },

    buttons: {
      readReview: "Read Review",
      visitService: "Visit Service",
      viewGuide: "View Complete Guide",
      browseServices: "Browse Services",
      browseOccasions: "Browse Occasions",
      learnMore: "Learn More",
      compareServices: "Compare Services",
      getStarted: "Get Started",
      seeAll: "See All",
    },

    table: {
      service: "Service",
      priceRange: "Price Range",
      deliveryOptions: "Delivery Options",
      keyFeatures: "Key Features",
      rating: "Rating",
      ourRating: "Our Rating",
      visitService: "Visit Service",
    },

    service: {
      bestFor: "Best For",
      priceRange: "Price Range",
      delivery: "Delivery",
      rating: "Rating",
      overview: "Overview",
      testingResults: "Testing Results",
      quickReference: "Quick Reference",
      howItCompares: "How It Compares",
      faqs: "FAQs",
      pros: "Pros",
      cons: "Cons",
      expertConclusion: "Expert Conclusion",
      recommendations: "Recommendations",
      alternatives: "Alternatives",
      atAGlance: "At a Glance",
      visitService: "Visit",
    },

    occasion: {
      atAGlance: "At a Glance",
      budgetGuide: "Budget Guide",
      recommendedFlowers: "Recommended Flowers",
      colorMeanings: "Color Meanings",
      seasonalGuide: "Seasonal Guide",
      planningTimeline: "Planning Timeline",
      tips: "Tips",
      popularFlowers: "Popular Flowers:",
      from: "From",
      seasonal: "Seasonal",
    },

    common: {
      readMore: "Read More",
      showLess: "Show Less",
      loading: "Loading...",
      error: "Error",
      notFound: "Not Found",
      comingSoon: "Coming Soon",
      updated: "Updated",
      published: "Published",
      lastUpdated: "Last Updated",
    },

    footer: {
      serviceReviews: "Service Reviews",
      occasionGuides: "Occasion Guides",
      companyInfo: "Company Information",
      allRightsReserved: "All rights reserved.",
      expertComparisons:
        "Expert flower delivery comparisons for the UK market.",
    },

    forms: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Submit",
      sending: "Sending...",
      sent: "Sent!",
      required: "Required",
    },

    meta: {
      readTime: "Read time",
      minutes: "minutes",
      author: "Author",
      reviewedBy: "Reviewed by",
      expertTested: "Expert Tested",
    },

    badges: {
      bestOverall: "Best Overall",
      bestValue: "Best Value",
      mostInnovative: "Most Innovative",
      premiumQuality: "Premium Quality",
      budgetOption: "Budget Option",
      recommended: "Recommended",
    },

    budget: {
      budgetFriendly: "Budget-Friendly",
      midRange: "Mid-Range",
      luxury: "Luxury",
    },

    homepage: {
      comparisonHeading:
        "Top UK Flower Delivery Services - Expert Comparison 2025",
      viewAllServices: "View All Service Reviews",
      quickSelectionHeading:
        "Quick Selection Guide - Find Your Perfect Service",
      quickSelectionIntro:
        "Not sure which service is right for you? Use our expert recommendations based on your specific needs and budget.",
      bestForOccasions: "Best for Specific Occasions",
      bestForOccasionsText:
        "Different occasions call for different approaches. Browse our detailed occasion guides for expert recommendations on the best services and flower types for birthdays, anniversaries, sympathy, and more.",
      viewOccasionGuides: "View Occasion Guides",
      updatesHeading: "Latest Service Updates & Seasonal Recommendations",
      updatesFooter:
        "Stay updated with our latest testing results, seasonal recommendations, and new service launches by visiting our comparison pages regularly.",
    },

    affiliate: {
      partnersTitle: "Our Flower Partners",
      partnersSubtitle: "Trusted flower delivery services across the UK",
      disclosure:
        "We may earn a commission when you order through our partner links. This helps keep Florize Flowers free.",
      learnMore: "Learn more",
      readyToOrder: "Ready to order from",
      visitWebsite: "Visit their website to browse their full collection and place your order today.",
      visitButton: "Visit",
      commissionNotice: "We may earn a commission if you make a purchase, at no extra cost to you. See our",
      seeDisclosure: "affiliate disclosure",
      checkPrices: "Check Prices",
    },

    pages: {
      about: "About",
      aboutFlorize: "About Florize",
    },

    toc: {
      title: "On This Page",
      toggle: "Table of Contents",
    },

    layout: {
      // Service Layout
      serviceOverview: "Service Overview",
      perfectFor: "Perfect For",
      testingResults: "Testing Results at a Glance",
      completeReview: "Complete Review",
      quickReference: "Quick Reference",
      howItCompares: "How It Compares",
      faqsMore: "FAQs & More",
      expertAnalysis: "Expert Analysis",
      qualityDelivery: "Quality flower delivery",
      strengths: "Strengths",
      considerations: "Considerations",
      prosConsComingSoon: "Pros and cons analysis coming soon.",
      comparisonComingSoon: "Comparison analysis coming soon.",
      additionalInfoComingSoon: "Additional information coming soon.",
      compareOtherServices: "Compare with Other Services",

      // Occasion Layout
      budgetGuide: "Budget Guide",
      budgetFriendlyLabel: "Budget-Friendly",
      midRangeLabel: "Mid-Range",
      luxuryLabel: "Luxury",
      recommendedFlowers: "Recommended Flowers",
      atAGlance: "At a Glance",
      flowerRecommendations: "Flower Recommendations",
      flowerColorMeanings: "Flower Color Meanings",
      seasonalGuide: "Seasonal Guide",
      completeGuide: "Complete Guide",
      topServices: "Top Services",
      planningTimeline: "Planning Timeline",
      tipsFaqs: "Tips & FAQs",
      topServicesFor: "Top Flower Delivery Services for",
      noServiceRecommendations: "No service recommendations available for this occasion.",
      orderPlanningTimeline: "Order Planning Timeline",
      deliveryLocationTips: "Delivery Location Tips",
      noPlanningTimeline: "No planning timeline available for this occasion.",
      additionalGiftEnhancements: "Additional Gift Enhancements",
      personalizedCardMessages: "Personalized Card Messages",
      for: "For",
      specialScenarios: "Special Scenarios",
      costSavingTips: "Cost-Saving Tips",
      frequentlyAskedQuestions: "Frequently Asked Questions",

      // Breadcrumbs
      home: "Home",
      services: "Services",
      occasions: "Occasions",
      review: "Review",
    },

    misc: {
      skipToContent: "Skip to main content",
      backToTop: "Back to top",
      shareThisPage: "Share this page",
      printPage: "Print page",
    },
  },

  de: {
    nav: {
      home: "Startseite",
      services: "Blumenversender",
      occasions: "Anlässe",
      guides: "Ratgeber",
      about: "Über uns",
      contact: "Kontakt",
      allServices: "Alle Blumenversender",
      allOccasions: "Alle Anlässe",
      review: "Bewertung",
      flowers: "Blumen",
      aboutFlorize: "Über Florize",
      contactUs: "Kontaktieren Sie uns",
      privacyPolicy: "Datenschutzerklärung",
      termsOfUse: "Nutzungsbedingungen",
      affiliateDisclosure: "Affiliate-Offenlegung",
      sitemap: "Sitemap",
    },

    buttons: {
      readReview: "Bewertung lesen",
      visitService: "Service besuchen",
      viewGuide: "Vollständigen Ratgeber anzeigen",
      browseServices: "Blumenversender durchsuchen",
      browseOccasions: "Anlässe durchsuchen",
      learnMore: "Mehr erfahren",
      compareServices: "Blumenversender vergleichen",
      getStarted: "Loslegen",
      seeAll: "Alle anzeigen",
    },

    table: {
      service: "Service",
      priceRange: "Preisbereich",
      deliveryOptions: "Lieferoptionen",
      keyFeatures: "Hauptmerkmale",
      rating: "Bewertung",
      ourRating: "Unsere Bewertung",
      visitService: "Service besuchen",
    },

    service: {
      bestFor: "Am besten für",
      priceRange: "Preisbereich",
      delivery: "Lieferung",
      rating: "Bewertung",
      overview: "Übersicht",
      testingResults: "Testergebnisse",
      quickReference: "Schnellreferenz",
      howItCompares: "Vergleich",
      faqs: "Häufig gestellte Fragen",
      pros: "Vorteile",
      cons: "Nachteile",
      expertConclusion: "Expertenurteil",
      recommendations: "Empfehlungen",
      alternatives: "Alternativen",
      atAGlance: "Auf einen Blick",
      visitService: "Besuchen",
    },

    occasion: {
      atAGlance: "Auf einen Blick",
      budgetGuide: "Budget-Ratgeber",
      recommendedFlowers: "Empfohlene Blumen",
      colorMeanings: "Farbbedeutungen",
      seasonalGuide: "Saisonaler Ratgeber",
      planningTimeline: "Planungszeitplan",
      tips: "Tipps",
      popularFlowers: "Beliebte Blumen:",
      from: "Ab",
      seasonal: "Saisonal",
    },

    common: {
      readMore: "Weiterlesen",
      showLess: "Weniger anzeigen",
      loading: "Wird geladen...",
      error: "Fehler",
      notFound: "Nicht gefunden",
      comingSoon: "Demnächst",
      updated: "Aktualisiert",
      published: "Veröffentlicht",
      lastUpdated: "Zuletzt aktualisiert",
    },

    footer: {
      serviceReviews: "Blumenversender-Bewertungen",
      occasionGuides: "Anlass-Ratgeber",
      companyInfo: "Unternehmensinformationen",
      allRightsReserved: "Alle Rechte vorbehalten.",
      expertComparisons:
        "Experten-Vergleiche für Blumenlieferdienste auf dem deutschen Markt.",
    },

    forms: {
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      submit: "Senden",
      sending: "Wird gesendet...",
      sent: "Gesendet!",
      required: "Erforderlich",
    },

    meta: {
      readTime: "Lesezeit",
      minutes: "Minuten",
      author: "Autor",
      reviewedBy: "Geprüft von",
      expertTested: "Von Experten getestet",
    },

    badges: {
      bestOverall: "Bestes Gesamtangebot",
      bestValue: "Bestes Preis-Leistungs-Verhältnis",
      mostInnovative: "Innovativstes Angebot",
      premiumQuality: "Premiumqualität",
      budgetOption: "Budget-Option",
      recommended: "Empfohlen",
    },

    budget: {
      budgetFriendly: "Budgetfreundlich",
      midRange: "Mittelklasse",
      luxury: "Luxus",
    },

    homepage: {
      comparisonHeading: "Top Blumenlieferdienste UK - Experten-Vergleich 2025",
      viewAllServices: "Alle Blumenversender-Bewertungen anzeigen",
      quickSelectionHeading:
        "Schnellauswahlratgeber - Finden Sie Ihren perfekten Service",
      quickSelectionIntro:
        "Nicht sicher, welcher Service der richtige für Sie ist? Nutzen Sie unsere Expertenempfehlungen basierend auf Ihren spezifischen Bedürfnissen und Budget.",
      bestForOccasions: "Am besten für spezifische Anlässe",
      bestForOccasionsText:
        "Verschiedene Anlässe erfordern unterschiedliche Ansätze. Durchsuchen Sie unsere detaillierten Anlass-Ratgeber für Expertenempfehlungen zu den besten Services und Blumenarten für Geburtstage, Jubiläen, Beileid und mehr.",
      viewOccasionGuides: "Anlass-Ratgeber anzeigen",
      updatesHeading: "Neueste Service-Updates & saisonale Empfehlungen",
      updatesFooter:
        "Bleiben Sie auf dem Laufenden mit unseren neuesten Testergebnissen, saisonalen Empfehlungen und neuen Service-Einführungen, indem Sie regelmäßig unsere Vergleichsseiten besuchen.",
    },

    affiliate: {
      partnersTitle: "Unsere Blumenpartner",
      partnersSubtitle:
        "Vertrauenswürdige Blumenlieferdienste in ganz Großbritannien",
      disclosure:
        "Wir können eine Provision verdienen, wenn Sie über unsere Partnerlinks bestellen. Dies hilft, Florize Flowers kostenlos zu halten.",
      learnMore: "Mehr erfahren",
      readyToOrder: "Bereit, bei",
      visitWebsite: "Besuchen Sie deren Website, um die gesamte Kollektion zu durchsuchen und heute Ihre Bestellung aufzugeben.",
      visitButton: "Besuchen",
      commissionNotice: "Wir können eine Provision erhalten, wenn Sie einen Kauf tätigen, ohne zusätzliche Kosten für Sie. Siehe unsere",
      seeDisclosure: "Affiliate-Offenlegung",
      checkPrices: "Preise prüfen",
    },

    pages: {
      about: "Über uns",
      aboutFlorize: "Über Florize",
    },

    toc: {
      title: "Auf dieser Seite",
      toggle: "Inhaltsverzeichnis",
    },

    layout: {
      // Service Layout
      serviceOverview: "Service-Übersicht",
      perfectFor: "Perfekt für",
      testingResults: "Testergebnisse auf einen Blick",
      completeReview: "Vollständige Bewertung",
      quickReference: "Schnellreferenz",
      howItCompares: "Wie es sich vergleicht",
      faqsMore: "FAQs & Mehr",
      expertAnalysis: "Expertenanalyse",
      qualityDelivery: "Qualitätsblumenlieferung",
      strengths: "Stärken",
      considerations: "Überlegungen",
      prosConsComingSoon: "Vor- und Nachteile-Analyse demnächst verfügbar.",
      comparisonComingSoon: "Vergleichsanalyse demnächst verfügbar.",
      additionalInfoComingSoon: "Zusätzliche Informationen demnächst verfügbar.",
      compareOtherServices: "Vergleich mit anderen Blumenversendern",

      // Occasion Layout
      budgetGuide: "Budget-Ratgeber",
      budgetFriendlyLabel: "Budgetfreundlich",
      midRangeLabel: "Mittelklasse",
      luxuryLabel: "Luxus",
      recommendedFlowers: "Empfohlene Blumen",
      atAGlance: "Auf einen Blick",
      flowerRecommendations: "Blumenempfehlungen",
      flowerColorMeanings: "Blumenfarb-Bedeutungen",
      seasonalGuide: "Saisonaler Ratgeber",
      completeGuide: "Vollständiger Ratgeber",
      topServices: "Top-Blumenversender",
      planningTimeline: "Planungszeitplan",
      tipsFaqs: "Tipps & FAQs",
      topServicesFor: "Top-Blumenlieferdienste für",
      noServiceRecommendations: "Für diesen Anlass sind keine Blumenversender-Empfehlungen verfügbar.",
      orderPlanningTimeline: "Bestellplanungszeitplan",
      deliveryLocationTips: "Lieferstandort-Tipps",
      noPlanningTimeline: "Für diesen Anlass ist kein Planungszeitplan verfügbar.",
      additionalGiftEnhancements: "Zusätzliche Geschenk-Extras",
      personalizedCardMessages: "Personalisierte Kartennachrichten",
      for: "Für",
      specialScenarios: "Besondere Szenarien",
      costSavingTips: "Spartipps",
      frequentlyAskedQuestions: "Häufig gestellte Fragen",

      // Breadcrumbs
      home: "Startseite",
      services: "Blumenversender",
      occasions: "Anlässe",
      review: "Bewertung",
    },

    misc: {
      skipToContent: "Zum Hauptinhalt springen",
      backToTop: "Nach oben",
      shareThisPage: "Diese Seite teilen",
      printPage: "Seite drucken",
    },
  },
};

/**
 * Get translated string
 * @param lang - Language code
 * @param key - Translation key (dot-notation: 'nav.home')
 * @returns Translated string or key if not found
 */
export function t(lang: SupportedLanguage, key: string): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`Translation key not found: ${key} for language: ${lang}`);
      return key;
    }
  }

  return value as string;
}
