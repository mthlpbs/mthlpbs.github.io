export const parseXMLData = (xmlText) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
  
  const getTextContent = (element, tagName) => {
    const el = element.getElementsByTagName(tagName)[0]
    return el ? el.textContent : ''
  }
  
  const getArrayFromElements = (element, tagName) => {
    const elements = element.getElementsByTagName(tagName)
    return Array.from(elements).map(el => el.textContent)
  }
  
  const personalInfo = xmlDoc.getElementsByTagName('personalInfo')[0]
  
  // Parse location
  const locationEl = personalInfo.getElementsByTagName('location')[0]
  const location = {
    city: getTextContent(locationEl, 'city'),
    country: getTextContent(locationEl, 'country')
  }
  
  // Parse social links
  const socialEl = personalInfo.getElementsByTagName('social')[0]
  const social = {
    linkedin: Array.from(socialEl.getElementsByTagName('linkedin')).map(el => el.textContent),
    github: Array.from(socialEl.getElementsByTagName('github')).map(el => el.textContent),
    twitter: Array.from(socialEl.getElementsByTagName('twitter')).map(el => el.textContent),
    portfolio: Array.from(socialEl.getElementsByTagName('portfolio')).map(el => el.textContent)
  }
  
  // Parse categorized skills
  const skillsEl = personalInfo.getElementsByTagName('skills')[0]
  const programmingLanguagesEl = skillsEl.getElementsByTagName('programmingLanguages')[0]
  const webTechnologiesEl = skillsEl.getElementsByTagName('webTechnologies')[0]
  const databasesEl = skillsEl.getElementsByTagName('databases')[0]
  const toolsPlatformsEl = skillsEl.getElementsByTagName('toolsPlatforms')[0]
  const otherSkillsEl = skillsEl.getElementsByTagName('other')[0]
  
  const skills = {
    programmingLanguages: getArrayFromElements(programmingLanguagesEl, 'skill'),
    webTechnologies: getArrayFromElements(webTechnologiesEl, 'skill'),
    databases: getArrayFromElements(databasesEl, 'skill'),
    toolsPlatforms: getArrayFromElements(toolsPlatformsEl, 'skill'),
    other: otherSkillsEl ? getArrayFromElements(otherSkillsEl, 'skill') : []
  }
  
  // Parse experience
  const experienceListEl = personalInfo.getElementsByTagName('experience')
  const experience = experienceListEl.length > 0 ? 
    Array.from(experienceListEl[0].getElementsByTagName('experience')).map(exp => ({
      company: getTextContent(exp, 'company'),
      position: getTextContent(exp, 'position'),
      duration: getTextContent(exp, 'duration'),
      description: getTextContent(exp, 'description')
    })) : []
  
  // Parse education
  const educationListEl = personalInfo.getElementsByTagName('education')[0]
  const education = Array.from(educationListEl.getElementsByTagName('education')).map(edu => ({
    institution: getTextContent(edu, 'institution'),
    degree: getTextContent(edu, 'degree'),
    graduation: getTextContent(edu, 'graduation'),
    gpa: getTextContent(edu, 'gpa')
  }))
  
  // Parse projects
  const projectsEl = personalInfo.getElementsByTagName('projects')[0]
  const projects = Array.from(projectsEl.getElementsByTagName('project')).map(proj => {
    const technologiesEl = proj.getElementsByTagName('technologies')[0]
    const technologies = getArrayFromElements(technologiesEl, 'technology')
    
    return {
      name: getTextContent(proj, 'name'),
      description: getTextContent(proj, 'description'),
      technologies,
      github: getTextContent(proj, 'github'),
      demo: getTextContent(proj, 'demo')
    }
  })
  
  // Parse languages
  const languagesEl = personalInfo.getElementsByTagName('languages')[0]
  const languages = Array.from(languagesEl.getElementsByTagName('language')).map(lang => ({
    language: getTextContent(lang, 'language'),
    proficiency: getTextContent(lang, 'proficiency')
  }))
  
  // Parse interests
  const interestsEl = personalInfo.getElementsByTagName('interests')[0]
  const interests = getArrayFromElements(interestsEl, 'interest')
  
  // Parse availability
  const availabilityEl = personalInfo.getElementsByTagName('availability')[0]
  const preferredRolesEl = availabilityEl.getElementsByTagName('preferredRoles')[0]
  const workTypeEl = availabilityEl.getElementsByTagName('workType')[0]
  
  const availability = {
    status: getTextContent(availabilityEl, 'status'),
    preferredRoles: getArrayFromElements(preferredRolesEl, 'role'),
    workType: getArrayFromElements(workTypeEl, 'type')
  }
  
  return {
    name: getTextContent(personalInfo, 'name'),
    birth: getTextContent(personalInfo, 'birth'),
    email: getTextContent(personalInfo, 'email'),
    location,
    title: getTextContent(personalInfo, 'title'),
    social,
    skills,
    experience,
    education,
    projects,
    languages,
    interests,
    availability
  }
}
