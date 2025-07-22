import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, Clock, Tag, ArrowLeft, Share2, ChevronUp, List, X } from 'lucide-react'
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaReddit, 
  FaWhatsapp,
  FaTelegram,
  FaCopy
} from 'react-icons/fa'
import { formatDate, fetchBlogContent } from '../utils/blogParser'
import { useTheme } from '../contexts/ThemeContext'

// Table of Contents Component
function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const { isLight } = useTheme()
  
  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings = []
    let match
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      let text = match[2].trim()
      
      // Clean up markdown formatting from the text
      text = text
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
        .replace(/\*([^*]+)\*/g, '$1')     // Remove italic formatting
        .replace(/`([^`]+)`/g, '$1')       // Remove inline code formatting
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove link formatting, keep text
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove images
        .replace(/~~([^~]+)~~/g, '$1')     // Remove strikethrough
        .replace(/==([^=]+)==/g, '$1')     // Remove highlight
        .replace(/^\s*[-*+]\s+/g, '')      // Remove list markers
        .replace(/^\s*\d+\.\s+/g, '')      // Remove numbered list markers
        .trim()
      
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      
      extractedHeadings.push({
        level,
        text,
        id
      })
    }
    
    setHeadings(extractedHeadings)
  }, [content])
  
  if (headings.length === 0) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`sticky top-32 p-6 rounded-2xl backdrop-blur-xl ${
        isLight 
          ? 'bg-white/95 border border-gray-200 shadow-lg' 
          : 'bg-gray-900/95 border border-white/20'
      }`}
    >
      <h3 
        className="text-lg font-medium mb-4"
        style={{ color: 'rgb(var(--text-primary))' }}
      >
        Table of Contents
      </h3>
      <nav>
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#${heading.id}`}
            className={`block py-1 text-sm hover:text-blue-400 transition-colors ${
              heading.level === 1 ? 'font-medium' :
              heading.level === 2 ? 'ml-4' :
              heading.level === 3 ? 'ml-8' : 'ml-12'
            }`}
            style={{ 
              paddingLeft: `${(heading.level - 1) * 16}px`,
              color: heading.level === 1 ? 'rgb(var(--text-primary))' : 'rgb(var(--text-muted))'
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </motion.div>
  )
}

