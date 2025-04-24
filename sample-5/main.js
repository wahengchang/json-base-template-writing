const TaskOrchestrator = require('../src/template/taskOrchestrator');
const JSONRewriter = require('../src/templateRewriter/taskRewriterOrchestrator');

const InputHandler = require('../src/fileHandler/singlelineHandler');
const OutputHandler = require('../src/fileHandler/outputHandler');

const path = require('path');

const inputFilePath = path.resolve(__dirname, './input.txt');
const outputFilePath = path.resolve(__dirname, './output');
const config = path.resolve(__dirname, './config-write-question.json');
const configRewriteZhcn = path.resolve(__dirname, './config-rewrite-zh-cn.json');

async function main() {
  try {
    const inputHandler = new InputHandler(inputFilePath);
    const outputHandler = new OutputHandler(outputFilePath);
    
    let taskLine = await inputHandler.readLine();
    if (!taskLine) return console.log('No task to process.');
    
    while (taskLine) {
      // 1- write english
      const orchestrator = new TaskOrchestrator(config, "Hanoi", "Dec");
      const resultEn = await orchestrator.run();
      await outputHandler.appendFile(resultEn);
      console.log('[RESULT]',resultEn);

      //  2- rewrite zh-cn
      const rewriterZhcn = new JSONRewriter(configRewriteZhcn);
      const resultZhcn = await rewriterZhcn.rewrite(resultEn);
      await outputHandler.appendFile(resultZhcn);
      console.log('[RESULT Zh-cn]',resultZhcn);

      // 3- done next 
      await inputHandler.done();
      taskLine = await inputHandler.readLine();
    }
  } catch (err) {
    console.error('Error during task processing:', err);
  }
}

main();
