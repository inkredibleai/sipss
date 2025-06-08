"use client"

import type React from "react"
import { useState, useEffect } from "react" // Added useEffect

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast" // Added useToast
import { Plus, Upload, Edit, Trash2, Download, Search, FileText, Users, Eye, Star, Save, X } from "lucide-react"
import Image from "next/image"
// Mock Supabase queries - In a real app, these would be in a separate file e.g., @/lib/supabase/resource-queries.ts

interface MockPaper {
  id: string | number // Use string for UUID from DB, number for mock/new
  title: string
  subject: string
  class: string
  year: string
  type: "mock" | "past" // Corresponds to paper_type enum
  board: string
  duration: string | null
  marks: number | null
  difficulty: "Easy" | "Medium" | "Hard" | string | null
  description: string | null
  file_url: string // Not null
  file_size: string | null
  downloads: number | null
  rating: number | null
  status?: "active" | "inactive" | "archived" | string | null // Optional for form, but in DB
  created_at?: string // Optional for form
  uploadDate?: string // Derived/display field, not directly in DB as 'uploadDate'
}

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

const initialMockPapers: MockPaper[] = [
  {
    id: "mock-1", // Using string IDs for consistency with potential UUIDs
    title: "Mathematics Mock Test - 1",
    subject: "Mathematics",
    class: "12",
    year: "2024",
    type: "mock",
    board: "CBSE",
    duration: "3 hours",
    marks: 80, // Mock data
    downloads: 1250,
    rating: 4.8,
    difficulty: "Medium",
    file_size: "2.4 MB",
    uploadDate: "2024-03-15",
    description: "Comprehensive mathematics mock test covering all chapters",
    file_url: "/papers/math-mock-1.pdf",
    status: "active",
    created_at: "2024-03-15T00:00:00Z",
  },
  {
    id: "mock-2",
    title: "Physics Previous Year Paper",
    subject: "Physics",
    class: "12",
    year: "2023",
    type: "past",
    board: "CBSE",
    duration: "3 hours",
    marks: 70, // Mock data
    downloads: 2100,
    rating: 4.9,
    difficulty: "Hard",
    file_size: "1.8 MB",
    uploadDate: "2024-03-12",
    description: "CBSE Class 12 Physics board exam paper 2023",
    file_url: "/papers/physics-2023.pdf",
    status: "active",
    created_at: "2024-03-12T00:00:00Z",
  },
]

const initialCareerResources: CareerResource[] = [
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
]

