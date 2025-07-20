#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', '.config');

function parseConfigFile() {
  const content = fs.readFileSync(configPath, 'utf8');
  const config = {};
  
  content.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('#') || !trimmedLine) return;
    
    const [key, ...valueParts] = trimmedLine.split('=');
    const value = valueParts.join('=').trim();
    
    if (key && value !== undefined) {
      config[key.trim()] = value;
    }
  });
  
  return config;
}

function updateConfigFile(updates) {
  const content = fs.readFileSync(configPath, 'utf8');
  let updatedContent = content;
  
  Object.entries(updates).forEach(([key, value]) => {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    const replacement = `${key}=${value}`;
    
    if (regex.test(updatedContent)) {
      updatedContent = updatedContent.replace(regex, replacement);
    } else {
      // Add new key if it doesn't exist
      updatedContent += `\n${replacement}`;
    }
  });
  
  fs.writeFileSync(configPath, updatedContent);
}

function toggleMaintenanceMode(enable, message, estimatedTime) {
  try {
    const updates = {
      'MAINTENANCE_MODE_ENABLED': enable ? 'true' : 'false'
    };
    
    if (message) {
      updates['MAINTENANCE_MODE_MESSAGE'] = message;
    }
    
    if (estimatedTime !== undefined) {
      updates['MAINTENANCE_MODE_ESTIMATED_TIME'] = estimatedTime;
    }
    
    updateConfigFile(updates);
    
    console.log(`✅ Maintenance mode ${enable ? 'ENABLED' : 'DISABLED'}`);
    if (enable) {
      const config = parseConfigFile();
      console.log(`📝 Message: ${config['MAINTENANCE_MODE_MESSAGE']}`);
      if (config['MAINTENANCE_MODE_ESTIMATED_TIME']) {
        console.log(`⏰ Estimated time: ${config['MAINTENANCE_MODE_ESTIMATED_TIME']}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating maintenance mode:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'on':
  case 'enable':
    const message = args[1] || "We're currently performing maintenance. Please check back soon!";
    const estimatedTime = args[2] || "";
    toggleMaintenanceMode(true, message, estimatedTime);
    break;
    
  case 'off':
  case 'disable':
    toggleMaintenanceMode(false);
    break;
    
  case 'status':
    try {
      const config = parseConfigFile();
      const enabled = config['MAINTENANCE_MODE_ENABLED'] === 'true';
      console.log(`🔧 Maintenance mode: ${enabled ? 'ENABLED' : 'DISABLED'}`);
      if (enabled) {
        console.log(`📝 Message: ${config['MAINTENANCE_MODE_MESSAGE']}`);
        if (config['MAINTENANCE_MODE_ESTIMATED_TIME']) {
          console.log(`⏰ Estimated time: ${config['MAINTENANCE_MODE_ESTIMATED_TIME']}`);
        }
      }
    } catch (error) {
      console.error('❌ Error reading config:', error.message);
    }
    break;
    
  default:
    console.log(`
🔧 Maintenance Mode Controller

Usage:
  node scripts/maintenance.cjs <command> [options]

Commands:
  on|enable [message] [estimated-time]  Enable maintenance mode
  off|disable                           Disable maintenance mode
  status                                Show current status

Examples:
  node scripts/maintenance.cjs on
  node scripts/maintenance.cjs on "Scheduled maintenance in progress" "2 hours"
  node scripts/maintenance.cjs off
  node scripts/maintenance.cjs status
`);
    break;
}
