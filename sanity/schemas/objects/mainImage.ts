import { defineType } from 'sanity'

export default defineType({
  name: 'mainImage',
  title: 'Main image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
    },
  ],
})
