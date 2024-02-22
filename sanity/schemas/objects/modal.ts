// import { FaRegMoneyBillAlt } from "react-icons/fa";

import { defineType } from 'sanity'

export default defineType({
  name: 'modal',
  title: 'Modal',
  type: 'object',
  // icon: FaRegMoneyBillAlt,
  fields: [
    {
      name: 'buttonText',
      title: 'Button Text',
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
    {
      title: 'Modal Size',
      name: 'modalSize',
      type: 'string',
      options: {
        list: [
          { title: 'Xtra Small', value: 'xs' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Xtra Large', value: 'xl' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'body',
      title: 'Modal Content',
      type: 'blockContentSimple',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'buttonText',
    },
    prepare({ title = 'Modal', category = 'None' }) {
      return {
        title,
        subtitle: `${category}`,
      }
    },
  },
})
