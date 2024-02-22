import { Layout } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'fiveColumn',
  title: 'Five Column Section',
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
      name: 'bodyColOne',
      title: 'First Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'bodyColTwo',
      title: 'Second Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'bodyColThree',
      title: 'Third Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'bodyColFour',
      title: 'Forth Column Body',
      type: 'blockContentSimple',
    },
    {
      name: 'bodyColFive',
      title: 'Fith Column Body',
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
        subtitle: `Five Column`,
      }
    },
  },
})
