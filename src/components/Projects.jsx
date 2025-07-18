import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Code } from 'lucide-react'

const Projects = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 card-hover group"
              >
                <div className="flex items-center mb-4">
                  <Code className="text-apple-blue-500 mr-3" size={24} />
                  <h3 className="text-xl font-bold text-apple-gray-900">
                    {project.name}
                  </h3>
                </div>

                <p className="text-apple-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-apple-gray-900">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-apple-blue-100 text-apple-blue-600 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-apple-gray-900 text-white rounded-lg font-medium transition-all duration-200 hover:bg-apple-gray-800"
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 border-2 border-apple-blue-500 text-apple-blue-500 rounded-lg font-medium transition-all duration-200 hover:bg-apple-blue-500 hover:text-white"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </motion.a>
                  )}
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-apple-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Additional project showcase */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-apple-gray-600 mb-6">
              Want to see more of my work? Check out my GitHub profile for additional projects and contributions.
            </p>
            <motion.a
              href={data.social.github && data.social.github.length > 0 ? data.social.github[0] : '#'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center apple-button"
            >
              <Github size={20} className="mr-2" />
              View All Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
