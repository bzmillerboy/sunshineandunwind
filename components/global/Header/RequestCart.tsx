'use client'

import { H6 } from '@/components/shared/Typography'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRequestCartStore } from '@/store/useRequestCartStore'

import RequestCartContent from './RequestCartContent'

export default function RequestCart({ cart }) {
  // console.log('RequestCart cart:', cart)
  const cartType = useRequestCartStore((state) => state.cartType)
  const setCartType = useRequestCartStore((state) => state.setCartType)
  const quoteItems = cart?.filter((item) => item.cartType === 'quote') || []
  const rentalItems = cart?.filter((item) => item.cartType === 'rental') || []

  return (
    <>
      <H6 className="text-center">Quote Cart</H6>
      <Tabs
        value={cartType}
        onValueChange={setCartType}
        defaultValue="account"
        className="w-full grid grid-cols-1 text-sm"
      >
        <TabsList className="bg-stone-100 border border-stone-200 m-auto">
          <TabsTrigger value="quote">Purchase</TabsTrigger>
          <TabsTrigger value="rental">Rental</TabsTrigger>
        </TabsList>
        <TabsContent value="quote">
          <RequestCartContent items={quoteItems} cartType={cartType} />
        </TabsContent>
        <TabsContent value="rental">
          <RequestCartContent items={rentalItems} cartType={cartType} />
        </TabsContent>
      </Tabs>
    </>
  )
}
