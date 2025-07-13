import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import CategoryShowcase from "@/components/category-showcase"
import NewsletterSection from "@/components/newsletter-section"
import ValuePropositionSection from "@/components/value-proposition-section" // New component
import CallToActionBanner from "@/components/call-to-action-banner" // New component
import LoadingSpinner from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValuePropositionSection />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts />
      </Suspense>
      <CategoryShowcase />
      <CallToActionBanner />
      <NewsletterSection />
    </main>
  )
}
