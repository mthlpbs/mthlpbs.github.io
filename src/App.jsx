import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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

// Utils
import { XMLParser } from './utils/xmlParser'
import { fetchBlogs } from './utils/blogParser'
import { ConfigParser } from './utils/configParser'

function App() {
  const [portfolioData, setPortfolioData] = useState(null)
  const [blogsData, setBlogsData] = useState(null)
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(null)

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

  // Check for maintenance mode
  if (config?.siteSettings?.maintenanceMode?.enabled) {
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
        <div className="min-h-screen theme-transition relative overflow-hidden" style={{
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
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
