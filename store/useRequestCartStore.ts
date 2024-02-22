import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware'

import { RentalOption, RequestCartItem } from '@/types/index'

// Define the interface of the Cart state
interface State {
  cart: RequestCartItem[]
  totalItems: number
  cartOpen?: boolean
  rentalOptions?: RentalOption[]
  cartType?: string
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: RequestCartItem) => void
  removeFromCart: (Item: RequestCartItem) => void
  setCartOpen?: (open: boolean) => void
  incrementQuantity: (Item: RequestCartItem) => void
  decrementQuantity: (Item: RequestCartItem) => void
  setRentalOptions?: (Item: RentalOption) => void
  setCartType?: (type: string) => void
  clearCart?: (type: string) => void
}

export type CartState = State & Actions

type MyPersist = (
  config: StateCreator<CartState>,
  options: PersistOptions<CartState>,
) => StateCreator<CartState>

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  cartOpen: false,
  rentalOptions: [],
  cartType: 'quote',
}

// Create the store with Zustand, combining the status interface and actions
export const useRequestCartStore = create<CartState, []>(
  (persist as MyPersist)(
    (set, get): CartState => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      cartOpen: INITIAL_STATE.cartOpen,
      rentalOptions: INITIAL_STATE.rentalOptions,
      cartType: INITIAL_STATE.cartType,
      addToCart: (product: RequestCartItem) => {
        const cart = get().cart
        const cartItem = cart.find(
          (item) => JSON.stringify(item) === JSON.stringify(product),
        )
        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item,
          )
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            cartType: product.cartType,
          }))
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }]

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            cartType: product.cartType,
          }))
        }
        //call setCartOpen to open the cart
        set((state) => ({
          cartOpen: true,
        }))
      },
      incrementQuantity: (product: RequestCartItem) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === product.id)

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item,
          )
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
          }))
        }
      },
      decrementQuantity: (product: RequestCartItem) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.id === product.id)

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) - 1 }
              : item,
          )
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
          }))
        }
      },
      removeFromCart: (product: RequestCartItem) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => JSON.stringify(item) !== JSON.stringify(product),
          ),
          totalItems: state.totalItems - (product?.quantity || 1),
        }))
      },
      setCartOpen: (open: boolean) => {
        set(() => ({
          cartOpen: open,
        }))
      },
      setRentalOptions: (option: RentalOption) => {
        const rentalOptions = get().rentalOptions || []
        const newPressed = [...rentalOptions]
        if (newPressed.includes(option)) {
          newPressed.splice(newPressed.indexOf(option), 1)
        } else {
          newPressed.push(option)
        }
        set(() => ({ rentalOptions: newPressed }))
      },
      setCartType: (type: string) => {
        set(() => ({ cartType: type }))
      },
      clearCart: (type: string) => {
        const itemsRemaining = get().cart.filter(
          (item) => item.cartType !== type,
        )
        const totalItemsRemaining = itemsRemaining.reduce(
          (total, item) => total + (item.quantity || 0),
          0,
        )

        set(() => ({
          cart: itemsRemaining,
          totalItems: totalItemsRemaining,
        }))
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)
