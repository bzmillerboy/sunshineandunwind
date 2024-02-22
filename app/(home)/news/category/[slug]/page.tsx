import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import Category from '@/components/pages/category/Category'
import PostGrid from '@/components/pages/post/PostGrid'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadCategory } from '@/sanity/loader/loadQuery'
const CategoryPreview = dynamic(
  () => import('@/components/pages/category/CategoryPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: page } = await loadCategory(params.slug)
  const description = page?.description?.slice(0, 160)

  return {
    title: `${page?.title}`,
    description: description,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('category')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadCategory(params.slug)

  if (draftMode().isEnabled) {
    return (
      <>
        <CategoryPreview
          params={params}
          initial={initial}
          postGrid={<PostGrid categoryId={initial?.data?._id} />}
        />
      </>
    )
  }

  if (!initial.data) {
    notFound()
  }

  return (
    <Category
      data={initial.data}
      postGrid={<PostGrid categoryId={initial?.data?._id} />}
    />
  )
}
