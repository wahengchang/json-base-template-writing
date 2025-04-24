const TaskOrchestrator = require('../src/template/taskOrchestrator');
const InputHandler = require('../src/fileHandler/singlelineHandler');

const path = require('path');

const inputFilePath = path.resolve(__dirname, './input.txt');
const config = path.resolve(__dirname, './config-write-question.json');

async function main() {
  try {
    const inputHandler = new InputHandler(inputFilePath);
    
    let taskLine = await inputHandler.readLine();
    if (!taskLine) return console.log('No task to process.');
    
    while (taskLine) {
      const orchestrator = new TaskOrchestrator(config, "Hanoi", "Dec");
      const result = await orchestrator.run();
      console.log('[RESULT]',result);

      await inputHandler.done();
      taskLine = await inputHandler.readLine();
    }
  } catch (err) {
    console.error('Error during task processing:', err);
  }
}

main();
