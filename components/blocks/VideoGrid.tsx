import Link from 'next/link'

import CardPost from '@/components/shared/CardPost'
import { client } from '@/sanity/lib/client'
import { videoPostQuery } from '@/sanity/lib/queries'

interface VideoGridProps {
  compact?: boolean
  displayLimit?: number
}

export default async function VideoGrid({
  compact,
  displayLimit = 9999,
}: VideoGridProps) {
  const data = await client.fetch(videoPostQuery, {
    displayLimit: displayLimit - 1,
  })

  return (
    <ul className="grid grid-cols-2 gap-6">
      {data?.map((post) => {
        const { title, slug, _id: postId, mainImage, body } = post
        return (
          <Link href={`/videos/${slug}`} key={postId}>
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
