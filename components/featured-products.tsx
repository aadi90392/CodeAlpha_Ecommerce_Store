import Link from "next/link"
import { Suspense } from "react"
import FeaturedProductsClientComponent, { type Product } from "@/components/featured-products-client"
import LoadingSpinner from "@/components/loading-spinner"

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side
    return ""
  }
  // Server-side
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return `http://localhost:${process.env.PORT || 3000}`
}

const BASE_URL = getBaseUrl()

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/products/featured`, {
      cache: "no-store", // Or use next: { revalidate: 60 } if you prefer
    })

    if (!res.ok) {
      console.error(`Failed to fetch featured products: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    if (Array.isArray(data.products)) {
      return data.products as Product[]
    } else {
      console.error("Featured products API did not return an array:", data)
      return []
    }
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products that define luxury and innovation.
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProductsClientComponent products={products} />
        </Suspense>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 text-lg border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
