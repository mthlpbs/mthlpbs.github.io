import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, Send, MapPin } from 'lucide-react'

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const prepareSocialLinks = () => {
    const links = []
    
    // LinkedIn links
    if (data.social.linkedin && data.social.linkedin.length > 0) {
      data.social.linkedin.forEach(url => {
        links.push({
          name: 'LinkedIn',
          url: url,
          icon: Linkedin,
          color: 'bg-blue-600 hover:bg-blue-700'
        })
      })
    }
    
    // GitHub links
    if (data.social.github && data.social.github.length > 0) {
      data.social.github.forEach(url => {
        links.push({
          name: 'GitHub',
          url: url,
          icon: Github,
          color: 'bg-gray-800 hover:bg-gray-900'
        })
      })
    }
    
    // Twitter links
    if (data.social.twitter && data.social.twitter.length > 0) {
      data.social.twitter.forEach(url => {
        links.push({
          name: 'Twitter',
          url: url,
          icon: Twitter,
          color: 'bg-sky-500 hover:bg-sky-600'
        })
      })
    }
    
    return links
  }
  
  const socialLinks = prepareSocialLinks()

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
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            Get In Touch
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-center text-apple-gray-600 mb-12 max-w-2xl mx-auto"
          >
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. 
            Feel free to reach out!
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Send className="text-apple-blue-500 mr-3" size={24} />
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full apple-button flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Mail className="text-apple-blue-500 mr-3" size={24} />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-apple-gray-400 mr-3" size={20} />
                    <a 
                      href={`mailto:${data.email}`}
                      className="text-apple-blue-500 hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="text-apple-gray-400 mr-3" size={20} />
                    <span className="text-apple-gray-600">
                      {data.location.city}, {data.location.country}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-apple-gray-200">
                    <p className="text-apple-gray-600 mb-2">
                      <strong>Availability:</strong> {data.availability.status}
                    </p>
                    <p className="text-apple-gray-600">
                      <strong>Work Preferences:</strong> {data.availability.workType.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
                
                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center p-3 rounded-lg text-white transition-all duration-200 ${social.color}`}
                    >
                      <social.icon size={20} className="mr-3" />
                      <span className="font-medium">{social.name}</span>
                    </motion.a>
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

export default Contact
