# Mithila Prabashwara - Portfolio Website

A modern, minimalistic portfolio website built with React and Vite, featuring an Apple-inspired design. The website reads personal information from an XML file and displays it in a clean, professional layout.

## Features

- 🎨 **Apple-inspired UI Design** - Clean, minimalistic interface with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices and screen sizes
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful user interactions
- ♿ **Accessibility First** - Follows WCAG guidelines for inclusive design
- 🔧 **XML Data Driven** - All content is managed through a structured XML file
- 🎯 **Modern Technologies** - React 18, Tailwind CSS, and modern JavaScript

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Source**: XML with XSD schema validation

## Project Structure

```
├── public/
│   └── data/
│       └── info.xml          # Personal information data
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Hero.jsx          # Hero section
│   │   ├── About.jsx         # About section
│   │   ├── Skills.jsx        # Skills showcase
│   │   ├── Projects.jsx      # Project portfolio
│   │   ├── Education.jsx     # Education & experience
│   │   ├── Contact.jsx       # Contact form
│   │   └── Footer.jsx        # Footer
│   ├── utils/
│   │   └── xmlParser.js      # XML parsing utilities
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── config/
│   └── info.xsd              # XML schema definition
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mthlpbs/mthlpbs.github.io.git
cd mthlpbs.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Data Management

The website content is managed through the `data/info.xml` file, which follows the schema defined in `config/info.xsd`. This approach allows for:

- **Easy Content Updates**: Modify personal information without touching code
- **Data Validation**: XSD schema ensures data integrity
- **Structured Content**: Well-organized personal information
- **Version Control**: Track changes to personal data over time

### XML Structure

The XML file contains sections for:
- Personal information (name, email, location)
- Social links (LinkedIn, GitHub, Twitter)
- Skills and technologies
- Education and experience
- Projects with technologies used
- Languages and proficiency levels
- Interests and availability

## Design Philosophy

The website follows Apple's design principles:

- **Simplicity**: Clean, uncluttered interface
- **Consistency**: Uniform spacing, typography, and color scheme
- **Accessibility**: High contrast, proper focus states, semantic HTML
- **Performance**: Optimized images, efficient code, fast loading times
- **Responsiveness**: Seamless experience across all devices

## Color Scheme

The design uses a carefully selected color palette:
- Primary: Apple Blue (#007aff)
- Text: Apple Gray shades
- Background: Pure white with subtle gradients
- Accents: Soft blues and purples

## Deployment

The website is optimized for deployment on GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Mithila Prabashwara
- Email: mithila.prabashwara@example.com
- LinkedIn: [linkedin.com/in/mithilaprabashwara](https://www.linkedin.com/in/mithilaprabashwara/)
- GitHub: [github.com/mthlpbs](https://github.com/mthlpbs/)

---

Built with ❤️ and ☕ by Mithila Prabashwara
