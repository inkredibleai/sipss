import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users } from "lucide-react"

export default function ResourcesHero() {
  return (
    <section className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">📚 Free Educational Resources</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Unlock Your
            <span className="text-orange-600"> Academic</span>
            <span className="text-blue-600"> Potential</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Access thousands of free mock papers, past question papers, and comprehensive career guidance resources.
            Everything you need to excel in your studies and plan your future career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              <FileText className="w-5 h-5 mr-2" />
              Browse Mock Papers
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Users className="w-5 h-5 mr-2" />
              Career Guidance
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">Mock Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600">Past Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Career Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Free Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
