import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import "./globals.css"

export const metadata: Metadata = {
  title: "54LIKE - 优质内容分享平台",
  description: "发现优质内容，分享知识与见解",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <SessionProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster position="top-center" richColors />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  )
}
