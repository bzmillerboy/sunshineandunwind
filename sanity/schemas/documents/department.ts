import { Building2 } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'department',
  title: 'Department',
  type: 'document',
  icon: Building2,
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
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
})
