import { BiTrash } from 'react-icons/bi'

import Img from '@/components/shared/Img'
import { H6, Label } from '@/components/shared/Typography'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function CartCard({
  item,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) {
  return (
    <Card className="w-full mb-4" key={item.id}>
      <CardContent className="p-4">
        <div>
          <Label className="text-xs lg:text-xs leading-3 lg:leading-3">
            {item?.category} {item.cartType === 'quote' && '|'}{' '}
            {item?.stockNumber}
          </Label>
          <H6 className="mb-2">{item?.title}</H6>
        </div>
        <div className="flex gap-3 relative">
          <div className="basis-1/3">
            <Img image={item?.image} width={130} height={98} />
          </div>
          <div className="basis-2/3">
            <form className="max-w-xs mx-auto mb-2">
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  onClick={() => decrementQuantity(item)}
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  disabled={item?.quantity <= 1}
                  className="bg-white-100 leading-3  hover:bg-zinc-200 border border-zinc-300 rounded-s-md p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  -
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="bg-white border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-brandyellow focus:border-brandyellow block w-full py-1.5 pb-4 leading-4"
                  placeholder={item?.quantity?.toString()}
                  min="1"
                  max="100"
                  required
                />
                <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                  <span>qty</span>
                </div>
                <button
                  onClick={() => incrementQuantity(item)}
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  className="bg-white-100 leading-3 hover:bg-zinc-200 border border-zinc-300 rounded-e-md p-3 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none"
                >
                  +
                </button>
              </div>
            </form>
            <div>
              {item?.options.length != 0 && (
                <Label className="text-xs lg:text-xs">Options:</Label>
              )}
              {item?.options?.map((option) => (
                <Badge
                  key={option.title}
                  variant="secondary"
                  className="text-xs mr-1 mb-1"
                >
                  {option.title}
                </Badge>
              ))}
            </div>
            <>
              <BiTrash
                className="absolute right-0 bottom-0 text-zinc-400 cursor-pointer"
                onClick={() => removeFromCart(item)}
              />
            </>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
