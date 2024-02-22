import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { cleanEncodedMetadata, cn } from '@/lib/utils'
import { dataset, projectId } from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
  equipmentMakeSlug?: string,
  equipmentCategorySlug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'post':
      return slug ? `/news/${slug}` : undefined
    case 'videoPost':
      return slug ? `/videos/${slug}` : undefined
    case 'equipmentCategory':
      return slug ? `/equipment/${slug}` : undefined
    case 'equipmentSubCategory':
      return slug ? `/rentals/${equipmentCategorySlug}/${slug}` : undefined
    case 'models':
      return slug
        ? `/${equipmentMakeSlug}/${equipmentCategorySlug}/${slug}`
        : undefined
    case 'rentals':
      return slug ? `/rentals/${equipmentCategorySlug}/${slug}` : undefined
    case 'rentalCategory':
      return slug ? `/rentals/${slug}` : undefined
    case 'inventory':
      return slug ? `/equipment/${equipmentCategorySlug}/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

const defaults = { nonTextBehavior: 'remove' }

type RecursiveTextExtractor = (obj: any) => string

export const extractPlainText: RecursiveTextExtractor = (obj) => {
  let textValues: string[] = []

  if (Array.isArray(obj)) {
    for (const item of obj) {
      textValues = textValues.concat(extractPlainText(item))
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (key === 'text') {
        textValues.push(obj[key].trim()) // Updated to trim the text
      } else {
        textValues = textValues.concat(extractPlainText(obj[key]))
      }
    }
  }

  return textValues.join(' ').replace(/ {2,}/g, ' ').trim() // Updated to trim the final output
}

export function blocksBodyToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    ?.map((block) => {
      if (block?._type !== 'block' || !block.children) {
        return block?.body && blocksToText(block?.body)
      }
      return blockToText(cleanEncodedMetadata(block))
    })
    .join(' ')
}

export function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block) => {
      if (block?._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block?.children?.map((child) => child.text).join('')
    })
    .join(' ')
}

export function blockToText(block, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  if (block?._type !== 'block' || !block.children) {
    return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
  }

  return block?.children?.map((child) => child.text).join('')
}

export function stringifyImages(images) {
  return images.map((i) => {
    return urlForImage(i)?.url() || ''
  })
}
