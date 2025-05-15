const axios = require('axios');

class ChatgptSearchTask {
  constructor() {}

  async run(taskConfig) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable not set');
    }
    const input = taskConfig.input;
    const model = taskConfig.model || 'gpt-4o';
    const url = 'https://api.openai.com/v1/responses';
    try {
      const response = await axios.post(
        url,
        {
          model,
          input,
          tools: [{ type: 'web_search' }]
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      let output = null;
      for (let i = 0; i < response.data.output.length; i++) {
        const content = response.data.output[i].content;
        if (content && content.length > 0) {
          output = content[0].text;
          break;
        }
      }
      return output;
    } catch (error) {
      console.error('Error executing OpenAI Responses API:', error?.response?.data || error.message);
      return 'Error executing chatgptSearchTask';
    }
  }
}

module.exports = ChatgptSearchTask;
