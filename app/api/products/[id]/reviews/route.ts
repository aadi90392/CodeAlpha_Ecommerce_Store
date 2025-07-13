import { type NextRequest, NextResponse } from "next/server"

// Mock reviews data with user avatars - expanded for all products
const reviewsData = {
  "1": [
    {
      id: "r1",
      userId: "u1",
      userName: "Sarah Johnson",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      title: "Exceptional Sound Quality",
      comment:
        "These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. Perfect for long flights and daily commuting.",
      date: "2024-01-15",
      helpful: 24,
      notHelpful: 2,
      verified: true,
    },
    {
      id: "r2",
      userId: "u2",
      userName: "Mike Chen",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4,
      title: "Great for the Price",
      comment:
        "Really solid headphones with good build quality. The sound is crisp and clear. Only minor complaint is they can get a bit warm during extended use.",
      date: "2024-01-10",
      helpful: 18,
      notHelpful: 1,
      verified: true,
    },
    {
      id: "r3",
      userId: "u3",
      userName: "Emily Rodriguez",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 5,
      title: "Perfect for Work From Home",
      comment:
        "The noise cancellation is a game-changer for video calls. My colleagues say my voice comes through crystal clear, and I can focus better with the ambient noise blocked out.",
      date: "2024-01-08",
      helpful: 31,
      notHelpful: 0,
      verified: true,
    },
  ],
  "2": [
    {
      id: "r4",
      userId: "u4",
      userName: "David Wilson",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 5,
      title: "Premium Quality Leather",
      comment:
        "This jacket is absolutely beautiful. The leather is soft yet durable, and the craftsmanship is evident in every stitch. Worth every penny.",
      date: "2024-01-12",
      helpful: 19,
      notHelpful: 1,
      verified: true,
    },
    {
      id: "r5",
      userId: "u5",
      userName: "Lisa Thompson",
      userAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      rating: 4,
      title: "Stylish and Well-Made",
      comment:
        "Love the classic design and the fit is perfect. The leather has a nice texture and the jacket feels substantial without being too heavy.",
      date: "2024-01-09",
      helpful: 15,
      notHelpful: 2,
      verified: true,
    },
  ],
  // Add default reviews for all other products
  default: [
    {
      id: "rd1",
      userId: "ud1",
      userName: "Alex Johnson",
      userAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4,
      title: "Great Product",
      comment:
        "Really happy with this purchase. Quality is excellent and delivery was fast. Would definitely recommend to others.",
      date: "2024-01-14",
      helpful: 12,
      notHelpful: 1,
      verified: true,
    },
    {
      id: "rd2",
      userId: "ud2",
      userName: "Maria Garcia",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      title: "Exceeded Expectations",
      comment:
        "This product is even better than I expected. The build quality is fantastic and it works perfectly. Very satisfied with my purchase.",
      date: "2024-01-11",
      helpful: 8,
      notHelpful: 0,
      verified: true,
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get("sort") || "newest"

    // Get reviews for the specific product, or use default reviews
    const reviews = reviewsData[productId as keyof typeof reviewsData] || reviewsData.default

    // Sort reviews
    switch (sortBy) {
      case "oldest":
        reviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "highest":
        reviews.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        reviews.sort((a, b) => a.rating - b.rating)
        break
      case "helpful":
        reviews.sort((a, b) => b.helpful - a.helpful)
        break
      default: // newest
        reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 })
  }
}
