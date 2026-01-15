import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { siteConfig } from "@/lib/config"
import "./globals.css"

// Roboto - for titles and headings
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts - Georgia Pro */}
        <link rel="stylesheet" href="https://use.typekit.net/szu3akn.css" />
      </head>
      <body
        className={`${roboto.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
