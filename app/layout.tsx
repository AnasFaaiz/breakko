import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Breakko - Personal Digital Notice Board",
  description:
    "Display your current status with style. A clean, minimalist personal notice board for effective communication.",
  generator: "Breakko",
  keywords: ["status", "notice board", "personal", "digital", "breakko", "status board", "communication", "minimalist"],
  authors: [{ name: "Breakko Team" }],
  creator: "Breakko",
  publisher: "Breakko",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://breakko.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Breakko - Personal Digital Notice Board",
    description:
      "Display your current status with style. A clean, minimalist personal notice board for effective communication.",
    url: "/",
    siteName: "Breakko",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Breakko - Personal Digital Notice Board",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breakko - Personal Digital Notice Board",
    description:
      "Display your current status with style. A clean, minimalist personal notice board for effective communication.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Breakko",
              description: "Personal Digital Notice Board for displaying your current status",
              url: process.env.NEXT_PUBLIC_BASE_URL || "https://breakko.com",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "2.00",
                priceCurrency: "USD",
                priceValidUntil: "2025-12-31",
                description: "Premium subscription for ad-free experience",
              },
              author: {
                "@type": "Organization",
                name: "Breakko Team",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
