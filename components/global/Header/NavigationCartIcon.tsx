'use client'

import { MdShoppingCart } from 'react-icons/md'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useFromStore from '@/hooks/useFromStore'
import { useRequestCartStore } from '@/store/useRequestCartStore'

import RequestCart from './RequestCart'

export default function NavigationCartIcon() {
  const totalItems =
    useFromStore(useRequestCartStore, (state) => state.totalItems) || 0
  const cart = useFromStore(useRequestCartStore, (state) => state.cart)
  // console.log('NavigationCartIcon cart:', cart)
  const isOpen = useRequestCartStore((state) => state.cartOpen)
  const setCartOpen = useRequestCartStore((state) => state.setCartOpen)

  return (
    <>
      {cart && totalItems >= 1 && (
        <Sheet open={isOpen} onOpenChange={setCartOpen}>
          <SheetTrigger className="px-3 relative mr-1">
            <MdShoppingCart size="1.5rem" />
            {totalItems > 0 && (
              <div className="absolute right-0 bottom-0">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2.5 text-xs text-white">
                  {totalItems}
                </p>
              </div>
            )}
          </SheetTrigger>
          <SheetContent className="sheet-content w-11/12 md:max-w-lg bg-stone-100 overflow-y-scroll">
            <RequestCart cart={cart} />
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
