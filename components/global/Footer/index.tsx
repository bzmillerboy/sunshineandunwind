import { loadCompanyInfo, loadContentBlock } from '@/sanity/loader/loadQuery'
import type { ContentBlockPayload } from '@/types'
import Link from 'next/link'
import FooterLayout from './FooterLayout'
import { Label } from '@/components/shared/Typography'

export async function Footer() {
  // const { data: companyInfo } = await loadCompanyInfo()

  // const contentData = await Promise.all([
  //   loadContentBlock('footer-column-one'),
  //   loadContentBlock('footer-column-two'),
  //   loadContentBlock('footer-column-three'),
  //   loadContentBlock('footer-column-four'),
  // ])

  // const footerContent = contentData
  //   .filter((item) => item !== null && 'data' in item)
  //   .flatMap((item) => item.data) as ContentBlockPayload[]

  return (
    <footer className="dark bg-background text-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 [&>div]:py-12 [&>div]:border-muted-foreground/30 text-center">
        <div className="border">
          <Label>address</Label>
          <div className="mt-4">
            <Link href="https://maps.app.goo.gl/kD8XZgjWaqwa2bY89">
              439 Deer Hill
              <br /> Lafollette, TN 41091
            </Link>
          </div>
        </div>
        <div className="border-y border-r">
          <Label>phone</Label>
          <div className="mt-4">Tel: 859.363.5411</div>
        </div>
        <div className="border-y border-r">
          <Label>email</Label>
          <div className="mt-4">info@sunshineandunwind.com</div>
        </div>
        <div className="border-y border-r">
          <Label>social</Label>
          <div className="mt-4">facebook</div>
        </div>
      </div>
      <div className="p-12">
        © Copyright Sunshine & Unwind | All Rights Reserved
      </div>
    </footer>
  )
}
