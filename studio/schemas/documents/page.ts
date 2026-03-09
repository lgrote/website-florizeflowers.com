import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'layout', title: 'Layout' },
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),

    // HERO
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton' }),
        defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton' }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // INTRO
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'paragraph', title: 'Paragraph', type: 'text', validation: (Rule) => Rule.required() }),
      ],
    }),

    // SECTIONS
    defineField({
      name: 'sections',
      title: 'Section Headings',
      type: 'object',
      group: 'layout',
      fields: [
        defineField({ name: 'main', title: 'Main', type: 'string' }),
        defineField({ name: 'services', title: 'Services', type: 'string' }),
        defineField({ name: 'occasions', title: 'Occasions', type: 'string' }),
        defineField({ name: 'legal', title: 'Legal', type: 'string' }),
      ],
    }),

    // TIPS
    defineField({
      name: 'tips',
      title: 'Tips',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'content', title: 'Content', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // LABELS
    defineField({
      name: 'labels',
      title: 'UI Labels',
      type: 'object',
      group: 'layout',
      fields: [
        defineField({ name: 'seasonal', title: 'Seasonal', type: 'string' }),
        defineField({ name: 'popularFlowers', title: 'Popular Flowers', type: 'string' }),
        defineField({ name: 'from', title: 'From', type: 'string' }),
        defineField({ name: 'viewGuide', title: 'View Guide', type: 'string' }),
        defineField({ name: 'cantFind', title: "Can't Find", type: 'string' }),
        defineField({ name: 'contactHelp', title: 'Contact Help', type: 'string' }),
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
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      language: 'language',
    },
    prepare({ title, slug, language }) {
      return {
        title: `${title || 'Untitled'}${language ? ` [${language}]` : ''}`,
        subtitle: slug ? `/${slug}` : undefined,
      };
    },
  },
});
