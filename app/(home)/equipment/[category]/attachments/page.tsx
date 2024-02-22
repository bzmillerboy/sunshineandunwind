import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { EquipmentCategoryAttachments } from '@/components/pages/equipment-category/EquipmentCategoryAttachments'
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticEquipmentAttachmentSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadEquipmentCategoryAttachments } from '@/sanity/loader/loadQuery'

const EquipmentCategoryAttachmentsPreview = dynamic(
  () =>
    import(
      '@/components/pages/equipment-category/EquipmentCategoryAttachmentsPreview'
    ),
)

type Props = {
  params: { category: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params, parent)
  const { data: page } = await loadEquipmentCategoryAttachments(params.category)
  const description = extractPlainText(page?.body || []).slice(0, 160)
  const ogImage = urlForOpenGraphImage(page?.mainImage)

  return {
    title: `${page?.title} ATTACHMENTS FOR SALE`,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export function generateStaticParams() {
  return generateStaticEquipmentAttachmentSlugs()
}

export default async function EquipmentCategoryAttachmentSlugRoute({
  params,
}: Props) {
  // console.log('EquipmentCategoryAttachmentSlugRoute', params)
  const initial = await loadEquipmentCategoryAttachments(params.category)

  if (draftMode().isEnabled) {
    return (
      <EquipmentCategoryAttachmentsPreview params={params} initial={initial} />
    )
  }

  if (!initial.data) {
    notFound()
  }

  return <EquipmentCategoryAttachments data={initial.data} />
}
