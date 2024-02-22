import Img from '@/components/shared/Img'
import { H6, P } from '@/components/shared/Typography'
import { MainImage } from '@/types'

export interface CardSimpleProps {
  image: MainImage
  title: string
  subheading?: string
  ctaText?: string
}

export default function CardSimple({
  image,
  title,
  subheading,
  ctaText,
}: CardSimpleProps) {
  return (
    <div className="bg-white w-1/2 md:w-52">
      <div className="m-2 md:m-4">
        <div>
          <Img image={image} alt={title} width={224} />
        </div>

        <H6>{title}</H6>
        {subheading}
        <span>{ctaText}</span>
      </div>
    </div>
  )
}
