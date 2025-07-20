import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Loading Robot Animation */}
        <motion.div
          className="w-16 h-16 mx-auto mb-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative w-full h-full">
            {/* Robot Body */}
            <div className="w-12 h-14 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg mx-auto relative">
              {/* Robot Head */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full">
                {/* Eyes */}
                <motion.div 
                  className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-black rounded-full"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-black rounded-full"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                ></motion.div>
                
                {/* Antenna */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-yellow-400 rounded-full"></div>
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                ></motion.div>
              </div>
              
              {/* Robot Screen */}
              <motion.div 
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-green-400 rounded-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-light mb-4">Loading Portfolio</h2>
          <div className="flex items-center justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
