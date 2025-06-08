"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight, Megaphone, GraduationCap, Award, Building } from "lucide-react"
import Link from "next/link"
import type { QuickUpdate } from "@/lib/supabase/types"

interface QuickUpdatesSectionProps {
  updates: QuickUpdate[]
}

const typeIcons = {
  admission: GraduationCap,
  course: Building,
  scholarship: Award,
  facility: Building,
  announcement: Megaphone,
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function QuickUpdatesSection({ updates }: QuickUpdatesSectionProps) {
  if (!updates.length) return null

  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Updates</h2>
            <p className="text-gray-600">Stay informed with our latest announcements and opportunities</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/updates">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.slice(0, 6).map((update) => {
            const IconComponent = typeIcons[update.type] || Megaphone

            return (
              <Card key={update.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <Badge variant="secondary" className="capitalize">
                        {update.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <Badge className={priorityColors[update.priority]}>{update.priority}</Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{update.title}</h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{update.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(update.created_at).toLocaleDateString()}
                    </div>

                    {update.link_url && (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={update.link_url}>
                          Learn More <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
