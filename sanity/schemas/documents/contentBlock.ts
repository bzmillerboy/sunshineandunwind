import { Layers2 } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'document',
  icon: Layers2,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 296,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
})
