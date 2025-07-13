"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  badge?: string
}

export default function FeaturedProductsClient({ products }: { products: Product[] }) {
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No featured products found at the moment.</p>
        <p className="text-gray-500 text-sm mt-2">Please check back later or browse other categories.</p>
      </div>
    )
  }

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      toast({ title: "Removed from favorites", description: `${product.name} removed from your favorites.` })
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
      })
      toast({ title: "Added to favorites", description: `${product.name} added to your favorites.` })
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
        >
          <div className="relative overflow-hidden aspect-square">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.badge}
                </span>
              </div>
            )}

            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300"
              aria-label={`Toggle favorite for ${product.name}`}
            >
              <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>

            <Link href={`/products/${product.id}`}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </Link>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button onClick={() => handleAddToCart(product)} className="bg-white text-gray-900 hover:bg-gray-100">
                <ShoppingCart className="h-4 w-4 mr-2" /> Quick Add
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex items-center mb-2">
              <div className="flex" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
            </div>

            <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-sm text-gray-500 mb-3">{product.category}</p>

            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
