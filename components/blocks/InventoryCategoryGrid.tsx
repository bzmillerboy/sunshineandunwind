import Link from 'next/link'

import CardEquipment from '@/components/shared/CardEquipment'
import { client } from '@/sanity/lib/client'
import {
  inventoryCategorytByTypeQuery,
  inventoryCountByCategoryQuery,
} from '@/sanity/lib/queries'

interface InventoryGridProps {
  categoryType?: string
}

export default async function InventoryCategoryGrid({
  categoryType,
}: InventoryGridProps) {
  const data = await client.fetch(inventoryCategorytByTypeQuery, {
    categoryType: categoryType,
  })

  return (
    <div className="container px-6 mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
      {data.map(async (category) => {
        const { mainImage, title, slug, _id: categoryId } = category

        const inventoryCount = await client.fetch(
          inventoryCountByCategoryQuery,
          {
            categoryId: categoryId,
          },
        )
        if (inventoryCount === 0) return null

        return (
          <>
            <Link href={`/equipment/${slug}`}>
              <CardEquipment
                image={mainImage}
                title={title}
                ctaText="See Inventory"
                subheading={`Currently ${inventoryCount} Available`}
              />
            </Link>
          </>
        )
      })}
    </div>
  )
}
