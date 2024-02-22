import React from 'react'

import Img from '@/components/shared/Img'
import { H6, Label } from '@/components/shared/Typography'
import { MainImage } from '@/types'

interface EquipmentCategoryCardProps {
  title: string
  image?: MainImage
  ctaText?: string
  subheading?: string | JSX.Element
}

const CardEquipment: React.FC<EquipmentCategoryCardProps> = ({
  title,
  image,
  ctaText,
  subheading,
}) => (
  <div className="group text-center border-b-4 border-transparent hover:border-yellow-400 hover:border-b-4 pb-1.5">
    <div className="aspect-w-8 aspect-h-7">
      <div>
        <Img
          className="p-0 rounded-lg group-hover:scale-110 group-hover:-translate-y-2 transition-transform ease-in-out duration-300 relative z-40 w-auto h-full m-auto"
          image={image}
          alt={title}
          width={500}
          mode="contain"
          size="(max-width: 768px) 150px, 240px"
        />
      </div>
    </div>
    <H6 className="mb-0 mt-2">{title}</H6>
    {subheading && (
      <Label className="text-sm lg:text-sm font-normal">{subheading}</Label>
    )}
    {ctaText && <span className="">{ctaText}</span>}
  </div>
)

export default CardEquipment
