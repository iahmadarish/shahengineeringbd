

import type React from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin, Users, Award, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { services } from "../data/service"
import ScrollToTop from "../components/ScrollToTop"
import "../index.css"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // ✅ Fixed
  },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // ✅ Fixed
  },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // ✅ Fixed
  },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}



const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const service = services.find((s) => s.id === Number.parseInt(id || "0"))

  if (!service) {
    return <Navigate to="/services" replace />
  }

  return (
    <motion.div className="font-family-heading" initial="initial" animate="animate">
      <ScrollToTop />

      {/* Breadcrumb & Back Button */}
      <motion.section className="bg-black py-8" {...fadeInUp}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-white">
              <Link to="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/services" className="hover:text-primary-600 transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-gray-300">{service.serviceType}</span>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-white hover:text-primary-400 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInLeft}>
              <motion.h1
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {service.serviceType}
              </motion.h1>

              <motion.p
                className="text-xl font-family-small text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {service.shortDetails}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  { icon: Users, text: "Expert Team" },
                  { icon: Award, text: "Quality Assured" },
                  { icon: Clock, text: "Timely Delivery" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Get Quote for This Service
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Slider */}
            <motion.div className="relative" {...fadeInRight}>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={true}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true,
                  }}
                  loop={true}
                  className="service-detail-swiper"
                  style={
                    {
                      "--swiper-navigation-color": "#059669",
                      "--swiper-pagination-color": "#059669",
                    } as React.CSSProperties
                  }
                >
                  {service.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={image || `/placeholder.svg?height=500&width=600&text=Image ${index + 1}`}
                          alt={`${service.serviceType} - Image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <motion.ul
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {service.fullDetails.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="flex font-family-small items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed text-lg">{detail}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Benefits</h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 font-family-small text-lg font-bold gap-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {service.bulletPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-primary-50 rounded-lg cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "#ecfdf5",
                        transition: { duration: 0.2 },
                      }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Additional Images */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {service.images.slice(0, 2).map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-xl group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={image || `/placeholder.svg?height=300&width=400&text=Image ${index + 1}`}
                      alt={`${service.serviceType} - Additional ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Contact Card */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-family-medium">Get Started Today</h3>
                <p className="text-gray-600 mb-6 font-family-small">
                  Ready to discuss your project requirements? Contact our expert team for a free consultation.
                </p>

                <div className="space-y-4 mb-6 font-family-small font-semibold">
                  <motion.div className="flex items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Phone className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">+88 01819454892</span>
                  </motion.div>
                  <motion.div className="flex items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Mail className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">info@shahengineering.com</span>
                  </motion.div>
                  <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                    <span className="text-gray-700">Mirpur 6, Road-1, Plot-2, Dhaka, Bangladesh 1216</span>
                  </motion.div>
                </div>

                <Link
                  to="/contact"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Request Quote
                </Link>
              </motion.div>

              {/* Related Services */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-family-medium">Related Services</h3>
                <div className="space-y-3">
                  {services
                    .filter((s) => s.id !== service.id)
                    .slice(0, 4)
                    .map((relatedService, index) => (
                      <motion.div
                        key={relatedService.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          to={`/services/${relatedService.id}`}
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <h4 className="font-semibold font-family-medium text-blue-900 hover:text-primary-600 transition-colors">
                            {relatedService.serviceType}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{relatedService.shortDetails}</p>
                        </Link>
                      </motion.div>
                    ))}
                </div>
                <Link
                  to="/services"
                  className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View All Services →
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="bg-primary-600 font-family-small text-white rounded-xl shadow-lg p-6"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    { number: "2+", text: "Years Experience" },
                    { number: "5+", text: "Projects Completed" },
                    { number: "98%", text: "Client Satisfaction" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-3xl font-bold">{stat.number}</div>
                      <div className="text-sm text-primary-100">{stat.text}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-primary-600 font-family-small text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold mb-6 font-family-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact us today to discuss your {service.serviceType.toLowerCase()} requirements and get a customized
            solution.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Free Quote
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default ServiceDetail
