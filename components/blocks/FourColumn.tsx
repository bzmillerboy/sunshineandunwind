import { CustomPortableText } from '@/components/shared/CustomPortableText'

export interface FourColumnProps {
  bodyColOne?: any
  bodyColTwo?: any
  bodyColThree?: any
  bodyColFour?: any
  fullWidth?: boolean
  customClasses?: string
}

export default function FourColumn({
  bodyColOne,
  bodyColTwo,
  bodyColThree,
  bodyColFour,
  fullWidth = false,
  customClasses = '',
}: FourColumnProps) {
  return (
    <>
      <div
        className={`${
          fullWidth ? 'w-full' : 'container'
        } md:flex mb-16 mt-0  gap-x-8 ${customClasses}`}
      >
        <div className="basis-1/4">
          <CustomPortableText value={bodyColOne} />
        </div>
        <div className="basis-1/4">
          <CustomPortableText value={bodyColTwo} />
        </div>
        <div className="basis-1/4">
          <CustomPortableText value={bodyColThree} />
        </div>
        <div className="basis-1/4">
          <CustomPortableText value={bodyColFour} />
        </div>
      </div>
    </>
  )
}
