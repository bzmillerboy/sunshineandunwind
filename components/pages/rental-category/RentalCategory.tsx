import Hero from '@/components/blocks/Hero'
import RentalGridLoader from '@/components/blocks/RentalGrid/RentalGridLoader'
import { cleanEncodedMetadata, cn } from '@/lib/utils'
import type { EquipmentCategoryPayload } from '@/types'

export interface PageProps {
  data: EquipmentCategoryPayload | null
}

export function RentalCategory({ data }: PageProps) {
  const { _id, rentalDescription, title, backgroundImage, categoryType } =
    data ?? {}

  return (
    <>
      <Hero
        title={title}
        mainImage={backgroundImage}
        body={rentalDescription}
      />
      <RentalGridLoader categoryId={_id} />
    </>
  )
}

export default RentalCategory
