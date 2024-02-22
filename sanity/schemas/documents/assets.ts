import { MdOutlineAttachFile } from 'react-icons/md'
import { defineType } from 'sanity'

export default defineType({
  name: 'assets',
  title: 'Assets',
  type: 'document',
  icon: MdOutlineAttachFile,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'asset',
      title: 'Asset',
      type: 'asset',
    },
  ],
  preview: {
    select: {
      title: 'asset.asset.originalFilename',
    },
  },
})
