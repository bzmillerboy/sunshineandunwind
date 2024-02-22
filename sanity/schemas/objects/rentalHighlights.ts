import { FaHighlighter } from 'react-icons/fa'
import { defineType } from 'sanity'

export default defineType({
  name: 'rentalHighlights',
  title: 'Rental Highlights',
  type: 'object',
  icon: FaHighlighter,

  fields: [
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'blockContentSimple',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = 'Rental Highlights' }) {
      return {
        title,
      }
    },
  },
})
