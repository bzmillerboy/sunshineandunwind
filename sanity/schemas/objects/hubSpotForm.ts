import { GoFileCode } from 'react-icons/go'
import { defineType } from 'sanity'

export default defineType({
  name: 'hubSpotForm',
  title: 'HubSpot Form',
  type: 'object',
  icon: GoFileCode,
  fields: [
    {
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description:
        'Enter the ID of the form you wish to embed. This can be found in the URL of the form page.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'formId',
    },
    prepare({ title = 'HubSpot Form', category = 'None' }) {
      return {
        title,
        subtitle: `${category}`,
      }
    },
  },
})
