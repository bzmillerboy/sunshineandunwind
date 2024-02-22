import Link from 'next/link'

import CardEquipment from '@/components/shared/CardEquipment'
import { H5 } from '@/components/shared/Typography'
import { client } from '@/sanity/lib/client'
import { rentalSizesByCategorySlugQuery } from '@/sanity/lib/queries'

export default async function RentalAdditionalSizes({
  categorySlug,
  currentSize,
}) {
  const data = await client.fetch(rentalSizesByCategorySlugQuery, {
    categorySlug: categorySlug,
  })

  const sizes = data?.filter((size) => size.slug !== currentSize)

  if (sizes.length === 0) return null

  return (
    <>
      <H5>- Additional Sizes -</H5>

      <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        {sizes?.map((size) => {
          return (
            <Link
              href={`/rentals/${categorySlug}/${size.slug}`}
              key={size.slug}
            >
              <CardEquipment image={size?.mainImage} title={size?.title} />
            </Link>
          )
        })}
      </div>
    </>
  )
}
