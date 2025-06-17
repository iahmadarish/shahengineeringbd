import type React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Users, Award, Clock } from "lucide-react"
import HeroSection from "../components/home/HeroSection"
import ServiceListingTab from "../components/home/ServiceListingTab"
import ScrollToTop from "../components/ScrollToTop"

const Home: React.FC = () => {
  return (
    <div className="font-family-small">
      <ScrollToTop/>
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Building Tomorrow's
                <span className="text-primary-200"> Infrastructure</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Leading construction and engineering firm delivering innovative solutions for complex infrastructure
                projects with excellence and reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  View Our Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Construction Site"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-primary-600 p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm font-medium">Years Experience</div>
              </div>
              </div>
          </div>
        </div>
        </section> */}
      <HeroSection/>

      {/* Stats Section */}
      <section className="bg-blue-800  py-16">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">200+</div>
              <div className="text-white">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-white  ">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

        <ServiceListingTab/>


      {/* Services Preview */}
      <section className="bg-gray-50 section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive construction and engineering solutions tailored to meet your specific project
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Architectural Design",
                description: "Innovative and sustainable architectural solutions for modern infrastructure.",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
              },
              {
                title: "Structural Engineering",
                description: "Expert structural analysis and design for safe and durable constructions.",
                image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
              },
              {
                title: "Construction Management",
                description: "End-to-end project management ensuring timely and quality delivery.",
                image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
              },
              {
                title: "Supply Chain Solutions",
                description: "Efficient procurement and logistics management for construction materials.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to="/services"
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="About Us" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">25 Years of Engineering Excellence</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Since 1999, ConstructCorp has been at the forefront of construction and engineering innovation. We've
                successfully delivered over 200 projects, ranging from residential complexes to large-scale
                infrastructure developments.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">Licensed and Certified Engineers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">Quality Assurance Guaranteed</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">On-time Project Delivery</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">24/7 Customer Support</span>
                </li>
              </ul>
              <Link to="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="bg-gray-50 section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our most successful and innovative construction projects that showcase our expertise and
              commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Office Complex",
                category: "Commercial",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                location: "Dhaka, Bangladesh",
              },
              {
                title: "Residential Tower",
                category: "Residential",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                location: "Chittagong, Bangladesh",
              },
              {
                title: "Industrial Warehouse",
                category: "Industrial",
                image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                location: "Sylhet, Bangladesh",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.location}</p>
                  <Link
                    to="/projects"
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                  >
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our expert team today for a free consultation and detailed project quote.
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

export default Home