// Floating Table of Contents Component
function FloatingTableOfContents({ content, isVisible }) {
  const [headings, setHeadings] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { isLight } = useTheme()
  
  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings = []
    let match
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      let text = match[2].trim()
      
      // Clean up markdown formatting from the text
      text = text
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
        .replace(/\*([^*]+)\*/g, '$1')     // Remove italic formatting
        .replace(/`([^`]+)`/g, '$1')       // Remove inline code formatting
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove link formatting, keep text
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove images
        .replace(/~~([^~]+)~~/g, '$1')     // Remove strikethrough
        .replace(/==([^=]+)==/g, '$1')     // Remove highlight
        .replace(/^\s*[-*+]\s+/g, '')      // Remove list markers
        .replace(/^\s*\d+\.\s+/g, '')      // Remove numbered list markers
        .trim()
      
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      
      extractedHeadings.push({
        level,
        text,
        id
      })
    }
    
    setHeadings(extractedHeadings)
  }, [content])

  // Close popup when scrolling
  useEffect(() => {
    let scrollTimeout
    
    const handleScroll = () => {
      if (isOpen) {
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          setIsOpen(false)
        }, 150) // Close after 150ms of scroll inactivity
      }
    }

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isOpen])

  // Close popup if not visible anymore
  useEffect(() => {
    if (!isVisible && isOpen) {
      setIsOpen(false)
    }
  }, [isVisible, isOpen])
  
  if (headings.length === 0 || !isVisible) return null
  
  return (
    <>
      {/* Floating TOC Panel - positioned independently */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-40 right-6 z-50 max-h-80 overflow-y-auto p-4 rounded-2xl shadow-2xl min-w-[280px] max-w-[320px] backdrop-blur-xl ${
              isLight 
                ? 'bg-white/95 border border-gray-200 shadow-xl' 
                : 'bg-gray-900/95 border border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 
                className="text-sm font-medium"
                style={{ color: 'rgb(var(--text-primary))' }}
              >
                Table of Contents
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                className="transition-colors p-1 hover:opacity-80"
                style={{ color: 'rgb(var(--text-muted))' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {headings.map((heading, index) => (
                <a
                  key={index}
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 text-xs hover:text-blue-400 transition-colors leading-relaxed"
                  style={{ 
                    paddingLeft: `${(heading.level - 1) * 12}px`,
                    color: heading.level === 1 ? 'rgb(var(--text-primary))' : 'rgb(var(--text-muted))'
                  }}
                >
                    {heading.text}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating TOC Button - positioned independently */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 p-3 rounded-full shadow-lg hover:opacity-80 transition-all backdrop-blur-xl ${
          isLight 
            ? 'bg-white/95 border border-gray-200 shadow-xl' 
            : 'bg-gray-900/95 border border-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Table of Contents"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <List className="w-5 h-5" style={{ color: 'rgb(var(--text-primary))' }} />
      </motion.button>
    </>
  )
}

// Scroll to Top Component
function ScrollToTopButton({ isVisible }) {
  const { isLight } = useTheme()
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  if (!isVisible) return null
  
  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg hover:opacity-80 transition-all z-50 backdrop-blur-xl ${
        isLight 
          ? 'bg-white/95 border border-gray-200 shadow-xl' 
          : 'bg-gray-900/95 border border-white/20'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" style={{ color: 'rgb(var(--text-primary))' }} />
    </motion.button>
  )
}

// Share Component
function ShareButtons({ blog, url }) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  
  const shareText = `${blog.title} - ${blog.excerpt || blog.description || ''}`
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'text-blue-600 hover:text-blue-500'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'text-blue-700 hover:text-blue-600'
    },
    {
      name: 'Reddit',
      icon: FaReddit,
      url: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(blog.title)}`,
      color: 'text-orange-500 hover:text-orange-400'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`,
      color: 'text-green-500 hover:text-green-400'
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
      color: 'text-blue-500 hover:text-blue-400'
    }
  ]
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedToClipboard(true)
      setTimeout(() => setCopiedToClipboard(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: shareText,
          url: url
        })
      } catch (err) {
        console.log('Share was cancelled or failed')
      }
    }
  }
  
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-gray-400">Share:</span>
      
      {/* Native Share Button */}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="p-2 glass-morphism rounded-lg hover:bg-white/10 transition-colors"
          title="Share via system"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
      
      {/* Social Media Buttons */}
      {shareLinks.map((platform) => {
        const IconComponent = platform.icon
        return (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 glass-morphism rounded-lg hover:bg-white/10 transition-all ${platform.color}`}
            title={`Share on ${platform.name}`}
          >
            <IconComponent className="w-4 h-4" />
          </a>
        )
      })}
      
      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className={`p-2 glass-morphism rounded-lg transition-all ${
          copiedToClipboard 
            ? 'bg-green-500/20 text-green-400' 
            : 'hover:bg-white/10 text-gray-400 hover:text-white'
        }`}
        title="Copy link"
      >
        <FaCopy className="w-4 h-4" />
      </button>
      
      {copiedToClipboard && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-green-400 text-sm"
        >
          Copied!
        </motion.span>
      )}
    </div>
  )
}

