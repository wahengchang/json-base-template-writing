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
            { role: "system", content: "Please strictly follow the function return format to generate a list of questions." },
            { role: "user", content: `${this.input}` }
          ],
          functions: [
            {
              name: "generate_questions",
              description: "Returns a list of strings, each element is a research question",
              parameters: {
                type: "object",
                properties: {
                  questions: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["questions"]
              }
            }
          ],
          function_call: { name: "generate_questions" }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data.choices[0].message.function_call.arguments;

      console.log('-=-=-=-=-=1 data, ',data)

      const questions = JSON.parse(data).questions;
      return questions
    } catch (error) {
      console.error("Error generating questions:", error.response ? error.response.data : error.message);
    }
  }
}

module.exports = PerplexityTask;