export default function ResourcesManager() {
  const { toast } = useToast()
  const [mockPapers, setMockPapers] = useState<MockPaper[]>(initialMockPapers)
  const [careerResources, setCareerResources] = useState<CareerResource[]>(initialCareerResources)
  const [activeTab, setActiveTab] = useState("papers")

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Mock Papers State
  const [isPaperDialogOpen, setIsPaperDialogOpen] = useState(false)
  const [editingPaper, setEditingPaper] = useState<MockPaper | null>(null)
  const [paperSearchTerm, setPaperSearchTerm] = useState("")

  // Career Resources State
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<CareerResource | null>(null)
  const [resourceSearchTerm, setResourceSearchTerm] = useState("")

  const [paperFormData, setPaperFormData] = useState({
    title: "",
    subject: "",
    class: "",
    year: "",
    type: "mock" as const,
    board: "",
    duration: "",
    marks: 0,
    difficulty: "Medium" as "Easy" | "Medium" | "Hard",
    description: "",
    file_url: "",
    file_size: "", // Add file_size to form
  })

  const [resourceFormData, setResourceFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "article" as const,
    duration: "",
    difficulty: "Beginner" as const,
    tags: "",
    author: "",
    thumbnail: "",
    downloadUrl: "",
    externalUrl: "",
  })

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
    "Economics",
    "History",
  ]
  const classes = ["6", "7", "8", "9", "10", "11", "12"]
  const years = ["2024", "2023", "2022", "2021", "2020"]
  const boards = ["CBSE", "RBSE", "ICSE"]
  const careerCategories = ["Engineering", "Medical", "Commerce", "Arts", "Science", "Technology"]

  // Simulate API calls
  const fakeApiCall = (data?: any, delay = 500) => new Promise(resolve => setTimeout(() => resolve(data), delay));

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // In a real app, replace these with actual API calls to your backend (e.g., Supabase)
        // const papersData = await getMockPapersFromApi();
        // const resourcesData = await getCareerResourcesFromApi();
        // setMockPapers(papersData);
        // setCareerResources(resourcesData);
        await fakeApiCall(); // Simulate loading delay
        setMockPapers(initialMockPapers) // Keep using initial for now
        setCareerResources(initialCareerResources) // Keep using initial for now
      } catch (error) {
        toast({ title: "Error", description: "Failed to load resources.", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [toast])

  // Mock Papers Functions
  const handlePaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingPaper) {
        // await updateMockPaperInApi(editingPaper.id, paperFormData);
        await fakeApiCall(paperFormData)
        setMockPapers(
          mockPapers.map((paper) =>
            paper.id === editingPaper.id
              ? {
                  ...paper,
                  ...paperFormData,
                  uploadDate: new Date().toISOString().split("T")[0], // Keep mock logic for now
                  file_size: paperFormData.file_size || "N/A", // Use from form or default
                }
              : paper,
          ),
        )
        toast({ title: "Success", description: "Paper updated successfully." })
      } else {
        const newPaperData: MockPaper = {
          ...paperFormData,
          id: Date.now(), // Backend would generate ID
          uploadDate: new Date().toISOString().split("T")[0],
          downloads: 0,
          rating: 0,
          file_size: paperFormData.file_size || "N/A", // Use from form or default
          status: "active", // Default status
          created_at: new Date().toISOString(),
        }
        // const createdPaper = await createMockPaperInApi(newPaperData);
        await fakeApiCall(newPaperData)
        setMockPapers([newPaperData as MockPaper, ...mockPapers])
        toast({ title: "Success", description: "Paper added successfully." })
      }
      resetPaperForm()
    } catch (error) {
      toast({ title: "Error", description: "Failed to save paper.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetPaperForm = () => {
    setPaperFormData({
      title: "",
      subject: "",
      class: "",
      year: "",
      type: "mock",
      board: "",
      duration: "",
      marks: 0,
      difficulty: "Medium",
      description: "",
      file_url: "",
      file_size: "",
    })
    setEditingPaper(null)
    setIsPaperDialogOpen(false)
  }

  const handleEditPaper = (paper: MockPaper) => {
    setEditingPaper(paper)
    setPaperFormData({
      title: paper.title,
      subject: paper.subject,
      class: paper.class,
      year: paper.year,
      type: paper.type,
      board: paper.board,
      duration: paper.duration,
      marks: paper.marks,
      difficulty: paper.difficulty,
      description: paper.description,
      file_url: paper.file_url,
      file_size: paper.file_size ?? "",
    })
    setIsPaperDialogOpen(true)
  }

  const handleDeletePaper = async (id: string | number) => {
    // Optional: Add a confirmation dialog here
    try {
      // await deleteMockPaperFromApi(id);
      await fakeApiCall()
      setMockPapers(mockPapers.filter((paper) => paper.id !== id))
      toast({ title: "Success", description: "Paper deleted successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete paper.", variant: "destructive" })
    }
  }

  // Career Resources Functions
  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const processedFormData = {
      ...resourceFormData,
      tags: resourceFormData.tags.split(",").map((tag) => tag.trim()),
    }

    try {
      if (editingResource) {
        // await updateCareerResourceInApi(editingResource.id, processedFormData);
        await fakeApiCall(processedFormData)
        setCareerResources(
          careerResources.map((resource) =>
            resource.id === editingResource.id
              ? {
                  ...resource,
                  ...processedFormData,
                  publishDate: new Date().toISOString().split("T")[0], // Keep mock logic
                }
              : resource,
          ),
        )
        toast({ title: "Success", description: "Resource updated successfully." })
      } else {
        const newResourceData = {
          ...processedFormData,
          id: Date.now(), // Backend would generate ID
          publishDate: new Date().toISOString().split("T")[0],
          views: 0,
          rating: 0,
        }
        // const createdResource = await createCareerResourceInApi(newResourceData);
        await fakeApiCall(newResourceData)
        setCareerResources([newResourceData as CareerResource, ...careerResources])
        toast({ title: "Success", description: "Resource added successfully." })
      }
      resetResourceForm()
    } catch (error) {
      toast({ title: "Error", description: "Failed to save resource.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetResourceForm = () => {
    setResourceFormData({
      title: "",
      description: "",
      category: "",
      type: "article",
      duration: "",
      difficulty: "Beginner",
      tags: "",
      author: "",
      thumbnail: "", // This would be a URL from file upload
      downloadUrl: "",
      externalUrl: "",
    })
    setEditingResource(null)
    setIsResourceDialogOpen(false)
  }

  const handleEditResource = (resource: CareerResource) => {
    setEditingResource(resource)
    setResourceFormData({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      type: resource.type,
      duration: resource.duration || "",
      difficulty: resource.difficulty,
      tags: resource.tags.join(", "),
      author: resource.author,
      thumbnail: resource.thumbnail,
      downloadUrl: resource.downloadUrl || "",
      externalUrl: resource.externalUrl || "",
    })
    setIsResourceDialogOpen(true)
  }

  const handleDeleteResource = async (id: number) => {
    // Optional: Add a confirmation dialog here
    try {
      // await deleteCareerResourceFromApi(id);
      await fakeApiCall()
      setCareerResources(careerResources.filter((resource) => resource.id !== id))
      toast({ title: "Success", description: "Resource deleted successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete resource.", variant: "destructive" })
    }
  }


  const filteredPapers = mockPapers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(paperSearchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(paperSearchTerm.toLowerCase()),
  )

  const filteredResources = careerResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(resourceSearchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(resourceSearchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading resources...</p></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resources Management</h2>
          <p className="text-gray-600">Manage mock papers, past papers, and career guidance resources</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="papers" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Mock & Past Papers</span>
          </TabsTrigger>
          <TabsTrigger value="career" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Career Resources</span>
          </TabsTrigger>
        </TabsList>

        {/* Mock Papers Tab */}
        <TabsContent value="papers">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Mock & Past Papers ({filteredPapers.length})</h3>
                <p className="text-gray-600">Manage question papers for download</p>
              </div>
              <Dialog open={isPaperDialogOpen} onOpenChange={setIsPaperDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setEditingPaper(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Paper
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingPaper ? "Edit Paper" : "Add New Paper"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePaperSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={paperFormData.title}
                        onChange={(e) => setPaperFormData({ ...paperFormData, title: e.target.value })}
                        placeholder="Enter paper title"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select
                          value={paperFormData.subject}
                          onValueChange={(value) => setPaperFormData({ ...paperFormData, subject: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="class">Class *</Label>
                        <Select
                          value={paperFormData.class}
                          onValueChange={(value) => setPaperFormData({ ...paperFormData, class: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls} value={cls}>
                                Class {cls}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="year">Year *</Label>
                        <Select
                          value={paperFormData.year}
                          onValueChange={(value) => setPaperFormData({ ...paperFormData, year: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="type">Type *</Label>
                        <Select
                          value={paperFormData.type}
                          onValueChange={(value: "mock" | "past") =>
                            setPaperFormData({ ...paperFormData, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mock">Mock Test</SelectItem>
                            <SelectItem value="past">Past Paper</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="board">Board *</Label>
                        <Select
                          value={paperFormData.board}
                          onValueChange={(value) => setPaperFormData({ ...paperFormData, board: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            {boards.map((board) => (
                              <SelectItem key={board} value={board}>
                                {board}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={paperFormData.duration}
                          onChange={(e) => setPaperFormData({ ...paperFormData, duration: e.target.value })}
                          placeholder="e.g., 3 hours"
                        />
                      </div>

                      <div>
                        <Label htmlFor="marks">Total Marks</Label>
                        <Input
                          id="marks"
                          type="number"
                          value={paperFormData.marks}
                          onChange={(e) =>
                            setPaperFormData({ ...paperFormData, marks: Number.parseInt(e.target.value) })
                          }
                          placeholder="e.g., 80"
                        />
                      </div>

                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select
                          value={paperFormData.difficulty}
                          onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                            setPaperFormData({ ...paperFormData, difficulty: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={paperFormData.description}
                        onChange={(e) => setPaperFormData({ ...paperFormData, description: e.target.value })}
                        placeholder="Brief description of the paper"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="file">Upload PDF File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drag and drop your PDF here, or click to browse</p>
                        <Button type="button" variant="outline" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={resetPaperForm}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Saving..." : (editingPaper ? "Update Paper" : "Create Paper")}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search papers..."
                    value={paperSearchTerm}
                    onChange={(e) => setPaperSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Papers Table */}
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Paper Details</TableHead>
                        <TableHead>Class/Subject</TableHead>
                        <TableHead>Type/Board</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPapers.map((paper) => (
                        <TableRow key={paper.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm line-clamp-2">{paper.title}</p>
                              <p className="text-xs text-gray-600 line-clamp-1">{paper.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge
                                  className={
                                    paper.difficulty === "Easy"
                                      ? "bg-green-100 text-green-800"
                                      : paper.difficulty === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  } // Add nullish coalescing for difficulty
                                >
                                  {paper.difficulty}
                                </Badge>
                                <span className="text-xs text-gray-500">{paper.fileSize}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">Class {paper.class}</div>
                              <div className="text-gray-600">{paper.subject}</div>
                              <div className="text-xs text-gray-500">{paper.year}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge
                                className={
                                  paper.type === "mock" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                                }
                              >
                                {paper.type === "mock" ? "Mock" : "Past"}
                              </Badge>
                              <div className="text-xs text-gray-600">{paper.board}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex items-center">
                                <Download className="w-3 h-3 mr-1" />
                                {paper.downloads.toLocaleString()}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                                {paper.rating}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditPaper(paper)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeletePaper(paper.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Career Resources Tab */}
        <TabsContent value="career">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Career Resources ({filteredResources.length})</h3>
                <p className="text-gray-600">Manage career guidance content</p>
              </div>
              <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => setEditingResource(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleResourceSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={resourceFormData.title}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, title: e.target.value })}
                        placeholder="Enter resource title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={resourceFormData.description}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, description: e.target.value })}
                        placeholder="Brief description of the resource"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={resourceFormData.category}
                          onValueChange={(value) => setResourceFormData({ ...resourceFormData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {careerCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="type">Type *</Label>
                        <Select
                          value={resourceFormData.type}
                          onValueChange={(value: "article" | "video" | "guide" | "tool" | "webinar") =>
                            setResourceFormData({ ...resourceFormData, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="guide">Guide</SelectItem>
                            <SelectItem value="tool">Tool</SelectItem>
                            <SelectItem value="webinar">Webinar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select
                          value={resourceFormData.difficulty}
                          onValueChange={(value: "Beginner" | "Intermediate" | "Advanced") =>
                            setResourceFormData({ ...resourceFormData, difficulty: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={resourceFormData.duration}
                          onChange={(e) => setResourceFormData({ ...resourceFormData, duration: e.target.value })}
                          placeholder="e.g., 30 min read, 45 minutes"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        value={resourceFormData.author}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, author: e.target.value })}
                        placeholder="Author name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={resourceFormData.tags}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, tags: e.target.value })}
                        placeholder="e.g., Engineering, Career Planning, Admissions"
                      />
                    </div>

                    <div>
                      <Label htmlFor="thumbnail">Thumbnail Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload thumbnail image</p>
                        <Button type="button" variant="outline" className="mt-2">
                          Choose Image
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="downloadUrl">Download URL (for PDFs/guides)</Label>
                      <Input
                        id="downloadUrl"
                        value={resourceFormData.downloadUrl}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, downloadUrl: e.target.value })}
                        placeholder="URL for downloadable content"
                      />
                    </div>

                    <div>
                      <Label htmlFor="externalUrl">External URL (for videos/tools)</Label>
                      <Input
                        id="externalUrl"
                        value={resourceFormData.externalUrl}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, externalUrl: e.target.value })}
                        placeholder="External link URL"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={resetResourceForm}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Saving..." : (editingResource ? "Update Resource" : "Create Resource")}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources..."
                    value={resourceSearchTerm}
                    onChange={(e) => setResourceSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Resources Table */}
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resource Details</TableHead>
                        <TableHead>Category/Type</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div className="flex items-start space-x-3">
                              <Image
                                src={resource.thumbnail || "/placeholder.svg"}
                                alt={resource.title}
                                width={60}
                                height={40}
                                className="rounded object-cover"
                              />
                              <div>
                                <p className="font-medium text-sm line-clamp-2">{resource.title}</p>
                                <p className="text-xs text-gray-600 line-clamp-2">{resource.description}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge
                                    className={
                                      resource.difficulty === "Beginner"
                                        ? "bg-green-100 text-green-800"
                                        : resource.difficulty === "Intermediate"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {resource.difficulty}
                                  </Badge>
                                  {resource.duration && (
                                    <span className="text-xs text-gray-500">{resource.duration}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{resource.category}</div>
                              <Badge
                                className={
                                  resource.type === "article"
                                    ? "bg-blue-100 text-blue-800"
                                    : resource.type === "video"
                                      ? "bg-red-100 text-red-800"
                                      : resource.type === "guide"
                                        ? "bg-green-100 text-green-800"
                                        : resource.type === "tool"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-orange-100 text-orange-800"
                                }
                              >
                                {resource.type}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{resource.author}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(resource.publishDate).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {resource.views.toLocaleString()}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                                {resource.rating}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditResource(resource)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteResource(resource.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
 