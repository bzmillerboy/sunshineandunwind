'use server'

// import { inventoryByCategoryQuery } from '@/sanity/lib/queries'
import { loadInventoryByCategory } from '@/sanity/loader/loadQuery'

export async function fetchInventoryByCategory({
  categoryId,
  page = 1,
}: {
  categoryId?: string | undefined
  page?: number
}) {
  //   const { movies } = await getMovies({ query: search, page })
  const inventory = await loadInventoryByCategory(categoryId || '', page)

  return inventory.data
}
