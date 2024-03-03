import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  // console.log('Page data', data)
  const { body } = data ?? {}

  return (
    <div className="page-body animate-in fade-in ease-in-out duration-300 relative z-0">
      {body && <CustomPortableText value={body} />}
    </div>
  )
}

export default Page
