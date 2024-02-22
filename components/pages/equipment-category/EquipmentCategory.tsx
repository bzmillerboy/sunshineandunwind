import { fetchInventoryByCategory } from '@/app/(home)/equipment/[category]/actions'
import Hero from '@/components/blocks/Hero'
import InventoryGrid from '@/components/blocks/InventoryGrid/InventoryGrid'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { cleanEncodedMetadata, cn } from '@/lib/utils'
import { loadInventoryByCategory } from '@/sanity/loader/loadQuery'
import type { EquipmentCategoryPayload } from '@/types'

export interface PageProps {
  data: EquipmentCategoryPayload | null
}

export async function EquipmentCategory({ data }: PageProps) {
  const { _id: categoryId, body, title, mainImage, categoryType } = data ?? {}
  // const inventory = await loadInventoryByCategory(categoryId || '')
  const inventory = await fetchInventoryByCategory({ categoryId, page: 0 })

  // console.log('loadInventoryByCategory inventory:', inventory)

  return (
    <>
      {!body && (
        <Hero
          title={title}
          mainImage={mainImage}
          lightTheme={cleanEncodedMetadata(categoryType) === 'attachment'}
        />
      )}
      {body && <CustomPortableText value={body} />}
      <InventoryGrid inventory={inventory} categoryId={categoryId} />
    </>
  )
}

export default EquipmentCategory
