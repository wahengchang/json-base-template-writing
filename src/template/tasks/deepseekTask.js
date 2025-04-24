const deepseekUtil = require('../../deepseek/util'); // Import the ChatGPT utility

class DeepseekTask {
  constructor() {
  }

  async run(taskConfig) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    this.deepseekUtil = new deepseekUtil(apiKey, taskConfig); // Initialize the ChatGPT utility with the provided API key
    this.config = taskConfig; // Set the input for the task

    this.input = taskConfig.input; // Set the input for the task
    this.response = null;
    this.total_tokens = 0; // Added property to store total_tokens

    try {
      // Execute the API call
      const response = await this.deepseekUtil.getCompletion(this.input);
      this.output = response.choices[0].message.content
      this.total_tokens = response.usage.total_tokens;
      return this.output
    } catch (error) {
      console.error('Error executing API call:', error);
      return 'Error executing DeepseekTask';
    }
  }
}

module.exports = DeepseekTask;
