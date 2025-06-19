"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  label?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImagesChange, maxImages = 5, label = "Images" }) => {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { token } = useAuth()

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const remainingSlots = maxImages - images.length
    const filesToUpload = Array.from(files).slice(0, remainingSlots)

    if (filesToUpload.length === 0) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const formData = new FormData()
        formData.append("image", file)

        const response = await fetch("https://shaheng.onrender.com/api/upload/single", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        return data.data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedUrls])
    } catch (error: any) {
      console.error("Upload error:", error)
      alert(error.message || "Failed to upload images")
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "pointer-events-none opacity-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="text-center">
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-primary-600 animate-spin mb-2" />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Click to upload
                </button>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (Max {maxImages} images)</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=200"
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image Count */}
      <div className="text-sm text-gray-500">
        {images.length} of {maxImages} images uploaded
      </div>
    </div>
  )
}

export default ImageUpload
