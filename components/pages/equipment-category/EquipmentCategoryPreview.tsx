'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { equipmentCategoryBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { EquipmentCategoryPayload } from '@/types'

import EquipmentCategory from './EquipmentCategory'

type Props = {
  params: { category?: string }
  initial: QueryResponseInitial<EquipmentCategoryPayload | null>
}

export default function EquipmentCategoryPreview(props: Props) {
  const { params, initial } = props
  const { data } = useQuery<EquipmentCategoryPayload | null>(
    equipmentCategoryBySlugQuery,
    { slug: params.category },
    {
      initial,
    },
  )

  return <EquipmentCategory data={data!} />
}
