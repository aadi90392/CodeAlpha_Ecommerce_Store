import { NextResponse } from "next/server"

// Mock featured products data with ultra-high quality 4K images
const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Electronics",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Designer Leather Jacket",
    price: 599,
    rating: 4.9,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Fashion",
  },
  {
    id: "3",
    name: "Smart Home Hub",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    reviews: 634,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    category: "Electronics",
    badge: "New",
  },
  {
    id: "4",
    name: "Luxury Watch Collection",
    price: 1299,
    rating: 4.9,
    reviews: 456,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
    category: "Fashion",
  },
  {
    id: "5",
    name: "Modern Coffee Table",
    price: 449,
    rating: 4.7,
    reviews: 321,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
    category: "Home & Living",
  },
  {
    id: "6",
    name: "Professional Camera Kit",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 789,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    category: "Electronics",
    badge: "Limited",
  },
  {
    id: "7",
    name: "Fitness Tracker Pro",
    price: 249,
    rating: 4.5,
    reviews: 1123,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
    category: "Sports & Fitness",
  },
  {
    id: "8",
    name: "Artisan Ceramic Vase",
    price: 129,
    rating: 4.6,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Home & Living",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      products: featuredProducts,
    })
  } catch (error) {
    console.error("Featured products API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured products",
        products: [],
      },
      { status: 500 },
    )
  }
}
