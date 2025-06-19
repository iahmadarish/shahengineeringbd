"use client"

import type React from "react"
import { useState } from "react"
import { Navigate, Link } from "react-router-dom"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, login } = useAuth()

  // Redirect if already logged in as admin/manager
  if (user && (user.role === "admin" || user.role === "manager")) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-white text-primary-600 p-3 rounded-lg">
              <span className="text-2xl font-bold">CC</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-primary-100">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="admin@construction.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Email:</strong> admin@construction.com
              </p>
              <p>
                <strong>Password:</strong> Admin123!
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
