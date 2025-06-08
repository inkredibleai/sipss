"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Edit, Upload, Download, MoreHorizontal, Trophy, Medal, Award } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import type { Achiever } from "@/lib/supabase/types"
import { supabase } from "@/lib/supabase/client"

import {
  getAllAchievers,
  createAchiever,
  updateAchiever,
  deleteAchiever,
  getInstitutions,
} from "@/lib/supabase/queries"

// Category mapping for display
const categoryMap = {
  board_10: { label: "Board Exam 10th", color: "bg-blue-100 text-blue-800" },
  board_12: { label: "Board Exam 12th", color: "bg-blue-100 text-blue-800" },
  olympiad: { label: "Olympiad", color: "bg-purple-100 text-purple-800" },
  iit_jee: { label: "IIT/JEE", color: "bg-green-100 text-green-800" },
  neet: { label: "NEET", color: "bg-pink-100 text-pink-800" },
  sainik_school: { label: "Sainik School", color: "bg-amber-100 text-amber-800" },
  other: { label: "Other", color: "bg-gray-100 text-gray-800" },
} as const

type CategoryKey = keyof typeof categoryMap

type NewAchieverForm = {
  name: string
  class: string
  category: CategoryKey
  achievement: string
  year: string
  institution: string
  photo: string
  featured: boolean
}

interface Institution {
  id: string
  name: string
  code: string
}

