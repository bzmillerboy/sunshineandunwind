import { IoMdOptions } from 'react-icons/io'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentOptions',
  title: 'Equipment Options',
  type: 'document',
  icon: IoMdOptions,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'equipmentCategories',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'equipmentCategory' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'hubSpotProductId',
      title: 'HubSpot Product ID',
      type: 'string',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'equipmentCategories.title',
      image: 'mainImage',
    },
    prepare({ title = 'No title', category, image }) {
      return {
        title,
        subtitle: category,
        media: image,
      }
    },
  },
})
