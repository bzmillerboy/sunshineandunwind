import { BsPersonSquare } from 'react-icons/bs'
import { defineType } from 'sanity'

export default defineType({
  name: 'staffGrid',
  title: 'Staff Grid',
  type: 'object',
  icon: BsPersonSquare,
  fields: [
    {
      name: 'Location',
      title: 'Location',
      type: 'reference',
      to: { type: 'location' },
    },
    {
      name: 'hideFilter',
      title: 'Hide Filter Bar?',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      location: 'Location.title',
    },
    prepare({ location }) {
      return {
        title: 'Staff Grid',
        subtitle: location,
      }
    },
  },
})
