export interface News {
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

export type NewsInsert = Omit<News, "id" | "created_at" | "updated_at" | "views" | "likes"> & {
  id?: string
  views?: number
  likes?: number
  created_at?: string
  updated_at?: string
}
