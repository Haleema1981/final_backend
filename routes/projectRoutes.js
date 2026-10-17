const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects (or filter by supervisor name if passed as a query param)
router.get('/', async (req, res) => {
  try {
    const { supervisor } = req.query;
    let filter = {};
    if (supervisor) {
      filter.supervisorName = { $regex: new RegExp(`^${supervisor}$`, 'i') };
    }
    const projects = await Project.find(filter);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student: Submit a new proposal with file attachment link
router.post('/submit', async (req, res) => {
  try {
    const { title, description, researchArea, studentName, supervisorName, deadline, attachmentUrl } = req.body;
    const newProject = new Project({
      title,
      description,
      researchArea,
      studentName,
      supervisorName,
      deadline,
      attachmentUrl,
      status: 'Proposed' // Automatically set to Proposed on submission
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supervisor: Update project status (Approved, Rejected, Return, In Progress, Completed)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supervisor/Admin: Add feedback comment to a project
router.post('/:id/comments', async (req, res) => {
  try {
    const { author, text } = req.body;
    const project = await Project.findById(req.params.id);
    project.comments.push({ author, text });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;