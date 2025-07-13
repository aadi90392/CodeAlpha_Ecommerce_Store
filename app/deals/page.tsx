"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Clock, Flame } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useFavorites } from "@/hooks/use-favorites"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/loading-spinner"

interface DealProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  category: string
  dealType: "flash" | "daily" | "weekly"
  timeLeft?: string
  soldCount: number
  totalStock: number
}

export default function DealsPage() {
  const [deals, setDeals] = useState<DealProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "flash" | "daily" | "weekly">("all")
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const response = await fetch("/api/deals")
      const data = await response.json()
      setDeals(data.deals || [])
    } catch (error) {
      console.error("Failed to fetch deals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: DealProduct) => {
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

  const toggleFavorite = (product: DealProduct) => {
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

  const filteredDeals = filter === "all" ? deals : deals.filter((deal) => deal.dealType === filter)

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-8 w-8 text-red-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Hot Deals</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these incredible offers! Limited time deals with massive savings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: "all", label: "All Deals" },
              { key: "flash", label: "Flash Sale" },
              { key: "daily", label: "Daily Deals" },
              { key: "weekly", label: "Weekly Offers" },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "default" : "ghost"}
                onClick={() => setFilter(tab.key as any)}
                className="px-6"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                {/* Deal Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge
                    className={`
                    ${deal.dealType === "flash" ? "bg-red-500" : ""}
                    ${deal.dealType === "daily" ? "bg-orange-500" : ""}
                    ${deal.dealType === "weekly" ? "bg-blue-500" : ""}
                    text-white font-semibold
                  `}
                  >
                    {deal.discount}% OFF
                  </Badge>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(deal)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`h-4 w-4 ${isFavorite(deal.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </button>

                {/* Timer for Flash Sales */}
                {deal.dealType === "flash" && deal.timeLeft && (
                  <div className="absolute bottom-3 left-3 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {deal.timeLeft}
                  </div>
                )}

                <Link href={`/products/${deal.id}`}>
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(deal)}
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
                          i < Math.floor(deal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({deal.reviews})</span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/products/${deal.id}`}>{deal.name}</Link>
                </h3>

                {/* Category */}
                <p className="text-sm text-gray-500 mb-3">{deal.category}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-red-600">${deal.price}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>
                </div>

                {/* Stock Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Sold: {deal.soldCount}</span>
                    <span>Available: {deal.totalStock - deal.soldCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.soldCount / deal.totalStock) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(deal)}
                  className="w-full"
                  disabled={deal.soldCount >= deal.totalStock}
                >
                  {deal.soldCount >= deal.totalStock ? "Sold Out" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No deals available at the moment.</p>
            <Button asChild className="mt-4">
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
