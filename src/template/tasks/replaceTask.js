class ReplaceTask {

  async run(taskConfig) {
    this.from = taskConfig.from;
    this.to = taskConfig.to;
    this.input = taskConfig.input;

    return this.input.replace(new RegExp(this.from, 'g'), this.to);
  }
}

module.exports = ReplaceTask; 