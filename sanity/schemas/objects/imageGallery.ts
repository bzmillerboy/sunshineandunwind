import { defineType } from 'sanity'

export default defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    {
      type: 'array',
      name: 'images',
      title: 'Images',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    },
  ],
})
