// src/taskExecutor.js
const TaskFactory = require('./taskFactory');

class TaskExecutor {
  constructor(extraParams = []) {
    this.extraParams = extraParams;
  }
  async executeTask(taskConfig) {
    // Retrieve an instance of the task handler based on the task type
    const taskInstance = TaskFactory.getTask(taskConfig.type, this.extraParams);
    return await taskInstance.run(taskConfig);
  }

  // Static helper to resolve placeholders in input strings
  static resolvePlaceholders(input, results) {
    if (typeof input !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return input.replace(/\{(\w+)\}/g, (match, key) => results[key] || match);
  }
}

module.exports = TaskExecutor;
