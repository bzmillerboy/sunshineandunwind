import { FiList } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'inventoryList',
  title: 'Inventory List',
  type: 'object',
  icon: FiList,
  fields: [
    {
      name: 'equipmentCategory',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'equipmentCategory' },
    },
    {
      name: 'displayLimit',
      title: 'Number of Records To Display',
      type: 'number',
    },
  ],
  preview: {
    select: {
      name: 'sectionName',
      category: 'equipmentCategory.title',
    },
    prepare({ name, category }) {
      return {
        title: 'Inventory List',
        subtitle: `${category}`,
      }
    },
  },
})
