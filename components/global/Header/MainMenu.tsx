'use client'
import { cn } from '@/lib/utils'
import * as React from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Img from '@/components/shared/Img'
import Figure from '@/components/blocks/Figure'
import { Button } from '@/components/ui/button'

const aboutImage = {
  asset: {
    _id: 'image-a11e4300dd014747f693a0f352df4d7cd144a802-4000x3000-jpg',
    metadata: {
      palette: {
        lightMuted: {
          title: '#fff',
          population: 1,
          background: '#9fa8b7',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
        },
        vibrant: {
          background: '#5285c1',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 8.32,
        },
        dominant: {
          title: '#fff',
          population: 8.4,
          background: '#70773b',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
        },
        _type: 'sanity.imagePalette',
        darkMuted: {
          title: '#fff',
          population: 8.4,
          background: '#70773b',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
        },
        muted: {
          foreground: '#000',
          title: '#fff',
          population: 0.91,
          background: '#9a9e63',
          _type: 'sanity.imagePaletteSwatch',
        },
        lightVibrant: {
          background: '#74a5ee',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#fff',
          population: 0.14,
        },
        darkVibrant: {
          background: '#4c5118',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 1.6,
        },
      },
      dimensions: {
        _type: 'sanity.imageDimensions',
        width: 4000,
        aspectRatio: 1.3333333333333333,
        height: 3000,
      },
      _type: 'sanity.imageMetadata',
      isOpaque: true,
      exif: {
        MeteringMode: 1,
        ExposureTime: 0.0015625,
        InteropOffset: 836,
        ExposureBiasValue: 0,
        DigitalZoomRatio: 1,
        SceneCaptureType: 0,
        ISO: 100,
        Saturation: 0,
        LightSource: 0,
        WhiteBalance: 0,
        FocalLengthIn35mmFormat: 24,
        LensSpecification: [24, 24, 2.8, 2.8],
        FNumber: 2.8,
        Contrast: 0,
        _type: 'sanity.imageExifMetadata',
        FocalLength: 4.5,
        ExposureMode: 0,
        ColorSpace: 1,
        PixelYDimension: 3000,
        DateTimeOriginal: '2023-04-11T11:44:42.000Z',
        ExposureProgram: 2,
        PixelXDimension: 4000,
        BodySerialNumber: '1TCLH2K03BJ8DV',
        DateTimeDigitized: '2023-04-11T11:44:42.000Z',
        MaxApertureValue: 2.971,
        Sharpness: 0,
        Flash: 0,
        GainControl: 0,
      },
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMFAgT/xAAfEAACAgIDAQEBAAAAAAAAAAABAgMEABEGEiEFMUH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQT/xAAfEQACAQIHAAAAAAAAAAAAAAAAAQMUQgIFERUhMaH/2gAMAwEAAhEDEQA/AOax9WjEyd45ArgFSfNjGV7dWWUjQCBdgk+nJkrJdMK2UVjCOqHX4MalOsgPauGU/wA3rJveNrlmeji16Jt/m3zatp4REx6+e4Zm3xTj1udp5BPG7elR7hhPNpXe/BKaJWn/2Q==',
      blurHash: 'VgDAP:kDjZt7WAOxogayj[f6XVWBj]RkofXAj=oej[a}',
      location: {
        alt: -2.8,
        lat: 36.34324738888889,
        lng: -83.99422730555555,
        _type: 'geopoint',
      },
      hasAlpha: false,
    },
  },
}

