import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featureComparison',
  title: 'Feature Comparison',
  type: 'object',
  fields: [
    defineField({
      name: 'competitorName',
      title: 'Competitor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'winner',
      title: 'Winner',
      type: 'string',
      options: {
        list: [
          { title: 'Service', value: 'service' },
          { title: 'Competitor', value: 'competitor' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'serviceValue',
              title: 'Service Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'competitorValue',
              title: 'Competitor Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'feature' },
          },
        },
      ],
    }),
  ],
});
