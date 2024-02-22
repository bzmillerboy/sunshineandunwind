'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { rentalCategoryBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { EquipmentCategoryPayload } from '@/types'

import RentalCategory from '../rental-category/RentalCategory'

type Props = {
  params: { category?: string }
  initial: QueryResponseInitial<EquipmentCategoryPayload | null>
}

export default function RentalCategoryPreview(props: Props) {
  const { params, initial } = props
  const { data } = useQuery<EquipmentCategoryPayload | null>(
    rentalCategoryBySlugQuery,
    { slug: params.category },
    {
      initial,
    },
  )

  return <RentalCategory data={data!} />
}
