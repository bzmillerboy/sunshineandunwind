import { groq } from 'next-sanity'

const mainImage = `mainImage {
  ...,
  asset->{
    _id,
    "_ref": _id,
    "lqip": metadata.lqip,
    "palette": metadata.palette,
  }
}`

const body = `body[] {
  ...,
  _type in ["block", "hero","oneColumn", "twoColumn", 'threeColumn', "fourColumn", "fiveColumn", "accordion", "internalLink", "externalLink"] => {
    ...,
    body[] {
      ...,
    },
    bodyLeft[] {
      ...,
    },
    bodyCenter[] {
      ...,
    },
    bodyRight[] {
      ...,
    },
    accordion[] {
      ...,
    }
  },
}`
const attachmentBody = `attachmentBody[] {
  ...,
  _type in ["block", "hero","oneColumn", "twoColumn", 'threeColumn', "fourColumn", "fiveColumn", "accordion", "internalLink", "externalLink"] => {
    ${body},
    ...,
    bodyLeft[] {
      ...,
    },
    bodyCenter[] {
      ...,
    },
    bodyRight[] {
      ...,
    },
    accordion[] {
      ...,
    }
  },
}`

export const imageByIdQuery = groq`
  *[_id == $id]{
    "lqip": metadata.lqip,
  }[0]
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    ${body},
    title,
    ${mainImage},
    "slug": slug.current,
    hide
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    ${body},
    title,
    publishedAt,
    ${mainImage},
    "slug": slug.current,
    categories[]->{
      title,
      "slug": slug.current,
    }
  }
`
export const blogPostQuery = groq`
  *[_type == "post"] | order(_createdAt desc)[0..$displayLimit] {
    _id,
    ${body},
    title,
    publishedAt,
    ${mainImage},
    "slug": slug.current,
    categories[]->{
      title
    }
  } | order(publishedAt desc)
`

export const postByCategoryIdQuery = groq`
  *[_type == "post" && $categoryId in categories[]._ref] {
    _id,
    ${body},
    title,
    publishedAt,
    ${mainImage},
    "slug": slug.current,
  } | order(publishedAt desc)
`

export const videoPostQuery = groq`
  *[_type == "videoPost"] | order(_createdAt desc)[0..$displayLimit] {
    _id,
    ${body},
    title,
    publishedAt,
    ${mainImage},
    "slug": slug.current,
    categories[]->{
      title
    }
  } | order(publishedAt desc)
`

export const videoPostBySlugQuery = groq`
  *[_type == "videoPost" && slug.current == $slug][0] {
    _id,
    ${body},
    title,
    mainImage,
    videoURL,
    "slug": slug.current,
  }
`

export const inventoryBySlugQuery = groq`
  *[_type == "inventory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    equipmentMake->{
      name,
      "slug": slug.current,
    },
    equipmentCategories->{
      title,
      "slug": slug.current,
      categoryType,
      relatedAttachments[]->{
        _id,
        title,
        "slug": slug.current,
        ${mainImage},
      },
      ${mainImage},
    },
    ${mainImage},
    imageGallery,
    hoursPhoto,
    photoDate,
    videoURL,
    descriptionBlock,
    specification,
    stockNumber,
    price,
    closeout,
    condition,
    year,
    model,
    hoursCurrent,
    mileage,
    location->{
      title,
      "slug": slug.current,
    },
    status,
    deliveryDate,
    movementDate,
    ${body}
  }
`

export const rentalBySlugQuery = groq`
  *[_type == "equipmentSubCategory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    equipmentCategories->{
      _id,
      title,
      "slug": slug.current,
      categoryType,
      mainImage,
    },
    ${mainImage},
    ${body},
    description,
    highlights,
    specifications,
    comparableModels[]->{
      _id,
      "slug": slug.current,
      title,
      mainImage,
    }
  }
`

export const contentBlockBySlugQuery = groq`
  *[_type == "contentBlock" && slug.current == $slug][0] {
    _id,
    ${body},
  }
`

export const rentalOptionsByCategorySlugQuery = groq`
  *[_type == "equipmentOptions" && equipmentCategories->slug.current == $categorySlug] {
    _id,
    title,
    ${mainImage},
  }
`

export const inventoryByCategoryQuery = groq`
  *[_type == "inventory" && equipmentCategories._ref == $categoryId && status == 'stock'] {
    _id,
    title,
    "slug": slug.current,
    equipmentMake->{
      name,
      "slug": slug.current,
    },
    equipmentCategories->{
      title,
      "slug": slug.current,
      categoryType,
      ${mainImage},
    },
    ${mainImage},
    imageGallery,
    hoursPhoto,
    photoDate,
    videoURL,
    descriptionBlock,
    specification,
    stockNumber,
    price,
    condition,
    year,
    model,
    hoursCurrent,
    mileage,
    location->{
      title,
      "slug": slug.current,
    },
    status,
    deliveryDate,
    movementDate,
    "imageCount": count(imageGallery.images),
  } | order(imageCount desc) | order(defined(mainImage.asset._ref) desc) [$startIndex..$endIndex]
`

