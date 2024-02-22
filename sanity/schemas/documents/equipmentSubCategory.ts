import { MdLineWeight } from 'react-icons/md'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentSubCategory',
  title: 'Rental Sizes',
  type: 'document',
  icon: MdLineWeight,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'equipmentCategories',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'equipmentCategory' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockText',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'blockContentSimple',
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'specContent',
    },
    {
      title: 'Compareable Models',
      name: 'comparableModels',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'equipmentComparableModel' }],
        },
      ],
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
