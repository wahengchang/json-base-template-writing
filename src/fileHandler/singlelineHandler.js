/**
 * modules/InputHandler.js
 * 
 * Class for handling input file operations.
 * - readLine(): Returns the first non-empty line from the input file.
 * - done(): Removes the processed line from the input file and appends it to the done file.
 */

const fs = require('fs').promises;
const path = require('path');

class InputHandler {
  /**
   * Constructs an InputHandler for a given input file.
   * It automatically derives the done file name.
   * @param {string} inputFilePath - The path of the input file.
   */
  constructor(inputFilePath) {
    this.inputFilePath = path.isAbsolute(inputFilePath) ? inputFilePath : path.join(process.cwd(), inputFilePath);
    const dir = path.dirname(this.inputFilePath);
    const base = path.basename(this.inputFilePath, path.extname(this.inputFilePath));

    this.doneFilePath = path.join(dir, `${base}-done.txt`);
  }

  /**
   * Ensures that the input file and its corresponding done file exist.
   */
  async ensureFiles() {
    // Ensure input file exists; if not, create it.
    try {
      await fs.access(this.inputFilePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error(`Input file not found: ${this.inputFilePath}`);
      }
      throw err;
    }

    // Ensure done file exists.
    try {
      await fs.access(this.doneFilePath);
    } catch {
      await fs.writeFile(this.doneFilePath, '', 'utf8');
    }
  }

  /**
   * Reads the first non-empty line from the input file.
   * Returns null if no valid line is available.
   * @returns {Promise<string|null>}
   */
  async readLine() {
    await this.ensureFiles();
    const data = await fs.readFile(this.inputFilePath, 'utf8');
    const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
    return lines.length > 0 ? lines[0] : null;
  }

  /**
   * Marks the first line as processed:
   * - Removes the first line from the input file.
   * - Appends that line to the done file.
   */
  async done() {
    await this.ensureFiles();
    const data = await fs.readFile(this.inputFilePath, 'utf8');
    let lines = data.split('\n');
    // Remove any empty lines at the beginning
    while (lines.length && lines[0].trim() === '') {
      lines.shift();
    }
    if (lines.length === 0) return; // Nothing to do
    const processedLine = lines.shift().trim();
    // Write back the remaining lines
    await fs.writeFile(this.inputFilePath, lines.join('\n'), 'utf8');
    // Append the processed line to the done file
    await fs.appendFile(this.doneFilePath, processedLine + '\n', 'utf8');
  }
}

module.exports = InputHandler;
