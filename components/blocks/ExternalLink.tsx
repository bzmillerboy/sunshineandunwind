import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cleanEncodedMetadata, linkTypeToVariant } from '@/lib/utils'

interface ExternalLinkProps {
  href?: string
  linkType?: string
  blank?: boolean
  children: any
}

export default function ExternalLink({
  href,
  linkType = 'link',
  blank,
  children,
}: ExternalLinkProps) {
  if (!href) return <>{children}</>

  return cleanEncodedMetadata(linkType) !== 'link' ? (
    <Button variant={linkTypeToVariant[cleanEncodedMetadata(linkType)]} asChild>
      <Link
        href={href}
        target={blank ? '_blank' : '_self'}
        rel={blank ? 'noopener noreferrer' : 'opener'}
      >
        {children}
      </Link>
    </Button>
  ) : (
    <Link
      href={href}
      target={blank ? '_blank' : '_self'}
      rel={blank ? 'noopener noreferrer' : 'opener'}
    >
      {children}
    </Link>
  )
}
