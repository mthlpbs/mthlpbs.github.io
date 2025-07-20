# Portfolio Website

A modern, responsive portfolio website built with React, Three.js, and Apple-inspired design that can be hosted on GitHub Pages.

## 🌟 Features

- **Apple-inspired Design**: Clean, minimalistic design with dark mode by default
- **Three.js Background**: Interactive 3D animations that don't interfere with UX
- **Cute Robot Assistant**: Interactive robot in the header that follows mouse movement
- **XML Data Management**: Dynamic content loading from XML files with XSD validation
- **Blog System**: Markdown-based blog with full article support
- **Project Showcase**: Interactive project cards with hover effects
- **Responsive Design**: Optimized for all screen sizes
- **GitHub Pages Ready**: Configured for easy deployment

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom Apple-inspired theme
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Content**: XML parsing with custom utilities
- **Blog**: React Markdown with syntax highlighting
- **Deployment**: GitHub Pages with automated CI/CD

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── info.xml          # Personal information data
│   ├── info.xsd          # XML schema validation
│   ├── blogs.json        # Blog metadata
│   └── blogs/            # Blog articles (Markdown)
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   └── index.css        # Global styles
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions deployment
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Personal Information (info.xml)

Edit `public/info.xml` to update your personal information:

- **Personal Details**: Name, email, location, birth date
- **Skills**: Programming languages, web technologies, databases, tools
- **Education**: Academic background and qualifications
- **Projects**: Portfolio projects with technologies used
- **Social Links**: GitHub, LinkedIn, portfolio links
- **Availability**: Current status and preferred work types

### Blog Articles

1. **Add Blog Metadata**: Update `public/blogs.json` with new blog information
2. **Create Article**: Add Markdown file to `public/blogs/` directory
3. **Content**: Use standard Markdown syntax with frontmatter support

Example blog entry in `blogs.json`:
```json
{
  "id": "my-new-article",
  "title": "My New Article",
  "date": "2025-01-20",
  "category": "Technology",
  "tags": ["React", "JavaScript"],
  "readTime": "5 min read",
  "excerpt": "A brief description of the article",
  "content": "my-new-article.md",
  "published": true,
  "featured": false
}
```

### Projects

Projects are defined in the `info.xml` file under the `<projects>` section:

```xml
<project>
    <name>Project Name</name>
    <description>Project description</description>
    <technologies>
        <technology>React</technology>
        <technology>Node.js</technology>
    </technologies>
    <image>path/to/image.jpg</image>
    <preview>https://preview-url.com</preview>
    <link>https://github.com/username/repo</link>
    <demo>https://demo-url.com</demo>
</project>
```

## 🎨 Customization

### Colors and Themes

The design uses a custom Apple-inspired color palette defined in `tailwind.config.js`:

- **Apple Gray**: Various shades from 50 to 950
- **Apple Blue**: Primary action color (#007aff)
- **Gradients**: Blue to purple to pink for accent elements

### Three.js Background

The 3D background is configurable in `src/components/ThreeBackground.jsx`:

- **Stars**: Animated star field
- **Floating Geometry**: 3D shapes with smooth animations
- **Particle System**: Moving particles for ambiance

### Animations

Animations are handled by Framer Motion with:

- **Page Transitions**: Smooth fade and slide effects
- **Scroll Animations**: Elements animate as they enter viewport
- **Hover Effects**: Interactive feedback on all interactive elements

## 🚀 Deployment

### GitHub Pages

1. **Enable GitHub Pages** in your repository settings
2. **Push to main branch** - GitHub Actions will automatically deploy
3. **Custom Domain** (optional): Update `CNAME` in the deploy workflow

### Manual Build

```bash
npm run build
```

The `dist/` folder contains the production build ready for any static hosting service.

### Environment Variables

For production deployment, ensure these paths are correct:

- XML files should be accessible at `/info.xml`
- Blog files at `/blogs/*.md`
- Images in `/images/` directory

## 🎯 Key Features Explained

### Cute Robot Assistant

The robot in the header:
- **Follows mouse movement** with smooth animations
- **Interactive feedback** on hover and click
- **Represents AI/tech personality** of the portfolio

### Apple-Style Navigation

- **Frosted glass effect** with backdrop blur
- **Smooth transitions** between pages
- **Active state indicators** with animated underlines

### Project Cards

- **Hover-reveal buttons** for preview and source code
- **Technology tags** with color coding
- **Smooth animations** and transitions
- **Responsive grid** layout

### Blog System

- **Markdown rendering** with syntax highlighting
- **Table of contents** generation
- **Related articles** suggestions
- **Social sharing** buttons
- **Search and filtering** capabilities

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📱 Browser Support

- Modern browsers supporting ES6+
- Mobile-first responsive design
- Tested on Chrome, Firefox, Safari, Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Three.js** for 3D graphics capabilities
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React ecosystem** for modern development experience

---

**Built with ❤️ using React, Three.js, and modern web technologies**
