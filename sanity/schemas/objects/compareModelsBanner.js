import { FaClipboardCheck } from 'react-icons/fa'
import { defineType } from 'sanity'

export default defineType({
  name: 'compareModelsBanner',
  title: 'Compare Models Banner',
  type: 'object',
  icon: FaClipboardCheck,
  fields: [
    {
      name: 'model',
      title: 'Model',
      type: 'reference',
      to: { type: 'models' },
      options: {
        disableNew: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'model.title',
      image: 'mainImage',
    },
    prepare({ title = 'Compare Model Banner', subtitle }) {
      return {
        title,
        subtitle: subtitle,
      }
    },
  },
})
