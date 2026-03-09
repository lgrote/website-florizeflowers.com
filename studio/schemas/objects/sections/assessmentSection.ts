import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'assessmentSection',
  title: 'Assessment Section',
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
      name: 'expertConclusion',
      title: 'Expert Conclusion',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'content', title: 'Content', type: 'text' }),
        defineField({ name: 'ratingDisplay', title: 'Rating Display', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
      ],
    }),
    defineField({
      name: 'valueJustification',
      title: 'Value Justification',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'content', title: 'Content', type: 'text' }),
        defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'recommendedFor',
      title: 'Recommended For',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'considerAlternatives',
      title: 'Consider Alternatives',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title, subtitle: 'Assessment' };
    },
  },
});
