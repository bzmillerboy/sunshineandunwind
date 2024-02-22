import VideoPlayer from '@/components/shared/VideoPlayer'

interface VideoProps {
  videoURL?: string
  posterImage?: { asset?: any }
  noShadow?: string
}

export default function Video({ videoURL, posterImage, noShadow }: VideoProps) {
  return (
    <div
      className={`block rounded-lg overflow-hidden mb-6 w-full  ${
        (!noShadow &&
          'shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-200') ||
        ''
      }`}
    >
      <VideoPlayer url={videoURL} image={posterImage} />
    </div>
  )
}
