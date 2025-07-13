"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Sparkles, Calendar } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useFavorites } from "@/hooks/use-favorites"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/loading-spinner"

interface NewProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  arrivalDate: string
  isNew: boolean
  isTrending: boolean
}

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<NewProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "week" | "month">("all")
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchNewArrivals()
  }, [])

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch("/api/new-arrivals")
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Failed to fetch new arrivals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: NewProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleFavorite = (product: NewProduct) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to favorites.",
        variant: "destructive",
      })
      return
    }

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
      })
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
      })
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      })
    }
  }

  const getFilteredProducts = () => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    switch (filter) {
      case "week":
        return products.filter((product) => new Date(product.arrivalDate) >= oneWeekAgo)
      case "month":
        return products.filter((product) => new Date(product.arrivalDate) >= oneMonthAgo)
      default:
        return products
    }
  }

  const filteredProducts = getFilteredProducts()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">New Arrivals</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest additions to our premium collection. Fresh styles, innovative designs, and trending
            products.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: "all", label: "All New", icon: Sparkles },
              { key: "week", label: "This Week", icon: Calendar },
              { key: "month", label: "This Month", icon: Calendar },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "default" : "ghost"}
                onClick={() => setFilter(tab.key as any)}
                className="px-6 flex items-center space-x-2"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
                  {product.isNew && <Badge className="bg-green-500 text-white font-semibold">NEW</Badge>}
                  {product.isTrending && <Badge className="bg-purple-500 text-white font-semibold">TRENDING</Badge>}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </button>

                {/* Arrival Date */}
                <div className="absolute bottom-3 left-3 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Added {new Date(product.arrivalDate).toLocaleDateString()}
                </div>

                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                {/* Category */}
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button onClick={() => handleAddToCart(product)} className="w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No new arrivals found for the selected period.</p>
            <Button asChild className="mt-4">
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
