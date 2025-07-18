import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const Hero = ({ data }) => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      <div className="container mx-auto px-6 z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-apple-gray-900 mb-4">
              {data.name}
            </h1>
            <p className="text-xl md:text-2xl text-apple-gray-600 mb-6">
              {data.title}
            </p>
            <p className="text-lg text-apple-gray-500 mb-8">
              {data.location.city}, {data.location.country}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="apple-button"
            >
              Get in touch
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-apple-blue-500 text-apple-blue-500 rounded-full font-medium transition-all duration-200 hover:bg-apple-blue-500 hover:text-white"
            >
              View my work
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown size={32} className="text-apple-gray-400" />
      </motion.button>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-apple-blue-500/10 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-purple-500/10 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  )
}

export default Hero
