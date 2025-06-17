import type React from "react"
import ScrollToTop from "../components/ScrollToTop"

const Services: React.FC = () => {
  return (
    <div className="section-padding">
      <ScrollToTop/>
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction and engineering solutions for all our project needs.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Categories</h2>
          <p className="text-gray-600 leading-relaxed">
            This is the Services page. Here will be add detailed information about our services like: Architectural Design,
            Structural Engineering, Construction Management, Supply Chain Solutions, etc.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services
