// import groq from 'groq'
import { Layers3 } from 'lucide-react'
// import client from 'part:@sanity/base/client'
// const isUniqueSku = async (sku) => {
//   const defaultSkuQuery = groq`count(*[_type == "ecommerceProduct" && _id in path("drafts.**") && defaultProductVariant.sku == "${sku}"] {})`
//   const variantSkuQuery = groq`count(*[_type == "ecommerceProduct" && _id in path("drafts.**") && variants[].sku == "${sku}"] {})`
//   const defaultCount = await client.fetch(defaultSkuQuery)
//   const variantCount = await client.fetch(variantSkuQuery)
//   return defaultCount + variantCount
// }
import { defineType } from 'sanity'

export default defineType({
  title: 'Product variant',
  name: 'ecommerceProductVariant',
  icon: Layers3,
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Weight in ounces',
      name: 'ounces',
      type: 'number',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
      // validation: (Rule) =>
      //   Rule.required().custom(async (sku) => {
      //     const isUnique = await isUniqueSku(sku)
      //     if (isUnique > 1) {
      //       return 'SKU needs to be unique'
      //     } else {
      //       return true
      //     }
      //   }),
    },
    {
      title: 'Stock Status',
      name: 'stockStatus',
      type: 'string',
      options: {
        list: [
          { title: 'In Stock', value: 'inStock' },
          { title: 'Out of Stock', value: 'outOfStock' },
          { title: 'Backorder', value: 'backorder' },
        ],
        layout: 'radio',
      },
      initialValue: 'inStock',
    },
    {
      title: 'Taxable',
      name: 'taxable',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
})
