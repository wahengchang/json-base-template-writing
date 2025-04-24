class RandomListTask {
  constructor() {
  }

  async run(taskConfig) {

    const list = taskConfig.input.split('::').filter(Boolean);
    if (list.length === 0) {
      console.error('Invalid or empty list');
      return 'Error: Invalid or empty list';
    }

    try {
      // Select a random index from the list
      const randomIndex = Math.floor(Math.random() * list.length);
      const randomResult = list[randomIndex];

      return randomResult; // Return the random string from the list
    } catch (error) {
      console.error('Error selecting random item:', error);
      return 'Error executing RandomListTask';
    }
  }
}

module.exports = RandomListTask;