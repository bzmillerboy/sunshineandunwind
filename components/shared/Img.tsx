'use client'
import { SanityImage } from 'sanity-image'

import { Skeleton } from '@/components/ui/skeleton'
import { cleanEncodedMetadata, cn } from '@/lib/utils'
import { dataset, projectId } from '@/sanity/lib/api'

interface ImgProps {
  image?: { asset?: any; crop?: any; hotspot?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  className?: string
  loading?: 'lazy' | 'eager'
  mode?: 'cover' | 'contain'
  lqip?: string
  queryParams?: { [key: string]: string | number }
}

export default function Img({
  image,
  alt = 'Newman Tractor Image',
  width = 1000,
  height,
  size = '100vw',
  className,
  loading = 'lazy',
  mode = 'contain',
  lqip,
  queryParams,
}: ImgProps) {
  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

  // console.log('Img:', image)

  // removing for now until I can find a better solution
  // https://github.com/coreyward/sanity-image/issues/23
  // {!loaded && (
  //   <>
  //     {/* eslint-disable-next-line @next/next/no-img-element */}
  //     <img
  //       alt={cleanEncodedMetadata(alt)}
  //       data-lqip
  //       width={width}
  //       height={height}
  //       src={lqip || image?.asset?.lqip}
  //       className="absolute top-0 left-0 bottom-0 right-0 w-full h-full z-0"
  //     />
  //     <Skeleton className="absolute top-0 left-0 bottom-0 right-0 w-full h-full opacity-80" />
  //   </>
  // )}

  if (image?.asset?._id || image?.asset?._ref) {
    return (
      <SanityImage
        // Pass the Sanity Image ID (`_id`) (e.g., `image-abcde12345-1200x800-jpg`)
        id={image?.asset?._id || image?.asset?._ref || image}
        mode={mode}
        preview={lqip || image?.asset?.lqip}
        baseUrl={baseUrl}
        alt={cleanEncodedMetadata(alt)}
        width={width}
        height={height}
        sizes={size}
        decoding="async"
        crop={image?.crop}
        hotspot={image?.hotspot}
        loading={loading}
        className={cleanEncodedMetadata(className)}
        queryParams={queryParams}
      />
    )
  } else {
    return (
      <SanityImage
        id="image-55dd23ac54b25905c48a6b3d4a0d2960a70bcd9f-1500x1500-png"
        mode={mode}
        baseUrl={baseUrl}
        alt={cleanEncodedMetadata(alt)}
        width={width}
        height={height}
        sizes={size}
        preview={
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9ElEQVQ4jZXVS4iOURgH8Nd1MnJZyHWhrIQUKTYWEkqyYJZioyiyYkEhKcXG2kJRQxaKhQXDQuN3vg3CQkKKhVvucinTfKPz9Xwz77wz3xin/u857/s95/9/Luc5X1FUBvrR1dU16L0VBo3RbCgjpdRAS8JU+XE4AoxHOyb+j4djMC42TSoRtGEh1mIJ5mJK2BetCCdgPtagA9uxA+uwLN4PxdwRAmNHImzHRlzAAzzBY1zFkcCJID2IVZGGopqevJgWinvxEPUk9eUZX3AP1wJXcBabIy1FtUj5sSnUr+MtelNKmSyjF7/xNZAFHmEfZjRznyqEnXgRG3uCqOFhSqmvCnzGOWzBaizH7FyHZsh38SOM61ImymE3iKvINn/wCndwA5ewJ4raILyMd2GcQ6xLKecxe9hYN4WanoddT+AnbmJDPnaZ8CieZ+MIq94KTTEDKaiHyDPsyoXKhDtRw69KDoegVKyyUB8+4CTmFXFwD+AibuF+ePwGn/Aer/FtoFD9Ij0R8kucyUUqorXmYGl0ylbsxmGcwvFYd4bQd3zEU9zGeRzDNqwoXwBF9HJb9OrMHEIciYyV2B8H+3TkbD0Wh0PTMbnllVQWKt04s7AICzA1f+vu7h7SKaO6A4ebh2296qiS1Wq1IZtHiuaf43//Av4CC8XZyN3q30kAAAAASUVORK5CYII='
        }
        decoding="async"
        crop={image?.crop}
        hotspot={image?.hotspot}
        loading={loading}
        className={cleanEncodedMetadata(className)}
      />
    )
  }
}
