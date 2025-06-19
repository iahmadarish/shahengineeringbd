"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Services Category
  {
    id: 1,
    question: "What types of construction services do you provide?",
    answer:
      "We offer comprehensive construction services including civil constructions, architectural designing, road & bridge construction, manufacturing workforce, and specialized services like dredging and LPG pipeline construction. Our expert team handles projects from residential buildings to large-scale infrastructure development.",
    category: "Services",
  },
  {
    id: 2,
    question: "Do you provide architectural design services?",
    answer:
      "Yes, we offer expert architectural design services focused on creativity, functionality, and sustainability. Our services include 2D/3D plan development, interior layout planning, sustainable building design, and client-specific customization led by expert architects and designers.",
    category: "Services",
  },
  {
    id: 3,
    question: "Can you handle large-scale infrastructure projects?",
    answer:
      "We specialize in large-scale infrastructure including road & bridge construction, dredging for waterways and canals, and industrial projects. We have the expertise, modern machinery, and workforce capacity to handle complex infrastructure development projects.",
    category: "Services",
  },
  {
    id: 4,
    question: "Do you offer LPG pipeline construction services?",
    answer:
      "Yes, we provide LPG bottling and pipeline construction services maintaining safety and efficiency standards. This includes design and setup of bottling plants, pipeline routing and installation, with safety measures integrated at every stage, complying with energy sector regulations.",
    category: "Services",
  },

  // Team Category
  {
    id: 5,
    question: "How experienced is your construction team?",
    answer:
      "Our team has over 25 years of experience in the construction and engineering industry. We have highly qualified graduate engineers leading our design section and factory operations, with 50 permanent employees and 100+ temporary workers to handle peak demand efficiently.",
    category: "Team",
  },
  {
    id: 6,
    question: "What qualifications do your engineers have?",
    answer:
      "Our design section and factory operations are led by highly qualified graduate engineers, handpicked by top management to ensure technical excellence. All engineers are certified professionals with extensive experience in their respective fields.",
    category: "Team",
  },
  {
    id: 7,
    question: "How do you ensure your team stays updated with latest technologies?",
    answer:
      "We have continuous development and training processes in place. Our team regularly participates in professional development programs, industry workshops, and certification courses to stay current with the latest construction technologies and best practices.",
    category: "Team",
  },
  {
    id: 8,
    question: "Do you have project managers for each construction project?",
    answer:
      "Yes, we assign experienced project managers to oversee each construction project. They ensure efficient workflow management, coordinate between different teams, maintain quality standards, and ensure on-time completion of projects.",
    category: "Team",
  },

  // Workforce Category
  {
    id: 9,
    question: "Do you provide skilled manpower supply services?",
    answer:
      "Yes, we provide technically skilled workforce for construction, logistics, engineering, and operations. Our services include civil, mechanical, and electrical trades staff who are certified and trained as per industry standards. We offer both temporary and permanent placements locally and internationally.",
    category: "Workforce",
  },
  {
    id: 10,
    question: "What types of skilled workers do you supply?",
    answer:
      "We supply procurement and logistics staff, construction workers, import-export & C&F specialists, transportation & utility operators. All workers are certified and trained according to industry standards with proper work permits and legal documentation.",
    category: "Workforce",
  },
  {
    id: 11,
    question: "Can you provide workforce for international projects?",
    answer:
      "Yes, our skilled manpower supply services are available both locally and internationally. We handle all necessary work permits, legal documentation, and ensure our workers meet international standards and regulations for overseas projects.",
    category: "Workforce",
  },
  {
    id: 12,
    question: "How do you ensure the quality of your workforce?",
    answer:
      "All our staff are certified and trained as per industry standards. We conduct regular training programs, skill assessments, and performance evaluations. Our workforce includes experienced supervisors and skilled labor managed under top-level supervision.",
    category: "Workforce",
  },

  // Safety Category
  {
    id: 13,
    question: "What safety measures do you implement on construction sites?",
    answer:
      "Health and safety are our top priorities with a Zero Harm policy. We have on-site safety officers, enforce PPE compliance, install fire safety systems, and conduct regular emergency drills & response training. All our processes follow strict safety protocols and regular audits.",
    category: "Safety",
  },
  {
    id: 14,
    question: "Do you have certified safety officers on-site?",
    answer:
      "Yes, we have certified on-site safety officers at all our construction sites. They monitor safety compliance, conduct regular safety inspections, ensure PPE usage, and coordinate emergency response procedures to maintain our Zero Harm policy.",
    category: "Safety",
  },
  {
    id: 15,
    question: "What emergency procedures do you have in place?",
    answer:
      "We have comprehensive emergency preparedness including fire safety systems, emergency drills & response training, health monitoring, and immediate medical response capabilities. All workers are trained in emergency procedures and evacuation protocols.",
    category: "Safety",
  },
  {
    id: 16,
    question: "How do you maintain safety standards across all projects?",
    answer:
      "We maintain safety standards through regular safety training and audits, safety-first culture across all departments, continuous monitoring by safety officers, and strict enforcement of safety protocols. We conduct regular safety meetings and performance reviews.",
    category: "Safety",
  },

  // Quality Category
  {
    id: 17,
    question: "How do you ensure quality in your construction projects?",
    answer:
      "We use certified brands and modern equipment, employ experienced engineers and project managers, and follow ISO certified processes with comprehensive quality control. Our focus is on structural integrity, longevity, and exceeding client expectations with a 98% success rate.",
    category: "Quality",
  },
  {
    id: 18,
    question: "What quality certifications do you have?",
    answer:
      "We follow ISO certified processes and use certified brands and equipment for all our projects. Our quality management system ensures consistent delivery of high-quality construction services that meet international standards.",
    category: "Quality",
  },
  {
    id: 19,
    question: "How do you handle quality control during construction?",
    answer:
      "We have comprehensive quality control measures including regular inspections, material testing, progress monitoring, and adherence to engineering specifications. Our experienced engineers and project managers oversee every phase to ensure quality standards are maintained.",
    category: "Quality",
  },
  {
    id: 20,
    question: "What is your success rate for project completion?",
    answer:
      "We maintain a 98% success rate for project completion. This high success rate is achieved through proper planning, experienced team management, quality control processes, and our commitment to exceeding client expectations in every project.",
    category: "Quality",
  },

  // Equipment Category
  {
    id: 21,
    question: "Do you offer heavy equipment rental services?",
    answer:
      "Yes, we provide rental services for high-performance heavy equipment including excavators, bulldozers, loaders, rollers, graders, cranes, and forklifts. All equipment is maintained regularly for optimum performance and can be delivered on-site with operator support if required.",
    category: "Equipment",
  },
  {
    id: 22,
    question: "What types of construction equipment do you have?",
    answer:
      "Our equipment fleet includes excavators, bulldozers & loaders, rollers & graders, cranes and forklifts. We also have specialized equipment for dredging operations and other construction needs. All equipment is modern and well-maintained.",
    category: "Equipment",
  },
  {
    id: 23,
    question: "Do you provide operators with the equipment rental?",
    answer:
      "Yes, we can provide experienced operators with our equipment rental service if required. Our operators are certified and experienced in handling various types of construction equipment safely and efficiently.",
    category: "Equipment",
  },
  {
    id: 24,
    question: "How do you maintain your construction equipment?",
    answer:
      "All our equipment is maintained regularly for optimum performance. We follow strict maintenance schedules, conduct regular inspections, and ensure all equipment meets safety and performance standards before deployment to construction sites.",
    category: "Equipment",
  },

  // Timeline Category
  {
    id: 25,
    question: "What is your project delivery timeline?",
    answer:
      "Project timelines vary based on scope and complexity. We pride ourselves on timely delivery with proper planning from concept to execution. Our experienced project managers ensure efficient workflow management and on-time completion while maintaining quality standards.",
    category: "Timeline",
  },
  {
    id: 26,
    question: "How do you ensure projects are completed on time?",
    answer:
      "We ensure timely completion through detailed project planning, efficient workflow management, experienced project managers, and proper resource allocation. We monitor progress regularly and adjust schedules as needed to meet deadlines.",
    category: "Timeline",
  },
  {
    id: 27,
    question: "What happens if there are delays in the project?",
    answer:
      "We proactively manage potential delays through careful planning and risk assessment. If unforeseen circumstances arise, we communicate immediately with clients, provide alternative solutions, and work to minimize any impact on the overall timeline.",
    category: "Timeline",
  },
  {
    id: 28,
    question: "Do you provide project progress updates?",
    answer:
      "Yes, we provide regular project progress updates to our clients. Our project managers maintain constant communication, provide detailed progress reports, and ensure clients are informed about all aspects of their project development.",
    category: "Timeline",
  },

  // Design Category
  {
    id: 29,
    question: "What architectural design services do you offer?",
    answer:
      "We offer comprehensive architectural design services including 2D/3D plan development, interior layout planning, sustainable building design, and client-specific customization. Our services are led by expert architects focusing on creativity, functionality, and sustainability.",
    category: "Design",
  },
  {
    id: 30,
    question: "Can you create custom designs based on client requirements?",
    answer:
      "We specialize in client-specific customization. Our innovative and client-centric design approach ensures that each project is tailored to meet specific requirements, preferences, and functional needs of our clients.",
    category: "Design",
  },
  {
    id: 31,
    question: "Do you provide 3D visualization of designs?",
    answer:
      "Yes, we provide both 2D and 3D plan development services. Our 3D visualization helps clients better understand their projects, make informed decisions, and visualize the final outcome before construction begins.",
    category: "Design",
  },
  {
    id: 32,
    question: "How do you incorporate sustainability in your designs?",
    answer:
      "We emphasize sustainable building design in all our projects. This includes energy-efficient solutions, environmentally friendly materials, optimal space utilization, and designs that minimize environmental impact while maximizing functionality and aesthetics.",
    category: "Design",
  },

  // Quote Category
  {
    id: 33,
    question: "How can I get a quote for my construction project?",
    answer:
      "You can get a free quote by contacting us through our website contact form, calling us at +880 1234-567890, or emailing info@constructionco.com. Our expert team will assess your requirements and provide a detailed, customized quote for your project.",
    category: "Quote",
  },
  {
    id: 34,
    question: "What information do you need to provide a quote?",
    answer:
      "To provide an accurate quote, we need project details including location, scope of work, timeline requirements, specific services needed, and any special requirements. Our team will schedule a consultation to discuss your project in detail.",
    category: "Quote",
  },
  {
    id: 35,
    question: "How long does it take to receive a project quote?",
    answer:
      "We typically provide initial quotes within 24-48 hours of receiving your project details. For complex projects requiring site visits or detailed assessments, we'll provide a timeline for the comprehensive quote during our initial consultation.",
    category: "Quote",
  },
  {
    id: 36,
    question: "Are your quotes free of charge?",
    answer:
      "Yes, we provide free initial consultations and quotes for all construction projects. Our expert team will assess your requirements and provide detailed cost estimates without any obligation or charges for the quotation process.",
    category: "Quote",
  },
]

