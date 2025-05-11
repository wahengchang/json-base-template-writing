const {marked} = require('marked');

class MarkdownToHtmlTask {
  async run(taskConfig) {
      // Convert markdown input to HTML
      const markdownInput = taskConfig.input;
      const htmlOutput = marked.parse(markdownInput);
      return htmlOutput;
  }
}

module.exports = MarkdownToHtmlTask;