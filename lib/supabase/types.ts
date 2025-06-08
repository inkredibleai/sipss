export type Database = {
  public: {
    Tables: {
      institutions: {
        Row: {
          id: string
          name: string
          code: string
          address: string
          phone: string
          email: string
          website: string | null
          logo_url: string | null
          description: string | null
          established_year: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          address: string
          phone: string
          email: string
          website?: string | null
          logo_url?: string | null
          description?: string | null
          established_year?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          address?: string
          phone?: string
          email?: string
          website?: string | null
          logo_url?: string | null
          description?: string | null
          established_year?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      achievers: {
        Row: {
          id: string
          name: string
          class: string
          category: "board_10" | "board_12" | "iit_jee" | "neet" | "sainik_school" | "olympiad" | "other"
          achievement: string
          percentage: number | null
          rank: number | null
          exam_cleared: string
          photo_url: string | null
          year: string
          institution_id: string | null
          description: string | null
          featured: boolean
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          class: string
          category: "board_10" | "board_12" | "iit_jee" | "neet" | "sainik_school" | "olympiad" | "other"
          achievement: string
          percentage?: number | null
          rank?: number | null
          exam_cleared: string
          photo_url?: string | null
          year: string
          institution_id?: string | null
          description?: string | null
          featured?: boolean
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          class?: string
          category?: "board_10" | "board_12" | "iit_jee" | "neet" | "sainik_school" | "olympiad" | "other"
          achievement?: string
          percentage?: number | null
          rank?: number | null
          exam_cleared?: string
          photo_url?: string | null
          year?: string
          institution_id?: string | null
          description?: string | null
          featured?: boolean
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      papers: {
        Row: {
          id: string
          title: string
          subject: string
          class: string
          year: string
          type: "mock" | "past"
          board: string
          duration: string | null
          marks: number | null
          difficulty: "easy" | "medium" | "hard"
          description: string | null
          file_url: string
          file_size: string | null
          downloads: number
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subject: string
          class: string
          year: string
          type: "mock" | "past"
          board: string
          duration?: string | null
          marks?: number | null
          difficulty?: "easy" | "medium" | "hard"
          description?: string | null
          file_url: string
          file_size?: string | null
          downloads?: number
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subject?: string
          class?: string
          year?: string
          type?: "mock" | "past"
          board?: string
          duration?: string | null
          marks?: number | null
          difficulty?: "easy" | "medium" | "hard"
          description?: string | null
          file_url?: string
          file_size?: string | null
          downloads?: number
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      career_resources: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          type: "article" | "video" | "guide" | "webinar"
          duration: string | null
          difficulty: "beginner" | "intermediate" | "advanced"
          tags: string[]
          thumbnail_url: string | null
          author: string | null
          content: string | null
          views: number
          rating: number
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          type: "article" | "video" | "guide" | "webinar"
          duration?: string | null
          difficulty?: "beginner" | "intermediate" | "advanced"
          tags?: string[]
          thumbnail_url?: string | null
          author?: string | null
          content?: string | null
          views?: number
          rating?: number
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          type?: "article" | "video" | "guide" | "webinar"
          duration?: string | null
          difficulty?: "beginner" | "intermediate" | "advanced"
          tags?: string[]
          thumbnail_url?: string | null
          author?: string | null
          content?: string | null
          views?: number
          rating?: number
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      quick_updates: {
        Row: {
          id: string
          title: string
          description: string
          type: "admission" | "course" | "scholarship" | "facility" | "announcement"
          priority: "low" | "medium" | "high"
          link_url: string | null
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: "admission" | "course" | "scholarship" | "facility" | "announcement"
          priority?: "low" | "medium" | "high"
          link_url?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: "admission" | "course" | "scholarship" | "facility" | "announcement"
          priority?: "low" | "medium" | "high"
          link_url?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      media_gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          media_url: string
          media_type: "image" | "video"
          category: string
          alt_text: string | null
          featured: boolean
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          media_url: string
          media_type: "image" | "video"
          category: string
          alt_text?: string | null
          featured?: boolean
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          media_url?: string
          media_type?: "image" | "video"
          category?: string
          alt_text?: string | null
          featured?: boolean
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      carousel_images: {
        Row: {
          id: string
          title: string
          image_url: string
          caption: string
          alt_text: string
          sort_order: number
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          image_url: string
          caption: string
          alt_text: string
          order?: number
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          image_url?: string
          caption?: string
          alt_text?: string
          order?: number
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Achiever = Database["public"]["Tables"]["achievers"]["Row"]
export type Paper = Database["public"]["Tables"]["papers"]["Row"]
export type CareerResource = Database["public"]["Tables"]["career_resources"]["Row"]
export type QuickUpdate = Database["public"]["Tables"]["quick_updates"]["Row"]
      news: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          category: string
          image_url: string
          read_time: string
          status: "published" | "draft" | "scheduled"
          views: number
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          category: string
          image_url: string
          read_time: string
          status?: "published" | "draft" | "scheduled"
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          category?: string
          image_url?: string
          read_time?: string
          status?: "published" | "draft" | "scheduled"
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }

export type Institution = Database["public"]["Tables"]["institutions"]["Row"]
export type MediaItem = Database["public"]["Tables"]["media_gallery"]["Row"]
export type CarouselImage = Database["public"]["Tables"]["carousel_images"]["Row"]
export type News = Database["public"]["Tables"]["news"]["Row"]
