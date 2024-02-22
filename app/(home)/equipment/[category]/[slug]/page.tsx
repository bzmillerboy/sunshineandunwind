import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { Inventory } from '@/components/pages/inventory/Inventory'
import { titleDisplay } from '@/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadInventory } from '@/sanity/loader/loadQuery'

type Props = {
  params: { slug: string; status: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params)
  const { data: page } = await loadInventory(params.slug)
  // console.log('generateMetadata', page)
  const ogImage = urlForOpenGraphImage(page?.mainImage)
  const titleCompiled = titleDisplay(
    page?.equipmentCategories?.categoryType,
    page?.equipmentMake?.name,
    page?.year,
    page?.model,
    page?.title,
  )

  // TODO: Update with AI generated description
  const description = `For sale and available now at Newman Tractor, this ${titleCompiled} ${page?.equipmentCategories?.title} is ready to work. Priced to move so get it while it lasts.`
  const inStock = page?.status === 'stock'
  return {
    title: `${page?.status === 'sold' ? 'SOLD' : ''} ${titleCompiled} FOR SALE`,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: inStock,
      follow: inStock,
      nocache: !inStock,
      googleBot: {
        index: inStock,
        follow: inStock,
        noimageindex: !inStock,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('inventory')
}

export default async function InventorySlugRoute({ params }: Props) {
  // console.log('InventorySlugRoute', params)
  const initial = await loadInventory(params.slug)

  if (!initial.data) {
    notFound()
  }

  return (
    <>
      <Inventory data={initial.data} />
    </>
  )
}