const norrisLakeImage = {
  asset: {
    metadata: {
      exif: {
        ExposureTime: 0.00045004500450045,
        SceneCaptureType: 0,
        MeteringMode: 5,
        FNumber: 1.8,
        Flash: 16,
        LensSpecification: [1.5399999618512084, 6, 1.8, 2.4],
        ApertureValue: 1.6959938128383605,
        DateTimeOriginal: '2022-07-04T19:24:04.000Z',
        PixelYDimension: 3024,
        ColorSpace: 65535,
        WhiteBalance: 0,
        ShutterSpeedValue: 11.117787386312807,
        FocalLength: 4.25,
        ExposureProgram: 2,
        ExposureBiasValue: 0,
        FocalLengthIn35mmFormat: 26,
        LensModel: 'iPhone 11 Pro back triple camera 4.25mm f/1.8',
        SubSecTimeOriginal: '290',
        PixelXDimension: 4032,
        BrightnessValue: 9.603948700641242,
        DateTimeDigitized: '2022-07-04T19:24:04.000Z',
        ISO: 32,
        _type: 'sanity.imageExifMetadata',
        SubjectArea: [2009, 1509, 2318, 1390],
        ExposureMode: 0,
        SensingMethod: 2,
        LensMake: 'Apple',
        SubSecTimeDigitized: '290',
      },
      hasAlpha: false,
      dimensions: {
        _type: 'sanity.imageDimensions',
        width: 4032,
        aspectRatio: 1.3333333333333333,
        height: 3024,
      },
      _type: 'sanity.imageMetadata',
      palette: {
        _type: 'sanity.imagePalette',
        darkMuted: {
          title: '#fff',
          population: 2.52,
          background: '#3c6e7d',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
        },
        muted: {
          background: '#5e93ac',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 6.18,
        },
        lightVibrant: {
          population: 0,
          background: '#94d4fc',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#fff',
        },
        darkVibrant: {
          background: '#0f687b',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 5.55,
        },
        lightMuted: {
          background: '#a2c3d4',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#fff',
          population: 1.72,
        },
        vibrant: {
          title: '#fff',
          population: 5.8,
          background: '#599ad2',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
        },
        dominant: {
          foreground: '#fff',
          title: '#fff',
          population: 6.18,
          background: '#5e93ac',
          _type: 'sanity.imagePaletteSwatch',
        },
      },
      isOpaque: true,
      blurHash: 'ViD-%Kocs:RkRj%jfPj?azfQIuW=t8oyt7R;ayf6a#f6',
      location: {
        alt: 317.51270878721857,
        lat: 36.22437222222222,
        lng: -84.09237777777777,
        _type: 'geopoint',
      },
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYEBQf/xAAiEAABBAICAQUAAAAAAAAAAAABAAIDBAUREzEGEhQWIVH/xAAWAQEBAQAAAAAAAAAAAAAAAAADBQb/xAAbEQABBQEBAAAAAAAAAAAAAAACAAEDESExkf/aAAwDAQACEQMRAD8AbsPlfH85SM9S9zR9EGMghRBbwzLPCy9KC0/Q4nFLfySvgavt6VdsUfemt7VbX8zmsT7axrST+K4MsjdJZw5IsatWkSZ/D03cM073PA3sRlCUW5qGceuaFr3nskIQEc14TeJ2cKX/2Q==',
    },
    _id: 'image-b5cd416037e2e419d0cd43fc14e7eee0633b09e1-4032x3024-jpg',
  },
}

const photo2 = {
  asset: {
    _id: 'image-7742bfc4bc175064ed11e6976fc219c50df98ab9-4018x3015-jpg',
    metadata: {
      blurHash: 'VBL;Ty$|bu=syZ0ASij?S6wYHqRQR:RjD+x{M}V?a$XB',
      _type: 'sanity.imageMetadata',
      palette: {
        muted: {
          background: '#baa87e',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#fff',
          population: 5.42,
        },
        lightVibrant: {
          foreground: '#000',
          title: '#fff',
          population: 7.6,
          background: '#dfc589',
          _type: 'sanity.imagePaletteSwatch',
        },
        darkVibrant: {
          population: 0.19,
          background: '#6c4b1f',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
        },
        lightMuted: {
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#fff',
          population: 1.85,
          background: '#cec1a7',
        },
        vibrant: {
          population: 2.83,
          background: '#ac892f',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
        },
        dominant: {
          foreground: '#000',
          title: '#fff',
          population: 7.6,
          background: '#dfc589',
          _type: 'sanity.imagePaletteSwatch',
        },
        _type: 'sanity.imagePalette',
        darkMuted: {
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 0.75,
          background: '#222a28',
        },
      },
      hasAlpha: false,
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgAD/8QAJBAAAgEDAwMFAAAAAAAAAAAAAQIEAAMREiExBRMVIiNRYZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEA//EABsRAAIDAAMAAAAAAAAAAAAAAAECAAMRExQh/9oADAMBAAIRAxEAPwBtK6QYt0JqAOMnfNZzIZi2e4cupIHpGT+Ujvi20pZLW1DEadvitWupJdvaQqu3HNB7tXumX4G2G/HuOI2fs1Uoguz2mYEAaiAMcVUpbFYAiHKkHJ//2Q==',
      dimensions: {
        _type: 'sanity.imageDimensions',
        width: 4018,
        aspectRatio: 1.332669983416252,
        height: 3015,
      },
      exif: {
        SensingMethod: 2,
        WhiteBalance: 0,
        ISO: 50,
        SubSecTimeDigitized: '032',
        ExposureProgram: 2,
        SubSecTimeOriginal: '032',
        LensModel: 'iPhone 12 Pro Max back camera 1.54mm f/2.4',
        ExposureMode: 0,
        _type: 'sanity.imageExifMetadata',
        ExposureBiasValue: 0,
        ColorSpace: 1,
        DateTimeDigitized: '2021-06-19T15:03:24.000Z',
        ShutterSpeedValue: 6.923840520748576,
        Flash: 16,
        LensSpecification: [1.5399999618512084, 1.5399999618512084, 2.4, 2.4],
        ExposureTime: 0.008264462809917356,
        LensMake: 'Apple',
        PixelXDimension: 4018,
        FocalLengthIn35mmFormat: 13,
        MeteringMode: 3,
        PixelYDimension: 3015,
        DateTimeOriginal: '2021-06-19T15:03:24.000Z',
        BrightnessValue: 6.030323507052961,
        ApertureValue: 2.5260689280130513,
        FocalLength: 1.5399999618512084,
        FNumber: 2.4,
      },
      isOpaque: true,
    },
  },
}

