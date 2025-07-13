import { NextResponse } from "next/server"

// Mock deals data with real images
const dealsData = [
  {
    id: "deal1",
    name: "Premium Wireless Headphones",
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.8,
    reviews: 1247,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Electronics",
    dealType: "flash",
    timeLeft: "2h 15m",
    soldCount: 45,
    totalStock: 100,
  },
  {
    id: "deal2",
    name: "Designer Leather Jacket",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.9,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Fashion",
    dealType: "daily",
    soldCount: 23,
    totalStock: 50,
  },
  {
    id: "deal3",
    name: "Smart Home Hub",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.6,
    reviews: 634,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    category: "Electronics",
    dealType: "weekly",
    soldCount: 67,
    totalStock: 150,
  },
  {
    id: "deal4",
    name: "Fitness Tracker Pro",
    price: 179,
    originalPrice: 249,
    discount: 28,
    rating: 4.5,
    reviews: 1123,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
    category: "Sports & Fitness",
    dealType: "flash",
    timeLeft: "5h 42m",
    soldCount: 89,
    totalStock: 120,
  },
  {
    id: "deal5",
    name: "Modern Coffee Table",
    price: 299,
    originalPrice: 449,
    discount: 33,
    rating: 4.7,
    reviews: 321,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
    category: "Home & Living",
    dealType: "daily",
    soldCount: 12,
    totalStock: 30,
  },
  {
    id: "deal6",
    name: "Professional Camera Kit",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.8,
    reviews: 789,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    category: "Electronics",
    dealType: "weekly",
    soldCount: 34,
    totalStock: 75,
  },
  {
    id: "deal7",
    name: "Luxury Watch Collection",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.9,
    reviews: 456,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
    category: "Fashion",
    dealType: "flash",
    timeLeft: "1h 30m",
    soldCount: 18,
    totalStock: 40,
  },
  {
    id: "deal8",
    name: "Gaming Mechanical Keyboard",
    price: 129,
    originalPrice: 179,
    discount: 28,
    rating: 4.7,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Electronics",
    dealType: "weekly",
    soldCount: 56,
    totalStock: 80,
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      deals: dealsData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch deals" }, { status: 500 })
  }
}
