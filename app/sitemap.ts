import { MetadataRoute } from 'next'

import {
  generateSitemapModelsPageUrls,
  generateSitemapPageUrls,
} from '@/sanity/loader/generateStaticSlugs'
const url = process.env.NEXT_PUBLIC_SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${url}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...(await generateSitemapPageUrls('page')).map((o) => ({
      url: `${url}/${o.slug}`,
      lastModified: o.updatedAt,
      changeFrequency: 'monthly',
      priority: 1,
    })),
    ...(await generateSitemapModelsPageUrls('models')).map((o) => {
      return {
        url: `${url}/${o.make}/${o.category}/${o.slug}`,
        lastModified: o.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.9,
      }
    }),
    ...(await generateSitemapPageUrls('equipmentCategory')).map((o) => {
      return {
        url: `${url}/equipment/${o.slug}`,
        lastModified: o.relatedInventoryItems[0]?.updatedAt || o.updatedAt,
        changeFrequency: 'daily',
        priority: 0.8,
      }
    }),
    ...(await generateSitemapPageUrls('post')).map((o) => {
      return {
        url: `${url}/news/${o.slug}`,
        lastModified: o.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    }),
    ...(await generateSitemapPageUrls('category')).map((o) => {
      return {
        url: `${url}/news/category/${o.slug}`,
        lastModified: o.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    }),
    ...(await generateSitemapPageUrls('videoPost')).map((o) => {
      return {
        url: `${url}/videos/${o.slug}`,
        lastModified: o.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    }),
    ...(await generateSitemapPageUrls('equipmentCategory')).map((o) => {
      return {
        url: `${url}/rentals/${o.slug}`,
        lastModified: o.relatedInventoryItems[0]?.updatedAt || o.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      }
    }),
    ...(await generateSitemapPageUrls('equipmentSubCategory')).map((o) => {
      return {
        url: `${url}/rentals/${o.equipmentCategories?.slug}/${o.slug}`,
        lastModified: o.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.5,
      }
    }),
    ...(await generateSitemapPageUrls('inventory')).map((o) => ({
      url: `${url}/equipment/${o.equipmentCategories?.slug}/${o.slug}`,
      lastModified: o.updatedAt,
      changeFrequency: 'daily',
      priority: 0.4,
    })),
  ]
}
