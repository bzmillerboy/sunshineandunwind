/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { assist } from '@sanity/assist'
import { colorInput } from '@sanity/color-input'
import { RocketIcon } from '@sanity/icons'
import { table } from '@sanity/table'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { locate } from '@/sanity/plugins/locate'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import assets from '@/sanity/schemas/documents/assets'
import category from '@/sanity/schemas/documents/category'
import contentBlock from '@/sanity/schemas/documents/contentBlock'
import department from '@/sanity/schemas/documents/department'
import ecommerceCategory from '@/sanity/schemas/documents/ecommerceCategory'
import ecommerceProduct from '@/sanity/schemas/documents/ecommerceProduct'
import ecommerceProductVariant from '@/sanity/schemas/documents/ecommerceProductVariant'
import equipmentCategory from '@/sanity/schemas/documents/equipmentCategory'
import equipmentComparableModel from '@/sanity/schemas/documents/equipmentComparableModel'
import equipmentMake from '@/sanity/schemas/documents/equipmentMake'
import inventory from '@/sanity/schemas/documents/inventory'
import location from '@/sanity/schemas/documents/location'
import models from '@/sanity/schemas/documents/models'
import modelSpecs from '@/sanity/schemas/documents/modelSpecs'
import page from '@/sanity/schemas/documents/page'
import phoneNumbers from '@/sanity/schemas/documents/phoneNumbers'
import post from '@/sanity/schemas/documents/post'
import staff from '@/sanity/schemas/documents/staff'
import videoPost from '@/sanity/schemas/documents/videoPost'
import asset from '@/sanity/schemas/objects/asset'
import blockContent from '@/sanity/schemas/objects/blockContent'
import blockContentSimple from '@/sanity/schemas/objects/blockContentSimple'
import blockText from '@/sanity/schemas/objects/blockText'
import figure from '@/sanity/schemas/objects/figure'
import fiveColumn from '@/sanity/schemas/objects/fiveColumn'
import fourColumn from '@/sanity/schemas/objects/fourColumn'
import hero from '@/sanity/schemas/objects/hero'
import heroVideo from '@/sanity/schemas/objects/heroVideo'
import imageGallery from '@/sanity/schemas/objects/imageGallery'
import mainImage from '@/sanity/schemas/objects/mainImage'
import modelSpecContent from '@/sanity/schemas/objects/modelSpecContent'
import oneColumn from '@/sanity/schemas/objects/oneColumn'
import phoneNumber from '@/sanity/schemas/objects/phoneNumber'
import specifications from '@/sanity/schemas/objects/specifications'
import threeColumn from '@/sanity/schemas/objects/threeColumn'
import twoColumn from '@/sanity/schemas/objects/twoColumn'
import video from '@/sanity/schemas/objects/video'
import companyInfo from '@/sanity/schemas/singletons/companyInfo'
import siteSettings from '@/sanity/schemas/singletons/siteSettings'

import { customStructure } from './deskStructure'
import equipmentOptions from './sanity/schemas/documents/equipmentOptions'
import equipmentSubCategory from './sanity/schemas/documents/equipmentSubCategory'
import accordion from './sanity/schemas/objects/accordion'
import blogGrid from './sanity/schemas/objects/blogGrid'
import compareModelsBanner from './sanity/schemas/objects/compareModelsBanner'
import emailSubscribe from './sanity/schemas/objects/emailSubscribe'
import equipmentGrid from './sanity/schemas/objects/equipmentGrid'
import equipmentHighlight from './sanity/schemas/objects/equipmentHighlight'
import financeApplicationForm from './sanity/schemas/objects/financeApplicationForm'
import heroEquipment from './sanity/schemas/objects/heroEquipment'
import hubSpotForm from './sanity/schemas/objects/hubSpotForm'
import iFrame from './sanity/schemas/objects/iFrame'
import inventoryCategoryAttachmentGrid from './sanity/schemas/objects/inventoryCategoryAttachmentGrid'
import inventoryCategoryGrid from './sanity/schemas/objects/inventoryCategoryGrid'
import inventoryGrid from './sanity/schemas/objects/inventoryGrid'
import inventoryList from './sanity/schemas/objects/inventoryList'
import jobListings from './sanity/schemas/objects/jobListings'
import modal from './sanity/schemas/objects/modal'
import rentalGrid from './sanity/schemas/objects/rentalGrid'
import rentalHighlights from './sanity/schemas/objects/rentalHighlights'
import specContent from './sanity/schemas/objects/specContent'
import staffGrid from './sanity/schemas/objects/staffGrid'
import tableBlock from './sanity/schemas/objects/tableBlock'
import videoGrid from './sanity/schemas/objects/videoGrid'
import StudioLogo from './sanity/StudioLogo'

const title = 'NT CMS'

// createa a functional component that returns a React element of an img tag

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  icon: StudioLogo,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      siteSettings,
      companyInfo,
      // Documents
      contentBlock,
      assets,
      page,
      videoPost,
      post,
      staff,
      category,
      department,
      location,
      models,
      equipmentMake,
      equipmentCategory,
      equipmentComparableModel,
      equipmentOptions,
      modelSpecs,
      inventory,
      ecommerceProduct,
      ecommerceProductVariant,
      ecommerceCategory,
      phoneNumbers,
      // Objects
      asset,
      accordion,
      mainImage,
      blockText,
      blockContent,
      blockContentSimple,
      figure,
      modelSpecContent,
      oneColumn,
      phoneNumber,
      specifications,
      imageGallery,
      twoColumn,
      threeColumn,
      fourColumn,
      fiveColumn,
      video,
      hero,
      heroVideo,
      heroEquipment,
      equipmentGrid,
      inventoryCategoryGrid,
      inventoryCategoryAttachmentGrid,
      inventoryGrid,
      inventoryList,
      videoGrid,
      blogGrid,
      equipmentHighlight,
      iFrame,
      jobListings,
      hubSpotForm,
      staffGrid,
      emailSubscribe,
      tableBlock,
      rentalHighlights,
      compareModelsBanner,
      financeApplicationForm,
      modal,
      rentalGrid,
      equipmentSubCategory,
      specContent,
    ],
  },
  plugins: [
    structureTool({
      structure: customStructure,
    }),
    assist(),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([siteSettings.name, companyInfo.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
    media(),
    table(),
  ],
})