export default function AchieversManager() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAchiever, setCurrentAchiever] = useState<Achiever | null>(null)
  const [newAchiever, setNewAchiever] = useState<NewAchieverForm>({
    name: "",
    class: "",
    category: "board_10",
    achievement: "",
    year: new Date().getFullYear().toString(),
    institution: "",
    photo: "/placeholder.svg?height=100&width=100",
    featured: false,
  })

  // Update current achiever helper
  const updateCurrentAchiever = (updates: Partial<Achiever>) => {
    setCurrentAchiever((prev) => prev ? { ...prev, ...updates } : null)
  }

  // Handle opening edit dialog
  const handleEditDialogOpen = (achiever: Achiever) => {
    setCurrentAchiever(achiever)
    setIsEditDialogOpen(true)
  }

  // Handle closing edit dialog
  const handleEditDialogClose = () => {
    setCurrentAchiever(null)
    setIsEditDialogOpen(false)
  }

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [achieversData, institutionsData] = await Promise.all([getAllAchievers(), getInstitutions()])
        setAchievers(achieversData)
        setInstitutions(institutionsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [toast])

  // Filter achievers based on search query and category
  const filteredAchievers = achievers.filter((achiever) => {
    const matchesSearch =
      (achiever.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (achiever.achievement || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || achiever.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Handle adding a new achiever
  const handleAddAchiever = async () => {
    try {
      const newAchieverData = await createAchiever({
        name: newAchiever.name,
        class: newAchiever.class,
        category: newAchiever.category as any, // Type assertion for enum
        achievement: newAchiever.achievement,
        year: newAchiever.year,
        institution_id: newAchiever.institution || null,
        photo_url: newAchiever.photo || null,
        featured: newAchiever.featured,
        status: "active",
        exam_cleared: newAchiever.achievement,
        description: null,
        percentage: null,
        rank: null
      })

      setAchievers([newAchieverData, ...achievers])
      setNewAchiever({
        name: "",
        class: "",
        category: "board_10",
        achievement: "",
        year: new Date().getFullYear().toString(),
        institution: "",
        photo: "/placeholder.svg?height=100&width=100",
        featured: false,
      })
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Achiever added successfully",
      })
    } catch (error) {
      console.error("Error adding achiever:", error)
      toast({
        title: "Error",
        description: "Failed to add achiever. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle editing an achiever
  const handleEditAchiever = async () => {
    if (!currentAchiever) return

    try {
      const dataToUpdate = {
        name: currentAchiever.name,
        class: currentAchiever.class,
        category: currentAchiever.category,
        achievement: currentAchiever.achievement,
        year: currentAchiever.year,
        featured: currentAchiever.featured,
        institution_id: currentAchiever.institution_id,
        photo_url: currentAchiever.photo_url,
        exam_cleared: currentAchiever.exam_cleared,
        description: currentAchiever.description,
        percentage: currentAchiever.percentage,
        rank: currentAchiever.rank,
        status: "active" as const
      }

      const updatedAchiever = await updateAchiever(currentAchiever.id, dataToUpdate)

      setAchievers(achievers.map((a) => (a.id === currentAchiever.id ? updatedAchiever : a)))
      setIsEditDialogOpen(false)
      toast({
        title: "Success",
        description: "Achiever updated successfully",
      })
    } catch (error) {
      console.error("Error updating achiever:", error)
      toast({
        title: "Error",
        description: "Failed to update achiever. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle deleting an achiever
  const handleDeleteAchiever = async (id: string) => {
    try {
      await deleteAchiever(id)
      setAchievers(achievers.filter((a) => a.id !== id))
      toast({
        title: "Success",
        description: "Achiever deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting achiever:", error)
      toast({
        title: "Error",
        description: "Failed to delete achiever. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle toggling featured status
  const handleToggleFeatured = async (id: string) => {
    const achiever = achievers.find((a) => a.id === id)
    if (!achiever) return

    try {
      const featured = !achiever.featured
      const updatedAchiever = await updateAchiever(id, { featured })

      setAchievers(achievers.map((a) => (a.id === id ? updatedAchiever : a)))
      toast({
        title: "Success",
        description: `Achiever ${achiever.featured ? "unmarked" : "marked"} as featured`,
      })
    } catch (error) {
      console.error("Error toggling featured status:", error)
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle photo upload
  const handlePhotoUpload = async (file: File, isEdit = false) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `achievers/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath)

      if (isEdit && currentAchiever) {
        setCurrentAchiever({ ...currentAchiever, photo_url: publicUrl })
      } else {
        setNewAchiever({ ...newAchiever, photo: publicUrl })
      }

      toast({
        title: "Success",
        description: "Photo uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading photo:", error)
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "board_10":
      case "board_12":
        return <Award className="h-4 w-4" />
      case "olympiad":
        return <Medal className="h-4 w-4" />
      case "iit_jee":
      case "neet":
        return <Trophy className="h-4 w-4" />
      case "sainik_school":
        return <Award className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading achievers data...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Achievers Management</h2>
          <p className="text-gray-600">Manage student achievements and success stories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Achiever
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Achiever</DialogTitle>
              <DialogDescription>
                Add details about a student's achievement to showcase on the website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Student Name</Label>
                  <Input
                    id="name"
                    value={newAchiever.name}
                    onChange={(e) => setNewAchiever({ ...newAchiever, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={newAchiever.class}
                    onChange={(e) => setNewAchiever({ ...newAchiever, class: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Select
                  value={newAchiever.institution}
                  onValueChange={(value) => setNewAchiever({ ...newAchiever, institution: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Achievement Category</Label>
                <Select
                  value={newAchiever.category}
                  onValueChange={(value) => setNewAchiever({ ...newAchiever, category: value as CategoryKey })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board_10">Board Exam 10th</SelectItem>
                    <SelectItem value="board_12">Board Exam 12th</SelectItem>
                    <SelectItem value="olympiad">Olympiad</SelectItem>
                    <SelectItem value="iit_jee">IIT/JEE</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="sainik_school">Sainik School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="achievement">Achievement Details</Label>
                <Textarea
                  id="achievement"
                  value={newAchiever.achievement}
                  onChange={(e) => setNewAchiever({ ...newAchiever, achievement: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={newAchiever.year}
                    onChange={(e) => setNewAchiever({ ...newAchiever, year: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="featured">Featured</Label>
                  <Select
                    value={newAchiever.featured ? "yes" : "no"}
                    onValueChange={(value) => setNewAchiever({ ...newAchiever, featured: value === "yes" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="photo">Photo</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={newAchiever.photo || "/placeholder.svg"} alt={newAchiever.name} />
                    <AvatarFallback>{newAchiever.name?.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handlePhotoUpload(file)
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleAddAchiever}>
                Add Achiever
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search achievers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="board_10">Board Exam 10th</SelectItem>
              <SelectItem value="board_12">Board Exam 12th</SelectItem>
              <SelectItem value="olympiad">Olympiad</SelectItem>
              <SelectItem value="jee">IIT/JEE</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="sainik">Sainik School</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Achievers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Achievers List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Achievement</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAchievers?.map((achiever) => (
                <TableRow key={achiever.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={achiever.photo_url || "/placeholder.svg"} alt={achiever.name} />
                        <AvatarFallback>{achiever.name?.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{achiever.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{achiever.class}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={categoryMap[achiever.category]?.color}>
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(achiever.category)}
                        {categoryMap[achiever.category]?.label}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{achiever.achievement}</TableCell>
                  <TableCell>{achiever.year}</TableCell>
                  <TableCell>
                    <Badge variant={achiever.featured ? "default" : "outline"}>
                      {achiever.featured ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentAchiever(achiever)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleToggleFeatured(achiever.id)}>
                            {achiever.featured ? "Unmark Featured" : "Mark as Featured"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteAchiever(achiever.id)} className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAchievers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No achievers found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Achiever</DialogTitle>
            <DialogDescription>Update the details of this achiever.</DialogDescription>
          </DialogHeader>
          {currentAchiever && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Student Name</Label>
                  <Input
                    id="edit-name"
                    value={currentAchiever.name}
                    onChange={(e) => setCurrentAchiever({ ...currentAchiever, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-class">Class</Label>
                  <Input
                    id="edit-class"
                    value={currentAchiever.class}
                    onChange={(e) => setCurrentAchiever({ ...currentAchiever, class: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-institution">Institution</Label>
                <Select
                  value={currentAchiever.institution_id || ""}
                  onValueChange={(value) => setCurrentAchiever({ ...currentAchiever, institution_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-category">Achievement Category</Label>
                <Select
                  value={currentAchiever.category}
                  onValueChange={(value) => setCurrentAchiever({ ...currentAchiever, category: value as CategoryKey })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board_10">Board Exam 10th</SelectItem>
                    <SelectItem value="board_12">Board Exam 12th</SelectItem>
                    <SelectItem value="olympiad">Olympiad</SelectItem>
                    <SelectItem value="iit_jee">IIT/JEE</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="sainik_school">Sainik School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-achievement">Achievement Details</Label>
                <Textarea
                  id="edit-achievement"
                  value={currentAchiever.achievement}
                  onChange={(e) => setCurrentAchiever({ ...currentAchiever, achievement: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    value={currentAchiever.year}
                    onChange={(e) => setCurrentAchiever({ ...currentAchiever, year: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-featured">Featured</Label>
                  <Select
                    value={currentAchiever.featured ? "yes" : "no"}
                    onValueChange={(value) => setCurrentAchiever({ ...currentAchiever, featured: value === "yes" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-photo">Photo</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentAchiever.photo_url || "/placeholder.svg"} alt={currentAchiever.name} />
                    <AvatarFallback>{currentAchiever.name?.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handlePhotoUpload(file, true)
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleEditAchiever}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Achievers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievers?.length}</div>
            <p className="text-xs text-gray-500 mt-1">{achievers?.filter((a) => a.featured).length} featured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(
                achievers?.reduce((acc: Record<CategoryKey, number>, curr) => {
                  acc[curr.category] = (acc[curr.category] || 0) + 1
                  return acc
                }, {} as Record<CategoryKey, number>),
              ).map(([category, count]) => (
                <Badge key={category} variant="outline" className={categoryMap[category as CategoryKey]?.color}>
                  {categoryMap[category as CategoryKey]?.label}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            {achievers?.length > 0 && (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={achievers[0].photo_url || "/placeholder.svg"} alt={achievers[0].name} />
                  <AvatarFallback>{achievers[0].name?.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{achievers[0].name}</p>
                  <p className="text-xs text-gray-500">{achievers[0].achievement}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
