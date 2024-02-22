import { MdOutlineViewList } from 'react-icons/md'
import { defineType } from 'sanity'

export default defineType({
  name: 'jobListings',
  title: 'Job Listings',
  type: 'object',
  icon: MdOutlineViewList,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
  initialValue: {
    title: 'Job Listings',
  },
})
