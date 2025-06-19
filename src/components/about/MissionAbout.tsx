import { motion } from 'framer-motion';
import {  Globe, Shield, Users, Zap, Leaf, Target, HeartHandshake, Rocket } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

const MissionAbout = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-16 px-4">
      <div className="mx-auto px-6 xl:2xl:lg:px-20">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Our <span className="text-red-600">Purpose</span> & Promise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Driving meaningful change through collaboration, expertise, and innovative solutions
          </p>
        </motion.div>

        {/* Mission Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Collaboration Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-red-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-xl mr-4">
                <HeartHandshake className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Collective <span className="text-red-600">Impact</span>
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We believe the most transformative solutions emerge from <span className="font-semibold text-gray-800">deep collaboration</span>. 
              By working hand-in-hand with our clients, we unlock <span className="text-red-600 font-semibold">breakthrough ideas</span> that 
              deliver exceptional results.
            </p>
          </motion.div>

          {/* Global Perspective Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">World-Class Expertise</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our <span className="text-blue-600 font-semibold">diverse global team</span> brings unparalleled technical and strategic knowledge 
              to every challenge. We combine <span className="font-semibold">local insights</span> with <span className="font-semibold">international best practices</span> 
              to deliver exceptional outcomes.
            </p>
          </motion.div>

          {/* Innovation Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Future-Ready Solutions</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We design solutions that are <span className="font-semibold text-gray-800">practical today</span> and <span className="font-semibold">scalable for tomorrow</span>. 
              Every recommendation balances:
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Safety
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                Innovation
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <Leaf className="w-4 h-4 mr-1" />
                Sustainability
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16 bg-gradient-to-r from-gray-50 to-white"
        >
          <div className="flex items-center mb-6">
            <div className="bg-gray-800 p-3 rounded-xl mr-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Our Core Beliefs</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            At our core, we're driven by the belief that <span className="text-red-600 font-semibold">positive change creates a better world</span>. 
            This conviction shapes our culture and guides every decision we make.
          </p>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-block"
          >
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center">
              <span>Explore Our Manifesto</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Values Highlight */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Users className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Authentic Partnerships</h3>
            <p className="text-gray-600">
              We build relationships based on trust, transparency, and mutual success. Your challenges become our shared mission.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Zap className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Bold Innovation</h3>
            <p className="text-gray-600">
              We challenge conventional thinking to develop cutting-edge solutions that redefine what's possible.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Responsible Progress</h3>
            <p className="text-gray-600">
              We measure success not just by results, but by the positive impact we create for people and the planet.
            </p>
          </motion.div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to create <span className="text-red-600">impact</span> together?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Connect With Our Team
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MissionAbout;