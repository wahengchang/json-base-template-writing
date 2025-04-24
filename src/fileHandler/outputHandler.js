/**
 * modules/OutputHandler.js
 * 
 * Class for handling output file operations.
 * - appendFile(result): Saves the result as the next numbered JSON file.
 *   It searches for existing JSON files named with numbers and uses n+1 as the next file name.
 */

const fs = require('fs').promises;
const path = require('path');

class OutputHandler {
  /**
   * Constructs an OutputHandler for a given output directory.
   * @param {string} outputDir - The directory path where JSON files will be stored.
   */
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.counter = 0;
  }

  /**
   * Ensures that the output directory exists.
   */
  async ensureDirectory() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (err) {
      console.error('Error ensuring output directory:', err);
      throw err;
    }
  }

  /**
   * Scans the output directory for JSON files named as numbers (e.g., "1.json", "2.json")
   * and sets the internal counter to the highest number found.
   */
  async initializeCounter() {
    await this.ensureDirectory();
    const files = await fs.readdir(this.outputDir);
    const numbers = files
      .map(f => parseInt(f.match(/^(\d+)\.json$/)?.[1], 10))
      .filter(n => !isNaN(n));
    this.counter = numbers.length > 0 ? Math.max(...numbers) : 0;
  }

  /**
   * Appends a result to the output folder by writing it to a new JSON file.
   * The file name will be (counter + 1).json.
   * @param {Object} result - The result object to write.
   */
  async appendFile(result) {
    await this.initializeCounter();
    this.counter++;
    const fileName = `${this.counter}.json`;
    const filePath = path.join(this.outputDir, fileName);
    try {
      await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf8');
      console.log(`Result written to ${filePath}`);
    } catch (err) {
      console.error(`Error writing output file at ${filePath}:`, err);
      throw err;
    }
  }
}

module.exports = OutputHandler;
