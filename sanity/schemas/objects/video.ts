import { Video } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: Video,
  fields: [
    {
      name: 'videoURL',
      title: 'Video URL',
      type: 'string',
      description: 'Enter the URL of a YouTube or Vimeo video.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'posterImage',
      title: 'Video Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noShadow',
      title: 'No Shadow?',
      type: 'boolean',
    },
  ],
})
