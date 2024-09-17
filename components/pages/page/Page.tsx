'use client'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { PagePayload } from '@/types'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { PopoverClose } from '@radix-ui/react-popover'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  // console.log('Page data', data)
  const { body } = data ?? {}

  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <div className="page-body animate-in fade-in ease-in-out duration-300 relative z-0">
      {body && <CustomPortableText value={body} />}
      <div className="booking-widget bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-8 -translate-y-20 relative z-10">
        <div className={cn('grid gap-2')}>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
                <div className="p-2 text-right">
                  <PopoverClose asChild>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Close
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
            <Button>Reserve</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
