import RentalCategoryCarousel from '@/components/blocks/RentalCategoryCarousel'
import RentalGrid from '@/components/blocks/RentalGrid/RentalGrid'
import ContentBlock from '@/components/shared/ContentBlock'
import { client } from '@/sanity/lib/client'
import {
  rentalCategoriesQuery,
  rentalSizeByCategoryQuery,
  rentalSizeQuery,
} from '@/sanity/lib/queries'

interface RentalGridLoaderProps {
  categoryId?: any
}

export default async function RentalGridLoader({
  categoryId,
}: RentalGridLoaderProps) {
  const data = categoryId
    ? await client.fetch(rentalSizeByCategoryQuery, {
        categoryId: categoryId,
      })
    : await client.fetch(rentalSizeQuery, {})

  const categories = await client.fetch(rentalCategoriesQuery, {})

  // console.log('InventoryGrid data:', data)
  if (data) {
    return (
      <>
        <RentalCategoryCarousel categories={categories} />
        <RentalGrid
          data={data}
          categoryId={categoryId}
          fallbackContent={
            <ContentBlock slug={'rental-category-no-equipment-state'} key="1" />
          }
        />
      </>
    )
  }

  return null
}