const photo1 = {
  asset: {
    _id: 'image-a5a7686d9de0362ca4ddaacdcfd061dd7afb89e7-4032x3024-jpg',
    metadata: {
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAcCAwUG/8QAIRAAAQMFAAIDAAAAAAAAAAAAAQIDBAAFBhESITEUcZH/xAAWAQEBAQAAAAAAAAAAAAAAAAAEAQL/xAAeEQACAQMFAAAAAAAAAAAAAAABAgADERIEFCFx8P/aAAwDAQACEQMRAD8A1MXv9yu61xnZMxltrx8jY19VZlFwvNqbUI0yfJVz0kpSNH8qOOYFJh24xHLu6kFWwOd7roTjF6ZicMXFCyBpKlD1WUqs9PHKF2/N4pFZE++ornyZjcj0pJB8UUypmDMyXQ7KkIL5SOzyfJooRdlNhc+7lOnJn//Z',
      dimensions: {
        width: 4032,
        aspectRatio: 1.3333333333333333,
        height: 3024,
        _type: 'sanity.imageDimensions',
      },
      exif: {
        SubSecTimeOriginal: '014',
        PixelXDimension: 4032,
        ExposureProgram: 1,
        Flash: 16,
        FocalLength: 7.5,
        ExposureBiasValue: -0.13671875,
        DateTimeDigitized: '2022-06-05T14:44:26.000Z',
        MeteringMode: 5,
        SceneCaptureType: 0,
        LensModel: 'iPhone 12 Pro Max back camera 7.5mm f/2.2',
        SensingMethod: 2,
        ApertureValue: 2.275007048020513,
        LensMake: 'Apple',
        FocalLengthIn35mmFormat: 64,
        ExposureMode: 1,
        ExposureTime: 0.000088999644001424,
        ColorSpace: 1,
        DateTimeOriginal: '2022-06-05T14:44:26.000Z',
        WhiteBalance: 0,
        PixelYDimension: 3024,
        ISO: 160,
        FNumber: 2.2,
        SubSecTimeDigitized: '014',
        BrightnessValue: 9.892831412103746,
        ShutterSpeedValue: 13.455835145490317,
        _type: 'sanity.imageExifMetadata',
        LensSpecification: [7.5, 7.5, 2.2, 2.2],
      },
      isOpaque: true,
      blurHash: 'VSHCo:o#DhRiR$AKxve-oJj^_4kCxuogjsWIRjt8tSRi',
      _type: 'sanity.imageMetadata',
      palette: {
        dominant: {
          background: '#b4d6f3',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#000',
          population: 7.86,
        },
        _type: 'sanity.imagePalette',
        darkMuted: {
          population: 7.55,
          background: '#577338',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
        },
        muted: {
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 1.61,
          background: '#54869d',
        },
        lightVibrant: {
          background: '#b4d6f3',
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#000',
          population: 7.86,
        },
        darkVibrant: {
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#fff',
          title: '#fff',
          population: 0.71,
          background: '#52710e',
        },
        lightMuted: {
          foreground: '#000',
          title: '#fff',
          population: 0.5,
          background: '#a7cecc',
          _type: 'sanity.imagePaletteSwatch',
        },
        vibrant: {
          _type: 'sanity.imagePaletteSwatch',
          foreground: '#000',
          title: '#fff',
          population: 0.01,
          background: '#9ec445',
        },
      },
      hasAlpha: false,
    },
  },
}

