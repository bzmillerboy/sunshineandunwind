// This component is a RSC only and used on news/blog category pages.
// A similar component exists, BlogGrid, which is used as a Portable Text block. Implemented on pages like /news and menu header.

import Link from 'next/link'

import CardPost from '@/components/shared/CardPost'
import { loadPosts, loadPostsByCategory } from '@/sanity/loader/loadQuery'

interface PostGridProps {
  compact?: boolean
  displayLimit?: number
  categoryId?: string
}

export default async function PostGrid({
  compact,
  displayLimit = 9999,
  categoryId,
}: PostGridProps) {
  const { data } = categoryId
    ? await loadPostsByCategory(categoryId ?? '')
    : await loadPosts()

  // console.log('PostGrid data', data)

  return (
    <ul className="grid grid-cols-2 gap-6">
      {data?.map((post) => {
        const { title, slug, _id: postId, mainImage, body } = post

        return (
          <Link href={`/news/${slug}`} key={postId}>
            <li>
              <CardPost
                title={title ?? ''}
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
