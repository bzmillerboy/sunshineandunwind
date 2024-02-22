import Link from 'next/link'
import React from 'react'
import { GrMenu } from 'react-icons/gr'
import { IoMdSearch } from 'react-icons/io'

import { H4 } from '@/components/shared/Typography'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function NavigationMobileMenu({
  menuItems,
}: {
  menuItems: any
}) {
  return (
    <div className="block lg:hidden min-w-24">
      <Sheet>
        <Link href="/search" passHref>
          <button className="p-3 inline-block">
            <IoMdSearch size="1.5rem" />
          </button>
        </Link>
        <SheetTrigger className="p-3">
          <GrMenu size="1.5rem" />
        </SheetTrigger>
        <SheetContent className="">
          <nav aria-label="Mobile Menu">
            <ul>
              {menuItems.map((item, i) => {
                return (
                  <li key={i}>
                    <H4>
                      <SheetClose asChild>
                        <Link
                          href={`${item.slug}`}
                          className="block w-full py-1.5"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    </H4>
                  </li>
                )
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
