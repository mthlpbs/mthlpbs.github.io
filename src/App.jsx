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

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/info.xml')
        const xmlText = await response.text()
        const data = parseXMLData(xmlText)
        setPersonalData(data)
      } catch (error) {
        console.error('Error loading personal data:', error)
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
        <p className="text-xl text-apple-gray-600">Error loading data</p>
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
