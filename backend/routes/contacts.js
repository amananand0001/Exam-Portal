const express = require('express');
const { saveContact } = require('../database');

const router = express.Router();

// POST /api/contacts - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate message length
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      });
    }

    // Save contact form submission
    const result = await saveContact(name.trim(), email.trim(), message.trim());

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: result.data.id,
        name: result.data.name,
        email: result.data.email,
        submittedAt: result.data.created_at
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// GET /api/contacts - Get all contact submissions (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const { pool } = require('../database');
    
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
});

module.exports = router; 