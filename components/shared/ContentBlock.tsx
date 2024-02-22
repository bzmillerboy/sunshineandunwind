import { client } from '@/sanity/lib/client'
import { contentBlockBySlugQuery } from '@/sanity/lib/queries'

import { CustomPortableText } from './CustomPortableText'

interface ContentBlockProps {
  slug: string
  baseParagraphClasses?: string
}

export default async function ContentBlock({
  slug,
  baseParagraphClasses,
}: ContentBlockProps) {
  const content = await client.fetch(contentBlockBySlugQuery, {
    slug: slug,
  })

  return (
    <CustomPortableText
      value={content?.body || []}
      baseParagraphClasses={baseParagraphClasses}
    />
  )
}
