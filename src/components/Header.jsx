import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

// Typing Animation Component
function TypingAnimation() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  
  const texts = ['asurpbs', 'mthlpbs']
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = texts[textIndex]
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
        
        if (currentIndex === 0) {
          setIsDeleting(false)
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      } else {
        setCurrentText(currentWord.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
        
        if (currentIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1500) // Pause before deleting
        }
      }
    }, isDeleting ? 100 : 150) // Faster when deleting
    
    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, textIndex, texts])
  
  return (
    <div className="flex items-center">
      <span 
        className="text-sm"
        style={{ 
          color: 'rgb(var(--text-secondary))',
          fontFamily: '"Cascadia Code", "Cascadia Mono", "Consolas", "Monaco", monospace'
        }}
      >
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  )
}

// Robot Head Component (Baymax-inspired)
function RobotHead() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { toggleTheme } = useTheme()
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const robotElement = document.getElementById('robot-head')
      if (robotElement) {
        const rect = robotElement.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        
        // Calculate eye movement (limited range)
        const maxMovement = 3
        setMousePosition({ 
          x: Math.max(-maxMovement, Math.min(maxMovement, deltaX * 0.03)), 
          y: Math.max(-maxMovement, Math.min(maxMovement, deltaY * 0.03))
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  const handleClick = (e) => {
    e.preventDefault()
    toggleTheme()
  }
  
  return (
    <motion.div
      id="robot-head"
      className="relative w-10 h-10 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
        {/* Baymax Head - Always white */}
        <div className="w-10 h-10 rounded-full shadow-lg relative border transition-colors duration-300" style={{
          background: '#ffffff',
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          {/* Eyes that follow mouse */}
          <motion.div
            className="absolute top-2.5 left-2 w-1.5 h-1.5 rounded-full"
            style={{ background: '#000000' }}
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              scaleY: isHovered ? 0.3 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute top-2.5 right-2 w-1.5 h-1.5 rounded-full"
            style={{ background: '#000000' }}
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              scaleY: isHovered ? 0.3 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          {/* Animated Mouth - Centered */}
          <motion.div
            className="absolute bottom-2.5 left-1/2 w-3 h-0.5 rounded-full"
            style={{ 
              background: '#000000',
              transform: 'translateX(-50%)'
            }}
            animate={{
              scaleX: isHovered ? 1.3 : 1,
              y: isHovered ? -0.5 : 0,
              opacity: isHovered ? 0.9 : 0.7
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          
          {/* Subtle cheek indicators when hovered */}
          <motion.div
            className="absolute top-4 left-0.5 w-2 h-1.5 bg-pink-200 rounded-full opacity-0"
            animate={{
              opacity: isHovered ? 0.4 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-4 right-0.5 w-2 h-1.5 bg-pink-200 rounded-full opacity-0"
            animate={{
              opacity: isHovered ? 0.4 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    )
  }

export default function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { isLight } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blogs' }
  ]
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl border-b shadow-lg' 
          : 'backdrop-blur-md'
      }`}
      style={{
        background: isScrolled 
          ? `rgba(var(--bg-primary), 0.9)` 
          : `rgba(var(--bg-primary), 0.2)`,
        borderColor: isScrolled ? `rgba(var(--border-primary))` : 'transparent',
        boxShadow: isScrolled 
          ? `0 4px 20px rgba(var(--shadow-color), ${isLight ? '0.1' : '0.3'})` 
          : 'none'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container-custom py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left side - Typing Animation */}
          <motion.div
            className="flex items-center justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TypingAnimation />
          </motion.div>
          
          {/* Center - Robot Head */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <RobotHead />
          </motion.div>
          
          {/* Right side - Navigation */}
          <motion.div
            className="flex items-center justify-end space-x-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(var(--glass-bg), 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = `rgba(var(--glass-bg), 0.2)`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(var(--glass-bg), 0.1)'
                  }}
                >
                  <motion.span
                    className="text-sm font-medium transition-colors duration-200"
                    style={{
                      color: location.pathname === item.path 
                        ? 'rgb(var(--text-primary))' 
                        : 'rgb(var(--text-secondary))',
                      fontWeight: location.pathname === item.path ? '600' : '500'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.color = 'rgb(var(--text-primary))'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.color = 'rgb(var(--text-secondary))'
                      }
                    }}
                  >
                    {item.name}
                  </motion.span>
                  
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover indicator */}
                  <div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ backgroundColor: 'rgba(var(--text-primary), 0.3)' }}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}
