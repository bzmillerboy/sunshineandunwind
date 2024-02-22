import { Settings } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Upload an image to set the Open Graph image for SEO purposes. This image will be displayed when the web page is shared on social media platforms, enhancing visibility and engagement. Ensure the image aligns with the content and branding to optimize the web pages visual representation across various online platforms. Individual pages may overwrite this image.',
    },
    {
      name: 'url',
      title: 'Website URL',
      type: 'string',
    },
    {
      name: 'siteName',
      title: 'Website Name',
      type: 'string',
    },
  ],
})
