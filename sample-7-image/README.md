# Sample 7: Image Generation Task

This sample demonstrates how to use the `generateImage` task to generate an image using the OpenAI API based on a text prompt.

## Files
- `main.js`: Entry point for running the image generation task.
- `config.json`: Configuration file with task parameters.

## Usage
1. Ensure you have set your `OPENAI_API_KEY` in your environment.
2. Run the sample:
   ```sh
   node main.js
   ```
3. The generated image will be saved to the file specified in `config.json` (default: `cat_and_otter.png`).
