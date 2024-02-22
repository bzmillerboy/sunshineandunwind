import Link from 'next/link'

import CardEquipment from '@/components/shared/CardEquipment'
import { H3 } from '@/components/shared/Typography'
import { client } from '@/sanity/lib/client'
import { inventoryCountByCategoryQuery } from '@/sanity/lib/queries'
import { EquipmentCategoryPayload } from '@/types/index'

interface RelatedAttachmentsProps {
  relatedAttachments?: EquipmentCategoryPayload[] //TODO: update to this type
}

export default async function RelatedAttachments({
  relatedAttachments,
}: RelatedAttachmentsProps) {
  // console.log('relatedAttachments', relatedAttachments)

  if (!relatedAttachments) return null

  return (
    <>
      <div className="container px-6 mb-0 mt-12">
        <H3>Related Attachments</H3>
      </div>
      <div className="container px-6 mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        {relatedAttachments?.map(async (category) => {
          const { mainImage, title, slug, _id: categoryId } = category

          const inventoryCount = await client.fetch(
            inventoryCountByCategoryQuery,
            {
              categoryId: categoryId,
            },
          )
          if (inventoryCount === 0) return null

          return (
            <>
              <Link href={`/equipment/${slug}`}>
                <CardEquipment
                  image={mainImage}
                  title={title || 'No Title'}
                  ctaText="See Inventory"
                  subheading={`Currently ${inventoryCount} Available`}
                />
              </Link>
            </>
          )
        })}
      </div>
    </>
  )
}
