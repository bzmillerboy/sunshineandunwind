import { Layout } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'twoColumn',
  title: 'Two Column Section',
  type: 'object',
  icon: Layout,
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
    },
    {
      name: 'containerOption',
      title: 'Full Width?',
      type: 'boolean',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: '1/1', value: '1-1' },
          { title: '2/1', value: '2-1' },
          { title: '1/2', value: '1-2' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '1-1',
    },
    {
      name: 'bodyLeft',
      title: 'Left Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'bodyRight',
      title: 'Right Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'customClassName',
      title: 'Custom Class Name',
      type: 'string',
      description: 'Reference: https://v1.tailwindcss.com/',
    },
  ],
  preview: {
    select: {
      name: 'sectionName',
    },
    prepare({ name }) {
      return {
        title: name,
        subtitle: 'Two Column',
      }
    },
  },
})
