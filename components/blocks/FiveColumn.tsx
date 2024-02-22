import { CustomPortableText } from '@/components/shared/CustomPortableText'

export interface FiveColumnProps {
  bodyColOne?: any
  bodyColTwo?: any
  bodyColThree?: any
  bodyColFour?: any
  bodyColFive?: any
  fullWidth?: boolean
  customClasses?: string
}

export default function FiveColumn({
  bodyColOne,
  bodyColTwo,
  bodyColThree,
  bodyColFour,
  bodyColFive,
  fullWidth = false,
  customClasses = '',
}: FiveColumnProps) {
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
        <div className="basis-1/4">
          <CustomPortableText value={bodyColFive} />
        </div>
      </div>
    </>
  )
}
