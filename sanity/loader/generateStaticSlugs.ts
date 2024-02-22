import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    )
}

// Used in `generateStaticParams`
export function generateStaticEquipmentAttachmentSlugs() {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == 'equipmentCategory' && defined(slug.current) && defined(relatedAttachments)]{"slug": slug.current}`,
      { type: 'equipmentCategory' },
      {
        next: {
          tags: ['equipmentCategory'],
        },
      },
    )
}

export function generateSitemapPageUrls(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch(
      groq`*[_type == $type && defined(slug.current)]{
        "slug": slug.current, 
        "updatedAt": _updatedAt,
        equipmentCategories->{
          "slug": slug.current,
        },
        "relatedInventoryItems": *[_type == "inventory" && references(^._id)]{"updatedAt": _updatedAt} | order(updatedAt desc)[0..0]
      }`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    )
}

export function generateSitemapModelsPageUrls(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch(
      groq`*[_type == $type && defined(slug.current) && defined(body)]{
        "slug": slug.current, 
        "updatedAt": _updatedAt,
        "category": equipmentCategories->.slug.current,
        "make": equipmentMake->.slug.current
      }`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    )
}
