import Hero from '@/components/blocks/Hero'
import InventoryCategoryAttachmentsGrid from '@/components/blocks/InventoryCategoryAttachmentsGrid'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { cleanEncodedMetadata, cn } from '@/lib/utils'
import type { EquipmentCategoryPayload } from '@/types'

export interface PageProps {
  data: EquipmentCategoryPayload | null
}

export function EquipmentCategoryAttachments({ data }: PageProps) {
  const {
    _id,
    attachmentBody: body,
    title,
    mainImage,
    categoryType,
  } = data ?? {}

  // Use the body content if defined in the CMS
  if (body) {
    return (
      <div className="page-body">
        {body && <CustomPortableText value={body} />}
      </div>
    )
  }

  // Otherwise, use the default page layout below
  return (
    <>
      <Hero
        title={`${title} Attachments`}
        mainImage={mainImage}
        lightTheme={cleanEncodedMetadata(categoryType) === 'attachment'}
      />
      <InventoryCategoryAttachmentsGrid categoryRef={_id} />
    </>
  )
}

export default EquipmentCategoryAttachments
