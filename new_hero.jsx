// Hero Section Component
function HeroSection({ data }) {
  if (!data) return null
  
  const { isLight } = useTheme()
  const age = calculateAge(data.birth)
  
  // State for image loading
  const [imageError, setImageError] = React.useState(false)
  const [imageSrc, setImageSrc] = React.useState(profileImage)
  
  // Try multiple image sources
  React.useEffect(() => {
    const tryImageSources = async () => {
      const sources = [
        profileImage,
        '/images/profile.png',
        './images/profile.png',
        '/public/images/profile.png'
      ]
      
      for (const src of sources) {
        try {
          const img = new Image()
          img.onload = () => {
            setImageSrc(src)
            setImageError(false)
            return
          }
          img.onerror = () => {
            console.log('Failed to load image from:', src)
          }
          img.src = src
          await new Promise(resolve => {
            img.onload = resolve
            img.onerror = resolve
          })
          if (img.complete && img.naturalWidth > 0) {
            setImageSrc(src)
            setImageError(false)
            break
          }
        } catch (error) {
          console.log('Error trying source:', src, error)
        }
      }
    }
    
    tryImageSources()
  }, [])

  return (
    <section className="h-screen relative overflow-hidden flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Mesh Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: isLight 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
              : 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0c0c0c 100%)',
            opacity: isLight ? 0.1 : 0.8
          }}
        />
        
        {/* Animated Blobs */}
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
              background: `linear-gradient(45deg, ${['#ff9a9e', '#fecfef', '#fecfef', '#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#f093fb'][i]}, transparent)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              opacity: 0.4
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Profile & Info */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Modern Profile Card */}
            <div className="relative mb-8">
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              >
                {/* Glowing Ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 blur-lg animate-pulse"></div>
                
                {/* Profile Image Container */}
                <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                  {!imageError ? (
                    <img
                      src={imageSrc}
                      alt="Mithila Prabashwara"
                      className="w-full h-full rounded-full object-cover bg-white"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                      MP
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Name & Title */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
                style={{
                  background: isLight 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {data.name}
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl font-light mb-4"
                style={{ color: 'rgb(var(--text-secondary))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {data.title}
              </motion.p>
              
              <motion.p
                className="text-base md:text-lg opacity-75 max-w-md mx-auto lg:mx-0"
                style={{ color: 'rgb(var(--text-muted))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Transforming ideas into digital reality with passion and precision ✨
              </motion.p>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { icon: <MapPin className="w-4 h-4" />, text: `${data.location?.city}, ${data.location?.country}` },
                { icon: <Calendar className="w-4 h-4" />, text: `${age} years old` },
                { icon: <Mail className="w-4 h-4" />, text: "Available for projects" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border"
                  style={{
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'rgb(var(--text-muted))'
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {data.cv && (
                <motion.a
                  href={data.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.a>
              )}
              
              <motion.a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300"
                style={{
                  borderColor: isLight ? '#667eea' : '#f093fb',
                  color: isLight ? '#667eea' : '#f093fb'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Skills & Highlights */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            {/* Skills Preview */}
            <div className="backdrop-blur-xl rounded-3xl p-8 border shadow-2xl"
              style={{
                backgroundColor: isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'rgb(var(--text-primary))' }}>
                💫 What I Do
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: "Frontend Development", skills: ["React", "Vue", "TypeScript"], color: "from-blue-500 to-cyan-500" },
                  { title: "Backend Development", skills: ["Node.js", "Python", "Java"], color: "from-green-500 to-emerald-500" },
                  { title: "Database Design", skills: ["MongoDB", "PostgreSQL", "MySQL"], color: "from-purple-500 to-pink-500" },
                  { title: "DevOps & Cloud", skills: ["Docker", "AWS", "Azure"], color: "from-orange-500 to-red-500" }
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300"
                      style={{
                        backgroundColor: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: 'rgb(var(--text-primary))' }}>
                          {category.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                                color: 'rgb(var(--text-muted))'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} group-hover:scale-125 transition-transform`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { title: "Projects", count: "12+", icon: "🚀", color: "from-blue-500 to-purple-500" },
                { title: "Experience", count: "3+", icon: "⭐", color: "from-green-500 to-blue-500" },
                { title: "Technologies", count: "15+", icon: "🔧", color: "from-purple-500 to-pink-500" },
                { title: "Coffee Cups", count: "∞", icon: "☕", color: "from-orange-500 to-red-500" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="backdrop-blur-xl rounded-md p-2 text-center border shadow-lg cursor-pointer group"
                  style={{
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <div className="text-sm mb-0.5">{item.icon}</div>
                  <div 
                    className="text-base font-bold mb-0.5"
                    style={{
                      background: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {item.count}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'rgb(var(--text-muted))' }}>
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
