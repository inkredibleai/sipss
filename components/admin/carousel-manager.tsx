'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Upload, Trash2, MoveUp, MoveDown, Edit, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { createCarouselImage, updateCarouselImage, deleteCarouselImage, getAllCarouselImages, updateCarouselOrder } from "@/lib/supabase/carousel-queries"
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/lib/supabase/types"

type CarouselImage = Database["public"]["Tables"]["carousel_images"]["Row"]

export default function CarouselManager() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [selectedImage, setSelectedImage] = useState<CarouselImage | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    try {
      const data = await getAllCarouselImages()
      setImages(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load carousel images. Please try again.",
        variant: "destructive",
      })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        title: String(formData.get("title")),
        image_url: String(formData.get("image_url")),
        caption: String(formData.get("caption")),
        alt_text: String(formData.get("alt_text")),
        status: formData.get("status") ? "active" as const : "inactive" as const,
        sort_order: selectedImage ? selectedImage.sort_order : images.length + 1,
      }

      if (selectedImage) {
        await updateCarouselImage(selectedImage.id, data)
        toast({
          title: "Success",
          description: "Carousel image updated successfully",
        })
      } else {
        await createCarouselImage(data)
        toast({
          title: "Success",
          description: "New carousel image added successfully",
        })
      }

      setSelectedImage(null)
      e.currentTarget.reset()
      setPreviewUrl("")
      await loadImages()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save carousel image",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!selectedImage) return

    try {
      await deleteCarouselImage(selectedImage.id)
      setSelectedImage(null)
      setIsDeleteDialogOpen(false)
      await loadImages()
      toast({
        title: "Success",
        description: "Carousel image deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete carousel image",
        variant: "destructive",
      })
    }
  }

  async function handleReorder(id: string, direction: "up" | "down") {
    const currentIndex = images.findIndex((img) => img.id === id)
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === images.length - 1)
    ) {
      return
    }

    try {
      const newImages = [...images]
      const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
      const temp = newImages[currentIndex]
      newImages[currentIndex] = newImages[swapIndex]
      newImages[swapIndex] = temp

      // Update sort_order numbers
      const updatedImages = newImages.map((img, index) => ({
        id: img.id,
        sort_order: index + 1,
      }))

      await updateCarouselOrder(updatedImages)
      await loadImages()
      
      toast({
        title: "Success",
        description: "Image order updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update image order",
        variant: "destructive",
      })
    }
  }

  function handleImageUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value
    setPreviewUrl(url)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Carousel Images</h2>
        <Button onClick={() => {
          setSelectedImage(null)
          setShowForm(true)
        }}>
          <Upload className="w-4 h-4 mr-2" />
          Add New Image
        </Button>
      </div>

      {/* Grid view of all images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSelectedImage(image)
                    setShowForm(true)
                  }}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedImage(image)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold truncate">{image.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{image.caption}</p>
                </div>
                <div className="flex items-center gap-2">
                  {image.status === 'active' ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">Order: {image.sort_order}</span>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleReorder(image.id, "up")}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleReorder(image.id, "down")}
                    disabled={index === images.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Dialog */}
      <AlertDialog open={showForm} onOpenChange={setShowForm}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedImage ? "Edit Carousel Image" : "Add New Carousel Image"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={selectedImage?.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  defaultValue={selectedImage?.image_url}
                  onChange={handleImageUrlChange}
                  required
                />
              </div>
              {(previewUrl || selectedImage?.image_url) && (
                <div className="md:col-span-2 relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={previewUrl || selectedImage?.image_url || ''}
                    alt="Image preview"
                    fill
                    className="object-cover"
                    onError={() => setPreviewUrl('')}
                  />
                </div>
              )}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  name="caption"
                  defaultValue={selectedImage?.caption}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input
                  id="alt_text"
                  name="alt_text"
                  defaultValue={selectedImage?.alt_text}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  name="status"
                  defaultChecked={selectedImage?.status === "active"}
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setSelectedImage(null)
                }}
              >
                Cancel
              </AlertDialogCancel>
              <Button type="submit" disabled={isLoading}>
                {selectedImage ? "Update" : "Create"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Carousel Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
