import { differenceInDays, format, formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Img from '@/components/shared/Img'
import { H2, Muted, P } from '@/components/shared/Typography'
import type { PostPayload } from '@/types'

export interface PostProps {
  data: PostPayload | null
}

export function Post({ data }: PostProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, title, publishedAt = '', mainImage, categories } = data ?? {}
  // console.log('Post Props: ', data)

  return (
    <article>
      <div className="container mt-8">
        <H2>{title}</H2>
      </div>
      <Img
        image={data?.mainImage}
        alt={data?.mainImage?.alt || 'Post Hero Image'}
        width={1400}
        height={Math.floor((9 / 21) * 1400)}
        className="object-cover w-full h-full"
        loading="eager"
        queryParams={{ sharpen: 50, q: 75 }}

        // aspectRatio={21 / 9}
      />
      <div className="blog-post-body max-w-4xl m-auto pt-12 [&>.container]:mb-6">
        {body && <CustomPortableText value={body} />}
      </div>
      <hr className="mb-10" />

      <div className="container text-center mt-10">
        <Muted>Date: </Muted>
        {differenceInDays(new Date(publishedAt), new Date()) > -3
          ? formatDistanceToNow(new Date(publishedAt), { addSuffix: true })
          : format(new Date(publishedAt), 'MM.dd.yyyy')}
      </div>
      <div className="container text-center mt-10">
        <Muted>Topics:</Muted>{' '}
        {categories?.map((category, index, arr) => (
          <Link href={`/news/category/${category?.slug}`} key={index}>
            <span key={index}>
              {category.title}
              {index < arr.length - 1 && ', '}
            </span>
          </Link>
        ))}
      </div>
    </article>
  )
}

export default Post
