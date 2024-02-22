import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

// Page payloads

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  mainImage?: MainImage
  hide?: boolean
}

export interface PostPayload {
  _id?: string
  body?: PortableTextBlock[]
  title?: string
  slug?: string
  publishedAt?: string
  mainImage?: MainImage
  categories?: PostCategory[]
}

export interface VideoPostPayload {
  title?: string
  slug?: string
  videoURL?: string
  mainImage?: MainImage
  body?: PortableTextBlock[]
}

export interface InventoryPayload {
  _id?: string
  title?: string
  slug?: string
  equipmentMake?: EquipmentMakePayload
  equipmentCategories?: EquipmentCategoryPayload
  mainImage?: MainImage
  imageGallery?: any // update this to a proper type for imageGallery
  hoursPhoto?: number
  photoDate?: string
  videoURL?: string
  descriptionBlock?: PortableTextBlock[]
  specification?: string
  stockNumber?: string
  price?: number
  closeout?: boolean
  serial?: string
  condition?: string
  year?: number
  model?: string
  hoursCurrent?: number
  mileage?: number
  location?: Location
  status?: string
  deliveryDate?: string
  movementDate?: string
  body?: PortableTextBlock[]
}

export interface RentalPayload {
  _id?: string
  title?: string
  slug?: string
  equipmentCategories?: EquipmentCategoryPayload
  mainImage?: MainImage
  body?: PortableTextBlock[]
  description?: PortableTextBlock[]
  highlights?: PortableTextBlock[]
  specifications?: PortableTextBlock[]
  comparableModels?: ModelPayload[]
}

export interface RentalSizePayload {
  title?: string
  slug?: string
  equipmentCategories?: EquipmentCategoryPayload
  mainImage?: MainImage
  highlights?: PortableTextBlock[]
}

export interface ModelPayload {
  _id?: string
  title?: string
  slug?: any
  equipmentMake?: EquipmentMakePayload
  equipmentCategories?: EquipmentCategoryPayload
  category?: EquipmentCategoryPayload
  mainImage?: MainImage
  body?: PortableTextBlock[]
}

export interface EquipmentCategoryPayload {
  _id?: string
  title?: string
  slug?: string
  mainImage?: MainImage
  backgroundImage?: MainImage
  body?: PortableTextBlock[]
  categoryType?: string
  bodyRental?: PortableTextBlock[]
  rentalDescription?: PortableTextBlock[]
  attachmentBody?: PortableTextBlock[]
  relatedAttachments?: EquipmentCategoryPayload[]
}

export interface EquipmentMakePayload {
  name?: string
  slug?: string
}

export interface EquipmentCategoryPayload {
  title?: string
  slug?: string
  categoryType?: string
}

export interface Location {
  title?: string
  slug?: string
}

export interface PostCategory {
  title?: string
  slug?: string
}

export interface SettingsPayload {
  title?: string
  description?: string
  // footer?: PortableTextBlock[]
  // menuItems?: MenuItem[]
  image?: Image
  keywords?: string[]
  url?: string
  siteName?: string
}
export interface ContentBlockPayload {
  body?: PortableTextBlock[]
  slug?: string
}
export interface CompanyInfoPayload {
  name?: string
  logo?: MainImage
  descriptionBlock?: PortableTextBlock[]
  socialLinkInstagram?: string
  socialLinkTwitter?: string
  socialLinkYoutube?: string
  socialLinkLinkedin?: string
  socialLinkFacebook?: string
  phone?: string
}
export interface MainImage extends Image {
  alt?: string
}

export interface RequestCartItem {
  id: number
  title: string
  category: string
  stockNumber?: string
  price?: number
  quantity: number
  cartType?: string
  image: Image
  options?: RentalOption[]
}

export interface RentalOption {
  _id?: string
  title?: string
  mainImage?: any
}

export interface CategoryPayload {
  _id?: string
  slug?: string
  title?: string
  description?: string
  mainImage?: MainImage
}
