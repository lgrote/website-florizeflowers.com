import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepageSection',
  title: 'Homepage Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Introduction', value: 'introduction' },
          { title: 'Methodology', value: 'methodology' },
          { title: 'Trust Signals', value: 'trust-signals' },
          { title: 'Quick Selection Guide', value: 'quick-selection' },
          { title: 'SEO', value: 'seo' },
          { title: 'Updates', value: 'updates' },
          { title: 'Footer', value: 'footer' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      description: 'For SEO section',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'imageAlt', title: 'Image Alt', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'ctaButton',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'ctaButton',
    }),
    defineField({
      name: 'recommendations',
      title: 'Recommendations',
      type: 'array',
      description: 'Service recommendations for the Quick Selection Guide',
      hidden: ({ parent }) => parent?.sectionType !== 'quick-selection',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'serviceId', title: 'Service ID', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
            defineField({ name: 'ctaText', title: 'CTA Text', type: 'string', initialValue: 'Read Full Review' }),
            defineField({
              name: 'column',
              title: 'Column',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            select: { title: 'title', column: 'column' },
            prepare({ title, column }) {
              return { title: title || 'Untitled', subtitle: column ? `Column: ${column}` : '' };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'updates',
      title: 'Updates',
      type: 'array',
      description: 'Update cards for the Updates section',
      hidden: ({ parent }) => parent?.sectionType !== 'updates',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionType: 'sectionType',
      language: 'language',
    },
    prepare({ title, sectionType, language }) {
      return {
        title: `${title || 'Untitled'}${language ? ` [${language}]` : ''}`,
        subtitle: sectionType,
      };
    },
  },
});
