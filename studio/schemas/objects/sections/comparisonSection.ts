import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'comparisonSection',
  title: 'Comparison Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'competitors',
      title: 'Competitors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(0).max(5) }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'link', title: 'Link', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'rating' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `Rating: ${subtitle}` : undefined };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title, subtitle: 'Comparison' };
    },
  },
});
