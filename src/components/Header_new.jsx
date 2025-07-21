import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

// Hamburger Menu Icon Component
function HamburgerIcon({ isOpen, onClick }) {
  return (
    <motion.button
      className="relative w-6 h-6 flex flex-col justify-center items-center space-y-1 p-2"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle menu"
    >
      <motion.span
        className="w-6 h-0.5 rounded-full"
        style={{ backgroundColor: 'rgb(var(--text-primary))' }}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-6 h-0.5 rounded-full"
        style={{ backgroundColor: 'rgb(var(--text-primary))' }}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-6 h-0.5 rounded-full"
        style={{ backgroundColor: 'rgb(var(--text-primary))' }}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -2 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

// Mobile Menu Overlay
function MobileMenu({ isOpen, onClose, navigationItems, currentPath }) {
  const { isLight, toggleTheme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 backdrop-blur-xl"
            style={{
              background: `rgba(var(--bg-primary), 0.95)`,
              borderLeft: `1px solid rgba(var(--border-primary))`
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-6 border-b" style={{
              borderColor: 'rgba(var(--border-primary))'
            }}>
              <motion.span
                className="text-lg font-semibold"
                style={{ color: 'rgb(var(--text-primary))' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Menu
              </motion.span>
              <motion.button
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: 'rgba(var(--glass-bg), 0.1)' }}
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="rgb(var(--text-primary))" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            {/* Navigation Items */}
            <div className="py-6">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="block px-6 py-4 text-lg font-medium transition-all duration-200 relative"
                    style={{
                      color: currentPath === item.path 
                        ? 'rgb(var(--text-primary))' 
                        : 'rgb(var(--text-secondary))',
                      backgroundColor: currentPath === item.path 
                        ? 'rgba(var(--glass-bg), 0.1)' 
                        : 'transparent'
                    }}
                  >
                    {item.name}
                    {currentPath === item.path && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"
                        layoutId="mobileActiveIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Theme Toggle Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{
              borderColor: 'rgba(var(--border-primary))'
            }}>
              <motion.button
                className="flex items-center justify-between w-full p-4 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'rgba(var(--glass-bg), 0.1)' }}
                onClick={toggleTheme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-base font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
                  {isLight ? 'Dark Mode' : 'Light Mode'}
                </span>
                <motion.div
                  className="w-6 h-6"
                  animate={{ rotate: isLight ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLight ? (
                    <svg className="w-full h-full" fill="none" stroke="rgb(var(--text-primary))" viewBox="0 0 24 24" strokeWidth={2}>
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                  ) : (
                    <svg className="w-full h-full" fill="none" stroke="rgb(var(--text-primary))" viewBox="0 0 24 24" strokeWidth={2}>
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isLight } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false) // Close mobile menu on desktop
      }
    }
    
    // Initial check
    handleResize()
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blogs' }
  ]

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  
  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-xl border-b shadow-lg' 
            : 'backdrop-blur-md'
        }`}
        style={{
          background: isScrolled 
            ? `rgba(var(--bg-primary), 0.95)` 
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
          {isMobile ? (
            // Mobile Layout
            <div className="flex items-center justify-between">
              {/* Left side - Typing Animation */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TypingAnimation />
              </motion.div>
              
              {/* Right side - Hamburger Menu */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <HamburgerIcon 
                  isOpen={isMobileMenuOpen} 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                />
              </motion.div>
            </div>
          ) : (
            // Desktop Layout
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
          )}
        </nav>
      </motion.header>
      
      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navigationItems={navigationItems}
        currentPath={location.pathname}
      />
    </>
  )
}
