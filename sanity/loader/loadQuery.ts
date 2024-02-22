import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import { client } from '@/sanity/lib/client'
import {
  blogPostQuery,
  categoryBySlugQuery,
  companyInfoQuery,
  contentBlocksBySlugQuery,
  equipmentCategoryAttachmentsBySlugQuery,
  equipmentCategoryBySlugQuery,
  inventoryByCategoryQuery,
  inventoryBySlugQuery,
  modelBySlugQuery,
  pagesBySlugQuery,
  postByCategoryIdQuery,
  postBySlugQuery,
  rentalBySlugQuery,
  rentalCategoryBySlugQuery,
  settingsQuery,
  videoPostBySlugQuery,
} from '@/sanity/lib/queries'
import { token } from '@/sanity/lib/token'
import {
  CategoryPayload,
  CompanyInfoPayload,
  ContentBlockPayload,
  EquipmentCategoryPayload,
  InventoryPayload,
  ModelPayload,
  PagePayload,
  PostPayload,
  RentalPayload,
  SettingsPayload,
  VideoPostPayload,
} from '@/types'

const serverClient = client.withConfig({
  token,
  stega: {
    // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
    enabled: process.env.VERCEL_ENV === 'preview',
  },
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ||
    process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE == 'previewDrafts'
      ? 'previewDrafts'
      : 'published',
  } = options

  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0

  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false
  } else if (usingCdn) {
    revalidate = 60
  }
  // console.log('loadQuery query:', query)
  // console.log('loadQuery params:', params)
  // console.log('loadQuery options:', options)
  // console.log('loadQuery perspective:', perspective)
  // console.log('loadQuery revalidate:', revalidate)

  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // @TODO add support in `@sanity/client/stega` for the below
    // stega: {enabled: draftMode().isEnabled}
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    {
      next: {
        tags: ['siteSettings'],
      },
    },
  )
}

export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  )
}

export function loadPost(slug: string) {
  return loadQuery<PostPayload | null>(
    postBySlugQuery,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  )
}

export function loadPosts() {
  return loadQuery<PostPayload[] | null>(
    blogPostQuery,
    {},
    { next: { tags: [`post`] } },
  )
}

export function loadPostsByCategory(categoryId: string) {
  return loadQuery<PostPayload[] | null>(
    postByCategoryIdQuery,
    { categoryId },
    { next: { tags: [`post:${categoryId}`] } },
  )
}

export function loadVideoPost(slug: string) {
  return loadQuery<VideoPostPayload | null>(
    videoPostBySlugQuery,
    { slug },
    { next: { tags: [`videoPost:${slug}`] } },
  )
}

export function loadInventory(slug: string) {
  return loadQuery<InventoryPayload | null>(
    inventoryBySlugQuery,
    { slug },
    { next: { tags: [`inventory:${slug}`] } },
  )
}

export function loadRental(slug: string) {
  return loadQuery<RentalPayload | null>(
    rentalBySlugQuery,
    { slug },
    { next: { tags: [`equipmentSubCategory:${slug}`] } },
  )
}

export function loadModel(slug: string) {
  return loadQuery<ModelPayload | null>(
    modelBySlugQuery,
    { slug },
    { next: { tags: [`models:${slug}`] } },
  )
}

export function loadEquipmentCategory(slug: string) {
  return loadQuery<EquipmentCategoryPayload | null>(
    equipmentCategoryBySlugQuery,
    { slug },
    { next: { tags: [`equipmentCategory:${slug}`] } },
  )
}

export function loadEquipmentCategoryAttachments(slug: string) {
  return loadQuery<EquipmentCategoryPayload | null>(
    equipmentCategoryAttachmentsBySlugQuery,
    { slug },
    { next: { tags: [`equipmentCategory:${slug}`] } },
  )
}

export function loadRentalCategory(slug: string) {
  return loadQuery<EquipmentCategoryPayload | null>(
    rentalCategoryBySlugQuery,
    { slug },
    { next: { tags: [`equipmentCategory:${slug}`] } },
  )
}

export function loadInventoryByCategory(categoryId: string, page: number) {
  // If page is 0, we want to load the first 10 items, if it's 1, we want to load the next 10 items, etc.
  const startIndex = page ? page * 10 : 0
  const endIndex = page ? (page + 1) * 10 : 9
  return loadQuery<InventoryPayload[] | null>(
    inventoryByCategoryQuery,
    { categoryId, startIndex, endIndex },
    { next: { tags: [`inventory:${categoryId}`] } },
  )
}

export function loadContentBlock(slug: string) {
  return loadQuery<ContentBlockPayload[] | null>(
    contentBlocksBySlugQuery,
    { slug },
    { next: { tags: [`contentBlock:${slug}`] } }, //TODO: may be able to check for each slug
  )
}

export function loadCompanyInfo() {
  return loadQuery<CompanyInfoPayload | null>(
    companyInfoQuery,
    {},
    { next: { tags: [`companyInfo`] } },
  )
}

export function loadCategory(slug: string) {
  return loadQuery<CategoryPayload | null>(
    categoryBySlugQuery,
    { slug },
    { next: { tags: [`category:${slug}`] } },
  )
}
