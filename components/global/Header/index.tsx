import { loadCompanyInfo, loadContentBlock } from '@/sanity/loader/loadQuery'
import type { ContentBlockPayload } from '@/types'

import HeaderLayout from './HeaderLayout'

export async function Header() {
  const { data: companyInfo } = await loadCompanyInfo()

  const contentData = await Promise.all([
    loadContentBlock('nav-about'),
    // loadContentBlock('nav-brands'),
    // loadContentBlock('nav-parts-service'),
    // loadContentBlock('nav-media'),
  ])

  const megaMenuContent = contentData
    .filter((item) => item !== null && 'data' in item)
    .flatMap((item) => item.data) as ContentBlockPayload[]

  return (
    <HeaderLayout megaMenuContent={megaMenuContent} companyInfo={companyInfo} />
  )
}
