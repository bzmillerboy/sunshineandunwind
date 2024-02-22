import { FiLayers } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: FiLayers,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Heading title the user will click to see expanded content.',
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContentSimple',
      description: 'Content to be shown when accordion is expanded.',
    },
  ],
})
