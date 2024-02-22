import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { useInstantSearch } from 'react-instantsearch'
import { useInView } from 'react-intersection-observer'

import { fetchInventoryByCategory } from '@/app/(home)/equipment/[category]/actions'
import EquipmentCard from '@/components/shared/EquipmentCard'
import { Lead } from '@/components/shared/Typography'
import { Badge } from '@/components/ui/badge'
import { titleDisplay, truncate } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'

export default function InventoryItems({
  data: initialInventory,
  categoryId,
}: any) {
  // console.log('InventoryItems data:', data)
  const [inventory, setInventory] = useState(initialInventory)
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()
  const [displayLoader, setDisplayLoader] = useState(true)

  async function loadMoreInventory() {
    const next = page + 1
    // await new Promise((resolve) => setTimeout(resolve, 5000)) // 3-second timeout
    const inventory = await fetchInventoryByCategory({ categoryId, page: next }) //fetchMovies({ search, page: next })
    if (inventory?.length) {
      setPage(next)
      setInventory((prev: Document[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...inventory,
      ])
    } else {
      setDisplayLoader(false)
    }
  }

  // TODO: wrap loadMoreMovies in useCallback and pass it to the dep array
  useEffect(() => {
    if (inView) {
      loadMoreInventory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const { indexUiState } = useInstantSearch()

  if (
    !indexUiState.query &&
    !indexUiState.refinementList &&
    !indexUiState.range
  ) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 lg:gap-8 xl:gap-10">
          {inventory &&
            inventory?.map((item: any) => {
              // console.log('InventoryItems item:', item)
              const titleCompiled =
                titleDisplay(
                  item.equipmentCategories.categoryType,
                  item.equipmentMake.name,
                  item.year,
                  item.model,
                  item.title,
                ) || ''

              return (
                <Fragment key={item._id}>
                  <EquipmentCard
                    title={truncate(titleCompiled, 40) || ''}
                    surtitle={
                      <Badge
                        variant="outline"
                        className="inline-block mb-2 capitalize"
                      >
                        {item.condition}
                      </Badge>
                    }
                    subtitle={
                      <>
                        <Lead className="text-sm lg:text-sm inline-block mb-0">
                          {item.stockNumber}
                        </Lead>
                      </>
                    }
                    image={item.mainImage}
                    link={
                      resolveHref(
                        'inventory',
                        item?.slug,
                        '',
                        item?.equipmentCategories?.slug,
                      ) || ''
                    }
                    hours={item.hoursCurrent}
                    price={item.price}
                    brand={item.equipmentMake?.name}
                    model={item.model}
                    year={item.year}
                  />
                </Fragment>
              )
            })}
        </div>
        <div className="flex justify-center" ref={ref}>
          {/* loading spinner */}
          {displayLoader && (
            <div
              ref={ref}
              className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
            >
              <svg
                aria-hidden="true"
                className="h-10 w-10 animate-spin fill-brandyellow text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </>
    )
  }

  return
}
