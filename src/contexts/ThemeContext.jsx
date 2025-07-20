import React, { createContext, useContext, useState, useEffect } from 'react'
import { ConfigParser } from '../utils/configParser'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  const [config, setConfig] = useState(null)

  // Load configuration from .config file
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Load config using the ConfigParser
        const configData = await ConfigParser.loadConfig()
        setConfig(configData)
        
        // Set initial theme from config
        const initialTheme = configData.siteSettings?.theme || 'dark'
        setTheme(initialTheme)
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', initialTheme)
        
      } catch (error) {
        console.error('Failed to load config:', error)
        setTheme('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }

    loadConfig()
  }, [])

  // Update theme
  const toggleTheme = async () => {
    if (!config?.siteSettings?.enableThemeToggle) return

    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)

    // Update config file (this would typically be done through an API)
    try {
      const updatedConfig = {
        ...config,
        siteSettings: {
          ...config.siteSettings,
          theme: newTheme
        }
      }
      setConfig(updatedConfig)
      
      // In a real app, you'd save this to a server
      // For demo purposes, we'll just store in localStorage
      localStorage.setItem('themeConfig', JSON.stringify(updatedConfig))
    } catch (error) {
      console.error('Failed to update theme config:', error)
    }
  }

  const value = {
    theme,
    config,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
