import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, Star, Search } from 'lucide-react'
import { formatDate } from '../utils/blogParser'
import { useTheme } from '../contexts/ThemeContext'

// Blog Card Component
function BlogCard({ blog, index }) {
  const { isLight } = useTheme()
  
  // Default image component
  const DefaultImage = () => (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{
        background: isLight 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
          : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
      }}
    >
      <div className="text-center">
        <div className="text-6xl mb-2 opacity-80">📄</div>
        <p className="text-white/80 text-sm font-medium">Article</p>
      </div>
    </div>
  )
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`rounded-3xl overflow-hidden card-hover group ${isLight ? 'glass-light' : 'glass-morphism'}`}
    >
      {/* Blog Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 overflow-hidden">
        {blog.thumbnail ? (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            <div className="text-6xl mb-2 opacity-80">�</div>
            <p className="text-white/80 text-sm font-medium">Article</p>
          </div>
        </div>
        
        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-yellow-400">Featured</span>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-xs font-medium text-blue-400">
            {blog.category}
          </span>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="p-6">
        {/* Metadata */}
        <div 
          className="flex items-center gap-4 text-sm mb-4"
          style={{ color: 'rgb(var(--text-muted))' }}
        >
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime}</span>
          </div>
        </div>
        
        {/* Title */}
        <h2 
          className="text-xl font-medium mb-3 group-hover:text-blue-400 transition-colors line-clamp-2"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          {blog.title}
        </h2>
        
        {/* Excerpt */}
        <p 
          className="mb-4 leading-relaxed line-clamp-3"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          {blog.excerpt}
        </p>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'rgb(var(--text-muted))',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span 
                className="px-2 py-1 text-xs"
                style={{ color: 'rgb(var(--text-muted))' }}
              >
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Read More Link */}
        <Link
          to={`/blog/${blog.id}`}
          className="inline-block apple-button-primary"
        >
          Read Article
        </Link>
      </div>
    </motion.article>
  )
}

// Search and Filter Component
function BlogFilters({ blogs, searchTerm, onSearchChange, selectedCategory, onCategoryChange }) {
  const { isLight } = useTheme()
  
  // Extract all unique categories
  const allCategories = [...new Set(blogs.map(blog => blog.category))].sort()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5" style={{ color: 'rgb(var(--text-muted))' }} />
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value
            onSearchChange(value)
          }}
          className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            isLight 
              ? 'glass-light border border-gray-200 focus:border-blue-500/50' 
              : 'glass-morphism border border-white/20 focus:border-blue-500/50'
          }`}
          style={{ 
            color: 'rgb(var(--text-primary))',
            '::placeholder': { color: 'rgb(var(--text-muted))' }
          }}
        />
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            onCategoryChange('all')
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : isLight 
                ? 'glass-light text-gray-700 hover:bg-gray-100' 
                : 'glass-morphism text-gray-300 hover:bg-white/10'
          }`}
        >
          All Articles
        </button>
        
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onCategoryChange(category)
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : isLight 
                  ? 'glass-light text-gray-700 hover:bg-gray-100' 
                  : 'glass-morphism text-gray-300 hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// Main Blogs Component
export default function Blogs({ blogs = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { isLight } = useTheme()
  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchTerm || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    
    return matchesSearch && matchesCategory && blog.published
  })
  
  return (
    <main className="pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 text-shadow">
            <span className="text-gradient">Blog</span>
          </h1>
          <p 
            className="text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            Thoughts, experiences, and insights from my journey in technology and software development
          </p>
        </motion.div>
        
        {/* Search and Filters */}
        {blogs.length > 0 && (
          <BlogFilters
            blogs={blogs}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
        
        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
              />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          // No blogs match filter
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 
              className="text-2xl font-medium mb-4"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              No Articles Found
            </h3>
            <p 
              className="mb-8"
              style={{ color: 'rgb(var(--text-muted))' }}
            >
              {searchTerm ? (
                <>No articles found matching "<span className="text-blue-400">{searchTerm}</span>".</>
              ) : (
                <>No articles found in <span className="text-blue-400">{selectedCategory}</span> category.</>
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {searchTerm && (
                <button
                  onClick={() => {
                  setSearchTerm('')
                }}
                  className="apple-button-primary"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="apple-button-secondary"
              >
                Show All Articles
              </button>
            </div>
          </motion.div>
        ) : (
          // No blogs at all
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">✍️</div>
            <h3 
              className="text-2xl font-medium mb-4"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Blog Coming Soon
            </h3>
            <p style={{ color: 'rgb(var(--text-muted))' }}>
              I'm working on some exciting articles. Check back soon for insights and tutorials!
            </p>
          </motion.div>
        )}
        
        {/* Newsletter Signup CTA */}
        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className={`p-12 rounded-3xl max-w-4xl mx-auto ${isLight ? 'glass-light' : 'glass-morphism'}`}>
              <h2 
                className="text-3xl sm:text-4xl font-light mb-6"
                style={{ color: 'rgb(var(--text-primary))' }}
              >
                Stay Updated
              </h2>
              <p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                style={{ color: 'rgb(var(--text-muted))' }}
              >
                Follow me on social media to get notified when I publish new articles 
                about web development, software engineering, and technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/mithilaprabashwara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-primary"
                >
                  Follow on LinkedIn
                </a>
                <a
                  href="https://github.com/mthlpbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-secondary"
                >
                  Follow on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
