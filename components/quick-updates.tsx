"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, Pause, Play } from "lucide-react"

import { getQuickUpdates } from "@/lib/supabase/queries"
import type { QuickUpdate } from "@/lib/supabase/types"

// Type badge mapping
const typeBadgeMap = {
  admission: { label: "Admission", className: "bg-red-100 text-red-800 hover:bg-red-200" },
  course: { label: "Course", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  scholarship: { label: "Scholarship", className: "bg-green-100 text-green-800 hover:bg-green-200" },
  facility: { label: "Facility", className: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
  announcement: { label: "Announcement", className: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
}

export default function QuickUpdates() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [updates, setUpdates] = useState<QuickUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)
  const autoScrollInterval = useRef(null)

  // Fetch quick updates
  useEffect(() => {
    async function loadUpdates() {
      try {
        const updatesData = await getQuickUpdates()
        setUpdates(updatesData)
      } catch (error) {
        console.error("Error loading quick updates:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadUpdates()
  }, [])

  // Auto-scroll updates
  useEffect(() => {
    if (!isPaused && !isHovered) {
      autoScrollInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length)
        setAnimationKey((prev) => prev + 1)
      }, 5000)
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current)
      }
    }
  }, [isPaused, isHovered, updates.length])

  // Handle next update
  const handleNextUpdate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length)
    setAnimationKey((prev) => prev + 1)
  }

  // Handle previous update
  const handlePrevUpdate = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + updates.length) % updates.length)
    setAnimationKey((prev) => prev + 1)
  }

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className="py-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Quick Updates</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePause} className="h-8 w-8 rounded-full">
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <div className="flex gap-1">
              {updates.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 p-0 rounded-full ${
                    currentIndex === index ? "bg-orange-500" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <span className="sr-only">Go to update {index + 1}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <Card
            ref={containerRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-0">
              <div className="relative h-[120px] overflow-hidden">
                {updates.map((update, index) => (
                  <div
                    key={`${update.id}-${animationKey}`}
                    className={`absolute inset-0 p-4 transition-all duration-500 ease-in-out transform ${
                      index === currentIndex
                        ? "translate-y-0 opacity-100"
                        : index < currentIndex
                          ? "-translate-y-full opacity-0"
                          : "translate-y-full opacity-0"
                    }`}
                    style={{
                      transitionProperty: "transform, opacity",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={typeBadgeMap[update.type]?.className || "bg-gray-100"}>
                            {typeBadgeMap[update.type]?.label || update.type}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {new Date(update.created_at).toLocaleDateString()}
                            </span>
                            {update.priority === "high" && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">
                                High Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium text-gray-900">{update.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{update.description}</p>
                          {update.link_url && (
                            <a href={update.link_url} className="text-sm text-blue-600 hover:underline">
                              Learn More
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevUpdate}
              className="h-8 w-8 rounded-full bg-white/80 shadow-sm pointer-events-auto hover:bg-white"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextUpdate}
              className="h-8 w-8 rounded-full bg-white/80 shadow-sm pointer-events-auto hover:bg-white"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
