import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'visualComponentsSection',
  title: 'Visual Components Section',
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
      name: 'componentType',
      title: 'Component Type',
      type: 'string',
      options: {
        list: [
          { title: 'Flower Recommendations', value: 'flower_recommendations' },
          { title: 'Color Meanings', value: 'color_meanings' },
          { title: 'Seasonal Guide', value: 'seasonal_guide' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flowerRecommendations',
      title: 'Flower Recommendations',
      type: 'array',
      of: [{ type: 'flowerRecommendation' }],
      hidden: ({ parent }) => parent?.componentType !== 'flower_recommendations',
    }),
    defineField({
      name: 'colorMeanings',
      title: 'Color Meanings',
      type: 'array',
      of: [{ type: 'colorMeaning' }],
      hidden: ({ parent }) => parent?.componentType !== 'color_meanings',
    }),
    defineField({
      name: 'seasonalGuide',
      title: 'Seasonal Guide',
      type: 'array',
      of: [{ type: 'seasonalGuideSeason' }],
      hidden: ({ parent }) => parent?.componentType !== 'seasonal_guide',
    }),
  ],
  preview: {
    select: { title: 'title', componentType: 'componentType' },
    prepare({ title, componentType }) {
      return { title, subtitle: `Visual: ${componentType || 'unknown'}` };
    },
  },
});
