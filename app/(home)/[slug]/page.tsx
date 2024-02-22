import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))
import { extractPlainText } from '@/sanity/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage } from '@/sanity/loader/loadQuery'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: page } = await loadPage(params.slug)
  // console.log('generateMetadata', page)
  const description = extractPlainText(page?.body || []).slice(0, 160)
  const ogImage = urlForOpenGraphImage(page?.mainImage)
  const showSearch = !page?.hide

  return {
    title: page?.title,
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: showSearch,
      follow: showSearch,
      nocache: !showSearch,
      googleBot: {
        index: showSearch,
        follow: showSearch,
        noimageindex: !showSearch,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadPage(params.slug)

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} />
}
