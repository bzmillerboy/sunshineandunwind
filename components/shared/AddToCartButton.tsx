'use client'

import { Button } from '@/components/ui/button'
import useFromStore from '@/hooks/useFromStore'
import { useRequestCartStore } from '@/store/useRequestCartStore'

export default function AddToCartButton({
  cartItem,
  cartType,
  children,
  ...props
}) {
  const addToCart = useRequestCartStore((state) => state.addToCart)
  const rentalOptions = useFromStore(
    useRequestCartStore,
    (state) => state.rentalOptions,
  )
  const cartItemPlusOptions = { ...cartItem, options: rentalOptions }
  const cartItemOnly = { ...cartItem }

  return (
    <>
      {rentalOptions && (
        <Button
          onClick={() =>
            addToCart(cartType === 'quote' ? cartItemOnly : cartItemPlusOptions)
          }
          {...props}
        >
          {children}
        </Button>
      )}
    </>
  )
}
