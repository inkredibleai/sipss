import { supabase } from "./client"
import { supabaseAdmin } from "./server"
import type { Achiever, Paper, CareerResource, QuickUpdate } from "./types"

// Achievers
export async function getFeaturedAchievers() {
  try {
    const { data, error } = await supabase
      .from("achievers")
      .select(`
        *,
        institutions (name, code)
      `)
      .eq("featured", true)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.error("Error fetching featured achievers:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching featured achievers:", error)
    return []
  }
}

export async function getAllAchievers(filters?: {
  category?: string
  year?: string
  institution?: string
}) {
  try {
    let query = supabase
      .from("achievers")
      .select(`
        *,
        institutions (name, code)
      `)
      .eq("status", "active")

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.year) {
      query = query.eq("year", filters.year)
    }
    if (filters?.institution) {
      query = query.eq("institution_id", filters.institution)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching achievers:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching achievers:", error)
    return []
  }
}

// Papers
export async function getPapers(filters?: {
  type?: "mock" | "past"
  class?: string
  subject?: string
  year?: string
}) {
  try {
    let query = supabase.from("papers").select("*").eq("status", "active")

    if (filters?.type) {
      query = query.eq("type", filters.type)
    }
    if (filters?.class) {
      query = query.eq("class", filters.class)
    }
    if (filters?.subject) {
      query = query.eq("subject", filters.subject)
    }
    if (filters?.year) {
      query = query.eq("year", filters.year)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching papers:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching papers:", error)
    return []
  }
}

export async function incrementPaperDownload(paperId: string) {
  try {
    const { error } = await supabase.rpc("increment_paper_downloads", {
      paper_id: paperId,
    })

    if (error) {
      console.error("Error incrementing paper downloads:", error)
    }
  } catch (error) {
    console.error("Error incrementing paper downloads:", error)
  }
}

// Career Resources
export async function getCareerResources(filters?: {
  category?: string
  type?: string
  difficulty?: string
}) {
  try {
    let query = supabase.from("career_resources").select("*").eq("status", "active")

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.type) {
      query = query.eq("type", filters.type)
    }
    if (filters?.difficulty) {
      query = query.eq("difficulty", filters.difficulty)
    }

    const { data, error } = await query.order("views", { ascending: false })

    if (error) {
      console.error("Error fetching career resources:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching career resources:", error)
    return []
  }
}

export async function incrementResourceViews(resourceId: string) {
  try {
    const { error } = await supabase.rpc("increment_resource_views", {
      resource_id: resourceId,
    })

    if (error) {
      console.error("Error incrementing resource views:", error)
    }
  } catch (error) {
    console.error("Error incrementing resource views:", error)
  }
}

// Quick Updates
export async function getQuickUpdates(institutionId?: string) {
  try {
    let query = supabase
      .from("quick_updates")
      .select("*")
      .eq("status", "active")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(10)
    
    if (institutionId) {
      // For institution pages - show institution-specific updates and global updates marked to show_on_main
      query = query.or(`institution_id.eq.${institutionId},and(show_on_main.eq.true)`)
    } else {
      // For main site - show updates with no institution_id or updates marked to show on main
      query = query.or('institution_id.is.null,show_on_main.eq.true')
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching quick updates:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching quick updates:", error)
    return []
  }
}

// Institutions
export async function getInstitutions() {
  try {
    // Removed the status filter since the column doesn't exist
    const { data, error } = await supabase.from("institutions").select("*").order("name")

    if (error) {
      console.error("Error fetching institutions:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching institutions:", error)
    return []
  }
}

// Media Gallery
export async function getFeaturedMedia() {
  try {
    const { data, error } = await supabase
      .from("media_gallery")
      .select("*")
      .eq("featured", true)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.error("Error fetching featured media:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching featured media:", error)
    return []
  }
}

export async function getMediaByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from("media_gallery")
      .select("*")
      .eq("category", category)
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching media by category:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Error fetching media by category:", error)
    return []
  }
}

// Admin functions (using service role)
export async function createAchiever(achieverData: Omit<Achiever, "id" | "created_at" | "updated_at">) {
  try {
    // First create the achiever
    const { data: newAchiever, error: createError } = await supabaseAdmin
      .from("achievers")
      .insert(achieverData)
      .select('id')
      .single()

    if (createError) {
      console.error("Error creating achiever:", createError)
      throw createError
    }

    // Then fetch the full achiever data including the institution
    const { data: fullAchiever, error: fetchError } = await supabaseAdmin
      .from("achievers")
      .select(`
        *,
        institutions (name, code)
      `)
      .eq('id', newAchiever.id)
      .single()

    if (fetchError) {
      console.error("Error fetching created achiever:", fetchError)
      throw fetchError
    }

    return fullAchiever
  } catch (error) {
    console.error("Error in createAchiever:", error)
    throw error
  }
}

export async function updateAchiever(id: string, updates: Partial<Achiever>) {
  try {
    // First update the achiever
    const { error: updateError } = await supabaseAdmin
      .from("achievers")
      .update(updates)
      .eq("id", id)

    if (updateError) {
      console.error("Error updating achiever:", updateError)
      throw updateError
    }

    // Then fetch the full updated achiever data including the institution
    const { data: updatedAchiever, error: fetchError } = await supabaseAdmin
      .from("achievers")
      .select(`
        *,
        institutions (name, code)
      `)
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error("Error fetching updated achiever:", fetchError)
      throw fetchError
    }

    return updatedAchiever
  } catch (error) {
    console.error("Error in updateAchiever:", error)
    throw error
  }
}

