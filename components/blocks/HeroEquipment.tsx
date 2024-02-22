import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Img from '@/components/shared/Img'

import { H1 } from '../shared/Typography'

const fallbackImage = {
  _type: 'mainImage',
  asset: {
    _ref: 'image-1b660c0c47bb04939aea214ddee61b79cdc4df14-4000x1709-png',
    _type: 'reference',
  },
}

interface HeroProps {
  body?: any
  title?: string
  mainImage?: { asset?: any; alt?: string; lqip?: string }
  backgroundImage?: { asset?: any; alt?: string }
}

export default function HeroEquipment({
  body,
  title,
  mainImage,
  backgroundImage,
}: HeroProps) {
  // console.log('mainImage:', mainImage)
  return (
    <section className="h-full mb-8 relative overflow-hidden">
      <Img
        image={backgroundImage || fallbackImage}
        alt={backgroundImage?.alt || 'Page Hero Image'}
        width={1700}
        className="hidden md:block absolute inset-0 z-[-1] w-full h-full object-contain object-right-bottom"
        mode="contain"
      />
      <div className="container relative z-10 md:flex items-center m-auto">
        <div data-sanity-edit-target className="max-w-xl flex-1 py-12">
          {title && <H1>{title}</H1>}
          {body && <CustomPortableText value={body} />}
        </div>
        <div className="flex-1">
          {mainImage?.asset && (
            <Img
              image={mainImage}
              alt={mainImage?.alt || 'Newman Tractor Image'}
              width={1400}
              size="(min-width: 1200px) 800px, 400px"
              mode="contain"
              lqip={mainImage.lqip}
            />
          )}
        </div>
      </div>
    </section>
  )
}
