'use client'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Download from 'yet-another-react-lightbox/plugins/download'
import Inline from 'yet-another-react-lightbox/plugins/inline'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { cn } from '@/lib/utils'
import { urlForImage } from '@/sanity/lib/utils'

import Img from './Img'

export function Gallery({
  images,
  mainImage,
  title,
  photoDate,
  equipmentCategories,
}) {
  const [lightBox, setLightbox] = useState(false)
  const [index, setIndex] = useState(0)
  const updateIndex = ({ index: current }) => setIndex(current)

  const defaultImage = () => {
    if (images?.length > 0) return null
    if (mainImage?.asset) return mainImage
    if (equipmentCategories?.mainImage?.asset)
      return equipmentCategories?.mainImage
    return null
  }

  const createSlides = (images, width, height) =>
    images &&
    images
      .filter((i) => i.asset)
      .map((image, index) => ({
        src: urlForImage(image)?.width(width).height(height).fit('clip').url(),
        width: width,
        height: height,
        imageSrc: image,
        alt: `${title} Photo ${index + 1}`,
      }))

  const carouselSlides = createSlides(images, 1000, 875)
  const lightboxSlides = createSlides(images, 2048, 1536)

  return (
    <div className="sticky top-0">
      <div>
        {!carouselSlides && (
          <div
            className={cn('image-default bg-zinc-100', {
              'p-6, md:p-24 lg:p-32': !mainImage?.asset,
            })}
          >
            <Img
              className="w-full"
              image={defaultImage()}
              alt={`${title} Photo ${index + 1}`}
              width={1000}
              loading="eager"
            />
          </div>
        )}
      </div>
      <div id="imageGallery">
        {carouselSlides?.length > 0 && (
          <>
            <Lightbox
              styles={{
                root: {
                  '--yarl__color_backdrop': 'rgba(255, 255, 255, 0)',
                  '--yarl__thumbnails_container_padding': '12px',
                  '--yarl__container_background_color': 'rgba(0, 0, 0, 0.05)',
                  '--yarl__thumbnails_thumbnail_background':
                    'rgba(0, 0, 0, 0.05)',
                },
                icon: { '--yarl__icon_size': '48px' },
              }}
              index={index}
              slides={carouselSlides}
              plugins={[Inline, Thumbnails]}
              thumbnails={{
                position: 'bottom',
                width: 120,
                height: 120,
                border: 0,
                borderRadius: 2,
                padding: 0,
                gap: 12,
                imageFit: 'cover',
                vignette: false,
              }}
              on={{
                view: updateIndex,
                click: () => setLightbox(true),
              }}
              carousel={{
                preload: 8,
                padding: 0,
                spacing: 0,
                imageFit: 'cover',
              }}
              inline={{
                style: {
                  width: '100%',
                  maxWidth: '100%',
                  aspectRatio: '8 / 7',
                  margin: '0 auto',
                },
              }}
              render={{
                slide: ({ slide }: { slide: any }) => (
                  <div
                    onClick={() => setLightbox(true)}
                    className="image-gallery-image bg-zinc-100 cursor-pointer"
                  >
                    <span className="absolute bottom-3 left-0 py-2 px-3 bg-black/40 font-light text-gray-100 text-xs lg:text-sm lg:bottom-6">
                      {photoDate}
                    </span>
                    <Img
                      className="w-full"
                      image={slide.imageSrc}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      // size="(min-width: 2540px) 1400px, (min-width: 1040px) calc(58.28vw), 100vw"
                      loading="eager"
                    />
                  </div>
                ),
                thumbnail: ({ slide }: { slide: any }) => (
                  <div className="image-gallery-image">
                    <Img
                      image={slide.imageSrc}
                      alt={`${slide.alt} Thumbnail`}
                      width={120}
                      height={120}
                    />
                  </div>
                ),
              }}
            />

            <Lightbox
              index={index}
              open={lightBox}
              plugins={[Zoom, Download]}
              close={() => setLightbox(false)}
              controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
              slides={lightboxSlides}
              on={{ view: updateIndex }}
              animation={{ fade: 3 }}
              zoom={{
                maxZoomPixelRatio: 3,
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Gallery
