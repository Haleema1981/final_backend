// Function 1: Simulate completing a task (e.g., saving a proposal or updating status)
async function firstTask() {
  console.log('1. First function started...');
  // Simulate an async operation like a database save or API call
  await new Promise((resolve) => setTimeout(resolve, 2000)); 
  console.log('1. First function completed successfully!');
  return { success: true, message: 'Data processed' };
}

// Function 2: Automatically starts after the first one finishes
async function secondTask(previousResult) {
  console.log('2. Second function automatically started with data:', previousResult);
  // Perform your next action here (e.g., send notification email, log audit, update record)
  console.log('2. Second function completed!');
}

// Main coordinator function that runs them in sequence
async function runWorkflow() {
  try {
    const result = await firstTask(); // Waits for function 1 to finish
    await secondTask(result);        // Automatically triggers function 2
  } catch (error) {
    console.error('Workflow error:', error);
  }
}

module.exports = { runWorkflow };