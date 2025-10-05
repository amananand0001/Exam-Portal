const express = require('express');
const router = express.Router();
const { saveExamResults, pool } = require('../database');

// Submit exam results
router.post('/submit', async (req, res) => {
  try {
    const { CandidateId, CandidateName, phoneNumber, dateOfBirth, answers } = req.body;

    // Validate required fields
    if (!CandidateId || !CandidateName || !phoneNumber || !dateOfBirth || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: CandidateId, CandidateName, phoneNumber, dateOfBirth, answers'
      });
    }

    // Validate answers format
    if (typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Answers must be an object with question numbers as keys'
      });
    }

    // Save exam results
    const result = await saveExamResults(CandidateId, CandidateName, phoneNumber, dateOfBirth, answers);

    res.status(200).json({
      success: true,
      message: 'Exam results submitted successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Error submitting exam results:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while submitting exam results'
    });
  }
});

// Get exam results by Candidate ID
router.get('/Candidate/:CandidateId', async (req, res) => {
  try {
    const { CandidateId } = req.params;

    const result = await pool.query(
      'SELECT * FROM exam_results WHERE Candidate_id = $1 ORDER BY exam_date DESC',
      [CandidateId]
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching exam results:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching exam results'
    });
  }
});

// Get all exam results (for admin purposes)
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM exam_results ORDER BY exam_date DESC'
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching all exam results:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching exam results'
    });
  }
});

module.exports = router; 