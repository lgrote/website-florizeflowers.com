import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pricingGuideSection',
  title: 'Pricing Guide Section',
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
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tier', title: 'Tier', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'priceRange', title: 'Price Range', type: 'string' }),
          ],
          preview: {
            select: { title: 'tier', subtitle: 'priceRange' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title, subtitle: 'Pricing Guide' };
    },
  },
});
