import { Button } from "@/components/ui/button"
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import ResourcesHero from "@/components/resources/resources-hero"
import MockPapersSection from "@/components/resources/mock-papers-section"
import CareerGuidanceSection from "@/components/resources/career-guidance-section"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     

      {/* Hero Section */}
      <ResourcesHero />

      {/* Mock Papers Section */}
      <MockPapersSection />

      {/* Career Guidance Section */}
      

      {/* Footer */}
   
    </div>
  )
}
