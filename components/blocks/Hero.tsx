import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Img from '@/components/shared/Img'
import { cleanEncodedMetadata, cn } from '@/lib/utils'

import { H1 } from '../shared/Typography'
import { bgClasses, bgImageSize, sizeClasses } from './HeroConstants'

const fallbackImage = {
  _type: 'mainImage',
  asset: {
    _ref: 'image-420e03d14202b3312d9e2a1e4db053c2851e0387-7467x1625-png',
    _type: 'reference',
  },
}

interface HeroProps {
  body?: any
  title?: string
  mainImage?: { asset?: any; alt?: string }
  size?: string
  lightTheme?: boolean
  alignment?: string
}

export default function Hero({
  body,
  title,
  mainImage,
  size = 'default',
  lightTheme = false,
  alignment = 'left',
}: HeroProps) {
  return (
    <section
      className={cn(
        sizeClasses[cleanEncodedMetadata(size)],
        'flex relative overflow-hidden',
        `text-${cleanEncodedMetadata(alignment)} z-10 bg-black`,
        { 'bg-white': lightTheme, 'bg-black': !lightTheme },
        { light: lightTheme, dark: !lightTheme },
      )}
      // style={{
      //   backgroundImage: bgClasses[String(lightTheme)],
      // }}
    >
      <Img
        image={mainImage || fallbackImage}
        alt={mainImage?.alt || 'Page Hero Image'}
        width={bgImageSize[size]?.width}
        height={bgImageSize[size]?.height}
        loading="eager"
        className={cn(
          'absolute inset-0 z-[-1] w-full h-full object-cover brightness-50',
          {
            // 'opacity-10': lightTheme,
            // 'opacity-20': !lightTheme,
          },
        )}
        mode="cover"
        queryParams={{ sharpen: 50, q: 90 }}
      />
      <div className="container relative z-10 flex flex-col m-auto">
        <div
          data-sanity-edit-target
          className={cn('max-w-xl', {
            'm-auto': alignment === 'center',
            'ml-auto': alignment === 'right',
          })}
        >
          {title && <H1>{title}</H1>}
          {body && <CustomPortableText value={body} />}
        </div>
      </div>
    </section>
  )
}
