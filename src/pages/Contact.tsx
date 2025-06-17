import type React from "react"
import ScrollToTop from "../components/ScrollToTop"

const Contact: React.FC = () => {
  return (
    <div className="section-padding">
      <ScrollToTop/>
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for your next construction project.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-gray-600 leading-relaxed">
            This is the Contact page. Here will be add contact forms, office locations, contact information, and maps here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
