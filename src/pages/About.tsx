import type React from "react"
import ScrollToTop from "../components/ScrollToTop"
import AboutHero from "../components/about/aboutHero"
import MissionAbout from "../components/about/MissionAbout"

const About: React.FC = () => {
  return (
    <div className="font-family-small">
      <ScrollToTop/>
      {/* <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About ConstructCorp</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building the future with innovative engineering solutions and unmatched expertise.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            This is the About page. Here will be add our company history, mission, vision, team information, and other
            relevant details here.
          </p>
        </div>
      </div> */}
      <AboutHero/>
      <MissionAbout/>
    </div>
  )
}

export default About
