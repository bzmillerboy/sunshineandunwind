// import { FaRegFileVideo } from "react-icons/fa";
import { PlayCircle } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'videoPost',
  title: 'Video Post',
  type: 'document',
  icon: PlayCircle,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 296,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description:
        'You can use this field to schedule post where you show them',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoURL',
      title: 'Video URL',
      type: 'string',
      description: 'Enter the URL of a YouTube or Vimeo video.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'body',
      title: 'Description',
      type: 'blockText',
    },
  ],
})
