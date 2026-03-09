import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'colorMeaning',
  title: 'Color Meaning',
  type: 'object',
  fields: [
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hex',
      title: 'Hex Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meaning',
      title: 'Meaning',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emotions',
      title: 'Emotions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'color', subtitle: 'meaning' },
  },
});
