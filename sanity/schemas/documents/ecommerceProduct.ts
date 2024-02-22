import { Tag } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'ecommerceProduct',
  title: 'Product',
  type: 'document',
  icon: Tag,
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
        maxLength: 96,
      },
    },
    {
      title: 'Default variant',
      name: 'defaultProductVariant',
      type: 'ecommerceProductVariant',
    },
    {
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'ecommerceProductVariant',
        },
      ],
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'vendor',
      title: 'Vendor',
      type: 'reference',
      to: { type: 'equipmentMake' },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'ecommerceCategory' },
        },
      ],
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'blockText',
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContentSimple',
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
      manufactor: 'manufactor.title',
      media: 'defaultProductVariant.images[0]',
    },
  },
})
