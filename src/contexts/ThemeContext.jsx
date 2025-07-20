import React, { createContext, useContext, useState, useEffect } from 'react'

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
  const [isLoading, setIsLoading] = useState(true)

  // Load configuration from .config file
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Try to load from .config file first
        let defaultTheme = 'dark'
        
        try {
          const configResponse = await fetch('/.config')
          const configText = await configResponse.text()
          
          // Parse simple key=value format
          const lines = configText.split('\n')
          for (const line of lines) {
            const trimmedLine = line.trim()
            if (trimmedLine && !trimmedLine.startsWith('#')) {
              const [key, value] = trimmedLine.split('=')
              if (key === 'DEFAULT_THEME' && value) {
                defaultTheme = value.toLowerCase()
                break
              }
            }
          }
        } catch (configError) {
          console.warn('Could not load .config file, using fallback')
        }

        // Load the main config.json for other settings
        const response = await fetch('/config.json')
        const configData = await response.json()
        setConfig(configData)
        
        // Set initial theme from .config file, fallback to config.json, then default
        const initialTheme = defaultTheme || configData.siteSettings?.theme || 'dark'
        setTheme(initialTheme)
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', initialTheme)
        
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load config:', error)
        setTheme('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
        setIsLoading(false)
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
    isLoading,
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
