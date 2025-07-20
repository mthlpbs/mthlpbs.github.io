/**
 * Configuration parser utility
 * Parses .config file and converts it to JSON format
 */

export class ConfigParser {
  static parseConfigFile(configContent) {
    const lines = configContent.split('\n');
    const config = {
      siteSettings: {
        maintenanceMode: {},
        animations: {},
        features: {}
      },
      themeConfig: {
        dark: {},
        light: {}
      }
    };

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip comments and empty lines
      if (trimmedLine.startsWith('#') || !trimmedLine) {
        continue;
      }

      // Parse key=value pairs
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();

      if (!key || value === undefined) {
        continue;
      }

      // Convert string values to appropriate types
      const parsedValue = this.parseValue(value);

      // Map config keys to JSON structure
      this.mapConfigValue(config, key.trim(), parsedValue);
    }

    return config;
  }

  static parseValue(value) {
    // Handle boolean values
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    
    // Handle empty values
    if (value === '') return '';
    
    // Return string value
    return value;
  }

  static mapConfigValue(config, key, value) {
    const keyMap = {
      // Site settings
      'THEME': () => {
        config.siteSettings.theme = value;
        config.siteSettings.defaultTheme = value; // Use THEME as default
      },
      'ENABLE_THEME_TOGGLE': () => config.siteSettings.enableThemeToggle = value,
      
      // Maintenance mode
      'MAINTENANCE_MODE_ENABLED': () => config.siteSettings.maintenanceMode.enabled = value,
      'MAINTENANCE_MODE_MESSAGE': () => config.siteSettings.maintenanceMode.message = value,
      'MAINTENANCE_MODE_ESTIMATED_TIME': () => config.siteSettings.maintenanceMode.estimatedTime = value,
      
      // Animations
      'ANIMATIONS_ENABLED': () => config.siteSettings.animations.enabled = value,
      'ANIMATIONS_REDUCED_MOTION': () => config.siteSettings.animations.reducedMotion = value,
      
      // Features
      'FEATURES_ROBOT_INTERACTION': () => config.siteSettings.features.robotInteraction = value,
      'FEATURES_PARTICLE_EFFECTS': () => config.siteSettings.features.particleEffects = value,
      'FEATURES_GLASS_EFFECT': () => config.siteSettings.features.glassEffect = value,
      
      // Dark theme colors
      'DARK_THEME_PRIMARY': () => config.themeConfig.dark.primary = value,
      'DARK_THEME_SECONDARY': () => config.themeConfig.dark.secondary = value,
      'DARK_THEME_ACCENT': () => config.themeConfig.dark.accent = value,
      'DARK_THEME_TEXT': () => config.themeConfig.dark.text = value,
      'DARK_THEME_TEXT_SECONDARY': () => config.themeConfig.dark.textSecondary = value,
      
      // Light theme colors
      'LIGHT_THEME_PRIMARY': () => config.themeConfig.light.primary = value,
      'LIGHT_THEME_SECONDARY': () => config.themeConfig.light.secondary = value,
      'LIGHT_THEME_ACCENT': () => config.themeConfig.light.accent = value,
      'LIGHT_THEME_TEXT': () => config.themeConfig.light.text = value,
      'LIGHT_THEME_TEXT_SECONDARY': () => config.themeConfig.light.textSecondary = value,
    };

    const mapper = keyMap[key];
    if (mapper) {
      mapper();
    } else {
      console.warn(`Unknown config key: ${key}`);
    }
  }

  static async loadConfig() {
    try {
      const response = await fetch('/.config');
      const configContent = await response.text();
      return this.parseConfigFile(configContent);
    } catch (error) {
      console.error('Error loading config:', error);
      
      // Fallback to default config
      return {
        siteSettings: {
          theme: "dark",
          enableThemeToggle: true,
          defaultTheme: "dark",
          maintenanceMode: {
            enabled: false,
            message: "We're currently performing maintenance. Please check back soon!",
            estimatedTime: ""
          },
          animations: {
            enabled: true,
            reducedMotion: false
          },
          features: {
            robotInteraction: true,
            particleEffects: true,
            glassEffect: true
          }
        },
        themeConfig: {
          dark: {
            primary: "#000000",
            secondary: "#1a1a1a",
            accent: "#007aff",
            text: "#ffffff",
            textSecondary: "#a3a3a3"
          },
          light: {
            primary: "#ffffff",
            secondary: "#f5f5f5",
            accent: "#007aff",
            text: "#000000",
            textSecondary: "#666666"
          }
        }
      };
    }
  }
}
