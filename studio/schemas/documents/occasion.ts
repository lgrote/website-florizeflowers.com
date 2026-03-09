import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'occasion',
  title: 'Occasion',
  type: 'document',
  groups: [
    { name: 'base', title: 'Base Info', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'recommendations', title: 'Recommendations' },
    { name: 'components', title: 'Components' },
    { name: 'tabs', title: 'Tabs' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    // Language
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
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'icon', title: 'Icon', type: 'string' }),
        defineField({ name: 'seasonal', title: 'Seasonal', type: 'boolean', initialValue: false }),
        defineField({ name: 'typicalDate', title: 'Typical Date', type: 'string' }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),

    // RECOMMENDATIONS
    defineField({
      name: 'recommendations',
      title: 'Recommendations',
      type: 'object',
      group: 'recommendations',
      fields: [
        defineField({
          name: 'services',
          title: 'Recommended Services',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'flowers',
          title: 'Recommended Flowers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'flower', title: 'Flower', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'reason', title: 'Reason', type: 'text', validation: (Rule) => Rule.required() }),
              ],
              preview: { select: { title: 'flower', subtitle: 'reason' } },
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'budgetGuide',
          title: 'Budget Guide',
          type: 'budgetGuide',
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
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{ type: 'stat' }],
        }),
        defineField({
          name: 'serviceFeatures',
          title: 'Service Features',
          type: 'array',
          of: [{ type: 'serviceFeature' }],
        }),
        defineField({
          name: 'deliveryTimeline',
          title: 'Delivery Timeline',
          type: 'array',
          of: [{ type: 'deliveryTimelineStep' }],
        }),
        defineField({
          name: 'callouts',
          title: 'Callouts',
          type: 'array',
          of: [{ type: 'callout' }],
        }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [{ type: 'faqItem' }],
        }),
        defineField({
          name: 'flowerRecommendations',
          title: 'Flower Recommendations',
          type: 'array',
          of: [{ type: 'flowerRecommendation' }],
        }),
        defineField({
          name: 'colorMeanings',
          title: 'Color Meanings',
          type: 'array',
          of: [{ type: 'colorMeaning' }],
        }),
        defineField({
          name: 'seasonalGuide',
          title: 'Seasonal Guide',
          type: 'array',
          of: [{ type: 'seasonalGuideSeason' }],
        }),
      ],
    }),

    // TABS
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'object',
      group: 'tabs',
      fields: [
        defineField({
          name: 'giftEnhancements',
          title: 'Gift Enhancements',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'item', title: 'Item', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
                defineField({ name: 'priceRange', title: 'Price Range', type: 'string', validation: (Rule) => Rule.required() }),
              ],
              preview: { select: { title: 'item', subtitle: 'priceRange' } },
            },
          ],
        }),
        defineField({
          name: 'cardMessages',
          title: 'Card Messages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'recipient', title: 'Recipient', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'message', title: 'Message', type: 'text', validation: (Rule) => Rule.required() }),
              ],
              preview: { select: { title: 'recipient' } },
            },
          ],
        }),
        defineField({
          name: 'specialScenarios',
          title: 'Special Scenarios',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                defineField({ name: 'tips', title: 'Tips', type: 'array', of: [{ type: 'string' }] }),
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        }),
        defineField({
          name: 'deliveryLocations',
          title: 'Delivery Locations',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'location', title: 'Location', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'tips', title: 'Tips', type: 'array', of: [{ type: 'string' }] }),
              ],
              preview: { select: { title: 'location' } },
            },
          ],
        }),
        defineField({
          name: 'costSavingTips',
          title: 'Cost Saving Tips',
          type: 'array',
          of: [{ type: 'string' }],
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

    // BODY
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
      icon: 'base.icon',
      media: 'base.heroImage',
      language: 'language',
    },
    prepare({ title, icon, media, language }) {
      return {
        title: `${icon || ''} ${title || 'Untitled'}${language ? ` [${language}]` : ''}`.trim(),
        media,
      };
    },
  },
});
