import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  Star,
  Building,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Institution data mapping
const institutionData = {
  "international-public-school": {
    id: "school",
    name: "Sunrise International Public School",
    shortName: "International Public School",
    code: "IPS",
    type: "School",
    affiliation: "CBSE Affiliated",
    classes: "Classes I-XII",
    icon: BookOpen,
    color: "orange",
    description:
      "Our flagship institution providing world-class CBSE education with a focus on academic excellence, character building, and holistic development of students.",
    established: "2009",
    students: "2000+",
    successRate: "100% Board Results",
    features: [
      "Smart classrooms with digital learning tools",
      "Comprehensive sports and arts programs",
      "Experienced CBSE-trained faculty",
      "Regular parent-teacher interactions",
      "State-of-the-art laboratories",
      "Library with 10,000+ books",
    ],
    programs: [
      { name: "Primary Education", classes: "Classes I-V", description: "Foundation building with play-way method" },
      { name: "Middle School", classes: "Classes VI-VIII", description: "Conceptual learning with practical approach" },
      { name: "Secondary", classes: "Classes IX-X", description: "Board preparation with career guidance" },
      {
        name: "Senior Secondary",
        classes: "Classes XI-XII",
        description: "Stream specialization (Science/Commerce/Arts)",
      },
    ],
    facilities: [
      "Smart Classrooms",
      "Science Laboratories",
      "Computer Lab",
      "Library",
      "Sports Complex",
      "Art & Music Room",
      "Cafeteria",
      "Medical Room",
    ],
    achievements: [
      "100% Pass Rate in CBSE Boards",
      "State Topper in Mathematics",
      "Best School Award 2023",
      "Excellence in Sports",
    ],
  },
  "college-higher-studies": {
    id: "college",
    name: "Sunrise College for Higher Studies",
    shortName: "College for Higher Studies",
    code: "CHS",
    type: "College",
    affiliation: "University Affiliated",
    classes: "BA/B.Sc Programs",
    icon: GraduationCap,
    color: "blue",
    description:
      "Comprehensive undergraduate education in Arts and Science streams with industry exposure, research opportunities, and career-oriented skill development.",
    established: "2012",
    students: "1500+",
    successRate: "95% Pass Rate",
    features: [
      "Industry internships and placement support",
      "Research projects and academic excellence programs",
      "Modern laboratories and equipment",
      "Experienced faculty with PhD qualifications",
      "Career counseling and guidance",
      "Digital library access",
    ],
    programs: [
      { name: "Bachelor of Arts", classes: "3 Years", description: "Multiple specializations available" },
      { name: "Bachelor of Science", classes: "3 Years", description: "PCM, PCB, Computer Science streams" },
      { name: "Commerce Stream", classes: "3 Years", description: "Accounting, Economics, Business Studies" },
    ],
    facilities: [
      "Modern Classrooms",
      "Research Labs",
      "Digital Library",
      "Computer Center",
      "Seminar Halls",
      "Student Common Room",
      "Placement Cell",
      "Hostel Facility",
    ],
    achievements: ["95% Placement Record", "University Rank Holders", "Research Publications", "Industry Partnerships"],
  },
  "pharmacy-college": {
    id: "pharmacy",
    name: "Sunrise Pharmacy College",
    shortName: "Pharmacy College",
    code: "PC",
    type: "Professional College",
    affiliation: "PCI Approved",
    classes: "D.Pharma/B.Pharma",
    icon: Stethoscope,
    color: "green",
    description:
      "Professional pharmacy education with state-of-the-art laboratories, clinical training, and industry partnerships to prepare competent healthcare professionals.",
    established: "2018",
    students: "800+",
    successRate: "90% Placement",
    features: [
      "Modern pharmaceutical laboratories and equipment",
      "Clinical training in partner hospitals",
      "Industry internships with leading pharma companies",
      "Research opportunities in drug development",
      "PCI approved curriculum",
      "Experienced faculty from industry",
    ],
    programs: [
      { name: "Diploma in Pharmacy", classes: "2 Years", description: "D.Pharma with practical training" },
      { name: "Bachelor of Pharmacy", classes: "4 Years", description: "B.Pharma with research opportunities" },
      { name: "Industrial Training", classes: "6 Months", description: "Hands-on industry experience" },
    ],
    facilities: [
      "Pharmaceutical Labs",
      "Research Center",
      "Drug Testing Lab",
      "Clinical Training",
      "Industry Partnerships",
      "Modern Equipment",
      "Placement Cell",
      "Hospital Tie-ups",
    ],
    achievements: ["90% Placement Rate", "Industry Partnerships", "Research Publications", "PCI Recognition"],
  },
  "foundation-academy": {
    id: "foundation",
    name: "Sunrise Foundation Academy",
    shortName: "Foundation Academy",
    code: "FA",
    type: "Coaching Institute",
    affiliation: "Expert Coaching",
    classes: "IIT-JEE/NEET",
    icon: Calculator,
    color: "purple",
    description:
      "Specialized coaching institute for IIT-JEE, NEET, and other competitive examinations with expert faculty, proven methodologies, and outstanding results.",
    established: "2015",
    students: "700+",
    successRate: "150+ Selections",
    features: [
      "IIT-JEE Main & Advanced preparation",
      "NEET (Medical entrance) coaching",
      "Foundation courses for Classes 8-10",
      "Regular mock tests and performance analysis",
      "Expert faculty from IITs/NITs",
      "Small batch sizes for personal attention",
    ],
    programs: [
      { name: "IIT-JEE Preparation", classes: "2 Years", description: "Main & Advanced coaching" },
      { name: "NEET Coaching", classes: "2 Years", description: "Medical entrance preparation" },
      { name: "Foundation Course", classes: "Classes 8-10", description: "Early preparation program" },
      { name: "Crash Course", classes: "6 Months", description: "Intensive revision program" },
    ],
    facilities: [
      "AC Classrooms",
      "Digital Teaching",
      "Test Series",
      "Study Material",
      "Doubt Clearing",
      "Performance Analysis",
      "Parent Meetings",
      "Online Portal",
    ],
    achievements: [
      "150+ IIT/NIT Selections",
      "200+ Medical Selections",
      "Top Rankers Every Year",
      "Expert Faculty Team",
    ],
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function InstitutionPage({ params }: PageProps) {
  const { slug } = params
  const institution = institutionData[slug as keyof typeof institutionData]

  if (!institution) {
    notFound()
  }

  const IconComponent = institution.icon
  const colorClasses = {
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
      border: "border-orange-600",
      gradient: "from-orange-50 to-orange-100",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-600",
      gradient: "from-blue-50 to-blue-100",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-600",
      gradient: "from-green-50 to-green-100",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      border: "border-purple-600",
      gradient: "from-purple-50 to-purple-100",
    },
  }

  const colors = colorClasses[institution.color as keyof typeof colorClasses]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
    

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/institutions" className="text-gray-600 hover:text-orange-600">
              Institutions
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{institution.shortName}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r ${colors.gradient} py-20`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center`}>
                  <IconComponent className={`w-10 h-10 ${colors.text}`} />
                </div>
                <div>
                  <Badge className={`${colors.bg} ${colors.text} border-${institution.color}-200 mb-2`}>
                    {institution.affiliation}
                  </Badge>
                  <h1 className="text-4xl font-bold text-gray-900">{institution.name}</h1>
                  <p className={`${colors.text} font-medium text-lg`}>{institution.classes}</p>
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{institution.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Target className={`w-6 h-6 ${colors.text}`} />
                  <div>
                    <p className="font-semibold text-gray-900">{institution.classes}</p>
                    <p className="text-sm text-gray-600">Programs Offered</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className={`w-6 h-6 ${colors.text}`} />
                  <div>
                    <p className="font-semibold text-gray-900">{institution.students}</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className={`w-6 h-6 ${colors.text}`} />
                  <div>
                    <p className="font-semibold text-gray-900">{institution.successRate}</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className={`w-6 h-6 ${colors.text}`} />
                  <div>
                    <p className="font-semibold text-gray-900">Since {institution.established}</p>
                    <p className="text-sm text-gray-600">Established</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className={colors.button}>
                  Apply Now <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className={`${colors.border} ${colors.text}`}>
                  Download Brochure
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt={institution.name}
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className={`absolute top-6 left-6 ${colors.bg} ${colors.text} p-4 rounded-xl`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <Badge
                className={`absolute bottom-6 right-6 bg-white ${colors.text} border-${institution.color}-200 text-lg px-4 py-2`}
              >
                {institution.affiliation}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className={`${colors.bg} ${colors.text} border-${institution.color}-200 mb-4`}>
              Academic Programs
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational programs designed to nurture excellence and prepare students for future success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {institution.programs.map((program, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <BookOpen className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.name}</h3>
                  <p className={`${colors.text} font-medium mb-3`}>{program.classes}</p>
                  <p className="text-gray-600">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className={`${colors.bg} ${colors.text} border-${institution.color}-200 mb-4`}>Key Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our institution stand out in providing quality education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {institution.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div
                  className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}
                >
                  <Star className={`w-4 h-4 ${colors.text}`} />
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className={`${colors.bg} ${colors.text} border-${institution.color}-200 mb-4`}>Infrastructure</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">World-Class Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern infrastructure and facilities to support comprehensive learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {institution.facilities.map((facility, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Building className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{facility}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className={`py-20 bg-gradient-to-r ${colors.gradient}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className={`bg-white ${colors.text} border-${institution.color}-200 mb-4`}>Our Achievements</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recognition & Awards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized through various achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {institution.achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Award className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{achievement}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join {institution.shortName}?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards a bright future. Apply now and become part of our success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={colors.button}>
                Apply for Admission
              </Button>
              <Button size="lg" variant="outline" className={`${colors.border} ${colors.text}`}>
                Schedule Campus Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? Our admission counselors are here to help</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Phone className={`w-8 h-8 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our admission team</p>
                <p className={`text-lg font-semibold ${colors.text}`}>+91 98765 43210</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Mail className={`w-8 h-8 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-4">Send your queries</p>
                <p className={`text-lg font-semibold ${colors.text}`}>info@sunriseedu.com</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <MapPin className={`w-8 h-8 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Campus</h3>
                <p className="text-gray-600 mb-4">Schedule a tour</p>
                <p className={`text-lg font-semibold ${colors.text}`}>Necchwa, Sikar</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { slug: "international-public-school" },
    { slug: "college-higher-studies" },
    { slug: "pharmacy-college" },
    { slug: "foundation-academy" },
  ]
}
