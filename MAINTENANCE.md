# Maintenance Mode

This project includes a maintenance mode feature that allows you to temporarily disable the site and show a maintenance page to visitors.

## How it works

The maintenance mode is controlled by the `.config` file in the root directory and affects both local development and GitHub Pages deployment:

- **Local Development**: The React app loads the config via Vite's development server and displays the maintenance page if enabled
- **GitHub Pages**: The deployment workflow detects maintenance mode and deploys a static maintenance page instead of the full application

The .config file is automatically served by Vite during development and copied to the dist folder during build.

## Configuration

Edit `.config` file to control maintenance mode:

```ini
# Portfolio Configuration
# This file contains all site settings and configuration

# === SITE SETTINGS ===
# Maintenance mode settings
MAINTENANCE_MODE_ENABLED=false
MAINTENANCE_MODE_MESSAGE=We're currently performing maintenance. Please check back soon!
MAINTENANCE_MODE_ESTIMATED_TIME=

# Theme configuration
THEME=dark
ENABLE_THEME_TOGGLE=true

# Animation settings
ANIMATIONS_ENABLED=true
ANIMATIONS_REDUCED_MOTION=false

# Feature toggles
FEATURES_ROBOT_INTERACTION=true
FEATURES_PARTICLE_EFFECTS=true
FEATURES_GLASS_EFFECT=true

# === THEME COLORS ===
# Dark theme colors
DARK_THEME_PRIMARY=#000000
DARK_THEME_SECONDARY=#1a1a1a
DARK_THEME_ACCENT=#007aff
DARK_THEME_TEXT=#ffffff
DARK_THEME_TEXT_SECONDARY=#a3a3a3

# Light theme colors
LIGHT_THEME_PRIMARY=#ffffff
LIGHT_THEME_SECONDARY=#f5f5f5
LIGHT_THEME_ACCENT=#007aff
LIGHT_THEME_TEXT=#000000
LIGHT_THEME_TEXT_SECONDARY=#666666
```

### Options

- `MAINTENANCE_MODE_ENABLED` (true/false): Whether maintenance mode is active
- `MAINTENANCE_MODE_MESSAGE` (string): Custom message to display to visitors
- `MAINTENANCE_MODE_ESTIMATED_TIME` (string): Optional estimated completion time (e.g., "2 hours", "30 minutes")

## Usage

### Using npm scripts (recommended)

```bash
# Enable maintenance mode with default message
npm run maintenance:on

# Disable maintenance mode
npm run maintenance:off

# Check current status
npm run maintenance:status
```

### Using the script directly

```bash
# Enable with custom message and estimated time
node scripts/maintenance.cjs on "Scheduled maintenance in progress" "2 hours"

# Enable with custom message only
node scripts/maintenance.cjs on "Database migration in progress"

# Disable maintenance mode
node scripts/maintenance.cjs off

# Check status
node scripts/maintenance.cjs status
```

### Manual configuration

You can also directly edit the `.config` file to enable/disable maintenance mode or update the message and other settings.

## Deployment

When you push changes to the main branch:

1. If maintenance mode is **disabled**: The normal application is built and deployed
2. If maintenance mode is **enabled**: A lightweight maintenance page is deployed instead

The maintenance page automatically uses your configured theme colors and displays your custom message.

## Features

- 🎨 **Themed**: Automatically uses your site's color scheme
- 📱 **Responsive**: Works on all device sizes  
- ✨ **Animated**: Beautiful Three.js animations in React and CSS animations in static mode
- ⚡ **Fast**: Lightweight static page during maintenance
- 🛠 **Easy Control**: Simple npm scripts for toggling
- 📝 **Customizable**: Custom messages and time estimates
- 🎭 **Immersive**: Full-screen animated background with floating particles and geometric shapes
