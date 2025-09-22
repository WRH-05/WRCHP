import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Noto_Serif_JP } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

// Kudryashev Display - for creative emphasis and display text
const kudryashevDisplay = localFont({
  src: [
    {
      path: "../public/fonts/kudryashev/fonnts.com-Kudryashev_Display_Contrast_Sans.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/kudryashev/fonnts.com-Kudryashev_Display_Extra_Contrast_Sans.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kudryashev-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

// Neue Haas Grotesk Display - for titles, body text, and general use
const neueHaasGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayXXThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayXXThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayXThin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayXThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayThin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayThinItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayLight.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayLightItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayRoman.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayRomanItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayMediu.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayMediumItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayBlack.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display/NeueHaasDisplayBlackItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-neue-haas-grotesk",
  display: "swap",
  fallback: ["helvetica", "arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: "CHROME - Wassim Rahim Hachemi",
  description:
    "Industrial Electronics Engineering Student & Developer - Portfolio showcasing electronics, robotics, AI/ML, and backend engineering projects.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/szu3akn.css" />
      </head>
      <body
        className={`${inter.variable} ${GeistMono.variable} ${notoSerifJP.variable} ${kudryashevDisplay.variable} ${neueHaasGrotesk.variable} antialiased`}
      >
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
