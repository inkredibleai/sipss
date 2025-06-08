"use server"

import { submitAdmissionForm } from "@/lib/supabase/admission-queries"

export async function handleAdmissionSubmission(formData: FormData) {
  try {
    const admissionData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      institution: formData.get("institution") as string,
      course: formData.get("course") as string,
      previousSchool: formData.get("previousSchool") as string,
      address: formData.get("address") as string,
      message: formData.get("message") as string,
    }

    await submitAdmissionForm(admissionData)

    return { success: true, message: "Application submitted successfully! We'll contact you within 24 hours." }
  } catch (error) {
    console.error("Error submitting admission form:", error)
    return { success: false, message: "Failed to submit application. Please try again." }
  }
}
