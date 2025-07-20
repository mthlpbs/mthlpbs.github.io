import React from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  ExternalLink, 
  MapPin, 
  Mail, 
  Calendar, 
  Globe,
  Monitor,
  Database,
  Settings,
  Target,
  Briefcase,
  Github
} from 'lucide-react'
import { calculateAge } from '../utils/blogParser'
import { useTheme } from '../contexts/ThemeContext'

// Hero Section Component
function HeroSection({ data }) {
  if (!data) return null
  
  const { isLight } = useTheme()
  const age = calculateAge(data.birth)
  
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Name and Title */}
          <motion.h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-light mb-6 ${isLight ? '' : 'text-shadow'}`}
            style={{ color: 'rgb(var(--text-primary))' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">{data.name}</span>
          </motion.h1>
          
          <motion.p
            className={`text-xl sm:text-2xl mb-8 font-light ${isLight ? '' : 'text-shadow-sm'}`}
            style={{ color: 'rgb(var(--text-secondary))' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.title}
          </motion.p>
          
          {/* Basic Info */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
            style={{ color: 'rgb(var(--text-muted))' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{data.location?.city}, {data.location?.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{age} years old</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a 
                href={`mailto:${data.email}`}
                className="transition-colors"
                style={{ color: 'rgb(var(--text-muted))' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(0, 122, 255)'}
                onMouseLeave={(e) => e.target.style.color = 'rgb(var(--text-muted))'}
              >
                {data.email}
              </a>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {data.cv && (
              <a
                href={data.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-button-primary inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            )}
            
            {data.certifications && (
              <a
                href={data.certifications}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-button-secondary inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Certifications
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Skills & Education Combined Section
function SkillsEducationSection({ skills, education }) {
  const { isLight } = useTheme()
  
  const skillCategories = [
    { key: 'programmingLanguages', title: 'Programming', icon: <Monitor className="w-5 h-5" />, color: 'from-blue-500 to-purple-600' },
    { key: 'webTechnologies', title: 'Web Tech', icon: <Globe className="w-5 h-5" />, color: 'from-green-500 to-blue-500' },
    { key: 'databases', title: 'Databases', icon: <Database className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
    { key: 'toolsPlatforms', title: 'Tools', icon: <Settings className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' }
  ]
  
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Skills Section */}
          {skills && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                    Technical <span className="text-gradient">Skills</span>
                  </h2>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    My tech stack & expertise
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {skillCategories.map((category, index) => {
                  const categorySkills = skills[category.key] || []
                  if (categorySkills.length === 0) return null
                  
                  return (
                    <div key={category.key} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                          {React.cloneElement(category.icon, { className: 'w-3 h-3' })}
                        </div>
                        <h3 className="text-xs font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
                          {category.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1 ml-6">
                        {categorySkills.slice(0, 6).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded-lg"
                            style={{
                              backgroundColor: isLight ? 'rgba(var(--text-primary), 0.08)' : 'rgba(255, 255, 255, 0.1)',
                              color: 'rgb(var(--text-secondary))'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {categorySkills.length > 6 && (
                          <span className="px-2 py-1 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                            +{categorySkills.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
          
          {/* Education Section */}
          {education && education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-sm" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                    <span className="text-gradient">Education</span>
                  </h2>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    Academic background
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {education.slice(0, 3).map((edu, index) => (
                  <div key={index} className="border-l-2 border-blue-500/30 pl-3 py-1.5">
                    <h3 className="font-semibold text-base leading-tight" style={{ color: 'rgb(var(--text-primary))' }}>
                      {edu.institution}
                    </h3>
                    {edu.degree && (
                      <p className="text-xs mb-0.5" style={{ color: '#007aff' }}>{edu.degree}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        {edu.stream && (
                          <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                            {edu.stream}
                          </p>
                        )}
                        {edu.gpa && (
                          <p className="text-xs font-medium" style={{ color: '#10b981' }}>
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <span className="text-xs px-2 py-1 rounded-lg" style={{
                        backgroundColor: isLight ? 'rgba(0, 122, 255, 0.1)' : 'rgba(59, 130, 246, 0.2)',
                        color: isLight ? '#0056cc' : '#93c5fd'
                      }}>
                        {edu.graduation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  )
}

// Interests & Connect Combined Section
function InterestsConnectSection({ interests, social }) {
  const { isLight } = useTheme()
  
  const socialLinks = [
    { name: 'LinkedIn', url: social?.linkedin, icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Portfolio', url: social?.portfolio, icon: <Globe className="w-5 h-5" /> },
    ...(social?.github || []).map((url, index) => ({
      name: `GitHub`,
      url,
      icon: <Github className="w-5 h-5" />
    }))
  ].filter(link => link.url)
  
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Interests Section */}
          {interests && interests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                    <span className="text-gradient">Interests</span>
                  </h2>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    What drives my passion
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {interests.slice(0, 8).map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium hover:scale-105 transition-all duration-300 cursor-default"
                    style={{
                      backgroundColor: isLight ? 'rgba(var(--text-primary), 0.08)' : 'rgba(255, 255, 255, 0.1)',
                      color: 'rgb(var(--text-primary))',
                      border: isLight ? '1px solid rgba(var(--text-primary), 0.15)' : '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {interest}
                  </motion.span>
                ))}
                {interests.length > 8 && (
                  <span className="px-3 py-1.5 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    +{interests.length - 8} more
                  </span>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Connect Section */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                    <span className="text-gradient">Connect</span>
                  </h2>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    Let's work together
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 group"
                    style={{
                      backgroundColor: isLight ? 'rgba(var(--text-primary), 0.05)' : 'rgba(255, 255, 255, 0.05)',
                      border: isLight ? '1px solid rgba(var(--text-primary), 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm" style={{ color: 'rgb(var(--text-primary))' }}>
                        {link.name}
                      </h3>
                      <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                        Connect & Follow
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" style={{ color: 'rgb(var(--text-muted))' }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  )
}

// Availability Section Component
function AvailabilitySection({ availability }) {
  if (!availability || !availability.status) return null
  
  const { isLight } = useTheme()
  
  return (
    <section className="py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
            <span 
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: 'rgb(var(--text-muted))' }}
            >
              Current Status
            </span>
          </div>
          
          <div 
            className="p-8 rounded-2xl max-w-3xl mx-auto backdrop-blur-xl relative overflow-hidden"
            style={{
              backgroundColor: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.05)',
              border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: isLight 
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -3px rgba(0, 0, 0, 0.04)' 
                : '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 5px 10px -3px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
            
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
              <span className="text-gradient">{availability.status}</span>
            </h2>
            
            {availability.preferredRoles && availability.preferredRoles.length > 0 && (
              <div className="mb-6">
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'rgb(var(--text-secondary))' }}
                >
                  Preferred Roles
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {availability.preferredRoles.map((role, index) => (
                    <motion.span
                      key={role}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: isLight ? 'rgba(0, 122, 255, 0.15)' : 'rgba(59, 130, 246, 0.25)',
                        color: isLight ? '#0056cc' : '#93c5fd',
                        border: isLight ? '1px solid rgba(0, 122, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {role}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
            
            {availability.workType && availability.workType.length > 0 && (
              <div>
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'rgb(var(--text-secondary))' }}
                >
                  Work Preferences
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {availability.workType.map((type, index) => (
                    <motion.span
                      key={type}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: isLight ? 'rgba(147, 51, 234, 0.15)' : 'rgba(147, 51, 234, 0.25)',
                        color: isLight ? '#7c3aed' : '#a78bfa',
                        border: isLight ? '1px solid rgba(147, 51, 234, 0.2)' : '1px solid rgba(147, 51, 234, 0.3)'
                      }}
                    >
                      {type}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Home Component
export default function Home({ data }) {
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading portfolio data...</p>
      </div>
    )
  }
  
  return (
    <main className="pt-20">
      <HeroSection data={data} />
      <SkillsEducationSection skills={data.skills} education={data.education} />
      <InterestsConnectSection interests={data.interests} social={data.social} />
      <AvailabilitySection availability={data.availability} />
    </main>
  )
}
