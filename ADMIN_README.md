# Admin Panel Documentation

## Overview
The admin panel provides a comprehensive interface for managing your portfolio content, including:

- **User Profile Management**: Edit personal information, skills, education, and social links
- **Project Management**: Add, edit, and manage project showcases with image uploads
- **Blog Management**: Create and edit blog posts with a markdown editor and preview
- **Website Settings**: Configure site settings, themes, SEO, and maintenance mode

## Features

### 🎨 Apple-Inspired Design
- Clean, modern interface inspired by Apple's design language
- Smooth animations and transitions using Framer Motion
- Responsive design that works on all devices
- Dark/light theme support

### 👤 User Profile Management
- Edit basic information (name, email, title, location)
- Manage skills across different categories (Programming Languages, Web Technologies, Databases, Tools)
- Add/edit education history
- Manage social media links
- Set availability status and preferred roles

### 📁 Project Management
- Create and edit project details
- Upload and manage project images with resolution display
- Set project status (Planning, Active, Completed)
- Manage project technologies/tags
- Add GitHub links and live demo URLs

### 📝 Blog Management
- Advanced markdown editor with toolbar
- Live preview functionality
- Blog metadata management (title, category, tags, publish status)
- Featured post designation
- Auto-save functionality

### 📊 Analytics Dashboard
- Overview metrics (users, page views, session duration, bounce rate)
- Device type breakdown
- Geographic user distribution
- Top performing pages
- Traffic source analysis
- Trend analysis with visual indicators

### 🔄 Git Integration
- View current git status and changes
- Select files for commit
- Smart commit message generation
- Push changes to remote repository
- Commit history visualization

## Access

To access the admin panel, navigate to `/admin` in your browser:
```
http://localhost:3000/admin
```

## File Structure

```
src/admin/
├── AdminDashboard.jsx          # Main dashboard component
├── components/
│   └── Notification.jsx        # Toast notification system
└── pages/
    ├── UserManager.jsx         # User profile management
    ├── ProjectManager.jsx      # Project management
    ├── BlogManager.jsx         # Blog management
    ├── Analytics.jsx           # Analytics dashboard
    └── GitManager.jsx          # Git operations
```

## Data Management

### User Data (info.xml)
The user profile data is managed through the XML file located at `public/info.xml`. Changes made in the admin panel will update this file.

### Project Images
Project images are stored in `blob/images/projects/` directory. The admin panel supports:
- Image upload with drag & drop
- Automatic resolution detection
- Image deletion
- Multiple image formats (PNG, JPG, WebP)

### Blog Content
- Blog metadata is stored in `public/blogs.json`
- Blog content files (markdown) are stored in `public/blogs/`
- Auto-generated filenames based on blog titles

## Key Components

### Notification System
- Toast notifications for user feedback
- Auto-dismiss after 5 seconds
- Different types: success, error, warning, info
- Smooth animations

### Image Upload
- Drag & drop support
- Progress indicators
- Image preview
- Resolution and size display
- Error handling

### Markdown Editor
- Syntax highlighting toolbar
- Live preview toggle
- Smart formatting buttons
- Auto-save capabilities

## Styling
The admin panel uses Tailwind CSS with custom styling:
- Gradient backgrounds and cards
- Smooth hover effects
- Consistent color scheme
- Apple-inspired spacing and typography

## State Management
- React hooks for local state management
- Context for theme management
- Real-time updates across components
- Unsaved changes tracking

## Performance
- Optimized with React.memo where appropriate
- Lazy loading for heavy components
- Efficient re-rendering patterns
- Image optimization

## Security Considerations
- Client-side only (no authentication in current version)
- File system access through browser APIs
- Input validation and sanitization
- XSS protection in markdown rendering

## Future Enhancements
- Real-time collaboration
- Version control integration
- Advanced image editing
- SEO optimization tools
- Performance monitoring
- Automated deployments
