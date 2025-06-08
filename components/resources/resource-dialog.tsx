"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database } from '@/lib/supabase/types'

type CareerResource = Database['public']['Tables']['career_resources']['Row']
type NewCareerResource = Omit<CareerResource, 'id' | 'created_at' | 'views' | 'rating'> & {
  views?: number;
  rating?: number;
}

interface ResourceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resource?: CareerResource
  onSubmit: (resource: NewCareerResource) => Promise<void>
}

const resourceTypes = ["article", "video", "guide", "tool", "webinar"] as const
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"] as const
const categories = ["Engineering", "Medical", "Commerce", "Arts", "Science", "Technology"]

export function ResourceDialog({ open, onOpenChange, resource, onSubmit }: ResourceDialogProps) {
  const [formData, setFormData] = useState<NewCareerResource>({
    title: resource?.title ?? "",
    description: resource?.description ?? "",
    category: resource?.category ?? categories[0],
    type: resource?.type ?? "article",
    duration: resource?.duration ?? null,
    difficulty: resource?.difficulty ?? "Beginner",
    tags: resource?.tags ?? [],
    thumbnail_url: resource?.thumbnail_url ?? null,
    author: resource?.author ?? "",
    download_url: resource?.download_url ?? null,
    external_url: resource?.external_url ?? null,
    content: resource?.content ?? null,
    status: "active",
    views: 0,
    rating: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{resource ? "Edit Resource" : "Create New Resource"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
          <Select
            value={formData.category}
            onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={formData.type}
            onValueChange={value => setFormData(prev => ({ ...prev, type: value as CareerResource['type'] }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Duration (e.g., 45 min read)"
            value={formData.duration ?? ""}
            onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
          />
          <Select
            value={formData.difficulty}
            onValueChange={value => setFormData(prev => ({ ...prev, difficulty: value as CareerResource['difficulty'] }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevels.map(level => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Tags (comma separated)"
            value={formData.tags.join(", ")}
            onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value.split(",").map(t => t.trim()) }))}
          />
          <Input
            placeholder="Author"
            value={formData.author}
            onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
            required
          />
          <Input
            placeholder="Thumbnail URL"
            value={formData.thumbnail_url ?? ""}
            onChange={e => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
          />
          <Input
            placeholder="Download URL (optional)"
            value={formData.download_url ?? ""}
            onChange={e => setFormData(prev => ({ ...prev, download_url: e.target.value }))}
          />
          <Input
            placeholder="External URL (optional)"
            value={formData.external_url ?? ""}
            onChange={e => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
          />
          <Textarea
            placeholder="Content (optional)"
            value={formData.content ?? ""}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{resource ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
