'use client'
import { useState } from 'react'

import CartCard from '@/components/shared/CartCard'
import ContentBlockClient from '@/components/shared/ContentBlockClient'
import { P } from '@/components/shared/Typography'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'
import { useRequestCartStore } from '@/store/useRequestCartStore'

import RequestCartForm from './RequestCartForm'

export default function RequestCartContent({ items, cartType }) {
  const removeFromCart = useRequestCartStore((state) => state.removeFromCart)
  const incrementQuantity = useRequestCartStore(
    (state) => state.incrementQuantity,
  )
  const decrementQuantity = useRequestCartStore(
    (state) => state.decrementQuantity,
  )
  const [cartStep, setCartStep] = useState(1)

  const cartTitle = cartType === 'quote' ? 'Purchase' : 'Rental'

  return (
    <div className="">
      {cartStep === 1 && (
        <div>
          {items?.length == 0 ? (
            <P className="mt-12 text-center text-neutral-400 capitalize">
              {cartTitle} Cart is Empty
            </P>
          ) : (
            <>
              {items?.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
              ))}
              <div className="flex justify-between items-center mt-4">
                <SheetTrigger>
                  <Button className="" variant="outline">
                    Close
                  </Button>
                </SheetTrigger>
                <Button
                  className=""
                  variant="primary"
                  onClick={() => setCartStep(cartStep + 1)}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      {cartStep === 2 && (
        <div>
          <RequestCartForm
            cartTitle={cartTitle}
            setCartStep={setCartStep}
            cartStep={cartStep}
            cartType={cartType}
            cartItems={items}
          />
        </div>
      )}
      {cartStep === 3 && (
        <div className="mt-10 text-center">
          <ContentBlockClient slug={`rental-cart-success`} />
          <div className="mt-10">
            <SheetTrigger>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setCartStep(1)
                }}
              >
                Continue Shopping
              </Button>
            </SheetTrigger>
          </div>
        </div>
      )}
    </div>
  )
}
