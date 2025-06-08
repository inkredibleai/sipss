"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, Calendar, ExternalLink, TrendingUp } from "lucide-react"
import { getQuickUpdates } from "@/lib/supabase/queries"
import { UpdateDetailModal } from "./update-detail-modal" // Import the modal
import type { QuickUpdate } from "@/lib/supabase/types"

type UpdateType = "admission" | "course" | "scholarship" | "facility" | "announcement"

const typeBadgeMap = {
  admission: { label: "Admission", className: "bg-red-100 text-red-800 hover:bg-red-200" } as const,
  course: { label: "Course", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" } as const,
  scholarship: { label: "Scholarship", className: "bg-green-100 text-green-800 hover:bg-green-200" } as const,
  facility: { label: "Facility", className: "bg-amber-100 text-amber-800 hover:bg-amber-200" } as const,
  announcement: { label: "Announcement", className: "bg-purple-100 text-purple-800 hover:bg-purple-200" } as const,
}

export default function VerticalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [updates, setUpdates] = useState<QuickUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUpdate, setSelectedUpdate] = useState<QuickUpdate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsVisible = 3

  useEffect(() => {
    async function loadUpdates() {
      try {
        const data = await getQuickUpdates()
        setUpdates(data)
      } catch (error) {
        console.error("Error loading updates:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadUpdates()
  }, [])

  const nextSlide = () => {
    if (isAnimating || updates.length <= itemsVisible) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      return nextIndex + itemsVisible > updates.length ? 0 : nextIndex
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating || updates.length <= itemsVisible) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1
      return nextIndex < 0 ? Math.max(0, updates.length - itemsVisible) : nextIndex
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    if (isAutoPlaying && !isAnimating && updates.length > itemsVisible) {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, currentIndex, isAnimating, updates.length])

  const handleReadMoreClick = (update: QuickUpdate) => {
    setSelectedUpdate(update)
    setIsModalOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-gradient-to-r from-red-50 to-white"
      case "medium":
        return "border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white"
      case "low":
        return "border-l-green-500 bg-gradient-to-r from-green-50 to-white"
      default:
        return "border-l-gray-500 bg-gradient-to-r from-gray-50 to-white"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "admission":
        return "🎓"
      case "course":
        return "📚"
      case "scholarship":
        return "💰"
      case "facility":
        return "🏢"
      case "announcement":
        return "📢"
      default:
        return "📋"
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading updates...</div>
  }

  if (updates.length === 0) {
    return <div className="p-8 text-center">No updates available</div>
  }

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <span className="w-1 h-1 bg-orange-500 rounded-full mr-1.5 animate-pulse"></span>
              Updates Feed
            </h3>
            <Badge variant="secondary" className="text-[10px]">{updates.length} updates</Badge>
          </div>
          <div className="flex gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="h-6 w-6 hover:bg-gray-100 transition-all duration-300"
              disabled={isAnimating || updates.length <= itemsVisible}
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="h-6 w-6 hover:bg-gray-100 transition-all duration-300"
              disabled={isAnimating || updates.length <= itemsVisible}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden h-[450px] rounded-lg"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex flex-col transition-all duration-500 ease-out will-change-transform"
            style={{
              transform: `translateY(-${currentIndex * (100 / Math.min(updates.length, itemsVisible))}%)`,
            }}
          >
            {updates.map((item, index) => (
              <div
                key={item.id}
                className={`flex-shrink-0 p-1.5 transition-all duration-500 ${
                  index >= currentIndex && index < currentIndex + itemsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                style={{ height: `${100 / Math.min(updates.length, itemsVisible)}%` }}
              >
                <Card
                  className={`group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-l-2 ${getPriorityColor(
                    item.priority
                  )} h-full hover:border-l-[3px]`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2.5">
                          <Badge
                            variant="secondary"
                            className={`text-[11px] px-2 py-0.5 font-medium ${
                              typeBadgeMap[item.type as UpdateType]?.className || ""
                            } group-hover:scale-105 transition-transform duration-300`}
                          >
                            <span className="mr-1.5">{getTypeIcon(item.type)}</span>
                            {typeBadgeMap[item.type as UpdateType]?.label || item.type}
                          </Badge>
                          {item.priority === "high" && (
                            <Badge 
                              variant="outline" 
                              className="text-[10px] px-1.5 py-0 text-red-500 border-red-200 gap-1.5 group-hover:bg-red-50 transition-colors duration-300"
                            >
                              <TrendingUp className="w-3 h-3" />
                              Priority
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-gray-500">
                          <div className="flex items-center gap-1.5 group-hover:text-gray-600 transition-colors duration-300">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>
                          {item.link_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-300 gap-1.5 group-hover:scale-105"
                              onClick={() => handleReadMoreClick(item)}
                            >
                                <span className="text-[11px]">View</span>
                                <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UpdateDetailModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} update={selectedUpdate} />
    </>
  )
}
