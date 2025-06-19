"use client"

import type React from "react"
import { useState } from "react"
import { Outlet, Link, useLocation, Navigate } from "react-router-dom"
import {
  Menu,
  X,
  Home,
  Settings,
  Users,
  FolderOpen,
//   MessageSquare,
//   BarChart3,
  LogOut,
  Bell,
  Search,
} from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  // Check if user is admin or manager
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    return <Navigate to="/admin/login" replace />
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Services", href: "/admin/services", icon: Settings },
    { name: "Projects", href: "/admin/projects", icon: FolderOpen },
    // { name: "Contact Messages", href: "/admin/contacts", icon: MessageSquare },
    { name: "Users", href: "/admin/users", icon: Users, adminOnly: true },
    // { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ]

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin"
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <span className="text-lg font-bold">CC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1">
          <div className="space-y-1">
            {navigation.map((item) => {
              // Hide admin-only items for managers
              if (item.adminOnly && user.role !== "admin") {
                return null
              }

              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-primary-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