export async function deleteAchiever(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("achievers")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting achiever:", error)
      throw error
    }

    return true
  } catch (error) {
    console.error("Error in deleteAchiever:", error)
    throw error
  }
}

export async function createPaper(paper: Omit<Paper, "id" | "created_at" | "updated_at" | "downloads">) {
  try {
    const { data, error } = await supabaseAdmin.from("papers").insert(paper).select().single()

    if (error) {
      console.error("Error creating paper:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Error creating paper:", error)
    throw error
  }
}

export async function updatePaper(id: string, updates: Partial<Paper>) {
  try {
    const { data, error } = await supabaseAdmin.from("papers").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Error updating paper:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Error updating paper:", error)
    throw error
  }
}

export async function deletePaper(id: string) {
  try {
    const { error } = await supabaseAdmin.from("papers").delete().eq("id", id)

    if (error) {
      console.error("Error deleting paper:", error)
      throw error
    }
  } catch (error) {
    console.error("Error deleting paper:", error)
    throw error
  }
}

export async function createCareerResource(
  resource: Omit<CareerResource, "id" | "created_at" | "updated_at" | "views" | "rating">,
) {
  try {
    const { data, error } = await supabaseAdmin.from("career_resources").insert(resource).select().single()

    if (error) {
      console.error("Error creating career resource:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Error creating career resource:", error)
    throw error
  }
}

export async function updateCareerResource(id: string, updates: Partial<CareerResource>) {
  try {
    const { data, error } = await supabaseAdmin.from("career_resources").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Error updating career resource:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Error updating career resource:", error)
    throw error
  }
}

export async function deleteCareerResource(id: string) {
  try {
    const { error } = await supabaseAdmin.from("career_resources").delete().eq("id", id)

    if (error) {
      console.error("Error deleting career resource:", error)
      throw error
    }
  } catch (error) {
    console.error("Error deleting career resource:", error)
    throw error
  }
}

export async function createQuickUpdate(update: Omit<QuickUpdate, "id" | "created_at" | "updated_at">) {
  try {
    // Convert institution_id to UUID if it exists
    const formattedUpdate = {
      ...update,
      institution_id: update.institution_id ? update.institution_id : null
    }

    const { data, error } = await supabaseAdmin
      .from("quick_updates")
      .insert(formattedUpdate)
      .select()
      .single()

    if (error) {
      console.error("Error creating quick update:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Error creating quick update:", error)
    throw error
  }
}

export async function updateQuickUpdate(id: string, updates: Partial<QuickUpdate>) {
  try {
    // Convert institution_id to UUID if it exists
    const formattedUpdates = {
      ...updates,
      institution_id: updates.institution_id ? updates.institution_id : null
    }

    const { data, error } = await supabaseAdmin
      .from("quick_updates")
      .update(formattedUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating quick update:", error)
      throw error
    }
    return data
  } catch (error) {
    console.error("Error updating quick update:", error)
    throw error
  }
}

export async function deleteQuickUpdate(id: string) {
  try {
    const { error } = await supabaseAdmin.from("quick_updates").delete().eq("id", id)

    if (error) {
      console.error("Error deleting quick update:", error)
      throw error
    }
  } catch (error) {
    console.error("Error deleting quick update:", error)
    throw error
  }
}
