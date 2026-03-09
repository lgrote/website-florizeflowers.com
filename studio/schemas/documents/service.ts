import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'base', title: 'Base Info', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'summary', title: 'Summary' },
    { name: 'overview', title: 'Overview' },
    { name: 'components', title: 'Components' },
    { name: 'affiliate', title: 'Affiliate' },
    { name: 'comparisons', title: 'Comparisons' },
    { name: 'recommendations', title: 'Recommendations' },
    { name: 'related', title: 'Related' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    // Language (managed by i18n plugin)
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // BASE
    defineField({
      name: 'base',
      title: 'Base Info',
      type: 'object',
      group: 'base',
      fields: [
        defineField({ name: 'id', title: 'ID', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'rating',
          title: 'Rating',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(5),
        }),
        defineField({ name: 'priceRange', title: 'Price Range', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'winnerBadge', title: 'Winner Badge', type: 'string' }),
        defineField({
          name: 'deliveryOptions',
          title: 'Delivery Options',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'keyFeatures',
          title: 'Key Features',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'founded', title: 'Founded', type: 'number' }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),

    // SUMMARY
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
      group: 'summary',
      fields: [
        defineField({ name: 'bestFor', title: 'Best For', type: 'string' }),
        defineField({ name: 'delivery', title: 'Delivery', type: 'string' }),
        defineField({ name: 'ratingText', title: 'Rating Text', type: 'string' }),
      ],
    }),

    // OVERVIEW
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({ name: 'positioning', title: 'Positioning', type: 'text' }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        }),
      ],
    }),

    // COMPONENTS
    defineField({
      name: 'components',
      title: 'Components',
      type: 'object',
      group: 'components',
      fields: [
        defineField({ name: 'prosTitle', title: 'Pros Title', type: 'string' }),
        defineField({ name: 'consTitle', title: 'Cons Title', type: 'string' }),
        defineField({
          name: 'pros',
          title: 'Pros',
          type: 'array',
          of: [{ type: 'prosConsItem' }],
        }),
        defineField({
          name: 'cons',
          title: 'Cons',
          type: 'array',
          of: [{ type: 'prosConsItem' }],
        }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [{ type: 'faqItem' }],
        }),
        defineField({
          name: 'testingMetrics',
          title: 'Testing Metrics',
          type: 'array',
          of: [{ type: 'testingMetric' }],
        }),
        defineField({
          name: 'bestForScenarios',
          title: 'Best For Scenarios',
          type: 'array',
          of: [{ type: 'bestForScenario' }],
        }),
        defineField({
          name: 'featureComparison',
          title: 'Feature Comparison',
          type: 'featureComparison',
        }),
      ],
    }),

    // AFFILIATE
    defineField({
      name: 'affiliate',
      title: 'Affiliate',
      type: 'object',
      group: 'affiliate',
      fields: [
        defineField({
          name: 'url',
          title: 'Affiliate URL',
          type: 'url',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'promoCode',
          title: 'Promo Code',
          type: 'object',
          fields: [
            defineField({ name: 'code', title: 'Code', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'expiryDate', title: 'Expiry Date', type: 'date' }),
          ],
        }),
      ],
    }),

    // COMPARISONS
    defineField({
      name: 'comparisons',
      title: 'Comparisons',
      type: 'object',
      group: 'comparisons',
      fields: [
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [{ type: 'comparison' }],
        }),
        defineField({
          name: 'useCases',
          title: 'Use Cases',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({
              name: 'scenarios',
              title: 'Scenarios',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text' }),
                  ],
                  preview: { select: { title: 'label' } },
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // RECOMMENDATIONS
    defineField({
      name: 'recommendations',
      title: 'Recommendations',
      type: 'object',
      group: 'recommendations',
      fields: [
        defineField({
          name: 'sections',
          title: 'Sections',
          type: 'array',
          of: [{ type: 'recommendationSection' }],
        }),
        defineField({ name: 'cta', title: 'CTA Text', type: 'string' }),
      ],
    }),

    // RELATED
    defineField({
      name: 'related',
      title: 'Related',
      type: 'object',
      group: 'related',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'reviews',
          title: 'Reviews',
          type: 'array',
          of: [{ type: 'relatedReview' }],
        }),
      ],
    }),

    // CONTENT SECTIONS
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      group: 'content',
      of: [
        { type: 'overviewSection' },
        { type: 'featuresGridSection' },
        { type: 'assessmentSection' },
        { type: 'quickFactsSection' },
        { type: 'prosConsSection' },
        { type: 'comparisonSection' },
        { type: 'pricingGuideSection' },
        { type: 'faqSection' },
        { type: 'visualComponentsSection' },
        { type: 'tabContentSection' },
        { type: 'contentProseSection' },
      ],
    }),

    // BODY (Portable Text)
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'base.name',
      subtitle: 'base.rating',
      media: 'base.logo',
      language: 'language',
    },
    prepare({ title, subtitle, media, language }) {
      return {
        title: `${title || 'Untitled'}${language ? ` [${language}]` : ''}`,
        subtitle: subtitle ? `Rating: ${subtitle}/5` : undefined,
        media,
      };
    },
  },
});
