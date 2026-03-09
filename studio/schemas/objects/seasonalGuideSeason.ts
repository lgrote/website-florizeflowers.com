import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seasonalGuideSeason',
  title: 'Seasonal Guide Season',
  type: 'object',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'months',
      title: 'Months',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'popularFlowers',
      title: 'Popular Flowers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: ['Excellent', 'Good', 'Fair', 'Limited'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      options: {
        list: ['Budget-friendly', 'Moderate', 'Premium', 'Variable'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'season', subtitle: 'months' },
  },
});
