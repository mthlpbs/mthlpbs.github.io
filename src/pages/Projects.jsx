import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, Code } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

// Project Card Component
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const { isLight } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="glass-morphism rounded-3xl overflow-hidden card-hover group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image/Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-30">
              {project.technologies?.[0] === 'React' ? '⚛️' : 
               project.technologies?.[0] === 'Java' ? '☕' : 
               project.technologies?.[0] === 'Python' ? '🐍' : '💻'}
            </div>
          </div>
        )}
        
        {/* Hover Overlay with Buttons */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-primary inline-flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </motion.a>
          )}
          
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-secondary inline-flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Code className="w-4 h-4" />
              Source
            </motion.a>
          )}
        </motion.div>
      </div>
      
      {/* Project Content */}
      <div className="p-8">
        <h3 
          className={`text-2xl font-medium mb-4 transition-colors ${isLight ? '' : 'text-shadow group-hover:text-blue-300'}`}
          style={{ color: 'rgb(var(--text-primary))' }}
          onMouseEnter={(e) => {
            if (!isLight) e.target.style.color = '#93c5fd'
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'rgb(var(--text-primary))'
          }}
        >
          {project.name}
        </h3>
        
        <p className="mb-6 leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
          {project.description}
        </p>
        
        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3" style={{ color: 'rgb(var(--text-muted))' }}>Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 text-xs rounded-full transition-colors cursor-default"
                  style={{
                    backgroundColor: isLight ? 'rgba(0, 122, 255, 0.1)' : 'rgba(59, 130, 246, 0.2)',
                    color: isLight ? '#0056cc' : '#93c5fd',
                    border: isLight ? '1px solid rgba(0, 122, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Projects Filter Component
function ProjectsFilter({ projects, selectedTech, onTechChange }) {
  const { isLight } = useTheme()
  
  // Extract all unique technologies
  const allTechnologies = [...new Set(
    projects.flatMap(project => project.technologies || [])
  )].sort()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onTechChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTech === 'all'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
              : isLight 
                ? 'glass-light text-gray-700 hover:bg-gray-100 border border-gray-200'
                : 'glass-morphism text-gray-200 hover:bg-white/15 hover:text-white border border-white/20'
          }`}
        >
          All Projects
        </button>
        
        {allTechnologies.map((tech) => (
          <button
            key={tech}
            onClick={() => onTechChange(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTech === tech
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : isLight 
                  ? 'glass-light text-gray-700 hover:bg-gray-100 border border-gray-200'
                  : 'glass-morphism text-gray-200 hover:bg-white/15 hover:text-white border border-white/20'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// Main Projects Component
export default function Projects({ projects = [] }) {
  const [selectedTech, setSelectedTech] = useState('all')
  const { isLight } = useTheme()
  
  // Filter projects based on selected technology
  const filteredProjects = selectedTech === 'all' 
    ? projects 
    : projects.filter(project => 
        project.technologies?.includes(selectedTech)
      )
  
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
            <span className="text-gradient">Projects</span>
          </h1>
          <p 
            className="text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            A showcase of my work, experiments, and contributions to the open-source community
          </p>
        </motion.div>
        
        {/* Filter */}
        {projects.length > 0 && (
          <ProjectsFilter
            projects={projects}
            selectedTech={selectedTech}
            onTechChange={setSelectedTech}
          />
        )}
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : projects.length > 0 ? (
          // No projects match filter
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
              No Projects Found
            </h3>
            <p 
              className="mb-8"
              style={{ color: 'rgb(var(--text-muted))' }}
            >
              No projects found using <span className="text-blue-400">{selectedTech}</span>. 
              Try selecting a different technology.
            </p>
            <button
              onClick={() => setSelectedTech('all')}
              className="apple-button-primary"
            >
              Show All Projects
            </button>
          </motion.div>
        ) : (
          // No projects at all
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🚧</div>
            <h3 
              className="text-2xl font-medium mb-4"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Projects Coming Soon
            </h3>
            <p style={{ color: 'rgb(var(--text-muted))' }}>
              I'm currently working on some exciting projects. Check back soon!
            </p>
          </motion.div>
        )}
        
        {/* Call to Action */}
        {projects.length > 0 && (
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
                Interested in Collaboration?
              </h2>
              <p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                style={{ color: 'rgb(var(--text-muted))' }}
              >
                I'm always open to discussing new opportunities, innovative projects, 
                and ways we can work together to create something amazing.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:asuramanna.mithilaprabashwara@gmail.com"
                  className="apple-button-primary"
                >
                  Get In Touch
                </a>
                <a
                  href="https://github.com/mthlpbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-secondary inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
