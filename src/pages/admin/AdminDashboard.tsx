"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FolderOpen, MessageSquare, Settings, Calendar, CheckCircle, AlertCircle, Users } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

interface Stats {
  totalServices: number
  totalProjects: number
  totalContacts: number
  unreadContacts: number
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalServices: 0,
    totalProjects: 0,
    totalContacts: 0,
    unreadContacts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { token, user } = useAuth()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError("")

      // Fetch services count
      const servicesRes = await fetch("https://shaheng.onrender.com/api/services")
      const servicesData = await servicesRes.json()

      // Fetch projects count
      const projectsRes = await fetch("https://shaheng.onrender.com/api/projects")
      const projectsData = await projectsRes.json()

      // Initialize stats with available data
      const newStats = {
        totalServices: servicesData.success ? servicesData.total || servicesData.data?.length || 0 : 0,
        totalProjects: projectsData.success ? projectsData.total || projectsData.data?.length || 0 : 0,
        totalContacts: 0,
        unreadContacts: 0,
      }

      // Try to fetch contacts stats if token is available
      if (token) {
        try {
          const contactsRes = await fetch("https://shaheng.onrender.com/api/contact/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (contactsRes.ok) {
            const contactsData = await contactsRes.json()
            if (contactsData.success) {
              newStats.totalContacts = contactsData.data?.totalContacts || 0
              newStats.unreadContacts = contactsData.data?.unreadContacts || 0
            }
          }
        } catch (contactError) {
          console.log("Contact stats not available:", contactError)
        }
      }

      setStats(newStats)
    } catch (error: any) {
      console.error("Error fetching stats:", error)
      setError("Failed to load dashboard data. Please check if the backend server is running.")
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Services",
      value: stats.totalServices,
      icon: Settings,
      color: "bg-blue-500",
      link: "/admin/services",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "bg-green-500",
      link: "/admin/projects",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts,
      icon: MessageSquare,
      color: "bg-purple-500",
      link: "/admin/contacts",
    },
    {
      title: "Unread Messages",
      value: stats.unreadContacts,
      icon: AlertCircle,
      color: "bg-red-500",
      link: "/admin/contacts?filter=unread",
    },
  ]

  const quickActions = [
    {
      title: "Add New Service",
      description: "Create a new service offering",
      icon: Settings,
      link: "/admin/services/new",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Add New Project",
      description: "Add a new project to showcase",
      icon: FolderOpen,
      link: "/admin/projects/new",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "View Services",
      description: "Manage existing services",
      icon: Settings,
      link: "/admin/services",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "View Projects",
      description: "Manage project portfolio",
      icon: FolderOpen,
      link: "/admin/projects",
      color: "bg-orange-50 text-orange-600",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Warning:</p>
          <p>{error}</p>
          <button onClick={fetchStats} className="mt-2 text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded">
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Link
              key={index}
              to={card.link}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                to={action.link}
                className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
              >
                <div className={`${action.color} p-2 rounded-lg w-fit mb-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-sm font-medium text-gray-900">Frontend Application</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Online</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-sm font-medium text-gray-900">Backend API</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Connected</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-3" />
              <span className="text-sm font-medium text-gray-900">User Role</span>
            </div>
            <span className="text-sm text-blue-600 font-medium capitalize">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
