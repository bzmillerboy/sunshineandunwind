/**
 *  This function receives webhook POSTs from Sanity and updates, creates or
 *  deletes records in the corresponding Algolia indices.
 */
import { createClient, type SanityDocumentStub } from '@sanity/client'
import algoliasearch from 'algoliasearch'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import indexer from 'sanity-algolia'

import { extractPlainText } from '@/sanity/lib/utils'

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID ?? '',
  process.env.ALGOLIA_API_KEY ?? '',
)

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? '',
  token: process.env.SANITY_API_READ_TOKEN ?? '',
  apiVersion: '2021-03-25',
  useCdn: false,
})

export async function POST(req: NextRequest) {
  // console.log('algolia-sync req', req)

  const algoliaIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME ?? '')

  const sanityAlgolia = indexer(
    {
      post: {
        index: algoliaIndex,
        projection: `{
            title,
            "slug": slug.current,
            body,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            categories[]->{title, "slug": slug.current,},
            publishedAt,
          }`,
      },
      inventory: {
        index: algoliaIndex,
        projection: `{
            "stockNumberFull": _id,
            title,
            "slug": slug.current,
            "description": descriptionBlock,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            "imageCount": count(imageGallery.images),
            "imageGallery": imageGallery.images[].asset->.url,
            "category": equipmentCategories->.title,
            "categorySlug": equipmentCategories->.slug.current,
            "categoryType": equipmentCategories->.categoryType,
            "make": equipmentMake->.name,
            "makeSlug": equipmentMake->.slug.current,
            stockNumber,
            hoursCurrent,
            condition,
            mileage,
            status,
            "model": modelReference->.title,
            year,
            price,
          }`,
      },
      videoPost: {
        index: algoliaIndex,
        projection: `{
            title,
            "slug": slug.current,
            body,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            publishedAt,
          }`,
      },
      equipmentCategory: {
        index: algoliaIndex,
        projection: `{
            title,
            "slug": slug.current,
            body,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            categoryType,
            description,
            exclude,
            rentalAvailable,
            rentalDescription,
            bodyRental,
          }`,
      },
      models: {
        index: algoliaIndex,
        projection: `{
            title,
            "slug": slug.current,
            body,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            "make": equipmentMake->.name,
            "makeSlug": equipmentMake->.slug.current,
            "category": equipmentCategories->.title,
            "categorySlug": equipmentCategories->.slug.current,
          }`,
      },
      page: {
        index: algoliaIndex,
        projection: `{
            title,
            "slug": slug.current,
            body,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            hide
          }`,
      },
      equipmentSubCategory: {
        index: algoliaIndex,
        projection: `{
            title,
            "slug": slug.current,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            "category": equipmentCategories->.title,
            "categorySlug": equipmentCategories->.slug.current,
            body,
            description,
            highlights,
            comparableModels[]->{title},
            "jobCategory": equipmentCategories->{
              "categories": *[_type == 'equipmentCategory' && references(^._id) && categoryType == "job"]{title, "slug": slug.current}
            }
          }`,
      },
      equipmentComparableModel: {
        index: algoliaIndex,
        projection: `{
            title,
            "imageRef": mainImage.asset._ref,
            "image": mainImage.asset->.url,
            body,
            "categories": *[_type == 'equipmentSubCategory' && references(^._id)]{title, "slug": slug.current,"image": mainImage.asset._ref, "categorySlug": equipmentCategories->.slug.current},
          }`,
      },
    },

    // mutations
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case 'post':
          return Object.assign({}, document, {
            typeName: 'Post',
            body: extractPlainText(document.body),
            isAvailable: true,
          })
        case 'videoPost':
          return Object.assign({}, document, {
            typeName: 'Video',
            body: extractPlainText(document.body),
            isAvailable: true,
          })
        case 'inventory':
          return Object.assign({}, document, {
            typeName: 'Inventory',
            isAvailable: document.status !== 'sold',
            description: document.description
              ? extractPlainText(document.description)
              : '',
            stockNumberSuffix: document.stockNumber.replace(/^EQ/, ''),
          })
        case 'equipmentCategory':
          return Object.assign({}, document, {
            typeName: 'Equipment Category',
            body: document.body
              ? extractPlainText(document.body)
              : extractPlainText(document.description),
            description: 'n/a',
            bodyRental: document.bodyRental
              ? extractPlainText(document.bodyRental)
              : extractPlainText(document.rentalDescription),
            rentalDescription: 'n/a',
            isAvailable: true,
          })
        case 'models':
          return Object.assign({}, document, {
            typeName: 'Model',
            body: extractPlainText(document.body),
            isAvailable: true,
          })
        case 'page':
          return Object.assign({}, document, {
            typeName: 'Page',
            body: extractPlainText(document.body),
            isAvailable: true,
          })
        case 'equipmentSubCategory':
          return Object.assign({}, document, {
            typeName: 'Rental',
            body: document.body
              ? extractPlainText(document.body)
              : extractPlainText(document.description),
            description: 'n/a',
            highlights: extractPlainText(document.highlights),
            comparableModels:
              document.comparableModels &&
              document.comparableModels.map(
                (model: { title: string }) => model.title,
              ),
            jobCategory: document.jobCategory?.categories[0]?.title || '',
            isAvailable: true,
          })
        case 'equipmentComparableModel':
          return Object.assign({}, document, {
            typeName: 'Rental Comparable',
            body: document.body ? extractPlainText(document.body) : '',
            isAvailable: true,
          })
        default:
          return document
      }
    },

    // Filters
    (document: SanityDocumentStub) => {
      // Filter out Post that are scheduled to publish in the future.
      if (document.hasOwnProperty('publishedAt') && document._type === 'post') {
        return new Date(document.publishedAt) <= new Date()
      }
      // Filter out Post that are scheduled to publish in the future.
      if (
        document.hasOwnProperty('publishedAt') &&
        document._type === 'videoPost'
      ) {
        return new Date(document.publishedAt) <= new Date()
      }
      if (
        document.hasOwnProperty('exclude') &&
        document._type === 'equipmentCategory'
      ) {
        return document.exclude !== true
      }
      if (document._type === 'models') {
        return document.body !== null
      }
      if (document._type === 'page') {
        return document.hide !== true
      }
      return true
    },
  )

  const types = [
    // 'post',
    // 'inventory',
    // 'videoPost',
    // 'equipmentCategory',
    // 'models',
    // 'page',
    // 'equipmentSubCategory',
    // 'equipmentComparableModel',
  ]
  const query = `*[_type in $types && !(_id in path("drafts.**"))][]._id`

  return sanity.fetch(query, { types }).then((ids) => {
    console.log('algolia-sync ids', `Syncing ${ids.length} documents`)
    return sanityAlgolia
      .webhookSync(sanity, { ids: { created: ids, updated: [], deleted: [] } })
      .then(() => {
        return NextResponse.json({
          status: 200,
          send: 'ok',
        })
      })
      .catch((err) => {
        return NextResponse.json({
          status: 500,
          body: JSON.stringify({ message: err.message }),
        })
      })
  })
}
