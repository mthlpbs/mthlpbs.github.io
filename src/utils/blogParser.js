export async function fetchBlogs() {
  try {
    const response = await fetch('/blogs.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.blogs || []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

export async function fetchBlogContent(blogId) {
  try {
    const response = await fetch(`/blogs/${blogId}.md`)
    if (!response.ok) {
      throw new Error(`Failed to fetch blog content: ${response.statusText}`)
    }
    
    const rawContent = await response.text()
    
    // Remove YAML frontmatter if present (more robust pattern)
    let contentWithoutFrontmatter = rawContent
    
    // Check if content starts with frontmatter
    if (rawContent.trim().startsWith('---')) {
      const lines = rawContent.split('\n')
      let frontmatterEnd = -1
      
      // Find the closing --- (starting from line 1, not 0)
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          frontmatterEnd = i
          break
        }
      }
      
      if (frontmatterEnd > 0) {
        // Extract content after frontmatter
        contentWithoutFrontmatter = lines.slice(frontmatterEnd + 1).join('\n')
      }
    }
    
    return contentWithoutFrontmatter.trim()
  } catch (error) {
    console.error('Error fetching blog content:', error)
    throw error
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateAge(birthDate) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}
