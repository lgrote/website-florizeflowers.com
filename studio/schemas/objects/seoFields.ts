import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
    }),
    defineField({
      name: 'datePublished',
      title: 'Date Published',
      type: 'date',
    }),
    defineField({
      name: 'dateModified',
      title: 'Date Modified',
      type: 'date',
    }),
  ],
});
