'use client'
import { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { CustomPortableText } from './CustomPortableText'

interface ContentBlockClientProps {
  slug: string
  baseParagraphClasses?: string
}

export default function ContentBlockClient({
  slug,
  baseParagraphClasses,
}: ContentBlockClientProps) {
  const [data, setData] = useState<{ body: any } | null>(null)
  const [isLoading, setLoading] = useState(true)
  const url = `https://agnoplrn.api.sanity.io/v2023-06-21/data/query/production?query=++*%5B_type+%3D%3D+%22contentBlock%22+%26%26+slug.current+%3D%3D+%22${slug}%22%5D%5B0%5D+%7B%0A++++_id%2C%0A++++body%0A++%7D`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        // await new Promise((resolve) => setTimeout(resolve, 3000)) // 3-second timeout
        setData(data?.result)
        setLoading(false)
      })
  }, [url])

  if (isLoading)
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-stone-200" />
        <Skeleton className="h-4 w-[250px] bg-stone-200" />
        <Skeleton className="h-4 w-[250px] bg-stone-200" />
      </div>
    )
  if (!data) return <p>No profile data</p>

  return (
    <CustomPortableText
      value={data?.body || []}
      baseParagraphClasses={baseParagraphClasses}
    />
  )
}
