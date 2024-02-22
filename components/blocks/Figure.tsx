import Img from '@/components/shared/Img'
import { client } from '@/sanity/lib/client'
import { imageByIdQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/utils'

interface FigureProps {
  image?: { asset?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  caption?: string
  noShadow?: boolean
  externalLink?: string
  customClasses?: string
}

export function ImageLink(props) {
  // console.log('Link:', props)
  const { children, externalLink } = props
  if (externalLink) {
    return <a href={externalLink}>{children}</a>
  } else {
    return <>{children}</>
  }
}

export default async function Figure({
  image,
  alt,
  width = 3500,
  height = 2000,
  size = '100vw',
  caption,
  noShadow,
  externalLink,
  customClasses = '',
}: FigureProps) {
  const data = await client.fetch(imageByIdQuery, {
    id: image?.asset?._ref || '',
  })
  // console.log('Figure image:', image)

  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).fit('crop').url()

  // console.log('externalLink', externalLink)

  return (
    <figure className={`mb-8  ${customClasses}`}>
      <ImageLink className="imageLink" externalLink={externalLink}>
        <div
          className={`overflow-hidden rounded-[3px]  ${
            (!noShadow && 'drop-shadow-lg') || ''
          }`}
        >
          {imageUrl && (
            <Img
              className="w-full"
              image={image}
              alt={alt || 'Newman Tractor Image'}
              size="calc(100vw - 64px)"
              width={608}
              lqip={data?.lqip}
              queryParams={{ sharpen: 50, q: 30 }}
            />
          )}
        </div>
      </ImageLink>
      {caption && (
        <figcaption
          className={`font-sans text-sm text-gray-600 p-2 border-b border-spacing-2 border-gray-200 inline-flex`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
