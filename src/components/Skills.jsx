import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Cloud, Wrench, Terminal } from 'lucide-react'

const Skills = ({ data }) => {
  const categoryMapping = {
    'Programming Languages': 'programmingLanguages',
    'Web Technologies': 'webTechnologies',
    'Databases': 'databases',
    'Tools & Platforms': 'toolsPlatforms',
    'Other': 'other'
  }

  const prepareSkillsForDisplay = () => {
    const result = {}
    
    // Map category names for display
    Object.keys(categoryMapping).forEach(displayName => {
      const dataKey = categoryMapping[displayName]
      if (data.skills[dataKey] && data.skills[dataKey].length > 0) {
        result[displayName] = data.skills[dataKey]
      }
    })
    
    return result
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return <Code className="text-apple-blue-500" size={24} />
      case 'Web Technologies':
        return <Wrench className="text-green-500" size={24} />
      case 'Databases':
        return <Database className="text-purple-500" size={24} />
      case 'Tools & Platforms':
        return <Cloud className="text-orange-500" size={24} />
      default:
        return <Code className="text-apple-gray-500" size={24} />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const categorizedSkills = prepareSkillsForDisplay()

  return (
    <section id="skills" className="py-20 bg-apple-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            Skills & Technologies
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categorizedSkills).map(([category, skills]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="glass-card p-6 card-hover"
              >
                <div className="flex items-center mb-4">
                  {getCategoryIcon(category)}
                  <h3 className="text-lg font-semibold ml-3">{category}</h3>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/50"
                    >
                      <span className="font-medium text-apple-gray-700">{skill}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < 4 ? 'bg-apple-blue-500' : 'bg-apple-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Skills Grid */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-semibold mb-6">All Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(data.skills).flat().map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-white rounded-full shadow-sm text-apple-gray-700 font-medium hover:shadow-md transition-shadow duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
