const TaskOrchestrator = require('../src/template/taskOrchestrator');
const path = require('path');


async function main() {
  try {
    const config = path.resolve(__dirname, './trip-planner-config.json');
    const orchestrator = new TaskOrchestrator(config, "Hanoi", "Dec");
    const result = await orchestrator.run();
    console.log('[RESULT]',result);
  } catch (err) {
    console.error('Error during task processing:', err);
  }
}

main();
