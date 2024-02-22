import { Phone } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'phoneNumbers',
  title: 'Phone Numbers',
  type: 'document',
  icon: Phone,
  fields: [
    {
      name: 'number',
      title: 'Number',
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
