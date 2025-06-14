import { GraduationCap, MapPin, Phone, Mail, Globe, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Education Excellence</h3>
                <p className="text-xs text-gray-400">Igniting Futures</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Leading educational institution in Sikar, Rajasthan, providing quality education from school to
              professional courses.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Institutions</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/institutions/school" className="hover:text-orange-400 transition-colors">
                  International Public School
                </Link>
              </li>
              <li>
                <Link href="/institutions/college" className="hover:text-orange-400 transition-colors">
                  College for Higher Studies
                </Link>
              </li>
              <li>
                <Link href="/institutions/pharmacy" className="hover:text-orange-400 transition-colors">
                  Pharmacy College
                </Link>
              </li>
              <li>
                <Link href="/institutions/foundation" className="hover:text-orange-400 transition-colors">
                  Foundation Academy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/admissions" className="hover:text-orange-400 transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-orange-400 transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-orange-400 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-orange-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="hover:text-orange-400 transition-colors">
                  Alumni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center group">
                <MapPin className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm group-hover:text-orange-400 transition-colors">Necchwa, Sikar, Rajasthan 332001</span>
              </div>
              <div className="flex items-center group">
                <Phone className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm group-hover:text-orange-400 transition-colors">+91 98765 43210</span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm group-hover:text-orange-400 transition-colors">info@sunriseedu.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved. | Designed with{" "}
            <span className="text-red-500">❤️</span> for Education
          </p>
        </div>
      </div>
    </footer>
  )
}