const AboutFaq: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Services")

  // Remove "All" from categories - only show individual categories
  const categories = Array.from(new Set(faqData.map((faq) => faq.category)))

  const filteredFaqs = faqData.filter((faq) => faq.category === selectedCategory)

  const toggleFaq = (id: number) => {
    setActiveId(activeId === id ? null : id)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section className="section-padding font-family-small bg-gray-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Find answers to common questions about our construction services, processes, and expertise.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setActiveId(null) // Reset active FAQ when switching categories
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md hover:shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Current Category Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
            <div className="w-3 h-3 bg-primary-600 rounded-full mr-3"></div>
            <span className="text-gray-700 font-medium">
              {selectedCategory} - {filteredFaqs.length} Questions
            </span>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          key={selectedCategory} // Add key to trigger re-animation when category changes
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-4"
        >
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Question */}
              <motion.button
                onClick={() => toggleFaq(faq.id)}
                className="w-full bg-blue-800 text-white p-6 text-left flex items-center justify-between hover:bg-blue-700 transition-colors duration-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-sm">
                        {filteredFaqs.findIndex((f) => f.id === faq.id) + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{faq.question}</h3>
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  {activeId === faq.id ? (
                    <Minus className="h-6 w-6 text-primary-600" />
                  ) : (
                    <Plus className="h-6 w-6 text-white" />
                  )}
                </motion.div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-18">
                      <div className="border-l-4 border-primary-200 pl-6">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our expert team is here to help you with any specific questions
              about your construction project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Contact Our Experts
              </motion.a>
              <motion.a
                href="tel:+8801234567890"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Call Us Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutFaq
