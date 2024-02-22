import { MapPinned } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: MapPinned,
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
      name: 'erpId',
      title: 'ERP ID',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'generalPhone',
      title: 'General Phone Number',
      type: 'string',
    },
    {
      name: 'partsPhone',
      title: 'Parts Phone Number',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'address1',
      title: 'Address 1',
      type: 'string',
    },
    {
      name: 'address2',
      title: 'Address 2',
      type: 'string',
    },
    {
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'As a two letter abbreviation (ex. KY)',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'localAirports',
      title: 'Local Airports',
      type: 'string',
    },
    {
      name: 'discription',
      title: 'Discription',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    },
  ],
})
