# JSON-Based Template Writing Tool

## Overview
The JSON-Based Template Writing Tool is designed to automate the creation and transformation of structured content. It uses JSON configurations to define workflows of tasks that can generate, process, and transform content dynamically.

## Configuration System

### Basic Structure

A configuration file is a JSON object where each key represents a task. Tasks are executed in the order they appear. Each task has the following structure:

```json
{
  "taskName": {
    "type": "taskType",
    "input": "input content or template",
    // Additional task-specific properties
  }
}
```

### Common Task Properties

- `type` (required): The type of task to execute (e.g., 'chatgpt', 'perplexity')
- `input`: The input content or template for the task
- `outputIgnore` (boolean): If true, the task's output won't be included in the final result
- `model`: For AI tasks, specifies which model to use (e.g., 'gpt-4o-mini')

### Task Types

| Type | Description | Required Properties |
|------|-------------|----------------------|
| `chatgpt` | Generates content using OpenAI's ChatGPT API | `input`, `model` |
| `perplexity` | Uses Perplexity AI for content generation | `input` |
| `const` | Provides a constant value | `input` |
| `param` | References input parameters | `input` |
| `randomList` | Selects a random item from a list | `input` |
| `questionListExtracter` | Generates questions about a topic | `input` |
| `markdownToHtml` | Converts markdown to HTML | `input` |
| `replace` | Performs text replacement | `input`, `find`, `replace` |
| `deepseek` | Uses DeepSeek AI model | `input` |
| `chatgptSearch` | Uses OpenAI Responses API with web search for real-time info | `input` |
| `randomDateTime` | Generates a random date/time | `start`, `end` |

### Task Type Details and Examples

#### `chatgpt`
- **Description**: Generates content using OpenAI's ChatGPT API
- **Properties**:
  - `input`: The prompt or template for content generation
  - `model`: The model to use (e.g., 'gpt-4o-mini')
- **Example**:
  ```json
  {
    "type": "chatgpt",
    "input": "Write a short story about {topic}",
    "model": "gpt-4o-mini"
  }
  ```

#### `perplexity`
- **Description**: Uses Perplexity AI for content generation
- **Properties**:
  - `input`: The query or prompt for content generation
- **Example**:
  ```json
  {
    "type": "perplexity",
    "input": "What are the latest trends in {industry}?"
  }
  ```

#### `const`
- **Description**: Provides a constant value
- **Properties**:
  - `input`: The constant value to output
- **Example**:
  ```json
  {
    "type": "const",
    "input": "This is a constant value"
  }
  ```

#### `param`
- **Description**: References input parameters (passed when running the script)
- **Properties**:
  - `input`: The parameter index (0-based) or name
- **Example**:
  ```json
  {
    "type": "param",
    "input": "0"
  }
  ```

#### `randomList`
- **Description**: Selects a random item from a list
- **Properties**:
  - `input`: A string with items separated by `::`
- **Example**:
  ```json
  {
    "type": "randomList",
    "input": "option1::option2::option3"
  }
  ```

#### `questionListExtracter`
- **Description**: Generates a list of questions about a topic
- **Properties**:
  - `input`: The topic or prompt for question generation
- **Example**:
  ```json
  {
    "type": "questionListExtracter",
    "input": "Generate 5 questions about {topic}"
  }
  ```

#### `markdownToHtml`
- **Description**: Converts markdown content to HTML
- **Properties**:
  - `input`: The markdown content to convert
- **Example**:
  ```json
  {
    "type": "markdownToHtml",
    "input": "# Heading\n\nSome **bold** text"
  }
  ```

#### `replace`
- **Description**: Performs text replacement
- **Properties**:
  - `input`: The input text
  - `find`: The text to find
  - `replace`: The replacement text
- **Example**:
  ```json
  {
    "type": "replace",
    "input": "Hello {name}",
    "find": "{name}",
    "replace": "World"
  }
  ```

