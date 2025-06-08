"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Database } from '@/lib/supabase/types'
import { ResourceDialog } from "./resource-dialog"
import { 
  BookOpen, Calendar, Play, TrendingUp, Building, Award,
  Users, Target, Heart, Globe, Search, Eye, Star, 
  Clock, Download, ExternalLink, Edit, Trash2, GraduationCap
} from "lucide-react"
import Image from "next/image"
import { 
  fetchCareerResources, 
  createCareerResource, 
  updateCareerResource, 
  deleteCareerResource 
} from '@/lib/supabase/career-resource-queries'
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type CareerResource = Database['public']['Tables']['career_resources']['Row']
type NewCareerResource = Omit<CareerResource, 'id' | 'created_at' | 'views' | 'rating'> & {
  views?: number;
  rating?: number;
}

type CareerResource = Database['public']['Tables']['career_resources']['Row']
type NewCareerResource = Omit<CareerResource, 'id' | 'created_at' | 'views' | 'rating'> & {
  views?: number;
  rating?: number;
}

const initialCareerResources: CareerResource[] = [];

const careerCategories = [
  { name: "Engineering", icon: "⚙️", count: 0 },
  { name: "Medical", icon: "🏥", count: 0 },
  { name: "Commerce", icon: "💼", count: 0 },
  { name: "Arts", icon: "🎨", count: 0 },
  { name: "Science", icon: "🔬", count: 0 },
  { name: "Technology", icon: "💻", count: 0 }
]

export default function CareerGuidanceSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState<CareerResource['type'] | 'all'>("all")
  const [allResources, setAllResources] = useState<CareerResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<CareerResource | undefined>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [resourceToDelete, setResourceToDelete] = useState<CareerResource | null>(null)

  const handleCreateResource = async (newResource: NewCareerResource) => {
    try {
      const created = await createCareerResource({
        ...newResource,
        views: 0,
        rating: 0
      })
      setAllResources(prevResources => [created, ...prevResources])
      toast({
        title: "Success",
        description: "Resource created successfully"
      })
    } catch (error) {
      console.error('Error creating resource:', error)
      toast({
        title: "Error",
        description: "Failed to create resource. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleUpdateResource = async (id: string, updatedFields: Partial<CareerResource>) => {
    try {
      const updated = await updateCareerResource(id, updatedFields)
      setAllResources(prevResources => 
        prevResources.map(resource => 
          resource.id === id ? { ...resource, ...updated } : resource
        )
      )
      toast({
        title: "Success",
        description: "Resource updated successfully"
      })
    } catch (error) {
      console.error('Error updating resource:', error)
      toast({
        title: "Error",
        description: "Failed to update resource. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteResource = async (id: string) => {
    try {
      await deleteCareerResource(id)
      setAllResources(prevResources => prevResources.filter(resource => resource.id !== id))
      toast({
        title: "Success",
        description: "Resource deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting resource:', error)
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteConfirm = async () => {
    if (resourceToDelete) {
      await handleDeleteResource(resourceToDelete.id)
      setResourceToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const openDeleteDialog = (resource: CareerResource) => {
    setResourceToDelete(resource)
    setIsDeleteDialogOpen(true)
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchCareerResources()
        setAllResources(data)
      } catch (err) {
        setError("Failed to load career resources. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter resources based on search and category
  const filteredResources = allResources.filter((resource) => {
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

  const handleResourceSubmit = async (formData: NewCareerResource) => {
    if (editingResource) {
      await handleUpdateResource(editingResource.id, formData)
    } else {
      await handleCreateResource(formData)
    }
    setIsDialogOpen(false)
    setEditingResource(undefined)
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading career resources...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <ResourceDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        resource={editingResource}
        onSubmit={handleResourceSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{resourceToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">🎯 Career Guidance</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shape Your Future</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive career guidance resources to help you make informed decisions about your future
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => {
                setEditingResource(undefined)
                setIsDialogOpen(true)
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Add New Resource
            </Button>
          </div>
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
                      src={resource.thumbnail_url || "/placeholder.svg"}
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
                        {resource.download_url && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-orange-600 hover:text-orange-700"
                          onClick={() => {
                            setEditingResource(resource)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteDialog(resource)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          {resource.external_url ? (
                            <a href={resource.external_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View
                            </a>
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
                          src={resource.thumbnail_url || "/placeholder.svg"}
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
                            {resource.download_url && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-orange-600 hover:text-orange-700"
                              onClick={() => {
                                setEditingResource(resource)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => openDeleteDialog(resource)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              {resource.external_url ? (
                                <a href={resource.external_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View
                                </a>
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
