import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Contexts
import { ThemeProvider } from './contexts/ThemeContext'

// Components
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import MaintenancePage from './components/MaintenancePage'

// Pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'

// Admin
import AdminDashboard from './admin/AdminDashboard'

// Utils
import { XMLParser } from './utils/xmlParser'
import { fetchBlogs } from './utils/blogParser'
import { ConfigParser } from './utils/configParser'

function App() {
  const [portfolioData, setPortfolioData] = useState(null)
  const [blogsData, setBlogsData] = useState(null)
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(null)
  const location = useLocation()

  // Check if we're on admin page
  const isAdminPage = location.pathname.startsWith('/admin')

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load config first to check maintenance mode
        const configData = await ConfigParser.loadConfig()
        setConfig(configData)
        
        // If maintenance mode is enabled, only load config and stop here
        if (configData?.siteSettings?.maintenanceMode?.enabled) {
          return
        }
        
        // Load XML data
        const parser = new XMLParser()
        const xmlData = await parser.fetchAndParseXML('/info.xml')
        setPortfolioData(xmlData)
        
        // Load blogs data
        const blogs = await fetchBlogs()
        setBlogsData(blogs)
        
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err.message)
      }
    }

    loadData()
  }, [])

  // Check for maintenance mode (but allow admin access)
  if (config?.siteSettings?.maintenanceMode?.enabled && !isAdminPage) {
    return (
      <ThemeProvider>
        <MaintenancePage config={config} />
      </ThemeProvider>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Portfolio</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ScrollToTop />
        {isAdminPage ? (
          // Admin layout - no header, no background styling
          <div className="min-h-screen">
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/admin" 
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AdminDashboard />
                    </motion.div>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </div>
        ) : (
          // Main site layout - with header and styling
          <div className="min-h-screen theme-transition relative overflow-hidden pt-20" style={{
            background: 'rgb(var(--bg-primary))',
            color: 'rgb(var(--text-primary))'
          }}>
            {/* Main Content */}
            <div className="relative z-10">
              <Header />
              
              <AnimatePresence mode="wait">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Home data={portfolioData} />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/projects" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Projects projects={portfolioData?.projects || []} />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/blogs" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Blogs blogs={blogsData || []} />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/blog/:id" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <BlogPost blogs={blogsData || []} />
                      </motion.div>
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
