const ConfigLoader = require('../template/configLoader');
const TaskExecutor = require('../template/taskExecutor');

class JSONRewriter {
  constructor(configFilePath) {
    this.configFilePath = configFilePath;
    this.executor = new TaskExecutor();
  }

  async rewrite(inputObject) {
    const config = ConfigLoader.load(this.configFilePath);
    const rewrittenObject = {};

    for (const key in config) {
      const taskConfig = config[key];

      taskConfig.input = taskConfig.input.replace('{input}', inputObject[key]);
      taskConfig.input = TaskExecutor.resolvePlaceholders(taskConfig.input, rewrittenObject);

      const result = await this.executor.executeTask(taskConfig);
      rewrittenObject[key] = result
    }

    this.results = rewrittenObject
    return this.getResult()
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

module.exports = JSONRewriter; 