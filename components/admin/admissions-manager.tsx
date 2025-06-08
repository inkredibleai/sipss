"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Download, Calendar, User, Phone, Mail, MapPin, FileText } from "lucide-react"
import { getAdmissionForms, updateAdmissionFormStatus } from "@/lib/supabase/admission-queries"

export default function AdmissionsManager() {
  const [admissions, setAdmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedAdmission, setSelectedAdmission] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    loadAdmissions()
  }, [])

  const loadAdmissions = async () => {
    try {
      const data = await getAdmissionForms()
      setAdmissions(data)
    } catch (error) {
      console.error("Error loading admissions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateAdmissionFormStatus(id, status)
      setAdmissions(admissions.map((admission) => (admission.id === id ? { ...admission, status } : admission)))
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const filteredAdmissions = admissions.filter((admission) => {
    const matchesSearch =
      admission.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || admission.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInstitutionName = (code: string) => {
    const institutions = {
      "international-public-school": "International Public School",
      "college-higher-studies": "College for Higher Studies",
      "pharmacy-college": "Pharmacy College",
      "foundation-academy": "Foundation Academy",
    }
    return institutions[code] || code
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admission Applications</h2>
          <p className="text-gray-600">Manage and review admission applications</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{admissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {admissions.filter((a) => a.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {admissions.filter((a) => a.status === "accepted").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {
                admissions.filter((a) => {
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return new Date(a.submitted_at) > weekAgo
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredAdmissions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmissions.map((admission) => (
                  <TableRow key={admission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {admission.first_name} {admission.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{admission.email}</p>
                        <p className="text-sm text-gray-600">{admission.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{getInstitutionName(admission.institution)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{admission.course}</div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={admission.status}
                        onValueChange={(value) => handleStatusUpdate(admission.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(admission.status)}>{admission.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(admission.submitted_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedAdmission(admission)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                          </DialogHeader>
                          {selectedAdmission && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                  <User className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium">
                                      {selectedAdmission.first_name} {selectedAdmission.last_name}
                                    </p>
                                    <p className="text-sm text-gray-600">Full Name</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Mail className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{selectedAdmission.email}</p>
                                    <p className="text-sm text-gray-600">Email</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Phone className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{selectedAdmission.phone}</p>
                                    <p className="text-sm text-gray-600">Phone</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{selectedAdmission.course}</p>
                                    <p className="text-sm text-gray-600">Course</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Institution</h4>
                                <p className="text-gray-700">{getInstitutionName(selectedAdmission.institution)}</p>
                              </div>

                              {selectedAdmission.previous_school && (
                                <div>
                                  <h4 className="font-medium mb-2">Previous School/College</h4>
                                  <p className="text-gray-700">{selectedAdmission.previous_school}</p>
                                </div>
                              )}

                              {selectedAdmission.address && (
                                <div>
                                  <h4 className="font-medium mb-2">Address</h4>
                                  <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <p className="text-gray-700">{selectedAdmission.address}</p>
                                  </div>
                                </div>
                              )}

                              {selectedAdmission.message && (
                                <div>
                                  <h4 className="font-medium mb-2">Additional Message</h4>
                                  <p className="text-gray-700">{selectedAdmission.message}</p>
                                </div>
                              )}

                              <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                  <p className="text-sm text-gray-600">Submitted on</p>
                                  <p className="font-medium">
                                    {new Date(selectedAdmission.submitted_at).toLocaleString()}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(selectedAdmission.status)}>
                                  {selectedAdmission.status}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
