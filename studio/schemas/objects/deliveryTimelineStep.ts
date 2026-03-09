import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'deliveryTimelineStep',
  title: 'Delivery Timeline Step',
  type: 'object',
  fields: [
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'tip',
      title: 'Tip',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'time' },
  },
});
