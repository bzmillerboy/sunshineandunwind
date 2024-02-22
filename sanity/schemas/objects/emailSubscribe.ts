import { MdEmail } from 'react-icons/md'
import { defineType } from 'sanity'

export default defineType({
  name: 'emailSubscribe',
  title: 'Email Subscribe',
  type: 'object',
  icon: MdEmail,
  fields: [
    {
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description:
        'Enter the ID of the form you wish to embed. This can be found in the URL of the form page. Note: the form can only contain one field for email.',
    },
    {
      title: 'Dark Mode?',
      name: 'darkMode',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'formId',
    },
    prepare({ title = 'Email Subscribe', category = 'None' }) {
      return {
        title,
        subtitle: `${category}`,
      }
    },
  },
})
