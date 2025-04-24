class RandomDateTimeTask {
    constructor() {
    }
  
    async run(taskConfig) {
      this.config = taskConfig; // Set the input for the task
      this.input = taskConfig.input || new Date().toISOString(); // Set the input for the task, default to current date if not provided
      if (isNaN(Date.parse(this.input))) {
        this.input = new Date(parseInt(this.input)).toISOString();
      }
      this.range = taskConfig.range || 60; // Set the range for the task, default to 0 if not provided
  
      try {
        // Parse the input date
        const inputDate = new Date(this.input);
        if (isNaN(inputDate.getTime())) {
          throw new Error('Invalid date format');
        }
  
        // Calculate the range in milliseconds
        const rangeInMilliseconds = this.range * 60 * 1000;
  
        // Generate a random date within the range
        const randomOffset = Math.floor(Math.random() * rangeInMilliseconds);
        const randomDate = new Date(inputDate.getTime() + randomOffset);
  
        return randomDate.getTime(); // Return the timestamp of the random date
      } catch (error) {
        console.error('Error generating random date:', error);
        return 'Error executing RandomDateTimeTask';
      }
    }
  }
  
  module.exports = RandomDateTimeTask;