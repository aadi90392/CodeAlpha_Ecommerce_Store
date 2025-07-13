import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/hooks/use-cart"
import { AuthProvider } from "@/hooks/use-auth"
import { FavoritesProvider } from "@/hooks/use-favorites"
import { Toaster } from "@/components/ui/toaster"
import AuthGuard from "@/components/auth-guard"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LuxeMart - Premium E-commerce Experience",
  description:
    "Discover luxury products with exceptional quality and design. Shop electronics, fashion, home decor, and more.",
  keywords: "luxury shopping, premium products, electronics, fashion, home decor",
  authors: [{ name: "LuxeMart Team" }],
  openGraph: {
    title: "LuxeMart - Premium E-commerce Experience",
    description: "Discover luxury products with exceptional quality and design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeMart - Premium E-commerce Experience",
    description: "Discover luxury products with exceptional quality and design.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <AuthGuard>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </AuthGuard>
              <Toaster />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
