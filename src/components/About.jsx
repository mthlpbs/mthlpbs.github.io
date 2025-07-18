import React from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, MapPin, Heart } from 'lucide-react'

const About = ({ data }) => {
  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
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

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-8">
                <div className="flex items-center mb-4">
                  <User className="text-apple-blue-500 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Personal Info</h3>
                </div>
                <div className="space-y-3 text-apple-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={16} />
                    <span>{calculateAge(data.birth)} years old</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2" size={16} />
                    <span>{data.location.city}, {data.location.country}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📧</span>
                    <a href={`mailto:${data.email}`} className="text-apple-blue-500 hover:underline">
                      {data.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🎯</span>
                  <h3 className="text-xl font-semibold">Current Status</h3>
                </div>
                <p className="text-apple-gray-600 mb-4">{data.availability.status}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Preferred Roles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.availability.preferredRoles.map((role, index) => (
                      <span key={index} className="px-3 py-1 bg-apple-blue-100 text-apple-blue-600 rounded-full text-sm">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-8">
                <div className="flex items-center mb-4">
                  <Heart className="text-apple-blue-500 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Interests</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {data.interests.map((interest, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-apple-gray-50 p-3 rounded-lg text-center text-sm font-medium text-apple-gray-700"
                    >
                      {interest}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🌐</span>
                  <h3 className="text-xl font-semibold">Languages</h3>
                </div>
                <div className="space-y-3">
                  {data.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{lang.language}</span>
                      <span className="px-3 py-1 bg-apple-blue-100 text-apple-blue-600 rounded-full text-sm">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
