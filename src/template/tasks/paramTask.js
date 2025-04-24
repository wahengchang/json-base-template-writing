// src/tasks/paramTask.js
class ParamTask {
    constructor(extraParams) {
      this.extraParams = extraParams;
    }
  
    async run(taskConfig) {
      // Convert taskConfig.input to a number
      const index = Number(taskConfig.input);
      if (isNaN(index) || index < 0 || index >= this.extraParams.length) {
        throw new Error(`Invalid parameter index: ${taskConfig.input}`);
      }
      return this.extraParams[index];
    }
  }
  
  module.exports = ParamTask;
  