export const inventoryByCategoryWithLimitQuery = groq`
  *[_type == "inventory" && equipmentCategories._ref == $categoryId && mainImage.asset != null && status == 'stock'] | order(_createdAt desc)[0..$displayLimit] {
    _id,
    title,
    "slug": slug.current,
    equipmentMake->{
      name,
      "slug": slug.current,
    },
    equipmentCategories->{
      title,
      "slug": slug.current,
      categoryType,
    },
    ${mainImage},
    stockNumber,
    price,
    condition,
    year,
    model,
  }
`
export const rentalSizeByCategoryQuery = groq`
  *[_type == "equipmentSubCategory" && equipmentCategories._ref == $categoryId] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    equipmentCategories->{
      title,
      "slug": slug.current,
      categoryType,
    },
    highlights,
  }
`

export const rentalSizesByCategorySlugQuery = groq`
  *[_type == "equipmentSubCategory" && equipmentCategories->slug.current == $categorySlug] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
  }
`

export const rentalSizeQuery = groq`
  *[_type == "equipmentSubCategory"] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    equipmentCategories->{
      title,
      "slug": slug.current,
      categoryType,
    },
    highlights,
  }
`

export const inventoryWithLimitQuery = groq`
  *[_type == "inventory" && mainImage.asset != null && equipmentCategories->categoryType == "model"  && status == 'stock'] | order(_createdAt desc)[0..$displayLimit] {
    _id,
    title,
    "slug": slug.current,
    equipmentMake->{
      name,
      "slug": slug.current,
    },
    equipmentCategories->{
      title,
      "slug": slug.current,
      categoryType,
    },
    ${mainImage},
    stockNumber,
    price,
    condition,
    year,
    model,
  }
`

export const modelBySlugQuery = groq`
  *[_type == "models" && slug.current == $slug && body != null][0] {
    _id,
    title,
    "model": slug.current,
    "slug": equipmentMake->,
    "category": equipmentCategories->,
    mainImage,
    ${body},
  }
`

export const equipmentCategoryBySlugQuery = groq`
  *[_type == "equipmentCategory" && slug.current == $slug && exclude != true][0] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    backgroundImage,
    categoryType,
    ${body},
  }
`

export const equipmentCategoryAttachmentsBySlugQuery = groq`
  *[_type == "equipmentCategory" && slug.current == $slug && exclude != true][0] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    backgroundImage,
    categoryType,
    ${attachmentBody},
  }
`

export const rentalCategoryBySlugQuery = groq`
  *[_type == "equipmentCategory" && slug.current == $slug && exclude != true && rentalAvailable == true][0] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    backgroundImage,
    categoryType,
    rentalDescription,
  }
`

export const rentalCategoriesQuery = groq`
  *[_type == "equipmentCategory" && exclude != true && rentalAvailable == true] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    backgroundImage,
    categoryType,
    rentalDescription,
  }
`

export const inventoryCategorytByTypeQuery = groq`
  *[_type == "equipmentCategory" && categoryType == $categoryType && exclude != true] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    categoryType,
  } | order(title asc)
`

export const inventoryCategoryRelatedAttachmentsByCategoryRefQuery = groq`
  *[_type == "equipmentCategory" && _id == $categoryId && exclude != true] {
    relatedAttachments[]->{
      _id,
      title,
      "slug": slug.current,
      ${mainImage},
      categoryType,
    }
  }[0]
`

export const inventoryCountByCategoryQuery = groq`
count(*[_type == "inventory" && equipmentCategories._ref == $categoryId  && status == 'stock'])
`

export const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    ...,
  }
`

export const contentBlocksBySlugQuery = groq`
  *[_type == "contentBlock" && slug.current == $slug][0] {
    "slug": slug.current,
    ${body},
  }
`
export const companyInfoQuery = groq`
  *[_type == "companyInfo"][0]{
    name,
    logo,
    descriptionBlock,
    socialLinkInstagram,
    socialLinkTwitter,
    socialLinkYoutube,
    socialLinkLinkedin,
    socialLinkFacebook,
    phone
  }
`

export const internalLinkByIdQuery = groq`
  *[_id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    _type,
    equipmentMake->{"slug": slug.current},
    equipmentCategories->{"slug": slug.current},
    "asset": asset.asset->{_id, url}
  }
`

export const staffByLocationIdQuery = groq`
  *[_type == "staff" && location._ref == $locationId && hide != true] {
    _id,
    firstName,
    lastName,
    image,
    email,
    phoneCell,
    phoneDirect,
    role,
    location->{
      _id,
      title,
      "slug": slug.current,
    },
    department->{
      _id,
      "slug": slug.current,
      title
    }
  }
`

export const modelsByCategoryAndMakeQuery = groq`
  *[_type == "models" && equipmentCategories._ref == $categoryId && equipmentMake._ref == $makeId && body != null] {
    _id,
    title,
    "slug": slug.current,
    sortOrder,
    "make": equipmentMake->{
      _id,
      "slug": slug.current,
      name,
    },
    "category": equipmentCategories->{
      _id,
      "slug": slug.current,
      title,
    },
    ${mainImage},
    specifications[]{specValue, "specId": specName->._id},
  } | order(sortOrder asc)
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    ${mainImage},
    description,
  }
`
