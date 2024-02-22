import { Layout } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'threeColumn',
  title: 'Three Column Section',
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
      name: 'bodyLeft',
      title: 'Left Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'bodyCenter',
      title: 'Center Column Body',
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
        subtitle: 'Three Column',
      }
    },
  },
})
