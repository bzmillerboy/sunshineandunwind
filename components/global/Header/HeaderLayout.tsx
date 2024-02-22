import Link from 'next/link'
import React, { Fragment } from 'react'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Logo from '@/components/shared/Logo'
import { menuItems } from '@/data/menu-items'
import type { CompanyInfoPayload, ContentBlockPayload } from '@/types'

import { HeaderTop } from './HeaderTop'
import NavigationCartIcon from './NavigationCartIcon'
import NavigationMegaMenu from './NavigationMegaMenu'
import NavigationMobileMenu from './NavigationMobileMenu'

interface HeaderProps {
  companyInfo?: CompanyInfoPayload | null
  megaMenuContent?: ContentBlockPayload[] | null
}

export default function HeaderLayout({
  companyInfo,
  megaMenuContent,
}: HeaderProps) {
  // console.log('HeaderLayout value:', value)

  const megaMenuComponents = menuItems.map((item) => {
    const megaMenuContentItem =
      megaMenuContent && megaMenuContent?.find((c) => c.slug === item.blockSlug)
    return {
      blockSlug: item.blockSlug,
      component: (
        <CustomPortableText
          value={(megaMenuContentItem && megaMenuContentItem?.body) || []}
        />
      ),
    }
  })

  return (
    <div className="sticky top-0 z-50 bg-background drop-shadow-sm">
      <HeaderTop companyInfo={companyInfo} />
      <div className="header relative z-20">
        <div className="lg:container">
          <div className="flex justify-between items-center bg-background">
            <Link href="/" className="py-5 px-4">
              <Logo />
            </Link>
            <div className="flex">
              <NavigationMegaMenu
                menuItems={menuItems}
                megaMenuComponents={megaMenuComponents}
              />
              <NavigationMobileMenu menuItems={menuItems} />
              <NavigationCartIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
