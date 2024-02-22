// This component is used as a Portable Text block. Implemented on pages like /news and menu header.
// A similar component exists, PostGrid, which is a RSC only and used on news/blog category pages.
// Once a solution is found for RSC in Portable Text, this component can be removed in favor of PostGrid.

import Link from 'next/link'

import CardPost from '@/components/shared/CardPost'
import Img from '@/components/shared/Img'
import { client } from '@/sanity/lib/client'
import { blogPostQuery } from '@/sanity/lib/queries'

interface BlogGridProps {
  compact?: boolean
  displayLimit?: number
}

export default async function BlogGrid({
  compact,
  displayLimit = 9999,
}: BlogGridProps) {
  const data = await client.fetch(blogPostQuery, {
    displayLimit: displayLimit - 1,
  })

  return (
    <ul className="grid grid-cols-2 gap-6">
      {data?.map((post) => {
        const { title, slug, _id: postId, mainImage, body } = post

        return (
          <Link href={`/news/${slug}`} key={postId}>
            <li>
              <CardPost
                title={title}
                image={mainImage}
                excerpt={compact ? '' : body}
                compact={compact}
              />
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
