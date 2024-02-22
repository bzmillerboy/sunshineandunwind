import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { defineType } from 'sanity'

export default defineType({
  name: 'financeApplicationForm',
  title: 'Finance Application Form',
  type: 'object',
  icon: FaRegMoneyBillAlt,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
  initialValue: {
    title: 'Finance Application Form',
  },
})
