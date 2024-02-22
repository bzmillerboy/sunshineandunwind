'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { inventoryBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { RentalPayload } from '@/types'

import Rental from './Rental'

type RentalPreviewProps = {
  params: { slug: string }
  initial: QueryResponseInitial<RentalPayload | null>
}

export default function RentalPreview(props: RentalPreviewProps) {
  const { params, initial } = props
  const { data } = useQuery<RentalPayload | null>(
    inventoryBySlugQuery,
    params,
    {
      initial,
    },
  )

  return <Rental data={data!} />
}
