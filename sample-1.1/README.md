# Sample 1.1 - ChatGPT Stock Summary & Social Post

This sample demonstrates orchestration using the new `chatgptSearch` task for real-time stock summary and social post generation.

## Files
- `config.json`: Configuration file that defines a stock summary and Twitter-style post workflow using chatgptSearch
- `main.js`: Script that runs the task orchestrator with the configuration

## Features
- Uses chatgptSearch (OpenAI web search) for up-to-date stock/company research
- Generates a Twitter-style post using ChatGPT based on the research, including today's price
- Demonstrates task chaining with variable substitution

## Example config
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

## Usage
```bash
node main.js
```
