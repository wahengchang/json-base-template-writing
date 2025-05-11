const TaskOrchestrator = require('../src/template/taskOrchestrator');
const path = require('path');
const fs = require('fs');

async function main() {
  try {
    const config = path.resolve(__dirname, './config.json');
    const orchestrator = new TaskOrchestrator(config);
    const result = await orchestrator.run();
    
    console.log('[RESULT]',result.answers);
  } catch (err) {
    console.error('Error during task processing:', err);
  }
}

main();
