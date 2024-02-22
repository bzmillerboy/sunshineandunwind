import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Model } from '@/components/pages/model/Model'
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadModel } from '@/sanity/loader/loadQuery'

const ModelPreview = dynamic(
  () => import('@/components/pages/model/ModelPreview'),
)

type Props = {
  params: { category: string; slug: string; model: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params, parent)
  const { data: page } = await loadModel(params.model)
  const description = extractPlainText(page?.body || []).slice(0, 160)
  // console.log('generateMetadata', page)
  const ogImage = urlForOpenGraphImage(page?.mainImage)

  return {
    title: `${page?.slug?.name} ${page?.title} ${page?.category?.title}`,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('models')
}

export default async function ModelSlugRoute({ params }: Props) {
  const initial = await loadModel(params.model)
  // console.log('ModelSlugRoute params:', params)
  // console.log('ModelSlugRoute', initial)

  if (draftMode().isEnabled) {
    return <ModelPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Model data={initial.data} />
}
