import { FiGrid } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'inventoryCategoryAttachmentGrid',
  title: 'Inventory Category Attachment Grid',
  type: 'object',
  icon: FiGrid,
  fields: [
    {
      name: 'equipmentCategory',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'equipmentCategory' },
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'equipmentCategory.title',
      make: 'equipmentMake.name',
    },
    prepare({
      title = 'Inventory Category Attachment Grid',
      category = 'None',
    }) {
      return {
        title,
        subtitle: `${category}`,
      }
    },
  },
})
