import { MdTune } from 'react-icons/md'

import CurrentRefinements from '@/components/shared/InventoryCurrentRefinements'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function RefinementListSheet({ children }) {
  return (
    <Sheet>
      <div className="md:hidden">
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <MdTune className="w-5 h-5 mr-3" /> Filter By
          </Button>
        </SheetTrigger>
      </div>
      <hr />
      <div className="hidden md:block">
        <SheetContent className="overflow-scroll">
          <SheetHeader>
            <SheetTitle>Filter By</SheetTitle>
            <CurrentRefinements />
          </SheetHeader>
          {children}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">View Results</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </div>
    </Sheet>
  )
}
