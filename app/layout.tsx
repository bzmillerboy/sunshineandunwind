import 'tailwindcss/tailwind.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, Roboto_Flex } from 'next/font/google'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${robotoFlex.variable} ${sans.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
      {/* Only include script if in production */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <SpeedInsights />
          <Analytics />
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K9VTKVQ'}
            preview={process.env.NEXT_PUBLIC_GTM_PREVIEW}
            auth={process.env.NEXT_PUBLIC_GTM_AUTH}
          />
        </>
      )}
    </html>
  )
}
