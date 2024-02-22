import { Metadata, ResolvingMetadata } from 'next'

import Search from '@/components/pages/search/Search'
import ContentBlock from '@/components/shared/ContentBlock'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Search',
  }
}

export default async function PageSearch() {
  return (
    <Search
      content={<ContentBlock slug={'search-initial-content'} key={1} />}
    />
  )
}