// Related Posts Component
function RelatedPosts({ currentBlog, allBlogs }) {
  const { isLight } = useTheme()
  
  // Find related posts based on tags and category
  const relatedPosts = allBlogs
    .filter(blog => 
      blog.id !== currentBlog.id && 
      blog.published &&
      (blog.category === currentBlog.category ||
       blog.tags?.some(tag => currentBlog.tags?.includes(tag)))
    )
    .slice(0, 3)
  
  if (relatedPosts.length === 0) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      <h2 
        className="text-3xl font-light mb-12 text-center"
        style={{ color: 'rgb(var(--text-primary))' }}
      >
        Related Articles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedPosts.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl overflow-hidden card-hover ${isLight ? 'glass-light' : 'glass-morphism'}`}
          >
            <div className="h-32 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20">
              {blog.thumbnail ? (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              
              {/* Default Image Fallback */}
              <div 
                className={`w-full h-full ${blog.thumbnail ? 'hidden' : 'flex'} items-center justify-center`}
                style={{
                  background: isLight 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-1 opacity-80">�</div>
                  <p className="text-white/80 text-xs font-medium">Article</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 
                className="font-medium mb-2 line-clamp-2 hover:text-blue-400 transition-colors"
                style={{ color: 'rgb(var(--text-primary))' }}
              >
                {blog.title}
              </h3>
              <p 
                className="text-sm mb-4 line-clamp-2"
                style={{ color: 'rgb(var(--text-muted))' }}
              >
                {blog.excerpt}
              </p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Read more →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}

// Custom Markdown Components (theme-aware)
const createMarkdownComponents = (isLight) => ({
  h1: ({ children, ...props }) => {
    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return (
      <h1 
        id={id} 
        className="text-4xl font-light mb-8 mt-12 first:mt-0" 
        style={{ color: 'rgb(var(--text-primary))' }}
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }) => {
    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return (
      <h2 
        id={id} 
        className="text-3xl font-light mb-6 mt-10" 
        style={{ color: 'rgb(var(--text-primary))' }}
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return (
      <h3 
        id={id} 
        className="text-2xl font-medium mb-4 mt-8" 
        style={{ color: 'rgb(var(--text-primary))' }}
        {...props}
      >
        {children}
      </h3>
    )
  },
  h4: ({ children, ...props }) => {
    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return (
      <h4 
        id={id} 
        className="text-xl font-medium mb-3 mt-6" 
        style={{ color: 'rgb(var(--text-primary))' }}
        {...props}
      >
        {children}
      </h4>
    )
  },
  p: ({ children, ...props }) => (
    <p 
      className="mb-6 leading-relaxed" 
      style={{ color: 'rgb(var(--text-secondary))' }}
      {...props}
    >
      {children}
    </p>
  ),
  code: ({ inline, children, ...props }) => (
    inline ? (
      <code 
        className={`${isLight ? 'github-inline-code-light' : 'github-inline-code-dark'}`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <code 
        className={`block p-4 rounded-lg text-sm font-mono overflow-x-auto ${
          isLight ? 'github-code-light' : 'github-code-dark'
        }`}
        {...props}
      >
        {children}
      </code>
    )
  ),
  pre: ({ children, ...props }) => (
    <pre 
      className={`mb-6 p-6 rounded-2xl overflow-x-auto ${
        isLight ? 'github-code-light' : 'github-code-dark'
      }`}
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote 
      className="border-l-4 border-blue-500 pl-6 py-2 my-6 rounded-r-lg"
      style={{
        backgroundColor: isLight ? 'rgba(0, 122, 255, 0.05)' : 'rgba(59, 130, 246, 0.05)'
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-6 pl-6 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-6 pl-6 space-y-2 list-decimal" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li style={{ color: 'rgb(var(--text-secondary))' }} {...props}>{children}</li>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-blue-400 hover:text-blue-300 transition-colors underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <div className="mb-6">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-2xl"
        style={{
          border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(75, 85, 99, 1)'
        }}
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
        {...props}
      />
      {/* Fallback for broken images */}
      <div 
        className="hidden w-full rounded-2xl p-8 text-center"
        style={{
          background: isLight 
            ? 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' 
            : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(75, 85, 99, 1)'
        }}
      >
        <div className="text-6xl mb-4 opacity-50">🖼️</div>
        <p style={{ color: 'rgb(var(--text-muted))' }} className="text-sm">
          Image not available
        </p>
        {alt && (
          <p style={{ color: 'rgb(var(--text-secondary))' }} className="text-xs mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    </div>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6">
      <table 
        className="w-full border-collapse rounded-lg" 
        style={{
          backgroundColor: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(17, 24, 39, 0.5)',
          border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(75, 85, 99, 1)'
        }}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th 
      className="px-4 py-2 text-left font-medium"
      style={{
        backgroundColor: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(31, 41, 55, 1)',
        color: 'rgb(var(--text-primary))',
        border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(75, 85, 99, 1)'
      }}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td 
      className="px-4 py-2"
      style={{
        color: 'rgb(var(--text-secondary))',
        border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(75, 85, 99, 1)'
      }}
      {...props}
    >
      {children}
    </td>
  ),
})

// Main BlogPost Component
export default function BlogPost({ blogs = [] }) {
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFloatingTOC, setShowFloatingTOC] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { isLight } = useTheme()
  
  // Find the blog post
  const blog = blogs.find(b => b.id === id)
  
  useEffect(() => {
    if (!blog) return
    const loadContent = async () => {
      try {
        setLoading(true)
        const blogContent = await fetchBlogContent(blog.content.replace('.md', ''))
        setContent(blogContent)
      } catch (err) {
        console.error('Error loading blog content:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadContent()
  }, [blog])
  
  // Scroll detection for floating components
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show floating TOC when scrolled past the fixed TOC (roughly after 800px)
      // but hide it when near the bottom to avoid overlapping with footer
      const nearBottom = scrollPosition + windowHeight > documentHeight - 200
      setShowFloatingTOC(scrollPosition > 800 && !nearBottom)
      
      // Show scroll to top when scrolled down more than one screen
      setShowScrollToTop(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])  // If blog not found, redirect to blogs page
  if (!blog) {
    return <Navigate to="/blogs" replace />
  }
  
  // If blog is not published, redirect to blogs page
  if (!blog.published) {
    return <Navigate to="/blogs" replace />
  }
  
  const currentUrl = window.location.href
  
  return (
    <main className="pt-32 pb-20">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 transition-colors hover:text-blue-400"
            style={{ color: 'rgb(var(--text-muted))' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            {content && <TableOfContents content={content} />}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <article>
              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                {/* Category */}
                <div className="mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: isLight ? 'rgba(0, 122, 255, 0.1)' : 'rgba(59, 130, 246, 0.2)',
                      color: isLight ? '#0056cc' : '#93c5fd'
                    }}
                  >
                    {blog.category}
                  </span>
                </div>
                
                {/* Title */}
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-tight"
                  style={{ color: 'rgb(var(--text-primary))' }}
                >
                  {blog.title}
                </h1>
                
                {/* Metadata */}
                <div 
                  className="flex flex-wrap items-center gap-6 mb-6"
                  style={{ color: 'rgb(var(--text-muted))' }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                          color: 'rgb(var(--text-secondary))'
                        }}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Share Buttons */}
                <ShareButtons blog={blog} url={currentUrl} />
              </motion.header>
              
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`prose prose-lg max-w-none ${isLight ? 'prose-slate' : 'prose-invert'}`}
              >
                {loading ? (
                  <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p 
                      className="mt-4"
                      style={{ color: 'rgb(var(--text-muted))' }}
                    >
                      Loading article...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-red-400 mb-4">Error loading article content</p>
                    <p style={{ color: 'rgb(var(--text-muted))' }}>{error}</p>
                  </div>
                ) : (
                  <ReactMarkdown
                    components={createMarkdownComponents(isLight)}
                    remarkPlugins={[remarkGfm]}
                  >
                    {content}
                  </ReactMarkdown>
                )}
              </motion.div>
            </article>
            
            {/* Related Posts */}
            <RelatedPosts currentBlog={blog} allBlogs={blogs} />
          </div>
        </div>
      </div>
      
      {/* Floating Components */}
      <FloatingTableOfContents content={content} isVisible={showFloatingTOC} />
      <ScrollToTopButton isVisible={showScrollToTop} />
    </main>
  )
}
