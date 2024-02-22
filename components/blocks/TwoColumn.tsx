import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { cn } from '@/lib/utils'

export interface TwoColumnProps {
  bodyLeft?: any
  bodyRight?: any
  fullWidth?: boolean
  layout?: string
  customClasses?: string
}

const layoutClasses = {
  '1-1': { left: 'basis-1/2', right: 'basis-1/2' },
  '2-1': { left: 'basis-2/3', right: 'basis-1/3' },
  '1-2': { left: 'basis-1/3', right: 'basis-2/3' },
  default: { left: 'basis-1/2', right: 'basis-1/2' },
}

export default function TwoColumn({
  bodyLeft,
  bodyRight,
  fullWidth = false,
  customClasses = '',
  layout = 'default',
}: TwoColumnProps) {
  const columnWidth = layoutClasses[layout] || layoutClasses['default']

  return (
    <>
      <div
        className={cn(
          `${
            fullWidth ? 'w-full' : 'container'
          } gap-x-8 md:flex mb-16 mt-0 ${customClasses}`,
        )}
      >
        <div className={`${columnWidth.left}`}>
          <CustomPortableText value={bodyLeft} />
        </div>
        <div className={`${columnWidth.right}`}>
          <CustomPortableText value={bodyRight} />
        </div>
      </div>
    </>
  )
}
