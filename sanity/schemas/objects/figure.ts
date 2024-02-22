import { Image } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'figure', //TODO: Update react code to be "image"
  title: 'Image',
  type: 'image',
  icon: Image,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'noShadow',
      title: 'No Shadow?',
      type: 'boolean',
    },
    // This causes GraphQL to not deploy, open issue with Sanity
    // {
    //   name: 'internalLink',
    //   type: 'internalLink',
    //   title: 'Internal Link',
    //   options: {
    //     isHighlighted: true,
    //   },
    // },
    {
      title: 'External Link',
      name: 'externalLink',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    },
    {
      name: 'customClassName',
      title: 'Custom Class Name',
      type: 'string',
      description: 'Reference: https://v1.tailwindcss.com/',
    },
  ],
  preview: {
    select: {
      title: 'alt' || 'Image',
    },
  },
})
