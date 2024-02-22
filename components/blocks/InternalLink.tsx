import Link from 'next/link'

import ExternalLink from '@/components/blocks/ExternalLink'
import { Button } from '@/components/ui/button'
import { cleanEncodedMetadata, linkTypeToVariant } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { internalLinkByIdQuery } from '@/sanity/lib/queries'

interface InternalLinkProps {
  params?: string
  manualPath?: string
  linkType?: string
  children: any
  reference?: string
}

export default async function InternalLink({
  params,
  manualPath,
  linkType = 'link',
  reference,
  children,
}: InternalLinkProps) {
  const data =
    (reference &&
      (await client.fetch(internalLinkByIdQuery, {
        id: reference,
      }))) ||
    {}

  const {
    slug,
    title,
    _type: referenceType,
    equipmentMake,
    equipmentCategories,
    asset,
  } = data

  // console.log('InternalLink data:', data)

  const path = {
    post: '/news/',
    models: `/${equipmentMake?.slug}/${equipmentCategories?.slug}/`,
    inventory: `/equipment/${equipmentCategories?.slug}/`,
    equipmentCategory: `/equipment/`,
    equipmentSubCategory: `/rentals/${equipmentCategories?.slug}/`,
    page: '/',
    default: '/',
  }

  const href = `${manualPath || path[referenceType] + slug}${params || ''}`

  // If it's a link to an asset (ex. PDF), use the ExternalLink component because Next/Link doesn't support external links
  if (cleanEncodedMetadata(referenceType) === 'assets') {
    return (
      <ExternalLink
        // title={title}
        href={asset?.url}
        linkType={linkType}
        blank={true}
      >
        {children}
      </ExternalLink>
    )
  }

  if (!slug && !manualPath) return <>{children}</>

  return cleanEncodedMetadata(linkType) !== 'link' ? (
    <Button variant={linkTypeToVariant[cleanEncodedMetadata(linkType)]} asChild>
      <Link href={href} title={title}>
        {children}
      </Link>
    </Button>
  ) : (
    <Link
      href={href}
      className="text-foreground hover:text-foreground/90 group-[.footer]:text-zinc-500"
      title={title}
    >
      {children}
    </Link>
  )
}
