export class XMLParser {
  constructor() {
    this.parser = new DOMParser()
  }

  async fetchAndParseXML(xmlPath) {
    try {
      const response = await fetch(xmlPath)
      if (!response.ok) {
        throw new Error(`Failed to fetch XML: ${response.statusText}`)
      }
      
      const xmlText = await response.text()
      const xmlDoc = this.parser.parseFromString(xmlText, 'text/xml')
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror')
      if (parseError) {
        throw new Error('XML parsing failed: ' + parseError.textContent)
      }
      
      return this.parsePersonalInfo(xmlDoc)
    } catch (error) {
      console.error('Error fetching/parsing XML:', error)
      throw error
    }
  }

  parsePersonalInfo(xmlDoc) {
    const personalInfo = xmlDoc.querySelector('personalInfo')
    
    if (!personalInfo) {
      throw new Error('No personalInfo element found in XML')
    }
    
    return {
      name: this.getTextContent(personalInfo, 'name'),
      birth: this.getTextContent(personalInfo, 'birth'),
      email: this.getTextContent(personalInfo, 'email'),
      title: this.getTextContent(personalInfo, 'title'),
      cv: this.getTextContent(personalInfo, 'cv'),
      certifications: this.getTextContent(personalInfo, 'certifications'),
      location: this.parseLocation(personalInfo),
      social: this.parseSocial(personalInfo),
      skills: this.parseSkills(personalInfo),
      projects: this.parseProjects(personalInfo),
      education: this.parseEducation(personalInfo),
      languages: this.parseLanguages(personalInfo),
      interests: this.parseInterests(personalInfo),
      availability: this.parseAvailability(personalInfo)
    }
  }

  parseLocation(personalInfo) {
    const locationElement = personalInfo.querySelector('location')
    if (!locationElement) return {}

    return {
      city: this.getTextContent(locationElement, 'city'),
      country: this.getTextContent(locationElement, 'country')
    }
  }

  parseSocial(personalInfo) {
    const socialElement = personalInfo.querySelector('social')
    if (!socialElement) return {}

    return {
      linkedin: this.getTextContent(socialElement, 'linkedin'),
      github: Array.from(socialElement.querySelectorAll('github')).map(el => el.textContent.trim()),
      portfolio: this.getTextContent(socialElement, 'portfolio')
    }
  }

  parseSkills(personalInfo) {
    const skillsElement = personalInfo.querySelector('skills')
    if (!skillsElement) return {}

    return {
      programmingLanguages: this.parseSkillCategory(skillsElement, 'programmingLanguages'),
      webTechnologies: this.parseSkillCategory(skillsElement, 'webTechnologies'),
      databases: this.parseSkillCategory(skillsElement, 'databases'),
      toolsPlatforms: this.parseSkillCategory(skillsElement, 'toolsPlatforms'),
      other: this.parseSkillCategory(skillsElement, 'other')
    }
  }

  parseSkillCategory(skillsElement, categoryName) {
    const category = skillsElement.querySelector(categoryName)
    if (!category) return []
    
    return Array.from(category.querySelectorAll('skill'))
      .map(skill => skill.textContent.trim())
      .filter(skill => skill.length > 0)
  }

  parseProjects(personalInfo) {
    const projectsElement = personalInfo.querySelector('projects')
    if (!projectsElement) return []

    return Array.from(projectsElement.querySelectorAll('project')).map(project => ({
      name: this.getTextContent(project, 'name'),
      description: this.getTextContent(project, 'description'),
      technologies: this.parseTechnologies(project),
      tools: this.parseTools(project),
      image: this.getTextContent(project, 'image') || null,
      preview: this.getTextContent(project, 'preview') || null,
      link: this.getTextContent(project, 'link'),
      demo: this.getTextContent(project, 'demo') || null
    }))
  }

  parseEducation(personalInfo) {
    const educationElement = personalInfo.querySelector('education')
    if (!educationElement) return []

    return Array.from(educationElement.querySelectorAll('education')).map(edu => ({
      institution: this.getTextContent(edu, 'institution'),
      gradeRange: this.getTextContent(edu, 'gradeRange'),
      degree: this.getTextContent(edu, 'degree'),
      stream: this.getTextContent(edu, 'stream'),
      graduation: this.getTextContent(edu, 'graduation'),
      gpa: this.getTextContent(edu, 'gpa')
    }))
  }

  parseLanguages(personalInfo) {
    const languagesElement = personalInfo.querySelector('languages')
    if (!languagesElement) return []

    return Array.from(languagesElement.querySelectorAll('language')).map(lang => ({
      language: this.getTextContent(lang, 'language'),
      proficiency: this.getTextContent(lang, 'proficiency')
    }))
  }

  parseInterests(personalInfo) {
    const interestsElement = personalInfo.querySelector('interests')
    if (!interestsElement) return []

    return Array.from(interestsElement.querySelectorAll('interest'))
      .map(interest => interest.textContent.trim())
      .filter(interest => interest.length > 0)
  }

  parseAvailability(personalInfo) {
    const availabilityElement = personalInfo.querySelector('availability')
    if (!availabilityElement) return {}

    return {
      status: this.getTextContent(availabilityElement, 'status'),
      preferredRoles: this.parseList(availabilityElement, 'preferredRoles', 'role'),
      workType: this.parseList(availabilityElement, 'workType', 'type')
    }
  }

  parseList(parent, containerName, itemName) {
    const container = parent.querySelector(containerName)
    if (!container) return []

    return Array.from(container.querySelectorAll(itemName))
      .map(item => item.textContent.trim())
      .filter(item => item.length > 0)
  }

  parseTechnologies(project) {
    const techElement = project.querySelector('technologies')
    if (!techElement) return []
    
    return Array.from(techElement.querySelectorAll('technology'))
      .map(tech => tech.textContent.trim())
      .filter(tech => tech.length > 0)
  }

  parseTools(project) {
    const toolsElement = project.querySelector('tools')
    if (!toolsElement) return []
    
    return Array.from(toolsElement.querySelectorAll('tool'))
      .map(tool => tool.textContent.trim())
      .filter(tool => tool.length > 0)
  }

  getTextContent(parent, selector) {
    const element = parent.querySelector(selector)
    return element ? element.textContent.trim() : ''
  }
}
