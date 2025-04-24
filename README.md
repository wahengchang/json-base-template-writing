# JSON-Based Template Writing Tool

## Overview
The JSON-Based Template Writing Tool is designed to automate the creation and transformation of structured content. It uses JSON configurations to define templates and triggers for various functions, enabling dynamic content generation and adaptation.

## Task Types

The following task types are supported:

### 1. chatgpt
- Type: `chatgpt`
- Description: Generates content using ChatGPT API
- Usage: Use for natural language generation and AI-powered content creation

### 2. deepseek
- Type: `deepseek`
- Description: Utilizes DeepSeek AI model
- Usage: Alternative AI model for content generation

### 3. perplexity
- Type: `perplexity`
- Description: Implements Perplexity AI capabilities
- Usage: For generating content using Perplexity's AI model

### 4. randomDateTime
- Type: `randomDateTime`
- Description: Generates random date and time values
- Usage: When you need dynamic date/time data in your templates

### 5. randomList
- Type: `randomList`
- Description: Creates random lists from predefined options
- Usage: For generating random selections from a list of items

### 6. const
- Type: `const`
- Description: Provides constant/static values
- Usage: When you need to insert fixed, predefined values

### 7. replace
- Type: `replace`
- Description: Performs text replacement operations
- Usage: For find-and-replace operations in template content

### 8. param
- Type: `param`
- Description: Handles parameter-based content generation
- Usage: When you need to generate content based on input parameters

## License
This project is licensed under the ISC License.