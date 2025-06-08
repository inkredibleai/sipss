"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  Upload,
  ImageIcon,
  Video,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  Grid,
  List,
  Calendar,
  Heart,
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
  size: string
  format: string
}

const initialMedia: MediaItem[] = [
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
    size: "2.4 MB",
    format: "JPG",
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
    size: "45.2 MB",
    format: "MP4",
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
    size: "1.8 MB",
    format: "PNG",
  },
]

export default function MediaManager() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [formData, setFormData] = useState({
    type: "image" as const,
    title: "",
    description: "",
    category: "",
    url: "",
    thumbnail: "",
    duration: "",
  })

  const categories = ["Events", "Campus", "Facilities", "Alumni", "Sports", "Faculty"]

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMedia) {
      setMedia(
        media.map((item) =>
          item.id === editingMedia.id
            ? {
                ...item,
                ...formData,
                date: new Date().toISOString().split("T")[0],
                size: "2.1 MB", // Mock size
                format: formData.type === "image" ? "JPG" : "MP4",
              }
            : item,
        ),
      )
    } else {
      const newItem: MediaItem = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split("T")[0],
        views: 0,
        likes: 0,
        size: "2.1 MB", // Mock size
        format: formData.type === "image" ? "JPG" : "MP4",
      }
      setMedia([newItem, ...media])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      type: "image",
      title: "",
      description: "",
      category: "",
      url: "",
      thumbnail: "",
      duration: "",
    })
    setEditingMedia(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: MediaItem) => {
    setEditingMedia(item)
    setFormData({
      type: item.type,
      title: item.title,
      description: item.description,
      category: item.category,
      url: item.url,
      thumbnail: item.thumbnail,
      duration: item.duration || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setMedia(media.filter((item) => item.id !== id))
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Management</h2>
          <p className="text-gray-600">Manage photos and videos for the gallery</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMedia ? "Edit Media Item" : "Upload New Media"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type">Media Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "image" | "video") => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter media title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the media"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.type === "video" && (
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 5:32"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop your {formData.type} here, or click to browse</p>
                  <Button type="button" variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  <Upload className="w-4 h-4 mr-2" />
                  {editingMedia ? "Update" : "Upload"} Media
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library ({filteredMedia.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredMedia.map((item) => (
              <Card
                key={item.id}
                className={`group hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex" : ""}`}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "list" ? "w-48 h-32" : "w-full h-48"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {item.type === "video" ? (
                      <Video className="w-8 h-8 text-white" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <Badge className={`absolute top-2 left-2 ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                  {item.type === "video" && item.duration && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{item.duration}</Badge>
                  )}
                </div>
                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {item.format} • {item.size}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
