import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Award,
  Users,
  Target,
  Heart,
  BookOpen,
  Globe,
  Calendar,
  TrendingUp,
  Shield,
  Star,
  Building,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as homepage */}
     

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">🇮🇳 About Sunrise Edu Group</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              15 Years of Educational
              <span className="text-orange-600"> Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Since 2009, we have been nurturing young minds and shaping futures through quality education, values-based
              learning, and holistic development in the heart of Rajasthan.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Our Journey</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From Humble Beginnings to Educational Excellence
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2009 - The Foundation</h3>
                    <p className="text-gray-600">
                      Started with a vision to provide quality education in Sikar, Rajasthan. Our journey began with
                      Sunrise International Public School, focusing on CBSE curriculum and holistic development.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2012-2015 - Expansion</h3>
                    <p className="text-gray-600">
                      Expanded our educational ecosystem with the establishment of Sunrise College for Higher Studies
                      and Sunrise Foundation Academy for competitive exam preparation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2018 - Professional Education</h3>
                    <p className="text-gray-600">
                      Launched Sunrise Pharmacy College to meet the growing demand for healthcare professionals,
                      providing PCI-approved pharmacy education with modern facilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2024 - Continued Excellence</h3>
                    <p className="text-gray-600">
                      Today, we stand as one of Rajasthan's leading educational groups with over 5000 students and a
                      legacy of academic excellence spanning 15 years.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/about.png" // Ensure 'about.png' exists in your /public directory
                alt="Sunrise Edu Group Campus"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Our Purpose</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission, Vision & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guiding principles that drive our commitment to educational excellence and student success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide world-class education that nurtures intellectual curiosity, builds character, and prepares
                  students for success in an ever-changing global landscape while staying rooted in Indian values.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the most trusted and respected educational institution in Rajasthan, known for academic
                  excellence, innovation in teaching, and producing confident, capable, and compassionate global
                  citizens.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Excellence in education, integrity in conduct, respect for diversity, commitment to innovation, and
                  dedication to the holistic development of every student who walks through our doors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Leadership</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced educators and administrators dedicated to student success and institutional excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Chairman"
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mr. B L  Bhamu</h3>
                <p className="text-orange-600 font-medium mb-3">Chairman & Founder</p>
                <p className="text-gray-600 text-sm">
                  Visionary leader with 25+ years in education. PhD in Educational Administration from Rajasthan
                  University.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Principal"
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mr. Nandkishor Bhamu</h3>
                <p className="text-blue-600 font-medium mb-3">Director, School Division</p>
                <p className="text-gray-600 text-sm">
                  M.Ed with 20 years of teaching experience. Expert in CBSE curriculum and student development.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Director"
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mr. Prabhudhayal</h3>
                <p className="text-green-600 font-medium mb-3">Secretory, Higher Education</p>
                <p className="text-gray-600 text-sm">
                  PhD in Pharmacy with 15 years in higher education. Specialist in professional course development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white text-gray-800 border-gray-200 mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique advantages that set Sunrise Edu Group apart from other educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Track Record</h3>
              <p className="text-gray-600 text-sm">15 years of consistent academic excellence and student success</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Faculty</h3>
              <p className="text-gray-600 text-sm">
                Highly qualified and experienced teachers committed to student growth
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Infrastructure</h3>
              <p className="text-gray-600 text-sm">State-of-the-art facilities and technology-enabled learning</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Holistic Development</h3>
              <p className="text-gray-600 text-sm">Focus on academics, sports, arts, and character building</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}
