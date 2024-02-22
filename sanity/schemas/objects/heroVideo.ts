import { FaMinusSquare } from 'react-icons/fa'
import { defineType } from 'sanity'

export default defineType({
  name: 'heroVideo',
  title: 'Hero Video',
  type: 'object',
  icon: FaMinusSquare,
  fields: [
    {
      name: 'lightTheme',
      title: 'Light Theme?',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      validation: (Rule) => Rule.required(),
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
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'auto' },
          { title: 'Medium', value: '60vh' },
          { title: 'Large', value: '80vh' },
          { title: 'Xtra Large', value: '100vh' },
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
      name: 'videoSource',
      title: 'Video URL MP4',
      type: 'string',
      description: 'Must be a MP4 file type and full URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoSourceWebm',
      title: 'Video URL WEBM',
      type: 'string',
      description:
        'Must be a WEBM file type and full URL. Convert Tool: https://www.zamzar.com/convert/mp4-to-webm/',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoSourceOgg',
      title: 'Video URL OGG',
      type: 'string',
      description:
        'Must be a OGG file type and full URL. Convert Tool: https://www.zamzar.com/convert/mp4-to-ogg/',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'posterImage',
      title: 'Poster image',
      type: 'mainImage',
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
