import { vercelStegaCleanAll } from '@sanity/client/stega'
import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanEncodedMetadata(input: any) {
  if (typeof input === 'string') {
    return vercelStegaCleanAll(input)
  } else {
    return input
  }
}

export function youTubeImageUrl(url: string | undefined) {
  if (!url) return null
  let videoId = url.includes('youtu.be/')
    ? url.split('youtu.be/')[1]
    : url.split('v=')[1]
  const ampersandPosition = url.includes('youtu.be/')
    ? videoId?.indexOf('?')
    : videoId?.indexOf('&')
  if (ampersandPosition !== -1) {
    videoId = videoId?.substring(0, ampersandPosition)
  }
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export function titleDisplay(
  type: string | undefined,
  make: string | undefined,
  year: number | undefined,
  model: string | undefined,
  title: string | undefined,
) {
  if (type === 'attachment' || type === 'equipmentSubCategory') {
    return title
  } else if (type === 'model') {
    return `${year || ''} ${make || ''} ${model || ''}`
  } else {
    return `${year || ''} ${make || ''} ${model || ''}`
  }
}

export function priceSetter(price, make, category, condition) {
  if (
    make === 'KUBOTA' &&
    category === 'SKIDSTEER LOADER' &&
    condition === 'new'
  ) {
    return null
  }
  return price === 0 || price === null ? null : price
}

export function currencyFormatter(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 6,
  }).format(number)
}

export function formatDate(date) {
  return format(new Date(date), 'MM.dd.yyyy')
}

export const formatPhoneNumber = (str) => {
  // Filter only numbers from the input
  const cleaned = ('' + str).replace(/\D/g, '')

  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return match[1] + '.' + match[2] + '.' + match[3]
  }

  return null
}

export function normalizePhoneNumber(value) {
  if (value === '1') {
    return ''
  }
  if (value !== '') {
    const match = value
      .replace(/\D+/g, '')
      .replace(/^1/, '')
      .match(/([^\d]*\d[^\d]*){1,10}$/)[0]
    const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ''
    return `${part1}${part2}${part3}`
  }
  return value
}

export const linkTypeToVariant = {
  btnPrimary: 'primary',
  btnSecondary: 'secondary',
  btnPrimaryOutline: 'outline',
  btnSecondaryOutline: 'outlineSecondary',
  link: 'link',
}

// a funtion that takes in a string and truncates it to 24 words and adds an ellipsis
// export function truncate(str: string, noWords: number) {
//   if (!str) return null
//   return str.split(' ').splice(0, noWords).join(' ') + '...'
// }

// a funtion that takes in a string and truncates it to 160 characters, ending on the last who word.
export function truncate(str: string, characterCount: number) {
  if (!str) return null
  const words = str.split(' ')
  if (words.join(' ').length <= characterCount) {
    return str
  }
  let length = 0
  return (
    words
      .filter((word) => {
        length += word.length + 1
        return length <= characterCount
      })
      .join(' ') + '...'
  )
}

export function typeFacetName(type: string) {
  switch (type) {
    case 'post':
      return 'News'
    case 'videoPost':
      return 'Video'
    case 'inventory':
      return 'Inventory'
    case 'equipmentCategory':
      return 'Category'
    case 'models':
      return 'Model'
    case 'page':
      return 'Page'
    case 'equipmentSubCategory':
      return 'Rental'
    case 'equipmentComparableModel':
      return 'Comparable Model'
    default:
      return 'Item'
  }
}
