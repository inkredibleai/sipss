import { supabase } from "./client"
import type { Institution } from "./types"

export async function getInstitutionBySlug(slug: string) {
  const { data, error } = await supabase
    .from("institutions")
    .select(`
      *,
      programs:institution_programs(
        id,
        name,
        slug,
        description,
        duration,
        fees
      )
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .single()

  if (error) {
    console.error("Error fetching institution:", error)
    return null
  }

  return data as Institution
}
