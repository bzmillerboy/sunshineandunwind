import Link from 'next/link'

import CardEquipment from '@/components/shared/CardEquipment'
import { client } from '@/sanity/lib/client'
import {
  inventoryCategoryRelatedAttachmentsByCategoryRefQuery,
  inventoryCountByCategoryQuery,
} from '@/sanity/lib/queries'

interface InventoryGridProps {
  categoryRef?: string
}

export default async function InventoryCategoryAttachmentsGrid({
  categoryRef,
}: InventoryGridProps) {
  const data = await client.fetch(
    inventoryCategoryRelatedAttachmentsByCategoryRefQuery,
    {
      categoryId: categoryRef,
    },
  )

  return (
    <div className="container px-6 mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
      {data?.relatedAttachments?.map(async (category) => {
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
