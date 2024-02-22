import Link from 'next/link'
import React from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MdOutlinePhone } from 'react-icons/md'

import { cn } from '@/lib/utils'
import { formatPhoneNumber } from '@/lib/utils'
import type { CompanyInfoPayload } from '@/types'

interface HeaderTopProps {
  companyInfo?: CompanyInfoPayload | null
}

export function HeaderTop({ companyInfo }: HeaderTopProps) {
  return (
    <div className="bg-zinc-950 text-white text-sm">
      <nav className="px-2 flex items-center justify-end lg:container">
        <Link className="p-2.5 hover:text-yellow" href="/careers">
          Careers
        </Link>
        <Link className="p-2.5 hover:text-yellow" href="/contact-us">
          Contact Us
        </Link>

        <a
          className="p-2.5 hover:text-yellow"
          href={`tel:+1${formatPhoneNumber(companyInfo?.phone || 0)}`}
        >
          <span className="inline lg:hidden">
            <MdOutlinePhone size={'1.4em'} />
          </span>
          <span className="hidden lg:inline">
            {formatPhoneNumber(companyInfo?.phone || 0)}
          </span>
        </a>
        {/* <Link href="/search" className="p-2.5 hover:text-yellow">
          <IoMdSearch size={'1.4em'} />
        </Link> */}
      </nav>
    </div>
  )
}
