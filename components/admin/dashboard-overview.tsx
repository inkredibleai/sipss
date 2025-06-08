"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Users, TrendingUp, Calendar, Eye, Heart, MessageSquare, Plus } from "lucide-react"

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total News Articles",
      value: "24",
      change: "+3 this week",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Media Items",
      value: "156",
      change: "+12 this month",
      icon: ImageIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Quick Updates",
      value: "18",
      change: "+5 this week",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Views",
      value: "45.2K",
      change: "+15% this month",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentActivity = [
    {
      action: "Published new article",
      title: "Outstanding CBSE Results 2024",
      time: "2 hours ago",
      type: "news",
    },
    {
      action: "Uploaded media",
      title: "Annual Day Celebration Photos",
      time: "4 hours ago",
      type: "media",
    },
    {
      action: "Added quick update",
      title: "Admission Open for Session 2024-25",
      time: "6 hours ago",
      type: "update",
    },
    {
      action: "Updated article",
      title: "New Science Laboratory Inaugurated",
      time: "1 day ago",
      type: "news",
    },
  ]

  const quickActions = [
    {
      title: "Add News Article",
      description: "Create a new news article for the carousel",
      icon: FileText,
      color: "bg-blue-600",
    },
    {
      title: "Upload Media",
      description: "Add photos or videos to the gallery",
      icon: ImageIcon,
      color: "bg-green-600",
    },
    {
      title: "Post Update",
      description: "Add a quick update to the vertical carousel",
      icon: Users,
      color: "bg-purple-600",
    },
    {
      title: "View Analytics",
      description: "Check engagement and performance metrics",
      icon: TrendingUp,
      color: "bg-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Administrator!</h2>
        <p className="opacity-90">
          Here's what's happening with your content today. You have 3 pending items that need review.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "news"
                        ? "bg-blue-500"
                        : activity.type === "media"
                          ? "bg-green-500"
                          : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      activity.type === "news"
                        ? "bg-blue-100 text-blue-800"
                        : activity.type === "media"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                    }
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Content Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">45.2K</p>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-xs text-green-600">+15% from last month</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">2.8K</p>
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-xs text-green-600">+22% from last month</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">456</p>
              <p className="text-sm text-gray-600">Engagements</p>
              <p className="text-xs text-green-600">+8% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
