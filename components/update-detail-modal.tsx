"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { QuickUpdate } from "@/lib/supabase/types"
import { Calendar, ExternalLink, Tag, TrendingUp, Info } from "lucide-react"

interface UpdateDetailModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  update: QuickUpdate | null
}

const typeDisplayMap: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  admission: { label: "Admission", className: "bg-red-100 text-red-800", icon: Tag },
  course: { label: "Course", className: "bg-blue-100 text-blue-800", icon: Tag },
  scholarship: { label: "Scholarship", className: "bg-green-100 text-green-800", icon: Tag },
  facility: { label: "Facility", className: "bg-amber-100 text-amber-800", icon: Tag },
  announcement: { label: "Announcement", className: "bg-purple-100 text-purple-800", icon: Tag },
  default: { label: "Update", className: "bg-gray-100 text-gray-800", icon: Info },
}

const priorityDisplayMap: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  high: { label: "High Priority", className: "bg-red-100 text-red-700 border-red-200", icon: TrendingUp },
  medium: { label: "Medium Priority", className: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: TrendingUp },
  low: { label: "Low Priority", className: "bg-green-100 text-green-700 border-green-200", icon: TrendingUp },
  default: { label: "Standard", className: "bg-gray-100 text-gray-700 border-gray-200", icon: Info },
}

export function UpdateDetailModal({ isOpen, onOpenChange, update }: UpdateDetailModalProps) {
  if (!update) return null

  const typeInfo = typeDisplayMap[update.type] || typeDisplayMap.default
  const priorityInfo = priorityDisplayMap[update.priority] || priorityDisplayMap.default

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader className="pr-10">
          <DialogTitle className="text-xl md:text-2xl font-bold leading-tight">{update.title}</DialogTitle>
          <div className="flex flex-wrap gap-2 items-center pt-2">
            <Badge variant="secondary" className={`text-xs ${typeInfo.className}`}>
              <typeInfo.icon className="w-3.5 h-3.5 mr-1.5" />
              {typeInfo.label}
            </Badge>
            <Badge variant="outline" className={`text-xs ${priorityInfo.className}`}>
               <priorityInfo.icon className="w-3.5 h-3.5 mr-1.5" />
              {priorityInfo.label}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="py-1 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <DialogDescription className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
            {update.description || "No detailed description available."}
          </DialogDescription>
        </div>

        <div className="text-xs text-gray-500 flex items-center mt-2">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>Published on: {new Date(update.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t sm:justify-between">
          {update.link_url && (
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={update.link_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Original Link
              </a>
            </Button>
          )}
          <DialogClose asChild>
            <Button type="button" className="w-full sm:w-auto mt-2 sm:mt-0">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}