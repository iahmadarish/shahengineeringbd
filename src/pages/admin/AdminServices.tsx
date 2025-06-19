"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash2, Eye, Search, Filter, Settings } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

interface Service {
  _id: string
  serviceType: string
  shortDetails: string
  fullDetails: string[]
  bulletPoints: string[]
  images: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterActive, setFilterActive] = useState("all")
  const { token } = useAuth()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch("https://shaheng.onrender.com/api/services")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setServices(data.data || [])
      } else {
        setError(data.message || "Failed to fetch services")
      }
    } catch (error: any) {
      console.error("Error fetching services:", error)
      setError("Failed to connect to server. Please make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const response = await fetch(`https://shaheng.onrender.com/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setServices(services.filter((service) => service._id !== id))
        alert("Service deleted successfully!")
      } else {
        const data = await response.json()
        alert(data.message || "Failed to delete service")
      }
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Error deleting service")
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDetails.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && service.isActive) ||
      (filterActive === "inactive" && !service.isActive)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="admin-clean space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage your company services and offerings</p>
        </div>
        <Link
          to="/admin/services/new"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Service
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
          <button onClick={fetchServices} className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded">
            Retry
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Services</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading services...</span>
          </div>
        </div>
      )}

      {/* Services List */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Settings className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No services found</p>
              <p className="text-gray-400 text-sm mb-4">
                {services.length === 0
                  ? "Get started by creating your first service"
                  : "Try adjusting your search or filter criteria"}
              </p>
              {services.length === 0 && (
                <Link
                  to="/admin/services/new"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Service
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.serviceType}</div>
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-md">{service.shortDetails}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            service.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/services/${service._id}`}
                            target="_blank"
                            className="text-gray-600 hover:text-primary-600 p-1 rounded"
                            title="View Service"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/admin/services/edit/${service._id}`}
                            className="text-gray-600 hover:text-blue-600 p-1 rounded"
                            title="Edit Service"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="text-gray-600 hover:text-red-600 p-1 rounded"
                            title="Delete Service"
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
      )}

      {/* Stats */}
      {!loading && services.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{services.length}</div>
              <div className="text-sm text-gray-600">Total Services</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{services.filter((s) => s.isActive).length}</div>
              <div className="text-sm text-gray-600">Active Services</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{services.filter((s) => !s.isActive).length}</div>
              <div className="text-sm text-gray-600">Inactive Services</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminServices
