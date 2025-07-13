import { NextResponse } from "next/server"

// Mock new arrivals data with real images
const newArrivalsData = [
  {
    id: "new1",
    name: "Ultra-Slim Laptop Stand",
    price: 89,
    rating: 4.6,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    category: "Electronics",
    arrivalDate: "2024-01-20",
    isNew: true,
    isTrending: false,
  },
  {
    id: "new2",
    name: "Minimalist Desk Organizer",
    price: 45,
    rating: 4.4,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    category: "Home & Living",
    arrivalDate: "2024-01-18",
    isNew: true,
    isTrending: true,
  },
  {
    id: "new3",
    name: "Wireless Charging Pad",
    price: 39,
    originalPrice: 59,
    rating: 4.5,
    reviews: 445,
    image:
      "https://images.unsplash.com/photo-1609592806596-4d8b5b5e7e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Electronics",
    arrivalDate: "2024-01-15",
    isNew: true,
    isTrending: false,
  },
  {
    id: "new4",
    name: "Eco-Friendly Water Bottle",
    price: 29,
    rating: 4.7,
    reviews: 678,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
    category: "Sports & Fitness",
    arrivalDate: "2024-01-12",
    isNew: true,
    isTrending: true,
  },
  {
    id: "new5",
    name: "Bluetooth Noise-Canceling Earbuds",
    price: 129,
    originalPrice: 179,
    rating: 4.8,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    category: "Electronics",
    arrivalDate: "2024-01-10",
    isNew: true,
    isTrending: true,
  },
  {
    id: "new6",
    name: "Sustainable Bamboo Phone Case",
    price: 25,
    rating: 4.3,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Electronics",
    arrivalDate: "2024-01-08",
    isNew: true,
    isTrending: false,
  },
  {
    id: "new7",
    name: "Smart LED Strip Lights",
    price: 49,
    rating: 4.6,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    category: "Home & Living",
    arrivalDate: "2024-01-05",
    isNew: false,
    isTrending: true,
  },
  {
    id: "new8",
    name: "Portable Bluetooth Speaker",
    price: 79,
    rating: 4.5,
    reviews: 423,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Electronics",
    arrivalDate: "2024-01-03",
    isNew: false,
    isTrending: false,
  },
  {
    id: "new9",
    name: "Premium Yoga Mat",
    price: 69,
    rating: 4.7,
    reviews: 345,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
    category: "Sports & Fitness",
    arrivalDate: "2024-01-01",
    isNew: false,
    isTrending: true,
  },
  {
    id: "new10",
    name: "Artisan Coffee Mug Set",
    price: 55,
    rating: 4.5,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Home & Living",
    arrivalDate: "2023-12-28",
    isNew: false,
    isTrending: false,
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      products: newArrivalsData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch new arrivals" }, { status: 500 })
  }
}
