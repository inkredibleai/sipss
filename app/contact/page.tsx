import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Phone, Mail, Clock, Navigation } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">📞 Get in Touch</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Contact
              <span className="text-orange-600"> Sunrise</span>
              <span className="text-blue-600"> Edu Group</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about admissions, courses, or campus life? We're here to help! Reach out to us through any
              of the channels below or visit our campus in Sikar, Rajasthan.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Contact Information</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us for all your educational needs and queries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Our Campus</h3>
                <p className="text-gray-600 mb-4">
                  Sunrise Edu Group
                  <br />
                  Necchwa, Sikar
                  <br />
                  Rajasthan 332001
                  <br />
                  India
                </p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Main Office: +91 98765 43210
                  <br />
                  Admissions: +91 98765 43211
                  <br />
                  Principal: +91 98765 43212
                  <br />
                  Emergency: +91 98765 43213
                </p>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  General: info@sunriseedu.com
                  <br />
                  Admissions: admissions@sunriseedu.com
                  <br />
                  Principal: principal@sunriseedu.com
                  <br />
                  Careers: careers@sunriseedu.com
                </p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Office Hours</h3>
                <p className="text-gray-600 mb-4">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 9:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                  <br />
                  Holidays: As per calendar
                </p>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  <Clock className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Institution-wise Contact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Department Contacts</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Institution-wise Contact Details</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Direct contact information for each of our educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">International Public School</h3>
                    <p className="text-orange-600 font-medium">CBSE Classes I-XII</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Principal Office</p>
                      <p className="text-gray-600">+91 98765 43220</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">School Email</p>
                      <p className="text-gray-600">school@sunriseedu.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Main Campus, Block A</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Dean Office</p>
                      <p className="text-gray-600">+91 98765 43221</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">College Email</p>
                      <p className="text-gray-600">college@sunriseedu.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Main Campus, Block B</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pharmacy College</h3>
                    <p className="text-green-600 font-medium">D.Pharma/B.Pharma</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">Director Office</p>
                      <p className="text-gray-600">+91 98765 43222</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">Pharmacy Email</p>
                      <p className="text-gray-600">pharmacy@sunriseedu.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Main Campus, Block C</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Foundation Academy</h3>
                    <p className="text-purple-600 font-medium">IIT-JEE/NEET Coaching</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">Head Office</p>
                      <p className="text-gray-600">+91 98765 43223</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">Foundation Email</p>
                      <p className="text-gray-600">foundation@sunriseedu.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Main Campus, Block D</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Find Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Campus Location</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Sikar, Rajasthan, our campus is easily accessible by road and public transport
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Reach Us</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Navigation className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">By Road</h4>
                    <p className="text-gray-600">
                      Located on the main Sikar-Jaipur highway, easily accessible by private vehicle, bus, or taxi.
                      Ample parking space available on campus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Public Transport</h4>
                    <p className="text-gray-600">
                      Regular bus services from Jaipur, Delhi, and other major cities. Local buses and auto-rickshaws
                      available from Sikar bus stand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Distance</h4>
                    <p className="text-gray-600">
                      5 km from Sikar city center
                      <br />
                      110 km from Jaipur
                      <br />
                      280 km from Delhi
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-blue-600 text-white">
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions on Google Maps
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">Sunrise Edu Group Campus</p>
                  <p className="text-sm text-gray-500">Necchwa, Sikar, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
  
    </div>
  )
}
