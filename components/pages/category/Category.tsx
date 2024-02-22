import { differenceInDays, format, formatDistanceToNow } from 'date-fns'

import Hero from '@/components/blocks/Hero'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Img from '@/components/shared/Img'
import { H1, Muted, P } from '@/components/shared/Typography'
import { cleanEncodedMetadata, cn } from '@/lib/utils'
import type { CategoryPayload } from '@/types'

export interface CategoryProps {
  data: CategoryPayload | null
  postGrid: React.ReactNode
}

export function Category({ data, postGrid }: CategoryProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, slug, mainImage, description } = data ?? {}
  // console.log('Post Props: ', data)

  return (
    <>
      <Hero title={`${title}`} mainImage={mainImage || {}} body={description} />
      <div className="container">{postGrid}</div>
    </>
  )
}

export default Category
