import { loadCompanyInfo, loadContentBlock } from '@/sanity/loader/loadQuery'
import type { ContentBlockPayload } from '@/types'

import FooterLayout from './FooterLayout'

export async function Footer() {
  const { data: companyInfo } = await loadCompanyInfo()

  const contentData = await Promise.all([
    loadContentBlock('footer-column-one'),
    loadContentBlock('footer-column-two'),
    loadContentBlock('footer-column-three'),
    loadContentBlock('footer-column-four'),
  ])

  const footerContent = contentData
    .filter((item) => item !== null && 'data' in item)
    .flatMap((item) => item.data) as ContentBlockPayload[]

  return <FooterLayout content={footerContent} companyInfo={companyInfo} />
}
