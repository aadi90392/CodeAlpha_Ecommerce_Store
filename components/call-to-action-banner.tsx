import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CallToActionBanner() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1501127122-f385ca6ddd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="New Collection Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Discover Our Latest Collection</h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Be the first to explore new arrivals and exclusive designs. Limited stock available!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
        >
          <Link href="/new-arrivals">
            Shop Now
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
