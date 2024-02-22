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
import page from '@/sanity/schemas/documents/page'
import post from '@/sanity/schemas/documents/post'

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
import oneColumn from '@/sanity/schemas/objects/oneColumn'
import threeColumn from '@/sanity/schemas/objects/threeColumn'
import twoColumn from '@/sanity/schemas/objects/twoColumn'
import video from '@/sanity/schemas/objects/video'
import siteSettings from '@/sanity/schemas/singletons/siteSettings'

import { customStructure } from './deskStructure'
import accordion from './sanity/schemas/objects/accordion'
import blogGrid from './sanity/schemas/objects/blogGrid'
import emailSubscribe from './sanity/schemas/objects/emailSubscribe'

import hubSpotForm from './sanity/schemas/objects/hubSpotForm'
import iFrame from './sanity/schemas/objects/iFrame'

import modal from './sanity/schemas/objects/modal'

import videoGrid from './sanity/schemas/objects/videoGrid'
import StudioLogo from './sanity/StudioLogo'

const title = 'Sunshine & Unwind'

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
      // Documents
      contentBlock,
      assets,
      page,
      post,
      category,
      // Objects
      asset,
      accordion,
      mainImage,
      blockText,
      blockContent,
      blockContentSimple,
      figure,
      oneColumn,
      imageGallery,
      twoColumn,
      threeColumn,
      fourColumn,
      fiveColumn,
      video,
      hero,
      heroVideo,
      videoGrid,
      blogGrid,
      iFrame,
      hubSpotForm,
      emailSubscribe,
      modal,
    ],
  },
  plugins: [
    structureTool({
      // structure: customStructure,
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
    singletonPlugin([siteSettings.name]),
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
