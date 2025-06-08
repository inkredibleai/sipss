import { supabase } from "./client"
import { supabaseAdmin } from "./server"
import type { Database } from "./types"

type CarouselImage = Database["public"]["Tables"]["carousel_images"]["Row"]

export async function getActiveCarouselImages() {
  try {
    if (!supabase) {
      console.error("Supabase client is not initialized.")
      return []
    }
    const { data, error } = await supabase
      .from("carousel_images")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true })

    if (error) {
      console.error("Error fetching active carousel images:", error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getActiveCarouselImages:", error)
    return []
  }
}

export async function getAllCarouselImages() {
  try {
    const { data, error } = await supabaseAdmin
      .from("carousel_images")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error) {
      console.error("Error fetching all carousel images:", error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllCarouselImages:", error)
    return []
  }
}

export async function createCarouselImage(image: Omit<CarouselImage, "id" | "created_at" | "updated_at">) {
  try {
    // Get the highest sort_order
    const { data: existingImages } = await supabaseAdmin
      .from("carousel_images")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)

    const nextSortOrder = existingImages?.[0]?.sort_order ?? 0 + 1

    const { data, error } = await supabaseAdmin
      .from("carousel_images")
      .insert({ ...image, sort_order: nextSortOrder })
      .select()
      .single()

    if (error) {
      console.error("Error creating carousel image:", error.message)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in createCarouselImage:", error)
    throw error
  }
}

export async function updateCarouselImage(id: string, updates: Partial<CarouselImage>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("carousel_images")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating carousel image:", error.message)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in updateCarouselImage:", error)
    throw error
  }
}

export async function deleteCarouselImage(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("carousel_images")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting carousel image:", error.message)
      throw error
    }
  } catch (error) {
    console.error("Error in deleteCarouselImage:", error)
    throw error
  }
}

export async function updateCarouselOrder(images: { id: string; sort_order: number }[]) {
  try {
    const { error } = await supabaseAdmin.from("carousel_images").upsert(
      images.map(({ id, sort_order }) => ({
        id,
        sort_order,
        updated_at: new Date().toISOString(),
      }))
    )

    if (error) {
      console.error("Error updating carousel order:", error.message)
      throw error
    }
  } catch (error) {
    console.error("Error in updateCarouselOrder:", error)
    throw error
  }
}
