import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award } from 'lucide-react'

const Education = ({ data }) => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="education" className="py-20 bg-apple-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            Education
          </motion.h2>

          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-apple-blue-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-apple-gray-900 mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-apple-blue-600 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center text-apple-gray-600 mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span>Class of {edu.graduation}</span>
                        </div>
                        <div className="flex items-center text-apple-gray-600">
                          <Award size={16} className="mr-2" />
                          <span className="font-medium">GPA: {edu.gpa}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-apple-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-apple-gray-600">Academic Performance</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-2 bg-apple-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-apple-blue-500 rounded-full transition-all duration-1000"
                              style={{ width: `${(parseFloat(edu.gpa) / 4.0) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-apple-gray-700">
                            {edu.gpa}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Experience Section (if available) */}
          {data.experience && data.experience.length > 0 && (
            <motion.div variants={itemVariants} className="mt-16">
              <h3 className="text-2xl font-bold text-apple-gray-900 mb-8 text-center">
                Professional Experience
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="glass-card p-6 card-hover"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {exp.company.charAt(0)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-apple-gray-900">
                              {exp.position}
                            </h4>
                            <p className="text-apple-blue-600 font-medium">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-apple-gray-600 text-sm mt-1 md:mt-0">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-apple-gray-600 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Education
