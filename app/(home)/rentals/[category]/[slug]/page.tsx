import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import Rental from '@/components/pages/rental/Rental'
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadRental } from '@/sanity/loader/loadQuery'
const RentalPreview = dynamic(
  () => import('@/components/pages/rental/RentalPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params, parent)
  const { data: page } = await loadRental(params.slug)
  // console.log('generateMetadata', page)

  const description = extractPlainText(page?.description || []).slice(0, 160)
  const ogImage = urlForOpenGraphImage(page?.mainImage)

  return {
    title: `${page?.title} ${page?.equipmentCategories?.title} FOR RENT`,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('equipmentSubCategory')
}

export default async function InventorySlugRoute({ params }: Props) {
  // console.log('InventorySlugRoute', params)
  const initial = await loadRental(params.slug)

  if (draftMode().isEnabled) {
    return <RentalPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Rental data={initial.data} />
}
