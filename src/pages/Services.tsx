import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Users, Wrench, Shield, Building, ChevronDown, ExternalLink } from 'lucide-react'
import { services } from "../data/service"
import ScrollToTop from "../components/ScrollToTop"

const Services: React.FC = () => {
  const getServiceIcon = (serviceType: string) => {
    switch (serviceType.toLowerCase()) {
      case "manufacturing workforce":
        return <Users className="h-8 w-8" />
      case "human resource":
        return <Users className="h-8 w-8" />
      case "health & safety":
        return <Shield className="h-8 w-8" />
      case "civil constructions":
        return <Building className="h-8 w-8" />
      case "architectural designing":
        return <Building className="h-8 w-8" />
      default:
        return <Wrench className="h-8 w-8" />
    }
  }

  return (
    <div>

      <ScrollToTop />
      {/* Hero Section */}
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute bg-fixed inset-0">
          <div
            className="absolute  inset-0 bg-[url('https://www.renoirgroup.com/wp-content/uploads/2023/08/4-actions-to-drive-operational-excellence-in-construction_v2.jpg')] bg-cover bg-center bg-fixed"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container section-padding text-center">
          <div className="max-w-6xl mx-auto">

            {/* Main Content */}
            <div className="mb-16">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm font-medium">Professional Services Since 1998</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
                <span className="block">Excellence in</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Construction
                </span>
                <span className="block">& Engineering</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Transforming visions into reality with 25+ years of expertise in construction,
                engineering, and architectural solutions that exceed expectations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                  <span className="relative z-10 flex items-center justify-center">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center">
                    View Portfolio
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "25+", label: "Years Experience", icon: "🏆" },
                { number: "500+", label: "Projects Completed", icon: "🏗️" },
                { number: "98%", label: "Client Satisfaction", icon: "⭐" },
                { number: "24/7", label: "Support Available", icon: "🛡️" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center cursor-pointer group">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center group-hover:border-white transition-colors">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <ChevronDown className="mt-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-px h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-1/3 right-8 w-px h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Service Image */}
                <div className="relative h-68 overflow-hidden">
                  <img
                    src={service.images[0] || "/placeholder.svg?height=200&width=400"}
                    alt={service.serviceType}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white p-3 rounded-lg">
                    {getServiceIcon(service.serviceType)}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-family-medium text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.serviceType}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 font-family-small">{service.shortDetails}</p>

                  {/* Key Points */}
                  <div className="mb-6 font-family-small">
                    <h4 className="font-semibold text-gray-900 mb-2 font-family-medium">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.bulletPoints.slice(0, 3).map((point, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center justify-center font-family-small w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 group"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-family-heading">Why Choose Our Services?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-family-small">
                With over 25 years of experience in the construction and engineering industry, we deliver exceptional
                results that exceed client expectations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-family-small">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Quality Assured</h3>
                    <p className="text-sm text-gray-600">ISO certified processes and quality control</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Team</h3>
                    <p className="text-sm text-gray-600">Qualified engineers and skilled workforce</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Safety First</h3>
                    <p className="text-sm text-gray-600">Zero harm policy with comprehensive safety measures</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Building className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Modern Equipment</h3>
                    <p className="text-sm text-gray-600">Latest technology and certified equipment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://www.pngitem.com/pimgs/m/381-3814567_seo-why-choose-us-hd-png-download.png"
                alt="Our Services"
                className="rounded-lg shadow-xl"
              />

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding font-family-small">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact our expert team to discuss your specific requirements and get a tailored solution for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
