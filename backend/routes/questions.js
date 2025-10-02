const express = require('express');
const router = express.Router();
const { pool } = require('../database');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT question, choice_a, choice_b, choice_c, choice_d FROM questions LIMIT 20'
    );

    // Transform the data to match the frontend expectations
    const questions = result.rows.map(row => ({
      question: row.question,
      choiceA: row.choice_a,
      choiceB: row.choice_b,
      choiceC: row.choice_c,
      choiceD: row.choice_d
    }));

    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM questions WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const question = result.rows[0];
    res.json({
      success: true,
      data: {
        id: question.id,
        question: question.question,
        choiceA: question.choice_a,
        choiceB: question.choice_b,
        choiceC: question.choice_c,
        choiceD: question.choice_d,
        answer: question.answer
      }
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 