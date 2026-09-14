import type { Metadata, Viewport } from "next"
import { DM_Sans, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })

export const metadata: Metadata = {
  title: { default: "VastrAI Studio", template: "%s · VastrAI Studio" },
  description: "Create premium product visuals for your ethnic-wear business.",
}

export const viewport: Viewport = { themeColor: "#fbfaf7", userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${dmSans.variable}`}>{children}</body></html>
}
