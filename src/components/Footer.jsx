import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Code } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-apple-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
            <p className="text-apple-gray-300 max-w-md mx-auto">
              Always excited to work on interesting projects and collaborate with talented people.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-apple-gray-700 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-apple-gray-300">Made with</span>
                <Heart className="mx-2 text-red-500" size={16} />
                <span className="text-apple-gray-300">and</span>
                <Code className="mx-2 text-apple-blue-500" size={16} />
                <span className="text-apple-gray-300">by Mithila Prabashwara</span>
              </div>
              
              <div className="text-apple-gray-400">
                © {currentYear} All rights reserved.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
