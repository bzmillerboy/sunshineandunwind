// import { FaMinusSquare } from "react-icons/fa";
import { defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  // icon: FaMinusSquare,
  fields: [
    {
      name: 'lightTheme',
      title: 'Light Theme?',
      type: 'boolean',
      // layout: 'checkbox',
      // required: true,
    },
    {
      title: 'Alignment',
      name: 'alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
    },
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
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Xtra Large', value: 'xlarge' },
          { title: 'Full View', value: 'fullView' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      blocks: 'body',
    },
    prepare(value) {
      const block = (value.blocks || []).find(
        (block) => block._type === 'block',
      )
      return {
        title: 'Hero',
        subtitle: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No title',
      }
    },
  },
})
