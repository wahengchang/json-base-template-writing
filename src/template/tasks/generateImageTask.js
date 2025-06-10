const axios = require('axios');
const fs = require('fs');

class GenerateImageTask {
  constructor() {}

  async run(taskConfig) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in environment variables.");
    }
    const prompt = taskConfig.input;
    const outputFile = taskConfig.outputFile || "generated_image.png";
    const responseFormat = taskConfig.response_format || "url"; // "url" or "b64_json"
    const size = taskConfig.size || "1024x1024";
    const n = taskConfig.n || 1;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          n,
          size,
          response_format: responseFormat
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = response.data;
      if (!data || !data.data || !data.data.length) {
        throw new Error("No image data returned from OpenAI API");
      }
      let imageSavedPath = null;
      if (responseFormat === 'b64_json') {
        const imageBase64 = data.data[0].b64_json;
        fs.writeFileSync(outputFile, Buffer.from(imageBase64, 'base64'));
        imageSavedPath = outputFile;
      } else if (responseFormat === 'url') {
        const imageUrl = data.data[0].url;
        // Download the image from the url
        const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputFile, imgRes.data);
        imageSavedPath = outputFile;
      }
      return imageSavedPath;
    } catch (err) {
      console.error("OpenAI Image API error:", err.response ? err.response.data : err.message);
      return "Error generating image";
    }
  }
}

module.exports = GenerateImageTask;
