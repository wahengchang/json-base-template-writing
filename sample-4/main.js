const TaskOrchestrator = require('../src/template/taskOrchestrator');
const InputHandler = require('../src/fileHandler/singlelineHandler');
const OutputHandler = require('../src/fileHandler/outputHandler');

const path = require('path');

const inputFilePath = path.resolve(__dirname, './input.txt');
const outputFilePath = path.resolve(__dirname, './output');
const config = path.resolve(__dirname, './trip-planner-config.json');

async function main() {
  try {
    const inputHandler = new InputHandler(inputFilePath);
    const outputHandler = new OutputHandler(outputFilePath);
    
    let taskLine = await inputHandler.readLine();
    if (!taskLine) return console.log('No task to process.');
    
    while (taskLine) {
      const orchestrator = new TaskOrchestrator(config, "Hanoi", "Dec");
      const result = await orchestrator.run();
      await outputHandler.appendFile(result);
      console.log('[RESULT]',result);

      await inputHandler.done();
      taskLine = await inputHandler.readLine();
    }
  } catch (err) {
    console.error('Error during task processing:', err);
  }
}

main();
