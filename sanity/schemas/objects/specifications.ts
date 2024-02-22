import { FilePlus } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'specifications',
  title: 'Specifications',
  type: 'document',
  icon: FilePlus,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Driveline', value: 'driveline' },
          { title: 'Dimensions', value: 'dimensions' },
          { title: 'Capacities', value: 'capacities' },
          { title: 'Performance', value: 'performance' },
          { title: 'Warranty', value: 'warranty' },
          { title: 'Features', value: 'features' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
  ],
})
