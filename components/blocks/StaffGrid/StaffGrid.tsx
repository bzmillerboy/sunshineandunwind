'use client'

import { useState } from 'react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import StaffCard from './StaffCard'

interface StaffGridProps {
  departments?: any
  location?: any
  staff?: any
}

export default function StaffGridLoader({
  departments,
  location,
  staff,
}: StaffGridProps) {
  const [currentDepartment, setCurrentDepartment] = useState('all')
  // console.log('useState currentDepartment:', currentDepartment)

  return (
    <div className="mb-12">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-1 p-2 mb-1">
          {departments.map((department, index) => (
            <div
              onClick={(event) => {
                setCurrentDepartment('empty')
                setTimeout(async () => {
                  setCurrentDepartment(department?.slug)
                }, 0)
              }}
              key={department?.slug}
              className={cn(
                'flex cursor-pointer h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                currentDepartment === department?.slug
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {department?.title}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="staff-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {staff
          .filter(
            (person) =>
              currentDepartment === 'all' ||
              person?.department?.slug === currentDepartment,
          )
          .map((person, index) => (
            <StaffCard
              key={person._id}
              image={person.image}
              firstName={person.firstName}
              lastName={person.lastName}
              role={person.role}
              phoneDirect={person.phoneDirect}
              phoneCell={person.phoneCell}
              email={person.email}
            />
            // <div key={person._id}>{person.firstName}</div>
          ))}
      </div>
    </div>
  )
}
