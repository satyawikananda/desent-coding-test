import type { Metadata } from "next"
import { DM_Sans, Figtree, Geist_Mono } from "next/font/google"

import "@/styles/globals.css"

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontHeading = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "monis.rent workspace studio",
  description:
    "Design your workspace, rent the setup. monis.rent — Bali-based office equipment rental.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
