#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', '.config');
const publicConfigPath = path.join(__dirname, '..', 'public', '.config');

function syncConfig() {
  try {
    fs.copyFileSync(configPath, publicConfigPath);
    console.log('✅ Configuration synced to public directory');
  } catch (error) {
    console.error('❌ Error syncing config:', error.message);
    process.exit(1);
  }
}

syncConfig();
