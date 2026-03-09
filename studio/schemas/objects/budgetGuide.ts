import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'budgetGuide',
  title: 'Budget Guide',
  type: 'object',
  fields: [
    defineField({
      name: 'budgetFriendly',
      title: 'Budget Friendly',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'midRange',
      title: 'Mid Range',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'luxury',
      title: 'Luxury',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
