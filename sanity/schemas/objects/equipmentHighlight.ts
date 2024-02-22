import { FiZap } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentHighlight',
  title: 'Equipment Highlight',
  type: 'object',
  icon: FiZap,
  fields: [
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'mainImage',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
    },
  ],
})
