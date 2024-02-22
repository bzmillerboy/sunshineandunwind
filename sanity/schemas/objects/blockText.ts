import { List, ListOrdered } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  title: 'Block Text',
  name: 'blockText',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',

      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [
        { title: 'Bullet', value: 'bullet', icon: List },
        { title: 'Number', value: 'number', icon: ListOrdered },
        {
          title: 'List',
          value: 'roman',
          icon: List,
        },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [],
      },
    },
  ],
})
