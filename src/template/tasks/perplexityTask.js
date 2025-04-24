const PerplexityUtil = require('../../perplexity/util');

class PerplexityTask {
  constructor() {
  }

  async run(taskConfig) {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    this.perplexity = new PerplexityUtil(apiKey, taskConfig);
    this.config = taskConfig;

    this.input = taskConfig.input;
    this.response = null;
    this.total_tokens = 0;

    try {
     
      const response = await this.perplexity.getCompletion(this.input);
      this.output = response.choices[0].message.content;
      this.total_tokens = response.usage.total_tokens;
      return this.output;
    } catch (error) {
      console.error('Error executing API call:', error);
      return 'Error executing PerplexityTask';
    }
  }
}

module.exports = PerplexityTask;