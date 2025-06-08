"use client"

import { useState, useEffect } from "react" // Added useEffect
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Search, Calendar, Star, Clock, Award } from "lucide-react"

interface MockPaper {
  id: string // Changed to string for UUID
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
  description: string | null
  file_url: string // Added to match potential Supabase schema
  created_at: string // Added from schema
}

// Mock initial data - this will be replaced by API call
const initialMockPapers: MockPaper[] = [
  // {
  //   id: "1",
  //   title: "Mathematics Mock Test - 1",
  //   subject: "Mathematics",
  //   class: "12",
  //   year: "2024",
  //   type: "mock",
  //   board: "CBSE",
  //   duration: "3 hours",
  //   marks: 80,
  //   downloads: 1250,
  //   rating: 4.8,
  //   difficulty: "Medium",
  //   fileSize: "2.4 MB",
  //   uploadDate: "2024-03-15",
  //   description: "Comprehensive mathematics mock test covering all chapters",
  //   file_url: "/papers/math-mock-1.pdf",
  //   created_at: "2024-03-15T10:00:00Z",
  // },
];

// Mock Supabase query function (replace with actual Supabase call)
// This would typically be in a file like @/lib/supabase/queries.ts
async function fetchMockPapersFromDB(): Promise<MockPaper[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, this would be:
  // const { data, error } = await supabase.from('mock_papers').select('*').eq('status', 'active'); // Assuming a 'status' column
  // if (error) throw error;
  // return data.map(item => ({ ...item, uploadDate: item.created_at })) as MockPaper[];

  // Return mock data for now
  return [
    {
      id: "1",
      title: "Mathematics Mock Test - 1 (Fetched)",
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
      uploadDate: "2024-03-15", // Mapped from created_at
      description: "Comprehensive mathematics mock test covering all chapters",
      file_url: "/papers/math-mock-1.pdf",
      created_at: "2024-03-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Physics Previous Year Paper (Fetched)",
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
      uploadDate: "2024-03-12", // Mapped from created_at
      description: "CBSE Class 12 Physics board exam paper 2023",
      file_url: "/papers/physics-2023.pdf",
      created_at: "2024-03-12T10:00:00Z",
    },
  ];
}

export default function MockPapersSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedBoard, setSelectedBoard] = useState("all")
  const [allMockPapers, setAllMockPapers] = useState<MockPaper[]>(initialMockPapers)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchMockPapersFromDB()
        // Map created_at to uploadDate for display consistency if needed
        const mappedData = data.map(item => ({ ...item, uploadDate: new Date(item.created_at).toLocaleDateString() }));
        setAllMockPapers(mappedData)
      } catch (err) {
        setError("Failed to load mock papers. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredPapers = allMockPapers.filter((paper) => {
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

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading mock papers...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">📄 Mock & Past Papers</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Free Question Papers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download thousands of mock tests and previous year question papers
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
                    {paper.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {paper.description}
                      </p>
                    )}

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
                      <a href={paper.file_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </a>
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
                      {paper.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {paper.description}
                        </p>
                      )}

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
                        <a href={paper.file_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
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
                      {paper.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {paper.description}
                        </p>
                      )}

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
                        <a href={paper.file_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
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
            Showing {filteredPapers.length} of {allMockPapers.length} papers
          </p>
        </div>
      </div>
    </section>
  )
}
