import { FiGrid } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'inventoryCategoryGrid',
  title: 'Inventory Category Grid',
  type: 'object',
  icon: FiGrid,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Type',
      name: 'categoryType',
      type: 'string',
      options: {
        list: [
          { title: 'Model', value: 'model' },
          { title: 'Attachment', value: 'attachment' },
        ],
        layout: 'radio',
      },
    },
  ],
})
