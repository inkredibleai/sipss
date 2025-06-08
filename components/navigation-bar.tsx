import { Button } from "@/components/ui/button"
import { GraduationCap, ChevronRight, Menu } from "lucide-react"
import Link from "next/link"

export function NavigationBar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-orange-500/20 backdrop-blur-sm bg-white/90 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Sunrise Edu Group Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                Sunrise Edu Group
              </h1>
              <p className="text-xs text-orange-600">School | College | Coachings</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-orange-600 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-600 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              About Us
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-orange-600 font-medium flex items-center px-3 py-2 rounded-lg group-hover:bg-orange-50 transition-all">
                Our Institutions <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:rotate-90" />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top">
                <Link href="/institutions/school" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                  International Public School
                </Link>
                <Link href="/institutions/college" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                  College for Higher Studies
                </Link>
                <Link href="/institutions/pharmacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                  Pharmacy College
                </Link>
                <Link href="/institutions/foundation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                  Foundation Academy
                </Link>
              </div>
            </div>
            <Link 
              href="/admissions" 
              className="text-gray-700 hover:text-orange-600 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              Admissions
            </Link>
            <Link 
              href="/achievements" 
              className="text-gray-700 hover:text-orange-600 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              Achievements
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-700 hover:text-orange-600 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              Resources
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-orange-600 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-105"
              asChild
            >
              <Link href="/admissions">Apply Now</Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="lg:hidden hover:bg-orange-50 hover:text-orange-600 transition-all"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
