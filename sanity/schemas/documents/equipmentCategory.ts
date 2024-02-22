import { LayoutGrid } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'equipmentCategory',
  title: 'Equipment Category',
  type: 'document',
  icon: LayoutGrid,
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
      // readOnly: true,
      options: {
        source: 'title',
        maxLength: 296,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'mainImage',
      description:
        'The primary image to be used on the category page and other places that represent this record.',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'mainImage',
      description:
        "The hero background image to be used as the category's landing page (ex. /equipment/crane). Note: only used if specific body content is't already provided.",
    },
    {
      title: 'Type',
      name: 'categoryType',
      type: 'string',
      options: {
        list: [
          { title: 'Model', value: 'model' },
          { title: 'Attachment', value: 'attachment' },
          { title: 'Job', value: 'job' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContentSimple',
      description:
        "A short description of the category. This will be used in the hero section and as the meta description for the category page (ex. /equipment/crane). Note: only used if specific body content is't already provided.",
    },
    {
      title: 'Child Categories',
      name: 'childCategories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'equipmentCategory' }],
        },
      ],
      description:
        "Used to nest categories within another category. Used on category types of 'Job' and specifically the rental category pages (ex /rentals/earth-moving).",
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description:
        "The body content for the category's landing page (ex. /equipment/crane). Note: A default template is generated for the page but adding content here will override the default content.",
    },
    {
      name: 'relatedAttachments',
      title: 'Related Attachments',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'equipmentCategory' },
          options: {
            filter: 'categoryType == $categoryType',
            filterParams: { categoryType: 'attachment' },
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
      hidden: ({ document }) => document?.categoryType != 'model',
    },
    {
      name: 'attachmentBody',
      title: 'Attachment Body',
      type: 'blockContent',
      hidden: ({ document }) => !document?.relatedAttachments,
      description:
        "Content for the category attachment's individual page (ex. /equipment/articulated-dump-truck/attachments). Note: A page is only created if there is content here.",
    },
    {
      name: 'detailInfo',
      title: 'Detail Info',
      type: 'blockContent',
      description: 'Content for the individual equipment page.',
    },
    {
      name: 'exclude',
      title: 'Exclude From Display',
      description:
        'Excludes this category from displaying as an option on the site.',
      type: 'boolean',
    },
    {
      name: 'rentalAvailable',
      title: 'Available for Rentals',
      description: 'Makes this category available for rental quotes.',
      type: 'boolean',
    },
    // Update to "rentalDescription"
    {
      name: 'rentalDescription',
      title: 'Rental Description',
      type: 'blockContentSimple',
      description:
        "A short description of the category for rentals. This will be used in the hero section and as the meta description for the category page (ex. /rentals/excavator). Note: only used if specific body content is't already provided.",
    },
    {
      name: 'bodyRental',
      title: 'Rental Body',
      type: 'blockContent',
      description:
        "The body content for the category's landing page for rentals (ex. /rentals/excavator). Note: A default template is generated for the page but adding content here will override the default content.",
    },
  ],
  orderings: [
    {
      title: 'Type',
      name: 'categoryTypeDesc',
      by: [{ field: 'categoryType', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'categoryType',
      image: 'mainImage',
    },
    prepare({ title = 'No title', type, image }) {
      return {
        title,
        subtitle: type,
        media: image,
      }
    },
  },
})
