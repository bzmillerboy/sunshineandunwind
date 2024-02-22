'use client'

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })
import { youTubeImageUrl } from '@/lib/utils'
import { urlForImage } from '@/sanity/lib/utils'

interface VideoPlayerProps {
  url?: string
  image?: any
}

export default function VideoPlayer({ url, image }: VideoPlayerProps) {
  const controls = true

  const imageUrl =
    image &&
    urlForImage(image)
      ?.height(752)
      .width(1336)
      .fit('crop')
      .crop('entropy')
      .auto('format')
      .url()

  return (
    <div className="aspect-w-16 aspect-h-9">
      <ReactPlayer
        url={url}
        light={youTubeImageUrl(url) || imageUrl || true}
        controls={controls}
        width="100%"
        height="100%"
        playing
      />
    </div>
  )
}
