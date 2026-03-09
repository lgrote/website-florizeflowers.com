import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'guide',
  title: 'Guide',
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
      name: 'base',
      title: 'Base Info',
      type: 'object',
      fields: [
        defineField({ name: 'id', title: 'ID', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
      ],
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Essential', value: 'essential' },
          { title: 'Quick Tip', value: 'quick-tip' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'Benefit', value: 'benefit' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
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
      category: 'category',
      language: 'language',
    },
    prepare({ title, category, language }) {
      return {
        title: `${title || 'Untitled'}${language ? ` [${language}]` : ''}`,
        subtitle: category,
      };
    },
  },
});
