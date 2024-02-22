'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { equipmentCategoryAttachmentsBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { EquipmentCategoryPayload } from '@/types'

import EquipmentCategoryAttachments from './EquipmentCategoryAttachments'

type Props = {
  params: { category?: string }
  initial: QueryResponseInitial<EquipmentCategoryPayload | null>
}

export default function EquipmentCategoryAttachmentsPreview(props: Props) {
  const { params, initial } = props
  const { data } = useQuery<EquipmentCategoryPayload | null>(
    equipmentCategoryAttachmentsBySlugQuery,
    { slug: params.category },
    {
      initial,
    },
  )

  return <EquipmentCategoryAttachments data={data!} />
}
