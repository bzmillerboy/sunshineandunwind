import { Tractor } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  icon: Tractor,
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
      readOnly: true,
      options: {
        source: 'title',
        maxLength: 296,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'equipmentMake',
      title: 'Make',
      type: 'reference',
      to: { type: 'equipmentMake' },
    },
    {
      name: 'equipmentCategories',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'equipmentCategory' },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'imageGallery',
      title: 'Images',
      type: 'imageGallery',
    },
    {
      name: 'hoursPhoto',
      title: 'Photo Hours (at time of photo)',
      type: 'number',
      hidden: ({ document }) => !document?.imageGallery,
    },
    {
      name: 'photoDate',
      title: 'Photo Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM Do YYYY',
      },
      hidden: ({ document }) => !document?.imageGallery,
      //TODO: Fix validation
      // validation: (Rule) =>
      //   Rule.custom((field, context) =>
      //     context.document.imageGallery && field === undefined
      //       ? 'Photo Date value is required.'
      //       : true,
      //   ),
    },
    {
      name: 'videoURL',
      title: 'Video URL',
      type: 'string',
      description: 'Enter the URL of a YouTube or Vimeo video.',
    },
    {
      name: 'descriptionBlock',
      title: 'Description',
      type: 'blockText',
    },
    {
      name: 'specification',
      title: 'Specification',
      type: 'string',
      readOnly: true,
      // hidden: true
    },
    {
      name: 'stockNumber',
      title: 'Stock Number',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      options: {
        range: { min: 0, step: 1.0 },
      },
    },
    {
      name: 'closeout',
      title: 'Closeout',
      type: 'boolean',
    },
    {
      name: 'serial',
      title: 'Serial Number',
      type: 'string',
    },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'Used', value: 'used' },
          { title: 'New', value: 'new' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
    },
    {
      name: 'modelReference',
      title: 'Model Reference',
      type: 'reference',
      to: { type: 'models' },
    },
    {
      name: 'hoursCurrent',
      title: 'Hours (most recent)',
      type: 'number',
    },
    {
      name: 'mileage',
      title: 'Mileage',
      type: 'number',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: { type: 'location' },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Stock', value: 'stock' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'deliveryDate',
      title: 'Delivery Date',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MMMM Do YYYY',
        timeFormat: 'h:mm a',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      name: 'movementDate',
      title: 'Movement Date',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MMMM Do YYYY',
        timeFormat: 'h:mm a',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
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
      stockNumber: 'stockNumber',
      image: 'mainImage',
    },
    prepare({ title = 'No title', stockNumber, image }) {
      return {
        title,
        subtitle: stockNumber,
        media: image,
      }
    },
  },
})
