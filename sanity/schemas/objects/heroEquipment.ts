import { FaMinusSquare } from 'react-icons/fa'
import { defineType } from 'sanity'

export default defineType({
  name: 'heroEquipment',
  title: 'Hero Equipment Section',
  type: 'object',
  icon: FaMinusSquare,
  fields: [
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = 'Model Hero' }) {
      return {
        title,
      }
    },
  },
})