export default function MainMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group/prop bg-transparent hover:bg-transparent hover:text-white data-[state=open]:bg-transparent focus:bg-transparent focus:text-white tracking-widest">
            <span className="relative">
              PROPERTY
              <span className="ease absolute -bottom-2 left-0 h-0 w-0 border-b border-white transition-all duration-200 group-hover/prop:w-full"></span>
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Img
                      className="overflow-hidden rounded-[3px]"
                      image={aboutImage}
                      alt="Property"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">About</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Lakefront home with private dock, hot tub, and stunning
                      lake views. Our home is perfect for groups looking for a
                      relaxing and fun getaway.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/docs/installation" title="Amenities">
                All the amenities you need for a comfortable stay.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Location">
                Located in in Deerfield Resort centered on Norris Lake.
              </ListItem>
              <ListItem href="/docs" title="Photos">
                See the property and all it has to offer.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Reviews">
                Our guests love sharing their experience at our property.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group/lake bg-transparent hover:bg-transparent hover:text-white data-[state=open]:bg-transparent focus:bg-transparent focus:text-white tracking-widest">
            <span className="relative">
              LAKE
              <span className="ease absolute -bottom-2 left-0 h-0 w-0 border-b border-white transition-all duration-200 group-hover/lake:w-full"></span>
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Img
                      className="overflow-hidden rounded-[3px]"
                      image={norrisLakeImage}
                      alt="Property"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Norris Lake
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Known for its clear waters and abundant wildlife, Norris
                      Lake is a popular destination for water sports and
                      fishing.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/docs/installation" title="Photos">
                See the beauty of Norris Lake. From clear water to mountain
                scenes.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Things To Do">
                Find out what activities you can do on and around the lake.
              </ListItem>
              <ListItem href="/docs" title="Marinas">
                Known for the best marinas in TN, you are sure to find what you
                need.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Rentals">
                Rent boats, jet skis, paddle boards, golf carts, and more.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group/photos bg-transparent hover:bg-transparent hover:text-white data-[state=open]:bg-transparent focus:bg-transparent focus:text-white tracking-widest">
            <span className="relative">
              PHOTOS
              <span className="ease absolute -bottom-2 left-0 h-0 w-0 border-b border-white transition-all duration-200 group-hover/photos:w-full"></span>
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <div className="flex h-full space-y-8 w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <a href="/">
                      <Img
                        className="overflow-hidden rounded-[3px]"
                        image={photo1}
                        alt="Property"
                      />
                    </a>
                    <a href="/">
                      <Img
                        className="overflow-hidden rounded-[3px]"
                        image={photo2}
                        alt="Property"
                      />
                    </a>
                    <div className="mb-2 mt-4 text-lg font-medium text-center">
                      <Button variant="ghost" size="sm">
                        <Link href="/docs">View All</Link>
                      </Button>
                    </div>
                  </div>
                </NavigationMenuLink>
              </li>

              <ListItem href="/docs/installation" title="Interior">
                See the beauty of Norris Lake. From clear water to mountain
                scenes.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Exterior">
                Find out what activities you can do on and around the lake.
              </ListItem>
              <ListItem href="/docs" title="Property">
                Known for the best marinas in TN, you are sure to find what you
                need.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Lake">
                Rent boats, jet skis, paddle boards, golf carts, and more.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="group/contact bg-transparent hover:bg-transparent hover:text-white data-[state=open]:bg-transparent focus:bg-transparent focus:text-white tracking-widest text-sm px-4 py-2 inline-flex h-10 items-center">
              <span className="relative">
                CONTACT
                <span className="ease absolute -bottom-2 left-0 h-0 w-0 border-b border-white transition-all duration-200 group-hover/contact:w-full"></span>
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
