// src/taskOrchestrator.js
const ConfigLoader = require('./configLoader');
const TaskExecutor = require('./taskExecutor');

class TaskOrchestrator {
  constructor(configFilePath, para1st, para2nd) {
    this.configFilePath = configFilePath
    this.extraParams = [para1st, para2nd];
    this.executor = new TaskExecutor(this.extraParams);
  }
  async run() {
    try {
      const config = ConfigLoader.load(this.configFilePath);
      const results = {};

      for (const key in config) {
        const taskConfig = config[key];

        taskConfig.input = TaskExecutor.resolvePlaceholders(taskConfig.input, results);

        const result = await this.executor.executeTask(taskConfig);
        results[key] = result;

        console.log(`Task [${key}] result:`, `${result}`.substring(0, 20));
      }

      this.results = results;

      return this.getResult();
    } catch (error) {
      console.error('Error running tasks:', error);
      throw error;
    }
  }

  getResult() {
    const config = ConfigLoader.load(this.configFilePath);
    const _result = {};

    for (const key in config) {
      if (!config[key].outputIgnore) {
        _result[key] = this.results[key];
      }
    }

    return _result;
  }
}

module.exports = TaskOrchestrator;
