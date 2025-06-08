import { getNewsById } from "@/lib/supabase/news-queries"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"

export default async function NewsPage({ params }: { params: { id: string } }) {
  const news = await getNewsById(params.id)

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">News article not found</h1>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Achievement":
        return "bg-green-600"
      case "Event":
        return "bg-blue-600"
      case "Infrastructure":
        return "bg-purple-600"
      case "Technology":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <article className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 md:mb-8">
          <Badge
            className={`inline-block mb-3 md:mb-4 text-white text-xs md:text-sm px-3 py-1 ${getCategoryColor(
              news.category,
            )}`}
          >
            {news.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            {news.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(news.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{news.read_time}</span>
            </div>
          </div>
        </header>

        {news.image_url && (
          <div className="relative w-full aspect-video md:h-[450px] mb-6 md:mb-8 overflow-hidden rounded-lg shadow-lg">
            <Calendar className="w-4 h-4 mr-2" />
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <div className="prose prose-base md:prose-lg lg:prose-xl max-w-none">
          {news.content}
        </div>
      </div>
    </article>
  )
}
