const axios = require('axios')

class PerplexityTask {
  constructor() {
  }

  async run(taskConfig) {
    try {
      this.config = taskConfig;
      this.input = taskConfig.input;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Please strictly follow the function return format to generate a list of tags." },
            { role: "user", content: `${this.input}` }
          ],
          functions: [
            {
              name: "generate_tags",
              description: "Returns a list of strings, each element is a tag",
              parameters: {
                type: "object",
                properties: {
                  tags: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["tags"]
              }
            }
          ],
          function_call: { name: "generate_tags" }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data.choices[0].message.function_call.arguments;

      const tags = JSON.parse(data).tags;
      return tags
    } catch (error) {
      console.error("Error generating tags:", error.response ? error.response.data : error.message);
    }
  }
}

module.exports = PerplexityTask;