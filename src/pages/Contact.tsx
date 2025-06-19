import type React from "react"
import ScrollToTop from "../components/ScrollToTop"
import ContactForm from "../components/contact/contactform"

const Contact: React.FC = () => {
  return (
    <div className="section-padding">
      <ScrollToTop/>
      <div className="container">
        <ContactForm/>
      </div>
    </div>
  )
}

export default Contact
