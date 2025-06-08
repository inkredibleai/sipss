"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Eye,
  Calendar,
  Filter,
} from "lucide-react"
import Image from "next/image"

interface MediaItem {
  id: number
  type: "image" | "video"
  title: string
  description: string
  url: string
  thumbnail: string
  category: string
  date: string
  views: number
  likes: number
  duration?: string
}

const mediaData: MediaItem[] = [
  {
    id: 1,
    type: "image",
    title: "Annual Day Celebration 2024",
    description: "Students performing cultural dance during annual day celebration",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Events",
    date: "2024-03-15",
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    type: "video",
    title: "Campus Tour - Virtual Walkthrough",
    description: "Complete virtual tour of our modern campus facilities",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Campus",
    date: "2024-03-12",
    views: 3420,
    likes: 156,
    duration: "5:32",
  },
  {
    id: 3,
    type: "image",
    title: "Science Laboratory",
    description: "State-of-the-art chemistry laboratory with modern equipment",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Facilities",
    date: "2024-03-10",
    views: 890,
    likes: 67,
  },
  {
    id: 4,
    type: "video",
    title: "Student Success Stories",
    description: "Alumni sharing their journey and achievements",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Alumni",
    date: "2024-03-08",
    views: 2150,
    likes: 203,
    duration: "8:45",
  },
  {
    id: 5,
    type: "image",
    title: "Sports Day Highlights",
    description: "Athletic competitions and sports activities",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Sports",
    date: "2024-03-05",
    views: 1680,
    likes: 124,
  },
  {
    id: 6,
    type: "video",
    title: "Faculty Introduction",
    description: "Meet our experienced and dedicated teaching staff",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Faculty",
    date: "2024-03-03",
    views: 980,
    likes: 78,
    duration: "3:21",
  },
  {
    id: 7,
    type: "image",
    title: "Library & Study Areas",
    description: "Modern library with extensive collection and study spaces",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Facilities",
    date: "2024-03-01",
    views: 756,
    likes: 45,
  },
  {
    id: 8,
    type: "video",
    title: "Graduation Ceremony 2024",
    description: "Celebrating our graduates and their achievements",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    category: "Events",
    date: "2024-02-28",
    views: 4200,
    likes: 312,
    duration: "12:15",
  },
]

const categories = ["All", "Events", "Campus", "Facilities", "Alumni", "Sports", "Faculty"]

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredMedia =
    selectedCategory === "All" ? mediaData : mediaData.filter((item) => item.category === selectedCategory)

  const openLightbox = (media: MediaItem) => {
    setSelectedMedia(media)
    setCurrentIndex(filteredMedia.findIndex((item) => item.id === media.id))
  }

  const closeLightbox = () => {
    setSelectedMedia(null)
  }

  const nextMedia = () => {
    const nextIndex = (currentIndex + 1) % filteredMedia.length
    setCurrentIndex(nextIndex)
    setSelectedMedia(filteredMedia[nextIndex])
  }

  const prevMedia = () => {
    const prevIndex = currentIndex === 0 ? filteredMedia.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedMedia(filteredMedia[prevIndex])
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Events: "bg-blue-100 text-blue-800",
      Campus: "bg-green-100 text-green-800",
      Facilities: "bg-purple-100 text-purple-800",
      Alumni: "bg-orange-100 text-orange-800",
      Sports: "bg-red-100 text-red-800",
      Faculty: "bg-indigo-100 text-indigo-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="w-full">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Photo & Video Gallery</h3>
          <p className="text-gray-600">Explore our campus life through visual stories</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current w-1 h-1 rounded-sm"></div>
                <div className="bg-current w-1 h-1 rounded-sm"></div>
                <div className="bg-current w-1 h-1 rounded-sm"></div>
                <div className="bg-current w-1 h-1 rounded-sm"></div>
              </div>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <div className="flex flex-col space-y-1 w-4 h-4">
                <div className="bg-current w-4 h-0.5 rounded-sm"></div>
                <div className="bg-current w-4 h-0.5 rounded-sm"></div>
                <div className="bg-current w-4 h-0.5 rounded-sm"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            {category}
            <Badge variant="secondary" className="ml-2 text-xs">
              {category === "All" ? mediaData.length : mediaData.filter((item) => item.category === category).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Media Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        }`}
      >
        {filteredMedia.map((media) => (
          <Card
            key={media.id}
            className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
              viewMode === "list" ? "flex" : ""
            }`}
            onClick={() => openLightbox(media)}
          >
            <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
              <Image
                src={media.thumbnail || "/placeholder.svg"}
                alt={media.title}
                width={400}
                height={300}
                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                  viewMode === "list" ? "w-48 h-32" : "w-full h-48"
                }`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {media.type === "video" ? (
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="w-6 h-6 text-gray-900" />
                  </div>
                ) : (
                  <div className="bg-white/90 rounded-full p-3">
                    <ImageIcon className="w-6 h-6 text-gray-900" />
                  </div>
                )}
              </div>
              <Badge className={`absolute top-3 left-3 ${getCategoryColor(media.category)}`}>{media.category}</Badge>
              {media.type === "video" && media.duration && (
                <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">{media.duration}</Badge>
              )}
            </div>
            <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {media.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{media.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    <span>{media.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    <span>{media.likes}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{new Date(media.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevMedia}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMedia}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Media Content */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.title}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                {selectedMedia.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                      <Play className="w-6 h-6 mr-2" />
                      Play Video
                    </Button>
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h3>
                    <p className="text-gray-600">{selectedMedia.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <Badge className={getCategoryColor(selectedMedia.category)}>{selectedMedia.category}</Badge>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{selectedMedia.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{selectedMedia.likes} likes</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(selectedMedia.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
              {filteredMedia.map((media, index) => (
                <button
                  key={media.id}
                  onClick={() => {
                    setCurrentIndex(index)
                    setSelectedMedia(media)
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    media.id === selectedMedia.id ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  <Image
                    src={media.thumbnail || "/placeholder.svg"}
                    alt={media.title}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
