"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Phone, Mail } from "lucide-react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import logo from "../../../public/shah.png"
interface NavigationItem {
  name: string
  href: string
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const location = useLocation()

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (path: string): boolean => location.pathname === path

  // Animation variants for mobile only
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  const mobileMenuVariants: Variants = {
    open: {
      x: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
    closed: {
      x: "100%",
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar - No animations */}
      <div className="bg-blue-900 text-white py-2">
        <div className=" mx-auto px-8 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+88 01819454892</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@shahengineering.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className=" mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - No animations */}
          <div>
            <Link to="/" className="">
                <img src={logo} className="h-16 w-full" alt="" />
            </Link>
          </div>

          {/* Desktop Navigation - No animations */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item: NavigationItem) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`relative font-medium transition-colors duration-200 ${
                    isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600" />}
                </Link>
              </div>
            ))}
            <div>
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Get Quote
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div className="md:hidden z-50" whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <p className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation - Animations preserved */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-blue-900 bg-opacity-95 z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {/* Mobile Header with Logo and Close Button */}
              <div className="flex bg-white justify-between items-center px-4 border-b border-blue-700">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    className="bg- text-blue-900 p-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={logo} className="h-16 " alt="" />
                  </motion.div>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white bg-blue-800 hover:text-blue-200 p-2 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.div
                className="flex flex-col space-y-4 pt-8 px-4 text-white"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navigation.map((item: NavigationItem) => (
                  <motion.div key={item.name} variants={itemVariants} whileHover={{ x: 10 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={item.href}
                      className={`block text-xl font-medium transition-all duration-200 px-4 py-3 rounded-lg ${
                        isActive(item.href)
                          ? "bg-white text-black font-bold"
                          : "text-blue-200 hover:text-white hover:bg-blue-800"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-4"
                >
                  <Link
                    to="/contact"
                    className="block bg-white text-blue-900 px-6 py-3 rounded-lg font-bold text-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Quote
                  </Link>
                </motion.div>
              </motion.div>

              {/* Contact info in mobile menu */}
              <motion.div
                className="mt-12 pt-6 border-t border-blue-700 text-blue-100 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="h-5 w-5" />
                  <span>+88 01819454892</span>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-5 w-5" />
                  <span>info@shahengineering.com</span>
                </div>
                <div>
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header
