import { useState, useEffect } from 'react';
import { ChevronRight, Globe, Users, Lightbulb, Target } from 'lucide-react';

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const highlights = [
    { icon: Users, text: "10,000+ professionals", color: "text-blue-500" },
    { icon: Globe, text: "150+ countries", color: "text-green-500" },
    { icon: Lightbulb, text: "Game-changing technologies", color: "text-yellow-500" },
    { icon: Target, text: "Client-focused solutions", color: "text-purple-500" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 border border-slate-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 border border-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-purple-300 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10  mx-auto px-6 xl:2xl:lg:px-20 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2  px-4 py-2 rounded-full text-sm font-medium text-black border border-red-200">
              <span className="w-2 h-2  rounded animate-pulse"></span>
              <span>Passionately committed to positive change</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Entrepreneurs
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  with a technical
                </span>
                <span className="block text-slate-700">soul</span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We embrace your visions as our own and partner with you to develop ideas that are 
                <span className="font-semibold text-slate-700"> smarter, more efficient, and innovative</span>. 
                Our global network of 10,000 professionals work on the world's toughest challenges, 
                with experience spanning over 150 countries in the metals, energy, and infrastructure sectors.
              </p>
              
              <p>
                Employee-owned and independent—free to bring our best thinking to your business. 
                Our exceptional, diverse teams combine vast engineering and business knowledge, 
                working in partnership with our clients to develop market strategies, manage and 
                optimize production, develop new game-changing technologies, and design and 
                deliver complex capital projects.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center space-x-2">
                  <span>Explore Our Work</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-50">
                Meet Our Team
              </button>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              
              {/* Quote */}
              <div className="text-center mb-8">
                <div className="text-6xl text-slate-200 mb-4">"</div>
                <p className="text-2xl font-light text-slate-700 italic leading-relaxed">
                  We are entrepreneurs with a technical soul
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-6"></div>
              </div>

              {/* Rotating Highlights */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 text-center">What Sets Us Apart</h3>
                
                <div className="relative h-24 overflow-hidden">
                  {highlights.map((highlight, index) => {
                    const Icon = highlight.icon;
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 transform ${
                          index === currentSlide 
                            ? 'translate-y-0 opacity-100' 
                            : index < currentSlide 
                              ? '-translate-y-full opacity-0' 
                              : 'translate-y-full opacity-0'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-4 h-full">
                          <div className={`p-3 rounded-full bg-slate-100 ${highlight.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-lg font-medium text-slate-700">
                            {highlight.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center space-x-2">
                  {highlights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-blue-500 w-8' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 animate-bounce opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse opacity-60"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`mt-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600">Passionate about our corporate purpose and committed to lasting success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Long-term Relationships</h3>
              <p className="text-slate-600">We believe in building lasting partnerships with our clients and partners.</p>
            </div>
            
            <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Innovation First</h3>
              <p className="text-slate-600">Developing game-changing technologies and smarter solutions for complex challenges.</p>
            </div>
            
            <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Global Impact</h3>
              <p className="text-slate-600">Working across 150+ countries to create positive change in the world.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;