#### `chatgptSearch`
- **Description**: Uses OpenAI Responses API with web search tool for real-time or up-to-date info
- **Properties**:
  - `input`: The query or prompt for web-augmented generation
- **Example**:
  ```json
  {
    "type": "chatgptSearch",
    "input": "make one paragraph today summary about stock - tesla"
  }
  ```

#### `deepseek`
- **Description**: Uses DeepSeek AI model
- **Properties**:
  - `input`: The prompt or query
- **Example**:
  ```json
  {
    "type": "deepseek",
    "input": "Explain quantum computing"
  }
  ```

#### `randomDateTime`
- **Description**: Generates a random date/time
- **Properties**:
  - `start`: Start date in ISO format
  - `end`: End date in ISO format
- **Example**:
  ```json
  {
    "type": "randomDateTime",
    "start": "2025-01-01",
    "end": "2025-12-31"
  }
  ```

### Variable Substitution

You can reference the output of previous tasks using `{taskName}` syntax in your input strings. For example:

```json
{
  "topic": {
    "type": "const",
    "input": "Artificial Intelligence"
  },
  "questions": {
    "type": "questionListExtracter",
    "input": "Generate questions about {topic}",
    "outputIgnore": true
  },
  "answers": {
    "type": "chatgpt",
    "input": "Answer these questions about {topic}: {questions}",
    "model": "gpt-4o-mini"
  }
}
```

## Complete Examples

### Example: Real-Time Stock Summary & Social Post (sample-1.1)
```json
{
  "stock": {
    "type": "const",
    "input": "tesla"
  },
  "research": {
    "type": "chatgptSearch",
    "input": "make one paragraph today summary about stock - {stock}",
    "outputIgnore": true
  },
  "answer": {
    "type": "chatgpt",
    "input": "{research}\n-=-=-=-=-=-=\n\nbased on the information above, write a twitter post (mention the price today,reply in short)",
    "model": "gpt-4o-mini"
  }
}
```

### Example 1: Simple Q&A Generator

```json
{
  "topic": {
    "type": "const",
    "input": "Software Engineering"
  },
  "questions": {
    "type": "questionListExtracter",
    "input": "Generate 3 frequently asked questions about {topic}",
    "outputIgnore": true
  },
  "answers": {
    "type": "chatgpt",
    "input": "Answer these questions concisely:\n{questions}",
    "model": "gpt-4o-mini"
  }
}
```

### Example 2: Trip Planner with Dynamic Content

```json
{
  "destination": {
    "type": "param",
    "input": "0"
  },
  "travelDate": {
    "type": "param",
    "input": "1"
  },
  "tone": {
    "type": "randomList",
    "input": "casual::formal::enthusiastic::professional",
    "outputIgnore": true
  },
  "research": {
    "type": "perplexity",
    "input": "Find top 5 attractions in {destination} and weather for {travelDate}",
    "outputIgnore": true
  },
  "itinerary": {
    "type": "chatgpt",
    "input": "Create a {tone} travel itinerary for {destination} on {travelDate} based on:\n{research}",
    "model": "gpt-4o-mini"
  }
}
```

## Running a Configuration

1. Create a JSON configuration file (e.g., `config.json`)
2. Create a JavaScript file to run the configuration:

```javascript
const TaskOrchestrator = require('./src/template/taskOrchestrator');
const path = require('path');

async function main() {
  try {
    const configPath = path.resolve(__dirname, 'config.json');
    const orchestrator = new TaskOrchestrator(configPath, 'param1', 'param2');
    const result = await orchestrator.run();
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
```

3. Run the script:
   ```
   node your-script.js
   ```

## Best Practices

1. **Use `outputIgnore`** for intermediate tasks that shouldn't appear in the final output
2. **Chain tasks** by referencing previous task outputs with `{taskName}`
3. **Keep configurations modular** - break down complex workflows into smaller, reusable tasks
4. **Use parameters** for dynamic values that change between runs
5. **Test tasks individually** before chaining them together

## License
This project is licensed under the ISC License.