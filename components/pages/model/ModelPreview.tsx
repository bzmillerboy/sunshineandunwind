'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { modelBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { ModelPayload } from '@/types'

import Model from './Model'

type Props = {
  params: { model?: string; category?: string; slug?: string }
  initial: QueryResponseInitial<ModelPayload | null>
}

export default function ModelPreview(props: Props) {
  const { params, initial } = props

  const { data } = useQuery<ModelPayload | null>(
    modelBySlugQuery,
    {
      slug: params?.model,
    },
    {
      initial,
    },
  )

  // return <>Model Preview</>
  return <Model data={data!} />
}
