import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { Page } from '@/components/pages/page/Page'
import { loadPage } from '@/sanity/loader/loadQuery'
const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: { slug: string }
}

export default async function NotFoundRoute() {
  // console.log('404')
  const initial = await loadPage('404')

  if (draftMode().isEnabled) {
    return <PagePreview params={{ slug: '404' }} initial={initial} />
  }

  if (!initial.data) {
    return <>Page Not Found</>
  }

  // return <>Page Not Found</>
  return <Page data={initial.data} />
}
