#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'public', 'config.json');

function toggleMaintenanceMode(enable, message, estimatedTime) {
  try {
    // Read current config
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // Update maintenance mode settings
    config.siteSettings.maintenanceMode.enabled = enable;
    
    if (message) {
      config.siteSettings.maintenanceMode.message = message;
    }
    
    if (estimatedTime !== undefined) {
      config.siteSettings.maintenanceMode.estimatedTime = estimatedTime;
    }
    
    // Write back to config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    console.log(`✅ Maintenance mode ${enable ? 'ENABLED' : 'DISABLED'}`);
    if (enable) {
      console.log(`📝 Message: ${config.siteSettings.maintenanceMode.message}`);
      if (config.siteSettings.maintenanceMode.estimatedTime) {
        console.log(`⏰ Estimated time: ${config.siteSettings.maintenanceMode.estimatedTime}`);
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
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const maintenance = config.siteSettings.maintenanceMode;
      console.log(`🔧 Maintenance mode: ${maintenance.enabled ? 'ENABLED' : 'DISABLED'}`);
      if (maintenance.enabled) {
        console.log(`📝 Message: ${maintenance.message}`);
        if (maintenance.estimatedTime) {
          console.log(`⏰ Estimated time: ${maintenance.estimatedTime}`);
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
  node scripts/maintenance.js <command> [options]

Commands:
  on|enable [message] [estimated-time]  Enable maintenance mode
  off|disable                           Disable maintenance mode
  status                                Show current status

Examples:
  node scripts/maintenance.js on
  node scripts/maintenance.js on "Scheduled maintenance in progress" "2 hours"
  node scripts/maintenance.js off
  node scripts/maintenance.js status
`);
    break;
}
