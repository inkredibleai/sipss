import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Trophy,
  Award,
  Star,
  TrendingUp,
  Users,
  Target,
  Medal,
  BookOpen,
  Calculator,
  Stethoscope,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
  

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">🏆 Our Achievements</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              15 Years of
              <span className="text-orange-600"> Excellence</span> and
              <span className="text-blue-600"> Success</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Celebrating outstanding academic achievements, competitive exam success, and the remarkable
              accomplishments of our students across all institutions since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Success by Numbers</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Track Record</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak for our commitment to educational excellence and student success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Trophy className="w-10 h-10 text-orange-600" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">CBSE Pass Rate</div>
                <div className="text-sm text-gray-600">Consistent excellence in board examinations</div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">IIT/NEET Selections</div>
                <div className="text-sm text-gray-600">Students qualified in top competitive exams</div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Graduates Placed</div>
                <div className="text-sm text-gray-600">Successful career placements across industries</div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Awards Won</div>
                <div className="text-sm text-gray-600">Recognition for educational excellence</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Institution-wise Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Institution Excellence</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Across All Institutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of our institutions has achieved remarkable milestones in their respective domains
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* School Achievements */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">International Public School</h3>
                    <p className="text-orange-600 font-medium">CBSE Excellence</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">100%</div>
                      <div className="text-xs text-gray-600">Board Pass Rate</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">95+%</div>
                      <div className="text-xs text-gray-600">Students Above 90%</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">15</div>
                      <div className="text-xs text-gray-600">State Toppers</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Recent Highlights:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-orange-500 mr-2" />
                        Rajasthan State Topper in Science Stream 2024
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-orange-500 mr-2" />
                        100% pass rate for 5 consecutive years
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-orange-500 mr-2" />
                        Best CBSE School Award - Sikar District
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-orange-500 mr-2" />
                        Excellence in Sports and Cultural Activities
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Foundation Academy Achievements */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Foundation Academy</h3>
                    <p className="text-purple-600 font-medium">Competitive Exam Success</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">85</div>
                      <div className="text-xs text-gray-600">IIT Selections</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">65</div>
                      <div className="text-xs text-gray-600">NEET Qualifiers</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">AIR 47</div>
                      <div className="text-xs text-gray-600">Best JEE Rank</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Notable Achievements:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Medal className="w-4 h-4 text-purple-500 mr-2" />
                        AIR 47 in JEE Advanced 2024
                      </li>
                      <li className="flex items-center">
                        <Medal className="w-4 h-4 text-purple-500 mr-2" />
                        85% success rate in IIT-JEE
                      </li>
                      <li className="flex items-center">
                        <Medal className="w-4 h-4 text-purple-500 mr-2" />
                        Top coaching institute in Sikar region
                      </li>
                      <li className="flex items-center">
                        <Medal className="w-4 h-4 text-purple-500 mr-2" />
                        Expert faculty from IIT/NIT backgrounds
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* College Achievements */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">College for Higher Studies</h3>
                    <p className="text-blue-600 font-medium">Academic Excellence</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <div className="text-xs text-gray-600">Pass Rate</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">200+</div>
                      <div className="text-xs text-gray-600">Graduates/Year</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">80%</div>
                      <div className="text-xs text-gray-600">Placement Rate</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Accomplishments:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                        University topper in B.Sc Computer Science
                      </li>
                      <li className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                        Excellence in research projects
                      </li>
                      <li className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                        Strong industry partnerships
                      </li>
                      <li className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                        Active alumni network
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy College Achievements */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pharmacy College</h3>
                    <p className="text-green-600 font-medium">Professional Excellence</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">90%</div>
                      <div className="text-xs text-gray-600">Placement Rate</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">150+</div>
                      <div className="text-xs text-gray-600">Industry Partners</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">PCI</div>
                      <div className="text-xs text-gray-600">Approved</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Professional Success:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Award className="w-4 h-4 text-green-500 mr-2" />
                        Top pharmacy college in Rajasthan
                      </li>
                      <li className="flex items-center">
                        <Award className="w-4 h-4 text-green-500 mr-2" />
                        100% placement in leading pharma companies
                      </li>
                      <li className="flex items-center">
                        <Award className="w-4 h-4 text-green-500 mr-2" />
                        State-of-the-art laboratory facilities
                      </li>
                      <li className="flex items-center">
                        <Award className="w-4 h-4 text-green-500 mr-2" />
                        Research publications in international journals
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Awards & Recognition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-4">Awards & Recognition</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Honors & Accolades</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition from government bodies, educational boards, and industry organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Trophy className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Best Educational Institution</h3>
                  <p className="text-yellow-600 font-medium mb-3">Rajasthan Education Board - 2024</p>
                  <p className="text-gray-600 text-sm">
                    Recognized for outstanding contribution to education and consistent academic excellence
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence in CBSE Results</h3>
                  <p className="text-blue-600 font-medium mb-3">CBSE Regional Office - 2023</p>
                  <p className="text-gray-600 text-sm">
                    Awarded for maintaining 100% pass rate and exceptional student performance
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Medal className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Top Coaching Institute</h3>
                  <p className="text-green-600 font-medium mb-3">Education Today - 2024</p>
                  <p className="text-gray-600 text-sm">
                    Ranked among top 10 coaching institutes in Rajasthan for IIT-JEE preparation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white text-gray-800 border-gray-200 mb-4">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proud Alumni</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet some of our successful alumni who are making their mark in various fields
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Arjun Sharma"
                    width={120}
                    height={120}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Arjun Sharma</h3>
                  <p className="text-orange-600 font-medium mb-3">IIT Delhi, Computer Science</p>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    "Sunrise Foundation Academy's rigorous training and expert faculty helped me crack JEE with AIR 47.
                    The personalized attention made all the difference."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Priya Agarwal"
                    width={120}
                    height={120}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Priya Agarwal</h3>
                  <p className="text-green-600 font-medium mb-3">Senior Pharmacist, Apollo Hospitals</p>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    "The practical training and industry exposure at Sunrise Pharmacy College prepared me well for my
                    career in healthcare. Grateful for the strong foundation."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Rahul Meena"
                    width={120}
                    height={120}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Rahul Meena</h3>
                  <p className="text-blue-600 font-medium mb-3">AIIMS Delhi, Medicine</p>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    "From CBSE to NEET preparation, Sunrise has been my academic home. The integrated approach and
                    dedicated teachers made my medical dream come true."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our Success Story?</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of our legacy of excellence and achieve your academic dreams with Sunrise Edu Group
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <GraduationCap className="w-5 h-5 mr-2" />
              Apply for Admission
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Campus Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  )
}
