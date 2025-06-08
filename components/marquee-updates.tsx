"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { getQuickUpdates } from "@/lib/supabase/queries"
import type { QuickUpdate } from "@/lib/supabase/types"
import { TrendingUp } from "lucide-react"
import { UpdateDetailModal } from "@/components/update-detail-modal" // Import the modal

const typeBadgeMap: Record<string, { label: string; className: string }> = {
  admission: { label: "Admission", className: "bg-red-100 text-red-800" },
  course: { label: "Course", className: "bg-blue-100 text-blue-800" },
  scholarship: { label: "Scholarship", className: "bg-green-100 text-green-800" },
  facility: { label: "Facility", className: "bg-amber-100 text-amber-800" },
  announcement: { label: "Announcement", className: "bg-purple-100 text-purple-800" },
  default: { label: "Update", className: "bg-gray-100 text-gray-800" },
}

export function MarqueeUpdates() {
  const [updates, setUpdates] = useState<QuickUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUpdate, setSelectedUpdate] = useState<QuickUpdate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function loadUpdates() {
      try {
        const data = await getQuickUpdates()
        // Take a limited number of recent updates for the marquee
        setUpdates(data.slice(0, 10))
      } catch (error) {
        console.error("Error loading updates for marquee:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadUpdates()
  }, [])

  const handleReadMoreClick = (update: QuickUpdate) => {
    setSelectedUpdate(update)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-2.5 text-sm text-center animate-pulse">
        Loading Latest Updates...
      </div>
    )
  }

  if (updates.length === 0) {
    return null
  }

  const marqueeContent = (
    <>
      {updates.map((update, index) => (
        <div
          key={`${update.id}-${index}-marquee`}
          className="mx-4 inline-flex items-center flex-shrink-0"
        >
          {update.priority === "high" && (
            <TrendingUp className="w-4 h-4 mr-1.5 text-yellow-300 flex-shrink-0" />
          )}
          <Badge
            variant="secondary"
            className={`text-xs px-1.5 py-0.5 mr-2 ${
              (typeBadgeMap[update.type] || typeBadgeMap.default).className
            } opacity-90 flex-shrink-0`}
          >
            {(typeBadgeMap[update.type] || typeBadgeMap.default).label}
          </Badge>
          <span className="text-sm font-medium truncate max-w-xs" title={update.title}>{update.title}</span>
          {update.link_url && (
            <button
              onClick={() => handleReadMoreClick(update)}
              className="ml-2 text-xs underline hover:text-yellow-300 transition-colors flex-shrink-0 cursor-pointer"
            >
              Read More
            </button>
          )}
          {index < updates.length - 1 && (
            <span className="mx-4 text-gray-300 opacity-50 flex-shrink-0">|</span>
          )}
        </div>
      ))}
    </>
  )

  const animationDuration = Math.max(20, updates.length * 6); // Adjust speed: 6 seconds per item, min 20s

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-2.5 overflow-hidden group border-b border-white/20 shadow-md">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee-scroll group-hover:[animation-play-state:paused] flex-shrink-0">
            {marqueeContent}
          </div>
          <div className="animate-marquee-scroll group-hover:[animation-play-state:paused] flex-shrink-0" aria-hidden="true"> {/* Duplicate for seamless loop */}
            {marqueeContent}
          </div>
        </div>
        <style jsx global>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee-scroll {
            animation: marquee-scroll ${animationDuration}s linear infinite;
          }
        `}</style>
      </div>
      <UpdateDetailModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} update={selectedUpdate} />
    </>
  )
}