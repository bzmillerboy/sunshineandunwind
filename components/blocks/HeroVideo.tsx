import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { cleanEncodedMetadata, cn } from '@/lib/utils'
import { urlForImage } from '@/sanity/lib/utils'

import { bgVideoClasses, sizeClasses } from './HeroConstants'

const fallbackImage = {
  _type: 'mainImage',
  asset: {
    _ref: 'image-420e03d14202b3312d9e2a1e4db053c2851e0387-7467x1625-png',
    _type: 'reference',
  },
  alt: 'Video Hero Image',
}

interface HeroVideoProps {
  body?: any
  posterImage?: { asset?: any; alt?: string }
  size?: string
  videoSource: string
  videoSourceWebm?: string
  videoSourceOgg?: string
  lightTheme?: boolean
  alignment?: string
}

export default function HeroVideo({
  body,
  posterImage,
  size = 'default',
  videoSource,
  videoSourceWebm,
  videoSourceOgg,
  lightTheme = false,
  alignment = 'left',
}: HeroVideoProps) {
  const imageUrl = urlForImage(posterImage?.asset ? posterImage : fallbackImage)
    ?.width(1000)
    .fit('crop')
    .url()

  return (
    <section
      className={cn(
        sizeClasses[cleanEncodedMetadata(size)],
        'flex relative overflow-hidden',
        `text-${cleanEncodedMetadata(alignment)} z-10 bg-black`,
        { 'bg-white': lightTheme, 'bg-black': !lightTheme },
        { light: lightTheme, dark: !lightTheme },
      )}
    >
      <div
        className="absolute inset-0 z-10 w-full h-full object-cover"
        style={{
          backgroundImage: bgVideoClasses[String(lightTheme)],
        }}
      ></div>
      <video
        className="pointer-events-none absolute inset-0 w-full h-full object-cover z-[-1]"
        autoPlay={true}
        loop={true}
        preload="auto"
        muted
        playsInline
        poster={imageUrl}
      >
        {videoSourceOgg && <source src={videoSourceOgg} type="video/ogg" />}
        {videoSourceWebm && <source src={videoSourceWebm} type="video/webm" />}
        {videoSource && <source src={videoSource} type="video/mp4" />}
      </video>
      <div className="container relative z-10 flex flex-col m-auto">
        <div
          data-sanity-edit-target
          className={cn('max-w-xl', {
            'm-auto': alignment === 'center',
            'ml-auto': alignment === 'right',
          })}
        >
          {body && <CustomPortableText value={body} />}
        </div>
      </div>
    </section>
  )
}
