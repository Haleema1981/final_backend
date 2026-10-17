const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// --- Helper Function for Automatic Follow-Up Actions ---
async function handleAutomatedPostAction(actionType, projectData) {
  // This function automatically starts as soon as the previous operation finishes
  console.log(`[AUTOMATION TRIGGER] Action '${actionType}' started for project: ${projectData._id}`);
  
  // Add whatever automatic logic you need here (e.g., logging, status sync, automated logging)
  // For example: simulate an automated follow-up process
  await new Promise((resolve) => setTimeout(resolve, 500)); 
  
  console.log(`[AUTOMATION TRIGGER] Action '${actionType}' completed successfully.`);
}

// Get all projects for supervisor/admin review
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project status (Approved / Rejected) and automatically trigger next task
router.patch('/projects/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // e.g., 'Approved', 'Rejected'
    
    // Step 1: Complete the status update
    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );

    res.json(project);

    // Step 2: Automatically start the next function right after Step 1 finishes
    if (project) {
      await handleAutomatedPostAction(`STATUS_CHANGED_TO_${status.toUpperCase()}`, project);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment to a project and automatically trigger next task
router.post('/projects/:id/comments', async (req, res) => {
  try {
    const { author, text } = req.body; 
    
    // Step 1: Save the comment
    const project = await Project.findById(req.params.id);
    project.comments.push({ author, text });
    await project.save();
    
    res.json(project);

    // Step 2: Automatically start the next function after comment is saved
    await handleAutomatedPostAction('NEW_COMMENT_ADDED', project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;