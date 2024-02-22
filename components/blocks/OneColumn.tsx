import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface OneColumnProps {
  body?: any
  fullWidth?: boolean
  customClasses?: string
}

export default function OneColumn({
  body,
  fullWidth,
  customClasses = '',
}: OneColumnProps) {
  return (
    <div
      className={`${
        fullWidth ? 'w-full' : 'container'
      } mb-16 mt-0 ${customClasses}`}
    >
      <div>
        <CustomPortableText value={body} />
      </div>
    </div>
  )
}
