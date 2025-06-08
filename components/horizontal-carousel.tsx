"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getPublishedNews } from "@/lib/supabase/news-queries"
import type { News } from "@/lib/supabase/news-types"

export default function HorizontalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleItems, setVisibleItems] = useState(3) // Default to desktop

  useEffect(() => {
    // Function to determine visible items based on screen width
    const getItemsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) return 1 // Mobile
        if (window.innerWidth < 1024) return 2 // Tablet
      }
      return 3 // Desktop
    }

    // Set initial visible items
    setVisibleItems(getItemsPerView())

    // Update on resize
    const handleResize = () => {
      setVisibleItems(getItemsPerView())
      setCurrentIndex(0) // Reset index on resize to avoid layout issues
    }

    window.addEventListener("resize", handleResize)
    loadNews()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  async function loadNews() {
    try {
      const data = await getPublishedNews()
      setNews(data)
    } catch (error) {
      console.error("Error loading news:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextSlide = () => {
    if (news.length === 0 || news.length <= visibleItems) return
    setCurrentIndex((prevIndex) => (prevIndex >= news.length - visibleItems ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    if (news.length === 0 || news.length <= visibleItems) return
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? Math.max(0, news.length - visibleItems) : prevIndex - 1))
  }

  const goToSlide = (slideIndex: number) => {
    // slideIndex here refers to the index of the dot, which is the desired currentIndex
    if (news.length === 0) return
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    if (isAutoPlaying && news.length > visibleItems) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, currentIndex, news.length, visibleItems])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Achievement":
        return "bg-green-600"
      case "Event":
        return "bg-blue-600"
      case "Infrastructure":
        return "bg-purple-600"
      case "Technology":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading news...</div>
  }

  if (news.length === 0) {
    return <div className="p-8 text-center">No news articles available</div>
  }

  return (
    <div className="relative w-full">
      {/* Carousel Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Latest News & Updates</h3>
          <p className="text-gray-600">Stay informed about recent developments and achievements</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="h-10 w-10"
            disabled={news.length <= visibleItems}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="h-10 w-10"
            disabled={news.length <= visibleItems}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {news.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-3"
              style={{
                flexBasis: `calc(100% / ${visibleItems})`,
                minWidth: `calc(100% / ${visibleItems})`,
              }}>
              <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    width={350}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 left-4 text-white ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{item.read_time}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <Link href={`/news/${item.id}`} className="inline-block">
                    <Button variant="ghost" className="p-0 h-auto text-orange-600 hover:text-orange-700">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots - only show if there's more than one "page" */}
      {news.length > visibleItems && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: news.length - visibleItems + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-orange-600 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mt-4">
        <div
          className="bg-gradient-to-r from-orange-600 to-blue-600 h-1 rounded-full transition-all duration-300"
          style={{
            width: news.length > 0 ? `${Math.min(100, ((currentIndex + visibleItems) / news.length) * 100)}%` : '0%',
          }}
        />
      </div>
    </div>
  )
}
