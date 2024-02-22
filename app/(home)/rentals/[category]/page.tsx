import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { RentalCategory } from '@/components/pages/rental-category/RentalCategory'
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadRentalCategory } from '@/sanity/loader/loadQuery'
const RentalCategoryPreview = dynamic(
  () => import('@/components/pages/rental-category/RentalCategoryPreview'),
)

type Props = {
  params: { category: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params, parent)
  const { data: page } = await loadRentalCategory(params.category)
  // console.log('generateMetadata', page)
  //TODO: add AI descriptions
  const description = extractPlainText(page?.rentalDescription || []).slice(
    0,
    160,
  )
  const ogImage = urlForOpenGraphImage(page?.mainImage)

  return {
    title: `${page?.title} - For Rent`,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('equipmentCategory')
}

export default async function RentalCategorySlugRoute({ params }: Props) {
  // console.log('EquipmentCategorySlugRoute', params)
  const initial = await loadRentalCategory(params.category)

  if (draftMode().isEnabled) {
    return <RentalCategoryPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <RentalCategory data={initial.data} />
}
