import { differenceInDays, format, formatDistanceToNow } from 'date-fns'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { H1 } from '@/components/shared/Typography'
import VideoPlayer from '@/components/shared/VideoPlayer'
import type { VideoPostPayload } from '@/types'

export interface VideoPostProps {
  data: VideoPostPayload | null
}

export function VideoPost({ data }: VideoPostProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, title, mainImage, videoURL } = data ?? {}
  // console.log('Post Props: ', data)

  return (
    <>
      <div className="container">
        <H1>{title}</H1>
      </div>
      <div className="bg-black">
        <div className="xl:container">
          <VideoPlayer url={videoURL} image={mainImage} />
        </div>
      </div>

      <div className="blog-post-body max-w-4xl m-auto pt-12">
        {body && <CustomPortableText value={body} />}
      </div>
    </>
  )
}

export default VideoPost
