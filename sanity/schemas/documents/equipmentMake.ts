import { Copyright } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentMake',
  title: 'Equipment Make',
  type: 'document',
  icon: Copyright,
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: true,
      options: {
        source: 'name',
        maxLength: 296,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'descriptionBlock',
      title: 'Description',
      type: 'blockText',
    },
  ],
})
