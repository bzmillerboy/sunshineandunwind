'use client'
import { useState } from 'react'

import Img from '@/components/shared/Img'
import { Toggle } from '@/components/ui/toggle'
import useFromStore from '@/hooks/useFromStore'
import { useRequestCartStore } from '@/store/useRequestCartStore'
import { RentalOption } from '@/types'

interface RentalOptionsToggleProps {
  data: RentalOption[]
}

export default function RentalOptionsToggle({
  data,
}: RentalOptionsToggleProps) {
  //   console.log('RentalOptionsToggle data:', data)
  const rentalOptions = useFromStore(
    useRequestCartStore,
    (state) => state.rentalOptions,
  )
  //   console.log('RentalOptionsToggle rentalOptions:', rentalOptions)

  const setRentalOptions = useRequestCartStore(
    (state) => state.setRentalOptions,
  )

  return (
    <>
      {rentalOptions &&
        data?.map((option) => {
          return (
            <Toggle
              variant="outline"
              key={option._id}
              pressed={rentalOptions.some((opt) => opt._id === option._id)}
              onPressedChange={() =>
                setRentalOptions && setRentalOptions(option)
              }
            >
              <Img image={option.mainImage} width={30} className="mr-1" />
              {option.title}
            </Toggle>
          )
        })}
    </>
  )
}
