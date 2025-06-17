"use client"

import type React from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin, Users, Award, Clock } from "lucide-react"
import { services } from "../data/service"
import ScrollToTop from "../components/ScrollToTop"

const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const service = services.find((s) => s.id === Number.parseInt(id || "0"))

    if (!service) {
        return <Navigate to="/services" replace />
    }

    return (
        <div>
            <ScrollToTop />
            {/* Breadcrumb & Back Button */}
            <section className="bg-gray-50 py-8">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link to="/" className="hover:text-primary-600">
                                Home
                            </Link>
                            <span>/</span>
                            <Link to="/services" className="hover:text-primary-600">
                                Services
                            </Link>
                            <span>/</span>
                            <span className="text-gray-900">{service.serviceType}</span>
                        </div>
                        <Link
                            to="/services"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{service.serviceType}</h1>
                            <p className="text-xl font-family-small text-gray-600 mb-8 leading-relaxed">{service.shortDetails}</p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full">
                                    <Users className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Expert Team</span>
                                </div>
                                <div className="flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full">
                                    <Award className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Quality Assured</span>
                                </div>
                                <div className="flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full">
                                    <Clock className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Timely Delivery</span>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                            >
                                Get Quote for This Service
                                <Phone className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <div className="relative">
                            <img
                                src={service.images[0] || "/placeholder.svg?height=500&width=600"}
                                alt={service.serviceType}
                                className="rounded-lg shadow-xl w-full"
                            />
                            {service.images[1] && (
                                <img
                                    src={service.images[1] || "/placeholder.svg"}
                                    alt={`${service.serviceType} - Additional`}
                                    className="absolute -bottom-6 -left-6 w-48 h-32 object-cover rounded-lg shadow-lg border-4 border-white"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="section-padding bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
                                <div className="prose prose-lg max-w-none">
                                    <ul className="space-y-4">
                                        {service.fullDetails.map((detail, index) => (
                                            <li key={index} className="flex font-family-small items-start">
                                                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 leading-relaxed text-lg">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Benefits</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 font-family-small text-lg font-bold gap-4">
                                    {service.bulletPoints.map((point, index) => (
                                        <div key={index} className="flex items-center p-4 bg-primary-50 rounded-lg">
                                            <CheckCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className=" space-y-4 mt-8 gap-x-4  flex ">
                                {/* <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Benefits</h3> */}
                                <img
                                    src={service.images[0] || "/placeholder.svg?height=500&width=600"}
                                    alt={service.serviceType}
                                    className="rounded-lg shadow-xl w-full object-cover h-78"
                                />
                                <img
                                    src={service.images[1] || "/placeholder.svg?height=500&width=600"}
                                    alt={service.serviceType}
                                    className="rounded-lg shadow-xl w-full object-cover h-78"
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Contact Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 font-family-medium">Get Started Today</h3>
                                <p className="text-gray-600 mb-6 font-family-small">
                                    Ready to discuss your project requirements? Contact our expert team for a free consultation.
                                </p>

                                <div className="space-y-4 mb-6 font-family-small font-semibold">
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-primary-600 mr-3" />
                                        <span className="text-gray-700">+88 01819454892</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-primary-600 mr-3" />
                                        <span className="text-gray-700">info@shahengineering.com</span>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                                        <span className="text-gray-700">123 Construction Street, Dhaka, Bangladesh</span>
                                    </div>
                                </div>

                                <Link
                                    to="/contact"
                                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Request Quote
                                </Link>
                            </div>

                            {/* Related Services */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 font-family-medium">Related Services</h3>
                                <div className="space-y-3">
                                    {services
                                        .filter((s) => s.id !== service.id)
                                        .slice(0, 4)
                                        .map((relatedService) => (
                                            <Link
                                                key={relatedService.id}
                                                to={`/services/${relatedService.id}`}
                                                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <h4 className="font-semibold font-family-medium  text-blue-900 hover:text-primary-600">
                                                    {relatedService.serviceType}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{relatedService.shortDetails}</p>
                                            </Link>
                                        ))}
                                </div>
                                <Link
                                    to="/services"
                                    className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    View All Services →
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="bg-primary-600 text-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">25+</div>
                                        <div className="text-sm text-primary-100">Years Experience</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">500+</div>
                                        <div className="text-sm text-primary-100">Projects Completed</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">98%</div>
                                        <div className="text-sm text-primary-100">Client Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary-600 text-white py-16">
                <div className="container text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss your {service.serviceType.toLowerCase()} requirements and get a customized
                        solution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            Get Free Quote
                        </Link>
                        <Link
                            to="/projects"
                            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServiceDetail
