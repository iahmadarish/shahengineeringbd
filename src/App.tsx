import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import Layout from "./components/Layout/Layout"
import AdminLayout from "./components/Layout/AdminLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import ServiceDetail from "./pages/ServiceDetail"
import Projects from "./pages/Projects"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminServices from "./pages/admin/AdminServices"
import AdminProjects from "./pages/admin/AdminProjects"
import ServiceForm from "./pages/admin/ServiceForm"
import ProjectForm from "./pages/admin/ProjectForm"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/edit/:id" element={<ServiceForm />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
