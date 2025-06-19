"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Plus, X, Save } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import ImageUpload from "../../components/ImageUpload"

interface ProjectFormData {
  title: string
  description: string
  category: string
  client: string
  location: string
  startDate: string
  completionDate: string
  budget: number | ""
  status: string
  images: string[]
  features: string[]
  isActive: boolean
  isFeatured: boolean
}

const ProjectForm: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "Residential",
    client: "",
    location: "",
    startDate: "",
    completionDate: "",
    budget: "",
    status: "Planning",
    images: [],
    features: [""],
    isActive: true,
    isFeatured: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const categories = ["Residential", "Commercial", "Industrial", "Infrastructure", "Other"]
  const statuses = ["Planning", "In Progress", "Completed", "On Hold", "Cancelled"]

  useEffect(() => {
    if (isEdit && id) {
      fetchProject(id)
    }
  }, [id, isEdit])

  const fetchProject = async (projectId: string) => {
    try {
      const response = await fetch(`https://shaheng.onrender.com/api/projects/${projectId}`)
      const data = await response.json()

      if (data.success) {
        const project = data.data
        setFormData({
          title: project.title,
          description: project.description,
          category: project.category,
          client: project.client,
          location: project.location,
          startDate: new Date(project.startDate).toISOString().split("T")[0],
          completionDate: new Date(project.completionDate).toISOString().split("T")[0],
          budget: project.budget || "",
          status: project.status,
          images: project.images || [],
          features: project.features.length > 0 ? project.features : [""],
          isActive: project.isActive,
          isFeatured: project.isFeatured,
        })
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      setError("Failed to load project data")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Filter out empty values and prepare data
      const cleanedData = {
        ...formData,
        budget: formData.budget === "" ? undefined : Number(formData.budget),
        images: formData.images.filter((image) => image.trim() !== ""),
        features: formData.features.filter((feature) => feature.trim() !== ""),
      }

      const url = isEdit ? `https://shaheng.onrender.com/api/projects/${id}` : "https://shaheng.onrender.com/api/projects"

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
        navigate("/admin/projects")
      } else {
        setError(data.message || "Failed to save project")
      }
    } catch (error) {
      console.error("Error saving project:", error)
      setError("Failed to save project")
    } finally {
      setLoading(false)
    }
  }

  const addArrayItem = (field: keyof Pick<ProjectFormData, "features">) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: keyof Pick<ProjectFormData, "features">, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (field: keyof Pick<ProjectFormData, "features">, index: number, value: string) => {
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
            onClick={() => navigate("/admin/projects")}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{isEdit ? "Edit Project" : "Add New Project"}</h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? "Update project information" : "Create a new project showcase"}
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

          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Modern Office Complex"
              />
            </div>

            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                id="client"
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., ABC Corporation"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Detailed description of the project..."
            />
          </div>

          {/* Category, Status, Location */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Dhaka, Bangladesh"
              />
            </div>
          </div>

          {/* Dates and Budget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-2">
                Completion Date *
              </label>
              <input
                id="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Budget (USD)
              </label>
              <input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value === "" ? "" : Number(e.target.value) })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 500000"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Project Features</label>
              <button
                type="button"
                onClick={() => addArrayItem("features")}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateArrayItem("features", index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
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
            maxImages={8}
            label="Project Images"
          />

          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                id="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Active Project
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="isFeatured"
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Featured Project
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
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
              {isEdit ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
