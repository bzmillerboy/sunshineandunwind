import { client } from '@/sanity/lib/client'
import { staffByLocationIdQuery } from '@/sanity/lib/queries'

import StaffGrid from './StaffGrid'

interface StaffGridProps {
  locationId?: string
}

export default async function StaffGridLoader({ locationId }: StaffGridProps) {
  // console.log('StaffGrid locationId:', locationId)

  const staff = await client.fetch(staffByLocationIdQuery, {
    locationId: locationId,
  })

  const departments = staff
    ?.map((department) => department?.department)
    .filter((department) => department !== null)
    .reduce((unique, department) => {
      if (!unique.some((item) => item?.slug === department?.slug)) {
        unique.push(department)
      }
      return unique
    }, [])
    .sort((a, b) => (a.slug > b.slug ? 1 : -1))

  departments.unshift({ slug: 'all', title: 'All', _id: 'all' })

  return (
    <StaffGrid
      departments={departments}
      location={staff[0].location}
      staff={staff}
    />
  )
}
