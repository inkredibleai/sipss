"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { createQuickUpdate, updateQuickUpdate, deleteQuickUpdate, getQuickUpdates, getInstitutions } from "@/lib/supabase/queries"
import type { QuickUpdate, Institution } from "@/lib/supabase/types"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  GraduationCap,
} from "lucide-react"

const TYPES = [
  "admission",
  "course",
  "scholarship",
  "facility",
  "announcement",
] as const

const PRIORITIES = ["high", "medium", "low"] as const

export default function UpdatesManager() {
  const { toast } = useToast()
  const [updates, setUpdates] = useState<QuickUpdate[]>([])
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUpdate, setEditingUpdate] = useState<QuickUpdate | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterInstitution, setFilterInstitution] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "announcement" as typeof TYPES[number],
    priority: "medium" as typeof PRIORITIES[number],
    status: "active" as const,
    link_url: null as string | null,
    institution_id: "main" as string | null, // Change from null to "main"
    show_on_main: true,
  })

  // Load updates and institutions on mount
  useEffect(() => {
    loadUpdates()
    loadInstitutions()
  }, [])

  async function loadInstitutions() {
    try {
      const data = await getInstitutions()
      setInstitutions(data)
    } catch (error) {
      console.error("Error loading institutions:", error)
    }
  }

  async function loadUpdates() {
    try {
      setIsLoading(true)
      const data = await getQuickUpdates()
      setUpdates(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load updates. Please try again.",
        variant: "destructive",
      })
      console.error("Error loading updates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredUpdates = updates.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    const matchesPriority = filterPriority === "all" || item.priority === filterPriority
    const matchesInstitution = filterInstitution === "all" || 
      (filterInstitution === "main" && !item.institution_id) ||
      item.institution_id === filterInstitution
    return matchesSearch && matchesType && matchesPriority && matchesInstitution
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const updateData = {
        ...formData,
        institution_id: formData.institution_id === "main" ? null : formData.institution_id,
      }

      if (editingUpdate) {
        await updateQuickUpdate(editingUpdate.id, {
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        toast({
          title: "Success",
          description: "Update successfully edited",
        })
      } else {
        await createQuickUpdate(updateData)
        toast({
          title: "Success",
          description: "New update successfully created",
        })
      }
      await loadUpdates()
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save update. Please try again.",
        variant: "destructive",
      })
      console.error("Error saving update:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "announcement",
      priority: "medium",
      status: "active",
      link_url: "",
      institution_id: "main", // Change from null to "main"
      show_on_main: true,
    })
    setEditingUpdate(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: QuickUpdate) => {
    setEditingUpdate(item)
    setFormData({
      title: item.title,
      description: item.description,
      type: item.type,
      priority: item.priority,
      status: item.status,
      link_url: item.link_url || "",
      institution_id: item.institution_id || "main", // Change this line
      show_on_main: item.show_on_main,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteQuickUpdate(id)
      await loadUpdates()
      toast({
        title: "Success",
        description: "Update successfully deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete update. Please try again.",
        variant: "destructive",
      })
      console.error("Error deleting update:", error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "scheduled":
        return <Clock className="w-4 h-4" />
      case "expired":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quick Updates Management</h2>
          <p className="text-gray-600">Manage updates for main site and institutions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Update
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingUpdate ? "Edit Update" : "Add New Update"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter update title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the update"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value: typeof TYPES[number]) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: typeof PRIORITIES[number]) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="link_url">Link URL (Optional)</Label>
                <Input
                  id="link_url"
                  value={formData.link_url || ""}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value || null })}
                  placeholder="e.g., /admissions, https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="institution">Institution</Label>
                <Select 
                  value={formData.institution_id || "main"}  // Change this line
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    institution_id: value,
                    show_on_main: value === "main" ? true : formData.show_on_main 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Site</SelectItem>
                    {institutions.map((inst) => (
                      <SelectItem key={inst.id} value={inst.id}>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {inst.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.institution_id !== "main" && ( // Change this line
                <div className="flex items-center space-x-2">
                  <Label htmlFor="show_on_main" className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="show_on_main"
                      checked={formData.show_on_main}
                      onChange={(e) => setFormData({ ...formData, show_on_main: e.target.checked })}
                    />
                    <span>Also show on main site</span>
                  </Label>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  {editingUpdate ? "Update" : "Create"} Update
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  {PRIORITIES.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterInstitution} onValueChange={setFilterInstitution}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Institution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Updates</SelectItem>
                  <SelectItem value="main">Main Site Only</SelectItem>
                  {institutions.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>{inst.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Updates ({filteredUpdates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Update</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUpdates.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                        {item.link_url && (
                          <div className="flex items-center text-xs text-blue-600">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {item.link_url}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getTypeIcon(item.type)}</span>
                        <span className="text-sm capitalize">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === "high" && <TrendingUp className="w-3 h-3 mr-1" />}
                        <span className="capitalize">{item.priority}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
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
                    </TableCell>
                    <TableCell>
                      {item.institution_id ? (
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>{institutions.find(i => i.id === item.institution_id)?.name || 'Unknown Institution'}</span>
                          {item.show_on_main && (
                            <Badge variant="secondary" className="ml-2">Shows on Main</Badge>
                          )}
                        </div>
                      ) : (
                        <Badge>Main Site</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
