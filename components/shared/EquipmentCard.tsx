import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Img from '@/components/shared/Img'
import { H5, Label, P } from '@/components/shared/Typography'
import { Button } from '@/components/ui/button'
import { currencyFormatter } from '@/lib/utils'
import { MainImage } from '@/types'

interface EquipmentCardProps {
  title: string | React.ReactNode
  subtitle?: React.ReactNode
  image?: MainImage
  imageAlt?: string
  imageURL?: string
  buttonText?: string | React.ReactNode
  link: string
  hours?: number
  price?: number
  brand?: string
  model?: string
  year?: number
  surtitle?: string | React.ReactNode
  hit?: any
  description?: string | React.ReactNode
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  title,
  subtitle,
  image,
  imageAlt,
  buttonText,
  link,
  hours,
  price,
  surtitle,
  hit,
  description,
}) => {
  // const imageObj = image && image?.asset ? image : { asset: { _ref: image } }
  // console.log('EquipmentCard imageObj:', title, imageObj)

  return (
    <div className="h-full">
      <Link href={link} className="block h-full">
        <div className="group flex bg-white rounded-md h-full hover:scale-102 transition duration-300 ease-in-out shadow-md hover:shadow-lg border border-gray-100 bg-equipment-card-mobile md:bg-equipment-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:items-center cursor-pointer">
            <div className="rounded-md p-4">
              <Img
                className="rounded-lg group-hover:scale-105 transition duration-300 ease-in-out m-auto"
                image={image}
                alt={imageAlt || 'Equipment Image'}
                width={253}
                height={253}
                mode="cover"
              />
            </div>
            <div className="px-4 pt-0 pb-4 md:pt-4">
              {surtitle && <>{surtitle}</>}
              <H5 className="mb-2 uppercase leading-5 lg:leading-5">{title}</H5>

              {subtitle && <div className="-mt-3">{subtitle}</div>}
              <div className="mb-2 ">
                {price && (
                  <Label className="text-sm">
                    {`Price: `}
                    <H5 className="inline-block text-sm lg:text-md mb-0">
                      {currencyFormatter(price)}
                    </H5>
                  </Label>
                )}
                {hours && (
                  <Label className="text-sm">
                    {`Hours: `}{' '}
                    <H5 className="inline-block text-sm lg:text-md mb-0">
                      {hours}
                    </H5>
                  </Label>
                )}
                {description && (
                  <div className="text-xs text-neutral-500 mb-3 hidden md:block">
                    {description}
                  </div>
                )}
              </div>
              <Button variant="primary" size="sm" className="mb-0">
                {buttonText || (
                  <>
                    View
                    <span className="hidden md:inline-block ml-2">Details</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EquipmentCard
