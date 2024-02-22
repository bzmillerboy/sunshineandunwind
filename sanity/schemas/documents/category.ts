import { LayoutGrid } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: LayoutGrid,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 196,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Image',
      type: 'mainImage',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
})
