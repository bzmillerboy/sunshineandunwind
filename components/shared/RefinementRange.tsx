import * as SliderPrimitive from '@radix-ui/react-slider'
import React, { useEffect, useState } from 'react'
import { useRange } from 'react-instantsearch'

import { cn, currencyFormatter } from '@/lib/utils'

export default function RefinementRange(props) {
  const { className, step, currency, attribute } = props
  const { start, range, canRefine, refine } = useRange(props)
  const { min = 0, max = 0 } = range || { min: 0, max: 0 }
  const [value, setValue] = useState([min, max])

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] || 0 : min)
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] || 0 : max)

  useEffect(() => {
    setValue([from, to])
  }, [from, to])

  return (
    <div
      className="flex items-center justify-between mb-12 h-6 px-4"
      data-insights-filter={`${attribute}:${value}`}
    >
      <SliderPrimitive.Root
        min={min}
        max={max}
        value={value}
        onValueChange={setValue}
        onValueCommit={refine}
        disabled={!canRefine}
        step={step}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block relative h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <div className="absolute bg-white left-1/2 top-7 h-4 w-fit -translate-x-1/2 text-center text-xs">
            {currency ? currencyFormatter(value[0]) : value[0]}
          </div>
        </SliderPrimitive.Thumb>
        <SliderPrimitive.Thumb className="block relative h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <div className="absolute bg-white left-1/2 top-7 h-4 w-fit -translate-x-1/2 text-center text-xs">
            {currency ? currencyFormatter(value[1]) : value[1]}
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  )
}
