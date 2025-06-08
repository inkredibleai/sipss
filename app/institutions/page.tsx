import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  BookOpen,
  Calculator,
  Stethoscope,
  Award,
  Users,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Target,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">🏫 Our Educational Ecosystem</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Four Pillars of
              <span className="text-orange-600"> Educational</span>
              <span className="text-blue-600"> Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From foundational learning to professional expertise, discover our comprehensive range of educational
              institutions designed to nurture students at every stage of their academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Institutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16">
            {/* School */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Sunrise International Public School"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white p-3 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Badge className="absolute bottom-4 right-4 bg-white text-orange-600 border-orange-200">
                  CBSE Affiliated
                </Badge>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Sunrise International Public School</h2>
                    <p className="text-orange-600 font-medium">CBSE Affiliated • Classes I-XII</p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 mb-6">
                  Our flagship institution providing world-class CBSE education with a focus on academic excellence,
                  character building, and holistic development of students.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Classes I-XII (CBSE)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">2000+ Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">100% Board Results</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Since 2009</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Smart classrooms with digital learning tools</li>
                    <li>• Comprehensive sports and arts programs</li>
                    <li>• Experienced CBSE-trained faculty</li>
                    <li>• Regular parent-teacher interactions</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Learn More <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-orange-600 text-orange-600">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            {/* College */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Sunrise College for Higher Studies"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white p-3 rounded-xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <Badge className="absolute bottom-4 right-4 bg-white text-blue-600 border-blue-200">
                  University Affiliated
                </Badge>
              </div>
              <div className="lg:order-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Sunrise College for Higher Studies</h2>
                    <p className="text-blue-600 font-medium">University Affiliated • BA/B.Sc Programs</p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 mb-6">
                  Comprehensive undergraduate education in Arts and Science streams with industry exposure, research
                  opportunities, and career-oriented skill development.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">BA, B.Sc Programs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">1500+ Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">95% Pass Rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Since 2012</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Available Courses:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Bachelor of Arts (BA) - Multiple Specializations</li>
                    <li>• Bachelor of Science (B.Sc) - PCM, PCB, Computer Science</li>
                    <li>• Industry internships and placement support</li>
                    <li>• Research projects and academic excellence programs</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Learn More <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Pharmacy College */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Sunrise Pharmacy College"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white p-3 rounded-xl">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <Badge className="absolute bottom-4 right-4 bg-white text-green-600 border-green-200">
                  PCI Approved
                </Badge>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Sunrise Pharmacy College</h2>
                    <p className="text-green-600 font-medium">PCI Approved • D.Pharma/B.Pharma</p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 mb-6">
                  Professional pharmacy education with state-of-the-art laboratories, clinical training, and industry
                  partnerships to prepare competent healthcare professionals.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">D.Pharma, B.Pharma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">800+ Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">90% Placement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Since 2018</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Modern pharmaceutical laboratories and equipment</li>
                    <li>• Clinical training in partner hospitals</li>
                    <li>• Industry internships with leading pharma companies</li>
                    <li>• Research opportunities in drug development</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Learn More <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Foundation Academy */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Sunrise Foundation Academy"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white p-3 rounded-xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <Badge className="absolute bottom-4 right-4 bg-white text-purple-600 border-purple-200">
                  Expert Coaching
                </Badge>
              </div>
              <div className="lg:order-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Sunrise Foundation Academy</h2>
                    <p className="text-purple-600 font-medium">Competitive Exam Coaching • IIT-JEE/NEET</p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 mb-6">
                  Specialized coaching institute for IIT-JEE, NEET, and other competitive examinations with expert
                  faculty, proven methodologies, and outstanding results.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">IIT-JEE, NEET Prep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">700+ Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">150+ Selections</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Since 2015</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Coaching Programs:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• IIT-JEE Main & Advanced preparation</li>
                    <li>• NEET (Medical entrance) coaching</li>
                    <li>• Foundation courses for Classes 8-10</li>
                    <li>• Regular mock tests and performance analysis</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Learn More <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-purple-600 text-purple-600">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Quick Comparison</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare our institutions to find the perfect fit for your educational goals
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-orange-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Institution</th>
                  <th className="px-6 py-4 text-left">Programs</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Students</th>
                  <th className="px-6 py-4 text-left">Established</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">International Public School</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">CBSE Classes I-XII</td>
                  <td className="px-6 py-4">12 Years</td>
                  <td className="px-6 py-4">2000+</td>
                  <td className="px-6 py-4">2009</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">College for Higher Studies</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">BA, B.Sc</td>
                  <td className="px-6 py-4">3 Years</td>
                  <td className="px-6 py-4">1500+</td>
                  <td className="px-6 py-4">2012</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Pharmacy College</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">D.Pharma, B.Pharma</td>
                  <td className="px-6 py-4">2-4 Years</td>
                  <td className="px-6 py-4">800+</td>
                  <td className="px-6 py-4">2018</td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Calculator className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Foundation Academy</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">IIT-JEE, NEET Coaching</td>
                  <td className="px-6 py-4">1-2 Years</td>
                  <td className="px-6 py-4">700+</td>
                  <td className="px-6 py-4">2015</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}
