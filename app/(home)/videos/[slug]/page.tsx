import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { VideoPost } from '@/components/pages/videoPost/VideoPost'
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadVideoPost } from '@/sanity/loader/loadQuery'
const VideoPostPreview = dynamic(
  () => import('@/components/pages/videoPost/VideoPostPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // console.log('generateMetadata', params, parent)
  const { data: page } = await loadVideoPost(params.slug)
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
  return generateStaticSlugs('videoPost')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadVideoPost(params.slug)

  if (draftMode().isEnabled) {
    return <VideoPostPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <VideoPost data={initial.data} />
}
