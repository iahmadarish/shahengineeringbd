"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

interface Project {
  _id: string
  title: string
  description: string
  category: string
  client: string
  location: string
  status: string
  budget: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  completionDate: string
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const { token } = useAuth()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("https://shaheng.onrender.com/api/projects")
      const data = await response.json()

      if (data.success) {
        setProjects(data.data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`https://shaheng.onrender.com/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== id))
      } else {
        alert("Failed to delete project")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Error deleting project")
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || project.category === filterCategory
    const matchesStatus = filterStatus === "all" || project.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "On Hold":
        return "bg-orange-100 text-orange-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-600 mt-1">Manage your company projects and portfolio</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {project.title}
                          {project.isFeatured && (
                            <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{project.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{project.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {project.budget ? `$${project.budget.toLocaleString()}` : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/projects/${project._id}`}
                          target="_blank"
                          className="text-gray-600 hover:text-primary-600 p-1"
                          title="View Project"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/admin/projects/edit/${project._id}`}
                          className="text-gray-600 hover:text-blue-600 p-1"
                          title="Edit Project"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-gray-600 hover:text-red-600 p-1"
                          title="Delete Project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProjects
