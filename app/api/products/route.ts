import { type NextRequest, NextResponse } from "next/server"

// Mock products database with ultra-high quality images
const allProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "electronics",
    badge: "Best Seller",
    description:
      "Experience superior sound quality with our premium wireless headphones featuring noise cancellation and 30-hour battery life.",
  },
  {
    id: "2",
    name: "Designer Leather Jacket",
    price: 599,
    rating: 4.9,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "fashion",
    description: "Handcrafted genuine leather jacket with premium finishing and timeless design.",
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
    category: "electronics",
    badge: "New",
    description:
      "Control your entire smart home ecosystem with this advanced hub featuring voice control and app integration.",
  },
  {
    id: "4",
    name: "Luxury Watch Collection",
    price: 1299,
    rating: 4.9,
    reviews: 456,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
    category: "fashion",
    description: "Swiss-made luxury timepiece with automatic movement and sapphire crystal.",
  },
  {
    id: "5",
    name: "Modern Coffee Table",
    price: 449,
    rating: 4.7,
    reviews: 321,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
    category: "home",
    description: "Sleek modern coffee table crafted from sustainable materials with hidden storage.",
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
    category: "electronics",
    badge: "Limited",
    description: "Complete professional photography kit with 4K video recording and multiple lens options.",
  },
  {
    id: "7",
    name: "Fitness Tracker Pro",
    price: 249,
    rating: 4.5,
    reviews: 1123,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
    category: "sports",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
  },
  {
    id: "8",
    name: "Artisan Ceramic Vase",
    price: 129,
    rating: 4.6,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "home",
    description: "Handcrafted ceramic vase with unique glazing technique, perfect for modern interiors.",
  },
  {
    id: "9",
    name: "Gaming Mechanical Keyboard",
    price: 179,
    rating: 4.7,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "electronics",
    description: "RGB backlit mechanical keyboard with custom switches for ultimate gaming performance.",
  },
  {
    id: "10",
    name: "Organic Cotton T-Shirt",
    price: 49,
    rating: 4.4,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "fashion",
    description: "Sustainably made organic cotton t-shirt with perfect fit and premium comfort.",
  },
  {
    id: "11",
    name: "Wireless Charging Station",
    price: 89,
    rating: 4.5,
    reviews: 445,
    image:
      "https://images.unsplash.com/photo-1609592806596-4d8b5b5e7e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "electronics",
    description: "Multi-device wireless charging station with fast charging capabilities.",
  },
  {
    id: "12",
    name: "Minimalist Desk Lamp",
    price: 159,
    rating: 4.6,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    category: "home",
    description: "Sleek LED desk lamp with adjustable brightness and modern design.",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category") || ""
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "10000")
    const minRating = Number.parseInt(searchParams.get("minRating") || "0")
    const sortBy = searchParams.get("sortBy") || "featured"
    const search = searchParams.get("search") || ""

    console.log("Products API called with params:", { category, minPrice, maxPrice, minRating, sortBy, search })

    const filteredProducts = allProducts.filter((product) => {
      const matchesCategory = !category || product.category === category
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice
      const matchesRating = product.rating >= minRating
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesPrice && matchesRating && matchesSearch
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // For demo, we'll reverse the order
        filteredProducts.reverse()
        break
      default:
        // Featured - keep original order
        break
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    console.log("Returning products:", filteredProducts.length)

    return NextResponse.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        products: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}
