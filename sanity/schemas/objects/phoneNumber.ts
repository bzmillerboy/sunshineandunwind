import { Phone } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'phoneNumber',
  type: 'object',
  icon: Phone,
  title: 'Phone Number',
  fields: [
    {
      name: 'numberRef',
      title: 'Number',
      type: 'reference',
      to: { type: 'phoneNumbers' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'appendingText',
      title: 'Appending Text',
      type: 'string',
    },
    {
      title: 'Link Type',
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'link' },
          { title: 'Button: Primary', value: 'btnPrimary' },
          { title: 'Button: Secondary', value: 'btnSecondary' },
          { title: 'Button: Primary Outline', value: 'btnPrimaryOutline' },
          { title: 'Button: Secondary Outline', value: 'btnSecondaryOutline' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      title: 'numberRef.number',
    },
  },
})
