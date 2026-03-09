import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'flowerRecommendation',
  title: 'Flower Recommendation',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recipient',
      title: 'Recipient',
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
      name: 'flowers',
      title: 'Flowers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'recipient', subtitle: 'description' },
  },
});
