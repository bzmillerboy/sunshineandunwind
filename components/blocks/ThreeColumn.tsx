import { CustomPortableText } from '@/components/shared/CustomPortableText'

export interface ThreeColumnProps {
  bodyLeft?: any
  bodyCenter?: any
  bodyRight?: any
  fullWidth?: boolean
  customClasses?: string
}

export default function ThreeColumn({
  bodyLeft,
  bodyCenter,
  bodyRight,
  fullWidth = false,
  customClasses = '',
}: ThreeColumnProps) {
  // console.log('ThreeColumnProps bodyLeft:', bodyLeft)
  return (
    <>
      <div
        className={`${
          fullWidth ? 'w-full' : 'container'
        } md:flex flex-row mb-16 mt-0 gap-x-8 ${customClasses}`}
      >
        <div className="basis-1/3">
          <CustomPortableText value={bodyLeft} />
        </div>
        <div className="basis-1/3">
          <CustomPortableText value={bodyCenter} />
        </div>
        <div className="basis-1/3">
          <CustomPortableText value={bodyRight} />
        </div>
      </div>
    </>
  )
}
