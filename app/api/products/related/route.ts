import { type NextRequest, NextResponse } from "next/server"

// Mock related products with real images
const relatedProducts = [
  {
    id: "3",
    name: "Smart Home Hub",
    price: 199,
    rating: 4.6,
    reviews: 634,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=90",
  },
  {
    id: "6",
    name: "Professional Camera Kit",
    price: 899,
    rating: 4.8,
    reviews: 789,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=90",
  },
  {
    id: "7",
    name: "Fitness Tracker Pro",
    price: 249,
    rating: 4.5,
    reviews: 1123,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=90",
  },
  {
    id: "9",
    name: "Gaming Mechanical Keyboard",
    price: 179,
    rating: 4.7,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=90",
  },
  {
    id: "11",
    name: "Wireless Charging Station",
    price: 89,
    rating: 4.5,
    reviews: 445,
    image:
      "https://images.unsplash.com/photo-1609592806596-4d8b5b5e7e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=90",
  },
  {
    id: "12",
    name: "Minimalist Desk Lamp",
    price: 159,
    rating: 4.6,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=90",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const excludeId = searchParams.get("exclude")

    // Filter out the current product and limit to 4 items
    let filtered = relatedProducts.filter((product) => product.id !== excludeId)

    // In a real app, you'd filter by category more intelligently
    // For demo, we'll just return the first 4 products
    filtered = filtered.slice(0, 4)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json({
      success: true,
      products: filtered,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch related products" }, { status: 500 })
  }
}
