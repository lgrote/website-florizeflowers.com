import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'comparison',
  title: 'Comparison',
  type: 'object',
  fields: [
    defineField({
      name: 'competitor',
      title: 'Competitor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'competitor', subtitle: 'category' },
  },
});
