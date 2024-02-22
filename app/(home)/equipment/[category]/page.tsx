import { Metadata, ResolvingMetadata } from 'next'
// import dynamic from 'next/dynamic'
// import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { EquipmentCategory } from '@/components/pages/equipment-category/EquipmentCategory'
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadEquipmentCategory } from '@/sanity/loader/loadQuery'

// const EquipmentCategoryPreview = dynamic(
//   () =>
//     import('@/components/pages/equipment-category/EquipmentCategoryPreview'),
// )

type Props = {
  params: { category: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params, parent)
  const { data: page } = await loadEquipmentCategory(params.category)
  const description = extractPlainText(page?.body || []).slice(0, 160)
  // console.log('generateMetadata', page)
  const ogImage = urlForOpenGraphImage(page?.mainImage)

  return {
    title: `${page?.title}`,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('equipmentCategory')
}

export default async function EquipmentCategorySlugRoute({ params }: Props) {
  // console.log('EquipmentCategorySlugRoute', params)
  const initial = await loadEquipmentCategory(params.category)

  // Disabling Sanity presentation feature until we have a better way to handle RSC
  // if (draftMode().isEnabled) {
  //   return <EquipmentCategoryPreview params={params} initial={initial} />
  // }

  if (!initial.data) {
    notFound()
  }

  return <EquipmentCategory data={initial.data} />
}
