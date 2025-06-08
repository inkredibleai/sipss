"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"
import { handleAdmissionSubmission } from "@/app/admissions/action"

export default function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    course: "",
    previousSchool: "",
    address: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })

    try {
      const result = await handleAdmissionSubmission(form)
      setSubmitStatus(result)

      if (result.success) {
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          institution: "",
          course: "",
          previousSchool: "",
          address: "",
          message: "",
        })
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Quick Apply</Badge>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Online Application Form</h2>
        <p className="text-xl text-gray-600">
          Fill out this form to start your admission process. Our team will contact you within 24 hours.
        </p>
      </div>

      <Card className="shadow-xl">
        <CardContent className="p-8">
          {submitStatus && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                submitStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              {submitStatus.success ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={submitStatus.success ? "text-green-800" : "text-red-800"}>{submitStatus.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="institution">Select Institution *</Label>
              <Select value={formData.institution} onValueChange={(value) => handleInputChange("institution", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose your preferred institution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="international-public-school">Sunrise International Public School</SelectItem>
                  <SelectItem value="college-higher-studies">Sunrise College for Higher Studies</SelectItem>
                  <SelectItem value="pharmacy-college">Sunrise Pharmacy College</SelectItem>
                  <SelectItem value="foundation-academy">Sunrise Foundation Academy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="course">Course/Class *</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  placeholder="e.g., Class 11th, B.Pharma, etc."
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="previousSchool">Previous School/College</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                  placeholder="Name of previous institution"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your complete address"
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Any specific questions or requirements?"
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded" required />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the Terms & Conditions and Privacy Policy
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-orange-600 to-blue-600 text-white"
              disabled={isSubmitting}
            >
              <FileText className="w-5 h-5 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
