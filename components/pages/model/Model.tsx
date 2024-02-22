import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Model({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body } = data ?? {}

  return (
    <div className="page-body">
      {body && <CustomPortableText value={body} />}
    </div>
  )
}

export default Model
