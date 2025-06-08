"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  ImageIcon,
  Megaphone,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Eye,
  Download,
} from "lucide-react"
import AdminLogin from "@/components/admin/admin-login"
import AchieversManager from "@/components/admin/achievers-manager"
import NewsManager from "@/components/admin/news-manager"
import MediaManager from "@/components/admin/media-manager"
import UpdatesManager from "@/components/admin/updates-manager"
import ResourcesManager from "@/components/admin/resources-manager"
import CarouselManager from "@/components/admin/carousel-manager"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sunrise Edu Admin</h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Online</Badge>
              <button onClick={() => setIsAuthenticated(false)} className="text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent">
                <TabsTrigger
                  value="dashboard"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="achievers"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Achievers
                </TabsTrigger>
                <TabsTrigger
                  value="news"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  News & Articles
                </TabsTrigger>
                {/* <TabsTrigger
                  value="media"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Media Gallery
                </TabsTrigger> */}
                <TabsTrigger
                  value="updates"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <Megaphone className="w-4 h-4 mr-2" />
                  Quick Updates
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="carousel"
                  className="w-full justify-start data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Carousel
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                  <p className="text-gray-600">Welcome to the Sunrise Edu content management system</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Achievers</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">+12 from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">News Articles</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">+3 this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Media Items</CardTitle>
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">89</div>
                      <p className="text-xs text-muted-foreground">+7 this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Updates</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">4 high priority</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Rahul Sharma - CBSE Board Topper</p>
                            <p className="text-xs text-gray-500">Added 2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Priya Patel - Math Olympiad Gold</p>
                            <p className="text-xs text-gray-500">Added 1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Amit Kumar - JEE Advanced AIR 245</p>
                            <p className="text-xs text-gray-500">Added 2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">Total Page Views</span>
                          </div>
                          <span className="text-sm font-medium">24,567</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Download className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Resource Downloads</span>
                          </div>
                          <span className="text-sm font-medium">1,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">Active Users</span>
                          </div>
                          <span className="text-sm font-medium">892</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievers">
              <AchieversManager />
            </TabsContent>

            <TabsContent value="news">
              <NewsManager />
            </TabsContent>

            <TabsContent value="media">
              <MediaManager />
            </TabsContent>

            <TabsContent value="updates">
              <UpdatesManager />
            </TabsContent>

            <TabsContent value="resources">
              <ResourcesManager />
            </TabsContent>

            <TabsContent value="carousel">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Carousel Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CarouselManager />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
