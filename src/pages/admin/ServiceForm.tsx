"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Plus, X, Save } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import ImageUpload from "../../components/ImageUpload"

interface ServiceFormData {
  serviceType: string
  shortDetails: string
  fullDetails: string[]
  bulletPoints: string[]
  images: string[]
  isActive: boolean
}

const ServiceForm: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState<ServiceFormData>({
    serviceType: "",
    shortDetails: "",
    fullDetails: [""],
    bulletPoints: [""],
    images: [],
    isActive: true,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEdit && id) {
      fetchService(id)
    }
  }, [id, isEdit])

  const fetchService = async (serviceId: string) => {
    try {
      const response = await fetch(`https://shaheng.onrender.com/api/services/${serviceId}`)
      const data = await response.json()

      if (data.success) {
        setFormData({
          serviceType: data.data.serviceType,
          shortDetails: data.data.shortDetails,
          fullDetails: data.data.fullDetails,
          bulletPoints: data.data.bulletPoints,
          images: data.data.images || [],
          isActive: data.data.isActive,
        })
      }
    } catch (error) {
      console.error("Error fetching service:", error)
      setError("Failed to load service data")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Filter out empty values
      const cleanedData = {
        ...formData,
        fullDetails: formData.fullDetails.filter((detail) => detail.trim() !== ""),
        bulletPoints: formData.bulletPoints.filter((point) => point.trim() !== ""),
        images: formData.images.filter((image) => image.trim() !== ""),
      }

      const url = isEdit ? `https://shaheng.onrender.com/api/services/${id}` : "https://shaheng.onrender.com/api/services"

      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      })

      const data = await response.json()

      if (data.success) {
        navigate("/admin/services")
      } else {
        setError(data.message || "Failed to save service")
      }
    } catch (error) {
      console.error("Error saving service:", error)
      setError("Failed to save service")
    } finally {
      setLoading(false)
    }
  }

  const addArrayItem = (field: keyof Pick<ServiceFormData, "fullDetails" | "bulletPoints">) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: keyof Pick<ServiceFormData, "fullDetails" | "bulletPoints">, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (
    field: keyof Pick<ServiceFormData, "fullDetails" | "bulletPoints">,
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/services")}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{isEdit ? "Edit Service" : "Add New Service"}</h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? "Update service information" : "Create a new service offering"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {/* Service Type */}
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
              Service Type *
            </label>
            <input
              id="serviceType"
              type="text"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Manufacturing Workforce"
            />
          </div>

          {/* Short Details */}
          <div>
            <label htmlFor="shortDetails" className="block text-sm font-medium text-gray-700 mb-2">
              Short Details *
            </label>
            <textarea
              id="shortDetails"
              value={formData.shortDetails}
              onChange={(e) => setFormData({ ...formData, shortDetails: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of the service..."
            />
          </div>

          {/* Full Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Full Details *</label>
              <button
                type="button"
                onClick={() => addArrayItem("fullDetails")}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Detail
              </button>
            </div>
            <div className="space-y-3">
              {formData.fullDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={detail}
                    onChange={(e) => updateArrayItem("fullDetails", index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={`Detail ${index + 1}`}
                  />
                  {formData.fullDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("fullDetails", index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bullet Points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Key Features *</label>
              <button
                type="button"
                onClick={() => addArrayItem("bulletPoints")}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {formData.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateArrayItem("bulletPoints", index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.bulletPoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("bulletPoints", index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload
            images={formData.images}
            onImagesChange={(images) => setFormData({ ...formData, images })}
            maxImages={5}
            label="Service Images"
          />

          {/* Active Status */}
          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active Service
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/services")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg transition-colors flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEdit ? "Update Service" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceForm
