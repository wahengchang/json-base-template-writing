// src/configLoader.js
const fs = require('fs');

class ConfigLoader {
  static load(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to load configuration file: ${error.message}`);
    }
  }
}

module.exports = ConfigLoader;
