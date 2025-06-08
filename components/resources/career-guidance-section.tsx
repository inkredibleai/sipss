"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Target,
  Search,
  Play,
  Download,
  ExternalLink,
  Star,
  Clock,
  Eye,
} from "lucide-react"
import Image from "next/image"

interface CareerResource {
  id: number
  title: string
  description: string
  category: string
  type: "article" | "video" | "guide" | "tool" | "webinar"
  duration?: string
  views: number
  rating: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  thumbnail: string
  author: string
  publishDate: string
  downloadUrl?: string
  externalUrl?: string
}

const careerResources: CareerResource[] = [
  {
    id: 1,
    title: "Complete Guide to Engineering Careers",
    description: "Comprehensive guide covering all engineering branches, career prospects, and admission requirements",
    category: "Engineering",
    type: "guide",
    duration: "45 min read",
    views: 15420,
    rating: 4.8,
    difficulty: "Beginner",
    tags: ["Engineering", "Career Planning", "Admissions"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Dr. Rajesh Kumar",
    publishDate: "2024-03-15",
    downloadUrl: "/guides/engineering-careers.pdf",
  },
  {
    id: 2,
    title: "Medical Career Pathways After 12th",
    description: "Explore various medical career options including MBBS, BDS, BAMS, and allied health sciences",
    category: "Medical",
    type: "video",
    duration: "25 minutes",
    views: 12890,
    rating: 4.9,
    difficulty: "Beginner",
    tags: ["Medical", "NEET", "Healthcare"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Dr. Priya Sharma",
    publishDate: "2024-03-12",
    externalUrl: "https://youtube.com/watch?v=example",
  },
  {
    id: 3,
    title: "Career Assessment Tool",
    description: "Interactive tool to discover your interests, skills, and suitable career options",
    category: "Assessment",
    type: "tool",
    views: 8750,
    rating: 4.6,
    difficulty: "Beginner",
    tags: ["Assessment", "Self Discovery", "Career Planning"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Career Counseling Team",
    publishDate: "2024-03-10",
    externalUrl: "/tools/career-assessment",
  },
  {
    id: 4,
    title: "Commerce Stream Career Options",
    description: "Detailed overview of career opportunities in commerce including CA, CS, CMA, and management",
    category: "Commerce",
    type: "article",
    duration: "20 min read",
    views: 9650,
    rating: 4.7,
    difficulty: "Intermediate",
    tags: ["Commerce", "Business", "Finance"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Prof. Amit Agarwal",
    publishDate: "2024-03-08",
    downloadUrl: "/guides/commerce-careers.pdf",
  },
  {
    id: 5,
    title: "Arts & Humanities Career Webinar",
    description: "Live webinar discussing diverse career paths in arts, literature, psychology, and social sciences",
    category: "Arts",
    type: "webinar",
    duration: "60 minutes",
    views: 5420,
    rating: 4.5,
    difficulty: "Intermediate",
    tags: ["Arts", "Humanities", "Creative Careers"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Dr. Sunita Meena",
    publishDate: "2024-03-05",
    externalUrl: "/webinars/arts-careers",
  },
  {
    id: 6,
    title: "Scholarship and Financial Aid Guide",
    description: "Complete guide to scholarships, grants, and financial aid for higher education",
    category: "Financial Aid",
    type: "guide",
    duration: "30 min read",
    views: 11200,
    rating: 4.8,
    difficulty: "Beginner",
    tags: ["Scholarships", "Financial Aid", "Education Funding"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Financial Aid Office",
    publishDate: "2024-03-03",
    downloadUrl: "/guides/scholarships.pdf",
  },
]

const careerCategories = [
  { name: "Engineering", icon: "⚙️", count: 45 },
  { name: "Medical", icon: "🏥", count: 32 },
  { name: "Commerce", icon: "💼", count: 28 },
  { name: "Arts", icon: "🎨", count: 24 },
  { name: "Science", icon: "🔬", count: 38 },
  { name: "Technology", icon: "💻", count: 42 },
]

export default function CareerGuidanceSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredResources = careerResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="w-4 h-4" />
      case "video":
        return <Play className="w-4 h-4" />
      case "guide":
        return <GraduationCap className="w-4 h-4" />
      case "tool":
        return <Target className="w-4 h-4" />
      case "webinar":
        return <Users className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-red-100 text-red-800"
      case "guide":
        return "bg-green-100 text-green-800"
      case "tool":
        return "bg-purple-100 text-purple-800"
      case "webinar":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">🎯 Career Guidance</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shape Your Future</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive career guidance resources to help you make informed decisions about your future
          </p>
        </div>

        {/* Career Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {careerCategories.map((category, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedCategory === category.name ? "ring-2 ring-orange-500 bg-orange-50" : ""
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? "all" : category.name)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.count} resources</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="guide">Guides</TabsTrigger>
            <TabsTrigger value="tool">Tools</TabsTrigger>
            <TabsTrigger value="webinar">Webinars</TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search career resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  variant={selectedCategory === "all" ? "outline" : "default"}
                  onClick={() => setSelectedCategory("all")}
                  className={selectedCategory !== "all" ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  All Categories
                </Button>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                      <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                    </div>
                    {resource.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full p-3">
                          <Play className="w-6 h-6 text-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {resource.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{resource.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      {resource.duration && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{resource.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-xs text-gray-500">By {resource.author}</div>
                      <div className="flex space-x-2">
                        {resource.downloadUrl && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          {resource.externalUrl ? (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-4 h-4 mr-2" />
                              Read
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Individual type tabs */}
          {["article", "video", "guide", "tool", "webinar"].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter((resource) => resource.type === type)
                  .map((resource) => (
                    <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <Image
                          src={resource.thumbnail || "/placeholder.svg"}
                          alt={resource.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {resource.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>{resource.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                          {resource.duration && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{resource.duration}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-xs text-gray-500">By {resource.author}</div>
                          <div className="flex space-x-2">
                            {resource.downloadUrl && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              {resource.externalUrl ? (
                                <>
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View
                                </>
                              ) : (
                                <>
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Read
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Career Counseling CTA */}
        <Card className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Personalized Career Guidance?</h3>
            <p className="text-lg mb-6 opacity-90">Book a one-on-one session with our experienced career counselors</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Book Counseling Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Take Career Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
