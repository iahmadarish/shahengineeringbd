import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2, Wrench, Hammer, Cog, Zap } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "We provide complete solution related to design, approval and construction.",
      subtitle: "Engineering Excellence",
      description: "Transform your vision into reality with our comprehensive engineering solutions.",
      bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      icon: Building2,
      color: "from-black/50 to-indigo-950"
    },
    {
      id: 2,
      title: "Vision Provide Best Engineering Solution for Everyone.",
      subtitle: "Manufacturing Solutions",
      description: "Working Towards a Promising Future with innovative manufacturing processes.",
      bgImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      icon: Cog,
      color: "from-black/50 to-indigo-950"
    },
    {
      id: 3,
      title: "Advanced Construction Technology",
      subtitle: "Construction Excellence",
      description: "Building tomorrow's infrastructure with cutting-edge construction methodologies.",
      bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      icon: Hammer,
      color: "from-black/50 to-indigo-950"
    },
    {
      id: 4,
      title: "Smart Engineering Solutions",
      subtitle: "Technology Integration",
      description: "Integrating smart technologies for efficient and sustainable engineering solutions.",
      bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      icon: Zap,
      color: "from-black/50 to-indigo-950"
    },
    {
      id: 5,
      title: "Precision Engineering Services",
      subtitle: "Quality Assurance",
      description: "Delivering precision-engineered solutions with uncompromising quality standards.",
      bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      icon: Wrench,
      color: "from-black/50 to-indigo-950"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentSlideData.bgImage})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color} opacity-75`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium text-blue-200">
                {currentSlideData.subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl lg:text-6xl font-bold leading-tight"
            >
              {currentSlideData.title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-blue-100 leading-relaxed max-w-lg"
            >
              {currentSlideData.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex space-x-4 pt-4"
            >
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Contact Us
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Service Cards */}
          <motion.div
            key={`cards-${currentSlide}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {slides.slice(0, 4).map((slide, index) => {
                const SlideIcon = slide.icon;
                return (
                  <motion.div
                    key={slide.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className={`p-6 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
                      index === currentSlide 
                        ? 'bg-white bg-opacity-25 scale-105 shadow-xl' 
                        : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                    }`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-full ${
                        index === currentSlide ? 'bg-white text-black' : 'bg-white bg-opacity-20 text-black'
                      }`}>
                        <SlideIcon className="w-6 h-6" />
                      </div>
                      <h3 className={`font-semibold ${
                        index === currentSlide ? 'text-black' : 'text-black'
                      }`}>
                        {slide.subtitle}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-20">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-full bg-white"
        />
      </div>
    </div>
  );
};

export default HeroSection;