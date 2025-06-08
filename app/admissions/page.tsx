import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  FileText,
  Calendar,
  CreditCard,
  Download,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Calculator,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import AdmissionForm from "@/components/admission-form"

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">📝 Admissions Open 2024-25</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Start Your Journey with
              <span className="text-orange-600"> Sunrise</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Join thousands of successful students who chose Sunrise Edu Group for their bright future. Simple
              application process, transparent admission criteria, and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <FileText className="w-5 h-5 mr-2" />
                Apply Online
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Simple Process</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to secure your admission at Sunrise Edu Group
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fill Application</h3>
                <p className="text-gray-600">
                  Complete the online application form with accurate personal and academic details
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Documents</h3>
                <p className="text-gray-600">
                  Upload required documents including mark sheets, certificates, and photographs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pay Application Fee</h3>
                <p className="text-gray-600">Pay the application fee securely through our online payment gateway</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Confirmation</h3>
                <p className="text-gray-600">
                  Receive admission confirmation and further instructions via email and SMS
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Institution-wise Admission Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Admission Details</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Institution-wise Requirements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specific admission criteria and requirements for each of our institutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* School */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">International Public School</h3>
                    <p className="text-orange-600 font-medium">CBSE Classes I-XII</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Class I: Age 6+ years as on March 31st</li>
                      <li>• Classes II-XII: Previous class pass certificate</li>
                      <li>• Transfer certificate from previous school</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Birth certificate</li>
                      <li>• Previous academic records</li>
                      <li>• Transfer certificate</li>
                      <li>• Passport size photographs</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Application Fee:</span>
                      <span className="text-lg font-bold text-orange-600 ml-2">₹500</span>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* College */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">College for Higher Studies</h3>
                    <p className="text-blue-600 font-medium">BA/B.Sc Programs</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 12th pass from recognized board</li>
                      <li>• Minimum 50% marks in qualifying exam</li>
                      <li>• Subject-specific requirements for specializations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 10th & 12th mark sheets</li>
                      <li>• Transfer/Migration certificate</li>
                      <li>• Character certificate</li>
                      <li>• Passport size photographs</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Application Fee:</span>
                      <span className="text-lg font-bold text-blue-600 ml-2">₹1,000</span>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pharmacy College</h3>
                    <p className="text-green-600 font-medium">D.Pharma/B.Pharma</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• D.Pharma: 12th with PCM/PCB (50% marks)</li>
                      <li>• B.Pharma: 12th with PCM/PCB (55% marks)</li>
                      <li>• Valid entrance exam score (if applicable)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 10th & 12th mark sheets</li>
                      <li>• Entrance exam scorecard</li>
                      <li>• Medical fitness certificate</li>
                      <li>• Caste certificate (if applicable)</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Application Fee:</span>
                      <span className="text-lg font-bold text-green-600 ml-2">₹1,500</span>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Foundation */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Foundation Academy</h3>
                    <p className="text-purple-600 font-medium">IIT-JEE/NEET Coaching</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Class 11th/12th students</li>
                      <li>• 12th pass students (for dropper batch)</li>
                      <li>• Minimum 60% in 10th/12th</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 10th & 12th mark sheets</li>
                      <li>• School leaving certificate</li>
                      <li>• Entrance test scorecard</li>
                      <li>• Passport size photographs</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Application Fee:</span>
                      <span className="text-lg font-bold text-purple-600 ml-2">₹800</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AdmissionForm />
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white text-gray-800 border-gray-200 mb-4">Important Dates</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Timeline 2024-25</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with important admission dates and deadlines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Application Start</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">March 1, 2024</p>
                <p className="text-sm text-gray-600">Online applications begin</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Application Deadline</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">May 31, 2024</p>
                <p className="text-sm text-gray-600">Last date to apply</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Counseling</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">June 1-15, 2024</p>
                <p className="text-sm text-gray-600">Admission counseling</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Classes Begin</h3>
                <p className="text-2xl font-bold text-purple-600 mb-2">July 1, 2024</p>
                <p className="text-sm text-gray-600">Academic session starts</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact for Admissions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Need Help?</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our admission counselors are here to help you with any questions about the application process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our admission counselors</p>
                <p className="text-lg font-semibold text-orange-600">+91 98765 43210</p>
                <p className="text-sm text-gray-500">Mon-Sat: 9 AM - 6 PM</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-4">Send your queries via email</p>
                <p className="text-lg font-semibold text-blue-600">admissions@sunriseedu.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Campus</h3>
                <p className="text-gray-600 mb-4">Schedule a campus tour</p>
                <p className="text-lg font-semibold text-green-600">Necchwa, Sikar</p>
                <p className="text-sm text-gray-500">Rajasthan 332001</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
   
    </div>
  )
}
