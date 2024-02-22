import { FiGrid } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'videoGrid',
  title: 'Video Grid',
  type: 'object',
  icon: FiGrid,
  fields: [
    {
      name: 'displayLimit',
      title: 'Number of Records To Display',
      type: 'number',
      description:
        'Sets a limit on the number of records to display. Blank = unlimited.',
    },
    {
      name: 'sizeOption',
      title: 'Compact?',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = 'Video Grid' }) {
      return {
        title,
      }
    },
  },
})
