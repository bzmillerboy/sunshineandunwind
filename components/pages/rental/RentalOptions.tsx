import RentalOptionsToggle from '@/components/pages/rental/RentalOptionsToggle'
import { P } from '@/components/shared/Typography'
import { client } from '@/sanity/lib/client'
import { rentalOptionsByCategorySlugQuery } from '@/sanity/lib/queries'

export default async function RentalOptions({ categorySlug }) {
  const data = await client.fetch(rentalOptionsByCategorySlugQuery, {
    categorySlug: categorySlug,
  })

  if (data.length === 0) return null

  return (
    <>
      <P>Options:</P>

      <div className="flex flex-wrap gap-2 mb-6">
        <RentalOptionsToggle data={data} />
      </div>
    </>
  )
}
