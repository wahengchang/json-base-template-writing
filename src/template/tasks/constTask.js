// src/tasks/constTask.js
class ConstTask {
    async run(taskConfig) {
      // Simply return the constant value from the input
      return taskConfig.input;
    }
  }
  
  module.exports = ConstTask;
  