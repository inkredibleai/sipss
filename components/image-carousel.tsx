'use client'

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getActiveCarouselImages } from "@/lib/supabase/carousel-queries"
import { cn } from "@/lib/utils"
import type { CarouselImage } from "@/lib/supabase/types"

export default function ImageCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    if (images.length === 0) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [images.length])

  async function loadImages() {
    try {
      const data = await getActiveCarouselImages()
      setImages(data)
    } catch (error) {
      console.error("Error loading carousel images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextSlide = () => {
    if (isTransitioning || images.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex((current) => (current + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning || images.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex((current) => (current - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  if (isLoading) {
    return (
      <div className="relative aspect-[21/9] w-full bg-gray-200 animate-pulse rounded-xl" />
    )
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden group">
      {/* Main Image */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isTransitioning ? "opacity-50" : "opacity-100"
        )}
      >
        <Image
          src={images[currentIndex].image_url}
          alt={images[currentIndex].alt_text}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{images[currentIndex].title}</h3>
        <p className="text-sm opacity-90">{images[currentIndex].caption}</p>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                )}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true)
                    setCurrentIndex(index)
                    setTimeout(() => setIsTransitioning(false), 500)
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
