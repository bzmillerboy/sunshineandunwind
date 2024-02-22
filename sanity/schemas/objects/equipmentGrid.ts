import { FiGrid } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentGrid',
  title: 'Model Grid',
  type: 'object',
  icon: FiGrid,
  fields: [
    {
      name: 'equipmentCategory',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'equipmentCategory' },
    },
    {
      name: 'equipmentMake',
      title: 'Equipment Make',
      type: 'reference',
      to: { type: 'equipmentMake' },
    },
    {
      name: 'enableComparison',
      title: 'Enable Comparison Tool',
      type: 'boolean',
      description: 'Enable the model comparison tool for this grid.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'equipmentCategory.title',
      make: 'equipmentMake.name',
    },
    prepare({ title = 'Model Grid', category = 'None', make = 'None' }) {
      return {
        title,
        subtitle: `${category} - ${make}`,
      }
    },
  },
})
