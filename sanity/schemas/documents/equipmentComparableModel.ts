import { SplitSquareHorizontal } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentComparableModel',
  title: 'Equipment Comparable Models',
  type: 'document',
  icon: SplitSquareHorizontal,
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
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
      group: 'main',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContentSimple',
      group: 'main',
    },
    {
      name: 'specifications',
      title: 'Additional Specifications',
      type: 'modelSpecs',
      group: 'specifications',
    },
  ],
  initialValue: {
    specifications: [
      {
        _key: 'f9bd18e40955',
        _type: 'modelSpecContent',
        specName: {
          _ref: '22e83e58-e514-4db5-b7ce-f4b492b45b88',
          _type: 'reference',
        },
        specValue: 'Tier 4 / Stage IV',
      },
      {
        _key: '5315450b4c04',
        _type: 'modelSpecContent',
        specName: {
          _ref: '2dfbb48f-2a73-4cee-a6f4-861afcacef03',
          _type: 'reference',
        },
        specValue: 'Cummins',
      },
      {
        _key: 'f50755d68a79',
        _type: 'modelSpecContent',
        specName: {
          _ref: '1ff46130-de5e-4238-a1b3-d665e23a216a',
          _type: 'reference',
        },
        specValue: '720',
      },
      {
        _key: '7c07bfebdd44',
        _type: 'modelSpecContent',
        specName: {
          _ref: 'fef53e23-4a32-4407-9ad3-eb9d5c76a278',
          _type: 'reference',
        },
        specValue: '6',
      },
    ],
  },
  preview: {
    select: {
      title: 'title',
      image: 'mainImage',
    },
    prepare({ title = 'No title', image }) {
      return {
        title,
        // subtitle: category,
        media: image,
      }
    },
  },
})
