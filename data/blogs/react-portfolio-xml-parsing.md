---
title: "Creating a Dynamic Portfolio with React and XML Data Parsing"
date: "2025-01-10"
category: "Web Development"
tags: ["React", "JavaScript", "XML", "Portfolio", "Vite"]
readTime: "8 min read"
thumbnail: "/images/blogs/react-portfolio-thumbnail.jpg"
excerpt: "Discover how to build a modern portfolio website that dynamically loads data from XML files using React and modern tooling."
author: "Mithila Prabashwara"
---

# Creating a Dynamic Portfolio with React and XML Data Parsing

Building a portfolio website is a rite of passage for developers, but what if you could make it truly dynamic and maintainable? In this post, I'll show you how I created a modern portfolio that separates content from code using XML data parsing with React.

## Why XML for Portfolio Data?

You might wonder, "Why XML in 2025?" Here's my reasoning:

### Advantages of XML for Portfolio Data:
- **Structured and validated** - XSD schemas ensure data consistency
- **Human-readable** - Easy to edit without touching code
- **Version control friendly** - Clear diffs when updating content
- **Schema validation** - Prevents invalid data entries
- **Namespace support** - Extensible for future features
- **Tool support** - Excellent IDE support with validation

### The Alternative Approach:
Instead of hardcoding portfolio data in React components:

```jsx
// ❌ Hard-coded approach
const projects = [
  {
    name: "Library Management System",
    description: "A comprehensive library management system...",
    technologies: ["Java", "JavaFX", "SQLite"]
  }
  // ... more projects
];
```

I use external XML data:

```jsx
// ✅ Dynamic approach
const [portfolioData, setPortfolioData] = useState(null);

useEffect(() => {
  fetchPortfolioData().then(setPortfolioData);
}, []);
```

## Project Architecture

```
mthlpbs.github.io/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Contact.jsx
│   ├── utils/
│   │   └── xmlParser.js
│   └── App.jsx
├── data/
│   ├── info.xml
│   └── info.xsd
└── public/
    └── images/
```

## XML Schema Design

First, I created a comprehensive XSD schema:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://mthlpbs.github.io/config"
           xmlns:tns="http://mthlpbs.github.io/config"
           elementFormDefault="qualified">

    <xs:element name="personalInfo" type="tns:PersonalInfoType"/>

    <xs:complexType name="PersonalInfoType">
        <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="birth" type="xs:date"/>
            <xs:element name="email" type="xs:string"/>
            <xs:element name="location" type="tns:LocationType"/>
            <xs:element name="skills" type="tns:SkillsType"/>
            <xs:element name="projects" type="tns:ProjectListType"/>
            <!-- ... more elements -->
        </xs:sequence>
    </xs:complexType>

    <xs:complexType name="ProjectType">
        <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="description" type="xs:string"/>
            <xs:element name="technologies" type="tns:TechnologiesType"/>
            <xs:element name="image" type="xs:anyURI" minOccurs="0"/>
            <xs:element name="preview" type="xs:anyURI" minOccurs="0"/>
            <xs:element name="link" type="xs:anyURI"/>
            <xs:element name="demo" type="xs:anyURI" minOccurs="0"/>
        </xs:sequence>
    </xs:complexType>
</xs:schema>
```

## XML Data Structure

My portfolio data looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<personalInfo xmlns="http://mthlpbs.github.io/config"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://mthlpbs.github.io/config ./info.xsd">
    
    <name>Mithila Prabashwara</name>
    <email>asuramanna.mithilaprabashwara@gmail.com</email>
    
    <skills>
        <programmingLanguages>
            <skill>Python</skill>
            <skill>Java</skill>
            <skill>JavaScript</skill>
        </programmingLanguages>
        <webTechnologies>
            <skill>React</skill>
            <skill>Node.js</skill>
        </webTechnologies>
    </skills>
    
    <projects>
        <project>
            <name>Library Management System</name>
            <description>A comprehensive library management system...</description>
            <technologies>
                <technology>Java</technology>
                <technology>JavaFX</technology>
                <technology>SQLite</technology>
            </technologies>
            <image></image>
            <preview></preview>
            <link>https://github.com/mthlpbs/Library-Management-System</link>
        </project>
    </projects>
</personalInfo>
```

## XML Parser Implementation

Here's the core XML parsing utility:

```javascript
// utils/xmlParser.js
class XMLPortfolioParser {
  constructor() {
    this.parser = new DOMParser();
  }

  async fetchAndParseXML(xmlPath) {
    try {
      const response = await fetch(xmlPath);
      const xmlText = await response.text();
      const xmlDoc = this.parser.parseFromString(xmlText, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('XML parsing failed: ' + parseError.textContent);
      }
      
      return this.parsePersonalInfo(xmlDoc);
    } catch (error) {
      console.error('Error fetching/parsing XML:', error);
      throw error;
    }
  }

  parsePersonalInfo(xmlDoc) {
    const personalInfo = xmlDoc.querySelector('personalInfo');
    
    return {
      name: this.getTextContent(personalInfo, 'name'),
      email: this.getTextContent(personalInfo, 'email'),
      birth: this.getTextContent(personalInfo, 'birth'),
      location: this.parseLocation(personalInfo),
      skills: this.parseSkills(personalInfo),
      projects: this.parseProjects(personalInfo),
      education: this.parseEducation(personalInfo),
      languages: this.parseLanguages(personalInfo),
      interests: this.parseInterests(personalInfo),
      availability: this.parseAvailability(personalInfo)
    };
  }

  parseProjects(personalInfo) {
    const projectsElement = personalInfo.querySelector('projects');
    if (!projectsElement) return [];

    return Array.from(projectsElement.querySelectorAll('project')).map(project => ({
      name: this.getTextContent(project, 'name'),
      description: this.getTextContent(project, 'description'),
      technologies: this.parseTechnologies(project),
      image: this.getTextContent(project, 'image') || null,
      preview: this.getTextContent(project, 'preview') || null,
      link: this.getTextContent(project, 'link'),
      demo: this.getTextContent(project, 'demo') || null
    }));
  }

  parseSkills(personalInfo) {
    const skillsElement = personalInfo.querySelector('skills');
    if (!skillsElement) return {};

    return {
      programmingLanguages: this.parseSkillCategory(skillsElement, 'programmingLanguages'),
      webTechnologies: this.parseSkillCategory(skillsElement, 'webTechnologies'),
      databases: this.parseSkillCategory(skillsElement, 'databases'),
      toolsPlatforms: this.parseSkillCategory(skillsElement, 'toolsPlatforms'),
      other: this.parseSkillCategory(skillsElement, 'other')
    };
  }

  parseSkillCategory(skillsElement, categoryName) {
    const category = skillsElement.querySelector(categoryName);
    if (!category) return [];
    
    return Array.from(category.querySelectorAll('skill'))
      .map(skill => skill.textContent.trim());
  }

  parseTechnologies(project) {
    const techElement = project.querySelector('technologies');
    if (!techElement) return [];
    
    return Array.from(techElement.querySelectorAll('technology'))
      .map(tech => tech.textContent.trim());
  }

  getTextContent(parent, selector) {
    const element = parent.querySelector(selector);
    return element ? element.textContent.trim() : '';
  }
}

export default XMLPortfolioParser;
```

## React Component Integration

Now, let's integrate this into React components:

```jsx
// App.jsx
import React, { useState, useEffect } from 'react';
import XMLPortfolioParser from './utils/xmlParser';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const parser = new XMLPortfolioParser();
        const data = await parser.fetchAndParseXML('/data/info.xml');
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading portfolio</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header data={portfolioData} />
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      {/* Other components */}
    </div>
  );
}

export default App;
```

## Dynamic Project Component

```jsx
// components/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Projects = ({ projects }) => {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {project.image && (
        <div className="project-image">
          <img src={project.image} alt={project.name} />
        </div>
      )}
      
      <div className="project-content">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        
        <div className="technologies">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        
        <div className="project-links">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View Code
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
```

## Skills Visualization

```jsx
// components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
  const skillCategories = [
    { key: 'programmingLanguages', title: 'Programming Languages', icon: '💻' },
    { key: 'webTechnologies', title: 'Web Technologies', icon: '🌐' },
    { key: 'databases', title: 'Databases', icon: '🗄️' },
    { key: 'toolsPlatforms', title: 'Tools & Platforms', icon: '🛠️' },
    { key: 'other', title: 'Other Skills', icon: '🎯' }
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.key}
              category={category}
              skills={skills[category.key] || []}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ category, skills, index }) => {
  return (
    <motion.div
      className="skill-category"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="category-header">
        <span className="category-icon">{category.icon}</span>
        <h3>{category.title}</h3>
      </div>
      <div className="skills-list">
        {skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            className="skill-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05) }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
```

## Error Handling and Validation

```javascript
// utils/xmlValidator.js
export class XMLValidator {
  static validatePortfolioData(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }
    
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }
    
    // Projects validation
    if (data.projects) {
      data.projects.forEach((project, index) => {
        if (!project.name) {
          errors.push(`Project ${index + 1}: Name is required`);
        }
        
        if (!project.link || !this.isValidURL(project.link)) {
          errors.push(`Project ${index + 1}: Valid link is required`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  static isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
```

## Build and Deployment

Using Vite for optimal development and build process:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust for GitHub Pages if needed
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        }
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
```

## Key Benefits Achieved

### 🎯 **Maintainability**
- Content updates don't require code changes
- Schema validation prevents data inconsistencies
- Clear separation of concerns

### 🚀 **Performance**
- Lazy loading of images and content
- Optimized bundle splitting
- Efficient re-renders with proper state management

### 📱 **User Experience**
- Smooth animations with Framer Motion
- Responsive design
- Loading states and error handling

### 🔧 **Developer Experience**
- Hot module replacement during development
- TypeScript-like validation through XSD
- Easy content management workflow

## Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Lessons Learned

1. **XML is Still Relevant**: For structured data with validation requirements, XML remains powerful
2. **Schema Design Matters**: Invest time in good XSD design upfront
3. **Error Handling is Crucial**: Graceful degradation improves user experience
4. **Performance Optimization**: Large XML files can impact initial load times
5. **Tooling Integration**: Modern build tools handle XML processing efficiently

## Future Enhancements

- **CMS Integration**: Connect to headless CMS for non-technical content updates
- **Internationalization**: Multi-language support using XML namespaces
- **Dynamic Themes**: Theme configuration through XML
- **Analytics Integration**: Track portfolio performance
- **Blog Integration**: Add markdown blog posts (as we discussed!)

## Conclusion

Creating a dynamic portfolio with React and XML data parsing provides the perfect balance of flexibility and structure. The approach enables easy content management while maintaining type safety and validation through XSD schemas.

The complete source code is available on [GitHub](https://github.com/mthlpbs/mthlpbs.github.io), showcasing modern React patterns, XML processing, and responsive design.

---

*Have you tried using XML for data management in modern web applications? What other structured data formats do you prefer? Share your thoughts in the comments!*
