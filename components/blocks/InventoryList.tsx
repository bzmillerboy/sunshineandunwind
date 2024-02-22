import Link from 'next/link'
import { Fragment } from 'react'

import Img from '@/components/shared/Img'
import { H6, Label } from '@/components/shared/Typography'
import { currencyFormatter, titleDisplay } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import {
  inventoryByCategoryWithLimitQuery,
  inventoryWithLimitQuery,
} from '@/sanity/lib/queries'
import { resolveHref } from '@/sanity/lib/utils'

interface InventoryListProps {
  categoryId?: string
  displayLimit?: number
}

export default async function InventoryList({
  categoryId,
  displayLimit = 10,
}: InventoryListProps) {
  const data = categoryId
    ? await client.fetch(inventoryByCategoryWithLimitQuery, {
        categoryId: categoryId,
        displayLimit: displayLimit - 1,
      })
    : await client.fetch(inventoryWithLimitQuery, {
        displayLimit: displayLimit - 1,
      })

  return (
    <div className="grid grid-cols-12 gap-4">
      {data.map((inventory) => {
        const {
          equipmentMake,
          equipmentCategories,
          title,
          slug,
          _id: inventoryId,
          year,
          model,
          mainImage,
          stockNumber,
          price,
        } = inventory

        return (
          <Fragment key={inventoryId}>
            <div className="col-span-8">
              <Link
                href={
                  resolveHref(
                    'inventory',
                    slug,
                    '',
                    equipmentCategories?.slug,
                  ) || '/'
                }
                key={inventoryId}
              >
                <H6 className="mb-0 leading-3 lg:text-lg lg:leading-5">
                  {titleDisplay(
                    equipmentCategories?.categoryType,
                    equipmentMake?.name,
                    year,
                    model,
                    title,
                  )}
                </H6>
              </Link>
              <Label className="text-sm lg:text-sm font-normal">
                {equipmentCategories?.title}
              </Label>
              {price && (
                <Label className="text-sm lg:text-sm font-normal capitalize">
                  Price: {currencyFormatter(price)}
                </Label>
              )}
            </div>
            <div className="col-span-4">
              <Link
                href={
                  resolveHref(
                    'inventory',
                    slug,
                    '',
                    equipmentCategories?.slug,
                  ) || '/'
                }
                key={inventoryId}
              >
                <Img image={mainImage} alt={title} width={130} height={80} />
              </Link>
            </div>
            {data.indexOf(inventory) !== data.length - 1 && (
              <hr className="col-span-12" />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
