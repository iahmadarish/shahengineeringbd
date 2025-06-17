import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Users, Wrench, Shield, Building } from 'lucide-react'
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

      <ScrollToTop/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Professional Services</h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Comprehensive construction and engineering solutions delivered by our expert team with over 25 years of
              industry experience.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From manufacturing workforce to specialized construction services, we provide end-to-end solutions for all
              your project needs.
            </p>
          </div>

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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.serviceType}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.shortDetails}</p>

                  {/* Key Points */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
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
                    className="inline-flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 group"
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With over 25 years of experience in the construction and engineering industry, we deliver exceptional
                results that exceed client expectations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      <section className="bg-primary-600 text-white section-padding">
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
