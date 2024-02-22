'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { categoryBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { CategoryPayload } from '@/types'

import Category from './Category'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<CategoryPayload | null>
  postGrid: React.ReactNode
}

export default function PostPreview(props: Props) {
  const { params, initial, postGrid } = props
  const { data } = useQuery<CategoryPayload | null>(
    categoryBySlugQuery,
    params,
    {
      initial,
    },
  )

  return <Category data={data!} postGrid={postGrid} />
}
