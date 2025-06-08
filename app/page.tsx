import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Phone, Building, Shield, Users, Trophy, Star, Info, Youtube } from "lucide-react"
import Link from "next/link"
import VerticalCarousel from "@/components/vertical-carousel"
import HorizontalCarousel from "@/components/horizontal-carousel"
import ImageCarousel from "@/components/image-carousel"
import { AchieversCarousel } from "@/components/achievers-carousel"
import { Suspense } from "react"
import { InstitutionsSection } from "@/components/institutions-section"
import { getFeaturedAchievers, getInstitutions } from "@/lib/supabase/queries"
import NextImage from "next/image"
import type { Metadata } from "next"
import { MarqueeUpdates } from "@/components/marquee-updates" // Import the new marquee component

export const metadata: Metadata = {
  title: "Sunrise Edu Group: Premier School & College in Sikar, Rajasthan",
  description:
    "Discover Sunrise Edu Group in Sikar, Rajasthan. Offering quality CBSE schooling, IIT-JEE/NEET coaching, and professional courses. Join 5000+ successful students.",
  openGraph: {
    title: "Sunrise Edu Group: Top School & College in Sikar, Rajasthan",
    description:
      "Leading educational institution offering CBSE education, IIT-JEE/NEET coaching, pharmacy courses in Sikar, Rajasthan.",
    url: "https://www.sunriseeduhub.com", // Ensure this is your canonical domain
    images: [
      {
        url: "/og-home.jpg", // Make sure this image exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Sunrise Edu Group Campus and Students",
      },
    ],
  },
}

