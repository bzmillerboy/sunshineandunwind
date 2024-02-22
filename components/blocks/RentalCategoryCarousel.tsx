'use client'
import 'react-horizontal-scrolling-menu/dist/styles.css'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import Img from '@/components/shared/Img'
import { Label } from '@/components/shared/Typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
interface RentalCategoryCarouselProps {
  categories: any
}
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

const onWheel = (
  apiObj: scrollVisibilityApiType,
  ev: React.WheelEvent,
): void => {
  // NOTE: no good standart way to distinguish touchpad scrolling gestures
  // but can assume that gesture will affect X axis, mouse scroll only Y axis
  // of if deltaY too small probably is it touchpad
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext()
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev()
  }
}

export default function RentalCategoryCarousel({
  categories,
}: RentalCategoryCarouselProps) {
  return (
    <div className="mb-6 relative">
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
      >
        {categories.map((category: any) => {
          const { _id, title, slug, mainImage } = category
          return (
            <Link
              href={`/rentals/${slug}`}
              key={_id}
              className="group inline-block px-2"
            >
              <div className="w-16 h-16 mb-1">
                <div className="rounded-full w-full h-full border border-gray-200 overflow-hidden group-hover:shadow-md transition-shadow ease-in-out ">
                  <Img
                    image={mainImage}
                    width={64}
                    height={64}
                    className="w-full p-1 group-hover:scale-105 transition-transform ease-in-out"
                    mode="contain"
                    alt={title}
                  />
                </div>
              </div>
              <Label className="text-xs lg:text-[10px] leading-3 text-center group-hover:font-normal">
                {title}
              </Label>
            </Link>
          )
        })}
      </ScrollMenu>
    </div>
  )
}

function LeftArrow() {
  const { initComplete, isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext)

  return (
    <Arrow
      disabled={!initComplete || (initComplete && isFirstItemVisible)}
      onClick={() => scrollPrev()}
      className="left bg-white"
    >
      <ChevronLeft className="h-4 w-4" />
    </Arrow>
  )
}

function RightArrow() {
  const { initComplete, isLastItemVisible, scrollNext } =
    React.useContext(VisibilityContext)

  return (
    <Arrow
      disabled={initComplete && isLastItemVisible}
      onClick={() => scrollNext()}
      className="right bg-white"
    >
      <ChevronRight className="h-4 w-4" />
    </Arrow>
  )
}

function Arrow({
  children,
  disabled,
  onClick,
  className,
}: {
  children: React.ReactNode
  disabled: boolean
  onClick: VoidFunction
  className?: String
}) {
  return (
    <Button
      variant="outline"
      size="iconSm"
      disabled={disabled}
      onClick={onClick}
      className={cn('disabled:opacity-0', 'user-select-none m-2 translate-y-2')}
    >
      {children}
    </Button>
  )
}
