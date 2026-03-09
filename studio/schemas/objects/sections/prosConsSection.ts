import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'prosConsSection',
  title: 'Pros & Cons Section',
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
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title, subtitle: 'Pros & Cons' };
    },
  },
});