async function HomePage() {
  // Use Promise.allSettled to handle individual failures gracefully
  const results = await Promise.allSettled([getFeaturedAchievers(), getInstitutions()])

  // Extract data with fallbacks
  const achievers = results[0].status === "fulfilled" ? results[0].value : []
  const institutions = results[1].status === "fulfilled" ? results[1].value : []

  // Log any errors for debugging
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Query ${index} failed:`, result.reason)
    }
  })

  return (
    <>
      {/* Marquee Updates Section - Placed below Nav, above Hero */}
      <MarqueeUpdates />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-1"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 animate-slide-up hover:bg-orange-200 transition-colors cursor-default">
                  🇮🇳 Proudly Indian • Excellence in Education
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-slide-up delay-100">
                  Igniting Futures with{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                      Knowledge
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-orange-600/20 to-blue-600/20 rounded-full blur-sm"></span>
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed animate-slide-up delay-200">
                  From CBSE education to professional courses, we nurture dreams and build careers. Join 5000+
                  successful students in Sikar, Rajasthan.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
                <Button 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-105 group"
                  asChild
                >
                  <Link href="/institutions">
                    <GraduationCap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Explore Programs
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg shadow-blue-600/10 transition-all hover:scale-105 group"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Schedule Visit
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 animate-slide-up delay-400">
                <div className="text-center p-4 rounded-xl hover:bg-white/50 transition-colors group cursor-default">
                  <div className="text-3xl font-bold text-orange-600 group-hover:scale-110 transition-transform">5000+</div>
                  <div className="text-sm text-gray-600 mt-1">Students Enrolled</div>
                </div>
                <div className="text-center p-4 rounded-xl hover:bg-white/50 transition-colors group cursor-default">
                  <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">15+</div>
                  <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                </div>
                <div className="text-center p-4 rounded-xl hover:bg-white/50 transition-colors group cursor-default">
                  <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform">95%</div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in delay-500 animate-float">
              <div className="relative z-10 transform hover:scale-[1.01] hover:rotate-1 transition-transform duration-500">
                <NextImage
                  src="/School.png" // Assuming School.png is in the public folder
                  alt="Students at Sunrise Edu Group campus"
                  width={800} // Original width
                  height={600} // Original height
                  className="rounded-2xl shadow-2xl w-full h-auto" // Added w-full h-auto for responsiveness
                  priority // Load this image eagerly as it's LCP
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-600/10 to-blue-600/10 mix-blend-overlay"></div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </section>
    {/* Achievements & Updates Section */}
      <section className="my-16 md:my-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Achievements */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-4 text-sm">🏆 Our Achievements</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Celebrating Excellence</h2>
                <p className="text-lg text-gray-600">
                  Our students consistently achieve outstanding results in board exams, competitive tests, and
                  professional courses.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <div className="text-xl font-bold text-orange-600 group-hover:scale-110 transition-transform">98%</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">Pass Rate</div>
                      <div className="text-sm text-gray-500">CBSE Boards</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="text-xl font-bold text-blue-600 group-hover:scale-110 transition-transform">150+</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">Selections</div>
                      <div className="text-sm text-gray-500">IIT/NEET</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="text-xl font-bold text-green-600 group-hover:scale-110 transition-transform">500+</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Placed</div>
                      <div className="text-sm text-gray-500">Graduates</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="text-xl font-bold text-purple-600 group-hover:scale-110 transition-transform">25+</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">Awards</div>
                      <div className="text-sm text-gray-500">National</div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-blue-600 text-white w-full sm:w-auto hover:from-orange-700 hover:to-blue-700 transition-all hover:scale-105 group"
                asChild
              >
                <Link href="/achievements">
                  <Trophy className="w-5 h-5 mr-2 group-hover:animate-ping" />
                  View All Achievements
                </Link>
              </Button>
            </div>

<div className="bg-white rounded-xl p-4 shadow-sm">
              <VerticalCarousel />
            </div>
            {/* Placeholder for where VerticalCarousel was, or this space can be reclaimed/repurposed */}
            {/* If you want to keep the card structure for something else, you can. Otherwise, remove this div too. */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-center text-gray-400 italic">
              {/* Content previously here was moved to the top marquee */}
               {/* Updates Feed */}
            
            </div>
          </div>
        </div>
      </section>
      {/* Campus Showcase Carousel */}
      <section className="my-16 md:my-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience Our Campus</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Take a visual tour through our world-class facilities and vibrant campus life
            </p>
          </div>
          <Suspense fallback={<div className="aspect-[21/9] w-full bg-gray-200 animate-pulse rounded-xl" />}>
            <ImageCarousel />
          </Suspense>
        </div>
      </section>


      {/* About Us & Video Section */}
      <section className="my-16 md:my-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-sm">About Sunrise Edu Group</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Nurturing Excellence for Over 15 Years
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sunrise Edu Group has been a beacon of quality education in Sikar, Rajasthan, dedicated to fostering academic brilliance and holistic development. Our institutions provide a supportive and challenging environment where students can achieve their full potential.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in a student-centric approach, combining experienced faculty, modern infrastructure, and innovative teaching methodologies to prepare students for future success.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-blue-600 text-white w-full sm:w-auto hover:from-orange-700 hover:to-blue-700 transition-all hover:scale-105 group"
                asChild
              >
                 <Link href="/about">
                  <Info className="w-5 h-5 mr-2 group-hover:animate-ping" />
                  Read More About Us
                </Link>
              </Button>
             
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/tpiN6rq4PSk" // Replace dQw4w9WgXcQ with your YouTube video ID
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Institutions Section */}
      <section className="my-16 md:my-20 bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
            <InstitutionsSection institutions={institutions} />
          </Suspense>
        </div>
      </section>
      
   {/* Why Choose Us */}
      <section className="my-16 md:my-20 bg-gradient-to-r from-orange-50 to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white text-gray-800 border-gray-200 mb-4 text-sm">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique advantages that set Sunrise Edu Group apart from other educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Proven Track Record",
                description: "15 years of consistent academic excellence and student success",
                color: "orange",
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description: "Highly qualified and experienced teachers committed to student growth",
                color: "blue",
              },
              {
                icon: Building,
                title: "Modern Infrastructure",
                description: "State-of-the-art facilities and technology-enabled learning",
                color: "green",
              },
              {
                icon: Star,
                title: "Holistic Development",
                description: "Focus on academics, sports, arts, and character building",
                color: "purple",
              },
            ].map(feature => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 transition-all transform hover:-translate-y-2 group"
              >
                <div
                  className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-80`}
                >
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



  {/* Dynamic Content Section - Horizontal Carousel */}
      <section className="my-16 md:my-20 bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <HorizontalCarousel />
        </div>
      </section>

      {/* Achievers Section */}
      <section className="my-16 md:my-20 bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating the outstanding achievements of our students across various competitive exams and academic
              pursuits.
            </p>
          </div>
          <Suspense fallback={<div className="h-64 bg-white rounded-lg animate-pulse" />}>
            <AchieversCarousel achievers={achievers} />
          </Suspense>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-16 md:my-20 bg-gradient-to-r from-blue-50 to-orange-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white text-gray-800 border-gray-200 mb-4 text-sm">💬 Student Voices</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg md:text-xl text-gray-600">Real stories from our successful alumni and current students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Sharma",
                class: "IIT Delhi, Class of 2023",
                testimonial:
                  "Sunrise School gave me the perfect foundation for my IIT journey. The teachers here are not just educators but mentors who care about each student's success.",
                color: "orange",
                initial: "A",
              },
              {
                name: "Priya Agarwal",
                class: "B.Pharma Graduate, 2022",
                testimonial:
                  "The pharmacy program here is excellent. Modern labs, experienced faculty, and great placement support helped me secure a job in a top pharmaceutical company.",
                color: "blue",
                initial: "P",
              },
              {
                name: "Rahul Meena",
                class: "AIIMS Delhi, 2023",
                testimonial:
                  "From CBSE to NEET preparation, Sunrise has been my academic home. The integrated approach and personal attention made all the difference in my medical entrance success.",
                color: "green",
                initial: "R",
              },
            ].map(t => (
              <Card key={t.name} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-gray-300/70 transition-all transform hover:-translate-y-1.5">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-balance">{t.testimonial}</p>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 bg-${t.color}-100 rounded-full flex items-center justify-center mr-3`}
                    >
                      <span className={`text-${t.color}-600 font-semibold`}>{t.initial}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-600">{t.class}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="my-16 md:my-20 bg-gradient-to-r from-orange-600 to-blue-600 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Educational Journey?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of successful students who chose Sunrise Edu Group for their bright future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/admissions">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply for Admission
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
              asChild
            >
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Campus Visit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
