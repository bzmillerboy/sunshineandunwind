import '@/styles/global.css'

import { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import Providers from '@/app/providers'
import { Footer } from '@/components/global/Footer'
import { Header } from '@/components/global/Header'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadSettings } from '@/sanity/loader/loadQuery'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  // const [{ data: settings }] = await Promise.all([loadSettings()])
  const ogImage =
    'https://cdn.sanity.io/images/qofrw2r7/production/a5a7686d9de0362ca4ddaacdcfd061dd7afb89e7-4032x3024.jpg'
  const title = 'Sunshine & Unwind'
  const description =
    'Sunshine & Unwind is an authorized Sany Heavy Equipment dealership with over 40 years of experience in the heavy equipment sales and rental industry.'
  const url = 'https://www.sunshineandunwind.com'

  return {
    metadataBase: new URL(url),
    title: {
      template: `%s | ${title}`,
      default: 'Sunshine & Unwind', // a default is required when creating a template
    },
    description: description,
    openGraph: {
      url: url,
      siteName: 'Sunshine & Unwind', //settings?.siteName,
      images: ogImage ? [ogImage] : [],
      locale: 'en_US',
      type: 'website',
    },
    keywords: ['vacation rental', 'lake house', 'norris lake'],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Providers>{children}</Providers>
      <Footer />
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  )
}
