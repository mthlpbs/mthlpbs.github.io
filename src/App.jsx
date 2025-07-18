import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { parseXMLData } from './utils/xmlParser'

function App() {
  const [personalData, setPersonalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Attempting to fetch XML data...')
        const response = await fetch('/info.xml')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const xmlText = await response.text()
        console.log('XML text length:', xmlText.length)
        console.log('XML text preview:', xmlText.substring(0, 200))
        
        const data = parseXMLData(xmlText)
        console.log('Parsed data:', data)
        setPersonalData(data)
      } catch (error) {
        console.error('Error loading personal data:', error)
        console.error('Error details:', error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-apple-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (!personalData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-apple-gray-600 mb-4">Error loading data</p>
          {error && <p className="text-red-500 text-sm">Details: {error}</p>}
          <p className="text-gray-500 text-sm mt-2">Check the browser console for more details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero data={personalData} />
        <About data={personalData} />
        <Skills data={personalData} />
        <Projects data={personalData} />
        <Education data={personalData} />
        <Contact data={personalData} />
      </main>
      <Footer />
    </div>
  )
}

export default App
