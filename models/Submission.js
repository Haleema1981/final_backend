const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission'); // Adjust path to your model file if needed

// @route   GET /api/submissions
// @desc    Get all submissions for the dashboard
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ date: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/submissions
// @desc    Create a new submission
router.post('/', async (req, res) => {
  try {
    const { title, description, type } = req.body;

    const newSubmission = new Submission({
      title,
      description,
      type
    });

    const submission = await newSubmission.save();
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;