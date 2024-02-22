import Link from 'next/link'

import CardEquipment from '@/components/shared/CardEquipment'
import { client } from '@/sanity/lib/client'
import { modelsByCategoryAndMakeQuery } from '@/sanity/lib/queries'
import { resolveHref } from '@/sanity/lib/utils'

interface InventoryGridProps {
  categoryId?: string
  makeId?: string
}

export default async function ModelGrid({
  categoryId,
  makeId,
}: InventoryGridProps) {
  const data = await client.fetch(modelsByCategoryAndMakeQuery, {
    categoryId: categoryId,
    makeId: makeId,
  })

  return (
    <div className="container px-6 mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
      {data.map(async (item) => {
        const { mainImage, title, slug, make, category } = item

        const engineHP = item.specifications?.find(
          (spec) => spec.specId === 'VFtdfrbx4mANsihdWLTQFj',
        )?.specValue
        const operatingWeight = item.specifications?.find(
          (spec) => spec.specId === 'gZHZOd9lLky5KkplrWrrTP',
        )?.specValue
        const subheading = (
          <>
            {operatingWeight} lb |{' '}
            <span className="text-brandred">{engineHP} hp</span>
          </>
        )

        return (
          <>
            <Link
              href={
                resolveHref('models', slug, make?.slug, category?.slug) || '/'
              }
            >
              <CardEquipment
                image={mainImage}
                title={title}
                subheading={engineHP && operatingWeight ? subheading : ``}
              />
            </Link>
          </>
        )
      })}
    </div>
  )
}
