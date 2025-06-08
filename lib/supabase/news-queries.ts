import { supabase } from "./client"
import { supabaseAdmin } from "./server"
import type { News, NewsInsert } from "./news-types"

export async function getPublishedNews() {
  try {
    if (!supabase) {
      console.error("Supabase client is not initialized.")
      return []
    }
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching published news:", error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getPublishedNews:", error)
    return []
  }
}

export async function getAllNews() {
  try {
    const { data, error } = await supabaseAdmin
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all news:", error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllNews:", error)
    return []
  }
}

export async function createNews(news: Omit<News, "id" | "created_at" | "updated_at" | "views" | "likes">) {
  try {
    const { data, error } = await supabaseAdmin
      .from("news")
      .insert(news)
      .select()
      .single()

    if (error) {
      console.error("Error creating news:", error.message)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in createNews:", error)
    throw error
  }
}

export async function updateNews(id: string, updates: Partial<News>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("news")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating news:", error.message)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in updateNews:", error)
    throw error
  }
}

export async function deleteNews(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("news")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting news:", error.message)
      throw error
    }
  } catch (error) {
    console.error("Error in deleteNews:", error)
    throw error
  }
}

export async function incrementNewsViews(id: string) {
  try {
    const { error } = await supabaseAdmin
      .rpc("increment_news_views", { news_id: id })

    if (error) {
      console.error("Error incrementing news views:", error.message)
      throw error
    }
  } catch (error) {
    console.error("Error in incrementNewsViews:", error)
    throw error
  }
}

export async function incrementNewsLikes(id: string) {
  try {
    const { error } = await supabaseAdmin
      .rpc("increment_news_likes", { news_id: id })

    if (error) {
      console.error("Error incrementing news likes:", error.message)
      throw error
    }
  } catch (error) {
    console.error("Error in incrementNewsLikes:", error)
    throw error
  }
}

export async function getNewsById(id: string) {
  try {
    if (!supabase) {
      console.error("Supabase client is not initialized.")
      return null
    }
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .eq("status", "published")
      .single()

    if (error) {
      console.error("Error fetching news by id:", error.message)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getNewsById:", error)
    return null
  }
}
