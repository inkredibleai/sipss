"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Search, Calendar, Star, Clock, Award } from "lucide-react"

interface MockPaper {
  id: number
  title: string
  subject: string
  class: string
  year: string
  type: "mock" | "past"
  board: string
  duration: string
  marks: number
  downloads: number
  rating: number
  difficulty: "Easy" | "Medium" | "Hard"
  fileSize: string
  uploadDate: string
  description: string
}

const mockPapers: MockPaper[] = [
  {
    id: 1,
    title: "Mathematics Mock Test - 1",
    subject: "Mathematics",
    class: "12",
    year: "2024",
    type: "mock",
    board: "CBSE",
    duration: "3 hours",
    marks: 80,
    downloads: 1250,
    rating: 4.8,
    difficulty: "Medium",
    fileSize: "2.4 MB",
    uploadDate: "2024-03-15",
    description: "Comprehensive mathematics mock test covering all chapters",
  },
  {
    id: 2,
    title: "Physics Previous Year Paper",
    subject: "Physics",
    class: "12",
    year: "2023",
    type: "past",
    board: "CBSE",
    duration: "3 hours",
    marks: 70,
    downloads: 2100,
    rating: 4.9,
    difficulty: "Hard",
    fileSize: "1.8 MB",
    uploadDate: "2024-03-12",
    description: "CBSE Class 12 Physics board exam paper 2023",
  },
  {
    id: 3,
    title: "Chemistry Sample Paper",
    subject: "Chemistry",
    class: "11",
    year: "2024",
    type: "mock",
    board: "CBSE",
    duration: "3 hours",
    marks: 70,
    downloads: 890,
    rating: 4.6,
    difficulty: "Medium",
    fileSize: "2.1 MB",
    uploadDate: "2024-03-10",
    description: "Latest chemistry sample paper with solutions",
  },
  {
    id: 4,
    title: "Biology Mock Test Series",
    subject: "Biology",
    class: "12",
    year: "2024",
    type: "mock",
    board: "CBSE",
    duration: "3 hours",
    marks: 70,
    downloads: 1560,
    rating: 4.7,
    difficulty: "Easy",
    fileSize: "3.2 MB",
    uploadDate: "2024-03-08",
    description: "Complete biology mock test with detailed explanations",
  },
  {
    id: 5,
    title: "English Core Previous Year",
    subject: "English",
    class: "12",
    year: "2023",
    type: "past",
    board: "CBSE",
    duration: "3 hours",
    marks: 80,
    downloads: 1890,
    rating: 4.5,
    difficulty: "Medium",
    fileSize: "1.5 MB",
    uploadDate: "2024-03-05",
    description: "CBSE English Core board exam paper with marking scheme",
  },
  {
    id: 6,
    title: "Computer Science Mock",
    subject: "Computer Science",
    class: "11",
    year: "2024",
    type: "mock",
    board: "CBSE",
    duration: "3 hours",
    marks: 70,
    downloads: 720,
    rating: 4.4,
    difficulty: "Hard",
    fileSize: "2.8 MB",
    uploadDate: "2024-03-03",
    description: "Programming and theory based computer science mock test",
  },
]

export default function MockPapersSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedBoard, setSelectedBoard] = useState("all")

  const classes = ["6", "7", "8", "9", "10", "11", "12"]
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
    "Economics",
    "History",
  ]
  const years = ["2024", "2023", "2022", "2021", "2020"]
  const boards = ["CBSE", "RBSE", "ICSE"]

  const filteredPapers = mockPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || paper.class === selectedClass
    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject
    const matchesYear = selectedYear === "all" || paper.year === selectedYear
    const matchesType = selectedType === "all" || paper.type === selectedType
    const matchesBoard = selectedBoard === "all" || paper.board === selectedBoard

    return matchesSearch && matchesClass && matchesSubject && matchesYear && matchesType && matchesBoard
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "mock" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">📄 Mock & Past Papers</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Free Question Papers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download thousands of mock tests and previous year question papers for CBSE, RBSE, and other boards
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Papers</TabsTrigger>
            <TabsTrigger value="mock">Mock Tests</TabsTrigger>
            <TabsTrigger value="past">Past Papers</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search papers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        Class {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Boards</SelectItem>
                    {boards.map((board) => (
                      <SelectItem key={board} value={board}>
                        {board}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <Card key={paper.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {paper.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Class {paper.class} • {paper.subject} • {paper.board}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Badge className={getTypeColor(paper.type)}>{paper.type === "mock" ? "Mock" : "Past"}</Badge>
                        <Badge className={getDifficultyColor(paper.difficulty)}>{paper.difficulty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{paper.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{paper.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{paper.marks} marks</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{paper.year}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{paper.fileSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{paper.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          <span>{paper.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mock">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers
                .filter((paper) => paper.type === "mock")
                .map((paper) => (
                  <Card key={paper.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {paper.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            Class {paper.class} • {paper.subject} • {paper.board}
                          </p>
                        </div>
                        <Badge className={getDifficultyColor(paper.difficulty)}>{paper.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{paper.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{paper.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{paper.marks} marks</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            <span>{paper.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                            <span>{paper.rating}</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers
                .filter((paper) => paper.type === "past")
                .map((paper) => (
                  <Card key={paper.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {paper.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            Class {paper.class} • {paper.subject} • {paper.board}
                          </p>
                        </div>
                        <Badge className={getDifficultyColor(paper.difficulty)}>{paper.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{paper.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{paper.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{paper.marks} marks</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{paper.year}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            <span>{paper.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                            <span>{paper.rating}</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Results Summary */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing {filteredPapers.length} of {mockPapers.length} papers
          </p>
        </div>
      </div>
    </section>
  )
}
