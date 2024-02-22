import { Truck } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'models',
  title: 'Models',
  type: 'document',
  icon: Truck,
  groups: [
    {
      name: 'main',
      title: 'Main Fields',
      default: true,
    },
    {
      name: 'specifications',
      title: 'Specs',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'main',
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
      group: 'main',
    },
    {
      name: 'sortOrder',
      title: 'Sort Order Position',
      type: 'string',
      description: 'Set the exact sort position to be used by grid views.',
      group: 'main',
    },
    {
      name: 'equipmentMake',
      title: 'Make',
      type: 'reference',
      to: { type: 'equipmentMake' },
      validation: (Rule) => Rule.required(),
      group: 'main',
    },
    {
      name: 'equipmentCategories',
      title: 'Equipment Categories',
      type: 'reference',
      to: { type: 'equipmentCategory' },
      validation: (Rule) => Rule.required(),
      group: 'main',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      options: {
        range: { min: 0, step: 1.0 },
      },
      group: 'main',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
      group: 'main',
    },

    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'main',
    },
    {
      name: 'descriptionBlock',
      title: 'Description',
      type: 'blockText',
      group: 'main',
    },
    {
      name: 'featuredComparable',
      title: 'Featured Comparable',
      type: 'boolean',
      group: 'main',
      description:
        'If checked, this model will be featured/displayed on the comparable home page (/compare).',
    },
    {
      name: 'comparableDescriptionBlock',
      title: 'Comparable Description',
      type: 'blockContentSimple',
      group: 'main',
      description:
        'This description will be displayed at the top of the comparable landing page (e.g. /compare/sany-sy500h-excavator).',
    },
    {
      title: 'Comparable Models',
      name: 'comparableModels',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'equipmentComparableModel' }, { type: 'models' }],
        },
      ],
      group: 'main',
    },
    {
      name: 'specifications',
      title: 'Additional Specifications',
      type: 'modelSpecs',
      group: 'specifications',
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
      publishedAt: '_updatedAt',
      make: 'equipmentMake.name',
      category: 'equipmentCategories.title',
      image: 'mainImage',
    },
    prepare({ title = 'No title', publishedAt, image, make, category }) {
      return {
        title,
        subtitle: `${make} | ${category}`,
        media: image,
      }
    },
  },
})
