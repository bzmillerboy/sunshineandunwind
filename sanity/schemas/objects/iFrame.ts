import { GoFileCode } from 'react-icons/go'
import { defineType } from 'sanity'

export default defineType({
  name: 'iFrame',
  title: 'iFrame',
  type: 'object',
  icon: GoFileCode,
  fields: [
    {
      name: 'url',
      title: 'iFrame URL',
      type: 'string',
      description: 'Enter the URL of the iframe you wish to display.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'url',
    },
    prepare({ title = 'iFrame', category = 'None' }) {
      return {
        title,
        subtitle: `${category}`,
      }
    },
  },
})
