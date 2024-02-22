'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { videoPostBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { VideoPostPayload } from '@/types'

import VideoPost from './VideoPost'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<VideoPostPayload | null>
}

export default function VideoPostPreview(props: Props) {
  const { params, initial } = props
  const { data } = useQuery<VideoPostPayload | null>(
    videoPostBySlugQuery,
    params,
    {
      initial,
    },
  )

  return <VideoPost data={data!} />
}
