const ChatgptTask = require('./tasks/chatgptTask');
const ChatgptSearchTask = require('./tasks/chatgptSearch');
const PerplexityTask = require('./tasks/perplexityTask');
const RandomDateTimeTask = require('./tasks/randomDateTimeTask');
const RandomListTask = require('./tasks/randomListTask');
const ConstTask = require('./tasks/constTask');
const MarkdownToHtmlTask = require('./tasks/markdownToHtmlTask');
const Replaceask = require('./tasks/replaceTask');
const ParamTask = require('./tasks/paramTask');
const DeepSeekTask = require('./tasks/deepseekTask');
const QuestionListExtracterTask = require('./tasks/questionListExtracterTask');
const TagsExtracterTask = require('./tasks/tagsExtracterTask');

class TaskFactory {
  static getTask(taskType, extraParams) {
    switch (taskType) {
      case 'chatgpt': return new ChatgptTask();
      case 'deepseek': return new DeepSeekTask();
      case 'chatgptSearch': return new ChatgptSearchTask();
      case 'perplexity': return new PerplexityTask();
      case 'randomDateTime': return new RandomDateTimeTask();
      case 'randomList': return new RandomListTask();
      case 'const': return new ConstTask();
      case 'markdownToHtml': return new MarkdownToHtmlTask();
      case 'questionListExtracter': return new QuestionListExtracterTask();
      case 'tagsExtracter': return new TagsExtracterTask();
      case 'replace': return new Replaceask();
      case 'param': return new ParamTask(extraParams);
      default: throw new Error(`Unsupported task type: ${taskType}`);
    }
  }
}

module.exports = TaskFactory;
