import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// API endpoints for admin operations
export const adminAPI = {
  // Save user data to config.json
  async saveUserData(userData) {
    try {
      const configPath = path.join(rootDir, 'public', 'config.json');
      let config = {};
      
      try {
        const existing = await fs.readFile(configPath, 'utf-8');
        config = JSON.parse(existing);
      } catch (error) {
        // File doesn't exist, start with empty config
      }
      
      // Update user data
      config.user = userData;
      
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));
      return { success: true };
    } catch (error) {
      console.error('Error saving user data:', error);
      return { success: false, error: error.message };
    }
  },

  // Save project data to config.json
  async saveProjectData(projects) {
    try {
      const configPath = path.join(rootDir, 'public', 'config.json');
      let config = {};
      
      try {
        const existing = await fs.readFile(configPath, 'utf-8');
        config = JSON.parse(existing);
      } catch (error) {
        // File doesn't exist, start with empty config
      }
      
      // Update projects
      config.projects = projects;
      
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));
      return { success: true };
    } catch (error) {
      console.error('Error saving project data:', error);
      return { success: false, error: error.message };
    }
  },

  // Save blog data
  async saveBlogData(blogData) {
    try {
      const blogsPath = path.join(rootDir, 'public', 'blogs.json');
      await fs.writeFile(blogsPath, JSON.stringify(blogData, null, 2));
      
      // Save individual blog markdown files
      for (const blog of blogData.blogs || []) {
        if (blog.content) {
          const blogFilePath = path.join(rootDir, 'public', 'blogs', `${blog.slug}.md`);
          await fs.writeFile(blogFilePath, blog.content);
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error saving blog data:', error);
      return { success: false, error: error.message };
    }
  },

  // Save settings to .config file
  async saveSettings(settings) {
    try {
      const configPath = path.join(rootDir, '.config');
      
      // Generate .config file content
      let configContent = '# Portfolio Configuration\n';
      configContent += '# This file contains all site settings and configuration\n\n';
      
      configContent += '# === SITE SETTINGS ===\n';
      configContent += `THEME=${settings.darkMode ? 'dark' : 'light'}\n`;
      configContent += 'ENABLE_THEME_TOGGLE=true\n\n';
      
      configContent += '# Maintenance mode settings\n';
      configContent += `MAINTENANCE_MODE_ENABLED=${settings.maintenanceMode}\n`;
      configContent += `MAINTENANCE_MODE_MESSAGE=${settings.maintenanceMessage}\n`;
      configContent += `MAINTENANCE_MODE_ESTIMATED_TIME=${settings.maintenanceEstimatedTime}\n\n`;
      
      configContent += '# Animation settings\n';
      configContent += 'ANIMATIONS_ENABLED=true\n';
      configContent += 'ANIMATIONS_REDUCED_MOTION=false\n\n';
      
      configContent += '# Feature toggles\n';
      configContent += 'FEATURES_ROBOT_INTERACTION=true\n';
      configContent += 'FEATURES_PARTICLE_EFFECTS=true\n';
      configContent += 'FEATURES_GLASS_EFFECT=true\n\n';
      
      configContent += '# === THEME COLORS ===\n';
      configContent += '# Dark theme colors\n';
      configContent += 'DARK_THEME_PRIMARY=#000000\n';
      configContent += 'DARK_THEME_SECONDARY=#1a1a1a\n';
      configContent += `DARK_THEME_ACCENT=${settings.primaryColor}\n`;
      configContent += 'DARK_THEME_TEXT=#ffffff\n';
      configContent += 'DARK_THEME_TEXT_SECONDARY=#a3a3a3\n\n';
      
      configContent += '# Light theme colors\n';
      configContent += 'LIGHT_THEME_PRIMARY=#ffffff\n';
      configContent += 'LIGHT_THEME_SECONDARY=#f5f5f5\n';
      configContent += `LIGHT_THEME_ACCENT=${settings.accentColor}\n`;
      configContent += 'LIGHT_THEME_TEXT=#000000\n';
      configContent += 'LIGHT_THEME_TEXT_SECONDARY=#666666\n';
      
      await fs.writeFile(configPath, configContent);
      
      // Also save to config.json for web access
      const jsonConfigPath = path.join(rootDir, 'public', 'config.json');
      let jsonConfig = {};
      
      try {
        const existing = await fs.readFile(jsonConfigPath, 'utf-8');
        jsonConfig = JSON.parse(existing);
      } catch (error) {
        // File doesn't exist, start with empty config
      }
      
      jsonConfig.site = {
        name: settings.siteName,
        description: settings.siteDescription,
        url: settings.siteUrl,
        author: {
          name: settings.authorName,
          email: settings.authorEmail
        }
      };
      
      jsonConfig.theme = {
        primaryColor: settings.primaryColor,
        accentColor: settings.accentColor,
        darkMode: settings.darkMode
      };
      
      jsonConfig.seo = {
        keywords: settings.metaKeywords,
        googleSiteVerification: settings.googleSiteVerification
      };
      
      jsonConfig.social = {
        twitter: settings.twitterHandle,
        linkedin: settings.linkedinUrl,
        github: settings.githubUrl
      };
      
      await fs.writeFile(jsonConfigPath, JSON.stringify(jsonConfig, null, 2));
      
      return { success: true };
    } catch (error) {
      console.error('Error saving settings:', error);
      return { success: false, error: error.message };
    }
  },

  // Save uploaded images
  async saveImage(imageData, filename, subfolder = '') {
    try {
      const imagesDir = path.join(rootDir, 'blob', 'images', 'projects', subfolder);
      
      // Ensure directory exists
      await fs.mkdir(imagesDir, { recursive: true });
      
      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      const filepath = path.join(imagesDir, filename);
      await fs.writeFile(filepath, buffer);
      
      return { 
        success: true, 
        url: `/blob/images/projects/${subfolder ? subfolder + '/' : ''}${filename}`
      };
    } catch (error) {
      console.error('Error saving image:', error);
      return { success: false, error: error.message };
    }
  }
};

// Simple HTTP server for admin API
import http from 'http';
import url from 'url';

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        let result;
        
        switch (pathname) {
          case '/api/admin/user':
            result = await adminAPI.saveUserData(data);
            break;
          case '/api/admin/projects':
            result = await adminAPI.saveProjectData(data);
            break;
          case '/api/admin/blogs':
            result = await adminAPI.saveBlogData(data);
            break;
          case '/api/admin/settings':
            result = await adminAPI.saveSettings(data);
            break;
          case '/api/admin/upload':
            result = await adminAPI.saveImage(data.imageData, data.filename, data.subfolder);
            break;
          default:
            result = { success: false, error: 'Unknown endpoint' };
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

if (process.argv[2] === 'start') {
  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`Admin API server running on http://localhost:${PORT}`);
  });
}

export { server };
