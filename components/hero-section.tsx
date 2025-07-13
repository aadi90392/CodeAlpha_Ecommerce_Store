"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    title: "Redefine Your Style",
    subtitle: "Elegance in Every Thread",
    description:
      "Discover our meticulously curated collection of luxury fashion and accessories, designed to elevate your presence.",
    image:
      "https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?semt=ais_hybrid&w=740",
    cta: "Shop Collection",
    link: "/products?category=fashion",
  },
  {
    id: 2,
    title: "Innovation Meets Elegance",
    subtitle: "Future-Forward Technology",
    description:
      "Experience the seamless integration of cutting-edge technology with sophisticated design, crafted for the modern connoisseur.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "Explore Tech",
    link: "/products?category=electronics",
  },
  {
    id: 3,
    title: "Luxury Redefined",
    subtitle: "Exquisite Living Spaces",
    description:
      "Immerse yourself in a world of unparalleled luxury with our hand-picked selection of premium home and lifestyle products.",
    image:
      "https://media.istockphoto.com/id/1412618477/photo/woman-choosing-what-to-wear.jpg?s=612x612&w=0&k=20&c=49rb9-kNUOMkIHBdMWATwQVStnzg9FohegnPpAt884s=",
    cta: "Discover Luxury",
    link: "/products?category=home",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.6) contrast(1.1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          </div>

          {/* Content */}
          <div className="relative z-20 flex items-center justify-center h-full">
            <div className="text-center text-white max-w-5xl px-6">
              <div className="mb-6 inline-block animate-fade-in-up">
                <span className="px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 tracking-wider uppercase">
                  {slide.subtitle}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight animate-fade-in-up animation-delay-200">
                <span className="bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
                  {slide.title}
                </span>
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-400">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Link href={slide.link}>
                    {slide.cta}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg font-semibold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Watch Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide ? "w-12 h-3 bg-white shadow-lg" : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 hidden md:block"
      >
        <ArrowRight className="h-6 w-6 rotate-180" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 hidden md:block"
      >
        <ArrowRight className="h-6 w-6" />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
