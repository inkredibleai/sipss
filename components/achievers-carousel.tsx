"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trophy, Star, GraduationCap } from "lucide-react"
import Image from "next/image"
import type { Achiever } from "@/lib/supabase/types"

interface AchieversCarouselProps {
  achievers: (Achiever & { institutions?: { name: string; code: string } })[]
}

const categoryLabels = {
  board_10: "Class 10 Board",
  board_12: "Class 12 Board",
  iit_jee: "IIT JEE",
  neet: "NEET",
  sainik_school: "Sainik School",
  olympiad: "Olympiad",
  other: "Other",
}

const categoryColors = {
  board_10: "bg-blue-100 text-blue-800",
  board_12: "bg-green-100 text-green-800",
  iit_jee: "bg-purple-100 text-purple-800",
  neet: "bg-red-100 text-red-800",
  sainik_school: "bg-orange-100 text-orange-800",
  olympiad: "bg-yellow-100 text-yellow-800",
  other: "bg-gray-100 text-gray-800",
}

export function AchieversCarousel({ achievers }: AchieversCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  if (!achievers.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No achievers found.</p>
      </div>
    )
  }

  const totalPages = Math.ceil(achievers.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentAchievers = achievers.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentAchievers.map((achiever) => (
          <Card key={achiever.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={achiever.photo_url || "/placeholder.svg?height=64&width=64"}
                    alt={achiever.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{achiever.name}</h3>
                  <p className="text-sm text-gray-600">Class {achiever.class}</p>
                  {achiever.institutions && <p className="text-xs text-gray-500">{achiever.institutions.name}</p>}
                </div>
                {achiever.featured && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
              </div>

              <div className="space-y-3">
                <Badge className={categoryColors[achiever.category]}>{categoryLabels[achiever.category]}</Badge>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">{achiever.achievement}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{achiever.exam_cleared}</span>
                  </div>

                  {achiever.percentage && (
                    <div className="text-sm">
                      <span className="font-medium">Percentage: </span>
                      <span className="text-green-600">{achiever.percentage}%</span>
                    </div>
                  )}

                  {achiever.rank && (
                    <div className="text-sm">
                      <span className="font-medium">Rank: </span>
                      <span className="text-blue-600">AIR {achiever.rank}</span>
                    </div>
                  )}
                </div>

                {achiever.description && <p className="text-sm text-gray-600 line-clamp-2">{achiever.description}</p>}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">Year {achiever.year}</span>
                  <Badge variant="outline" className="text-xs">
                    {achiever.category.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={nextSlide} disabled={currentIndex === totalPages - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
