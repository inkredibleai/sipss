"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Phone, Mail, Globe, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Institution } from "@/lib/supabase/types"

interface InstitutionsSectionProps {
  institutions: Institution[]
}

export function InstitutionsSection({ institutions }: InstitutionsSectionProps) {
  if (!institutions.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">No institutions found.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Institutions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our network of educational institutions committed to excellence in learning and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {institutions.map((institution) => (
            <Card key={institution.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={institution.logo_url || "/placeholder.svg?height=48&width=48"}
                      alt={`${institution.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{institution.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {institution.code}
                    </Badge>
                  </div>
                </div>

                {institution.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{institution.description}</p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 line-clamp-2">{institution.address}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{institution.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">{institution.email}</span>
                  </div>

                  {institution.established_year && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Est. {institution.established_year}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/institutions/${institution.code.toLowerCase()}`}>
                      <Building className="h-3 w-3 mr-1" />
                      View Details
                    </Link>
                  </Button>

                  {institution.website && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={institution.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
