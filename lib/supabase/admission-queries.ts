import { supabase } from "./client"
import { supabaseAdmin } from "./server"

export interface AdmissionFormData {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  institution: string
  course: string
  previousSchool?: string
  address?: string
  message?: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  submittedAt: string
  updatedAt: string
}

export async function submitAdmissionForm(
  formData: Omit<AdmissionFormData, "id" | "status" | "submittedAt" | "updatedAt">,
) {
  try {
    const { data, error } = await supabase
      .from("admission_forms")
      .insert({
        ...formData,
        status: "pending",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error submitting admission form:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error submitting admission form:", error)
    throw error
  }
}

export async function getAdmissionForms() {
  try {
    const { data, error } = await supabaseAdmin
      .from("admission_forms")
      .select("*")
      .order("submitted_at", { ascending: false })

    if (error) {
      console.error("Error fetching admission forms:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching admission forms:", error)
    return []
  }
}

export async function updateAdmissionFormStatus(id: string, status: "pending" | "reviewed" | "accepted" | "rejected") {
  try {
    const { data, error } = await supabaseAdmin
      .from("admission_forms")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating admission form status:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating admission form status:", error)
    throw error
  }
}
