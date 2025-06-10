const TaskOrchestrator = require('../src/template/taskOrchestrator');
const path = require('path');

async function main() {
  try {
    const config = path.resolve(__dirname, './config.json');
    // const timestamp = "2025-06-10T09:44:33+08:00";
    const filename = `image.png`;
    const orchestrator = new TaskOrchestrator(config, filename);
    const result = await orchestrator.run();
    console.log('[RESULT]', result);
  } catch (err) {
    console.error('Error during task processing:', err);
  }
}

main();
