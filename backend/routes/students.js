const express = require('express');
const router = express.Router();
const { pool, generateCandidateId } = require('../database');

// Candidate login endpoint
router.post('/login', async (req, res) => {
  try {
    const { name, phoneNumber, countryCode } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !countryCode) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, phoneNumber, countryCode'
      });
    }

    // Validate name format (basic validation)
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid name'
      });
    }

    // Validate phone number (basic validation)
    if (phoneNumber.trim().length < 7) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      });
    }

    // Check if Candidate exists with the provided credentials
    const result = await pool.query(
      'SELECT id, Candidate_id, name, date_of_birth, phone_number, country_code, created_at FROM Candidates WHERE name = $1 AND phone_number = $2 AND country_code = $3',
      [name.trim(), phoneNumber.trim(), countryCode]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid name or phone number. Please check your credentials and try again.'
      });
    }

    const Candidate = result.rows[0];

    // Check if Candidate has already attempted the exam
    const examResult = await pool.query(
      'SELECT id FROM exam_results WHERE phone_number = $1',
      [phoneNumber.trim()]
    );

    if (examResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Candidate has already attempted the exam',
        hasAttempted: true,
        data: {
          CandidateId: Candidate.Candidate_id,
          name: Candidate.name,
          dateOfBirth: Candidate.date_of_birth,
          phoneNumber: Candidate.phone_number,
          countryCode: Candidate.country_code,
          createdAt: Candidate.created_at
        }
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        CandidateId: Candidate.Candidate_id,
        name: Candidate.name,
        dateOfBirth: Candidate.date_of_birth,
        phoneNumber: Candidate.phone_number,
        countryCode: Candidate.country_code,
        createdAt: Candidate.created_at
      }
    });

  } catch (error) {
    console.error('Error in Candidate login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Candidate signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { name, dateOfBirth, phoneNumber, countryCode } = req.body;

    // Validate required fields
    if (!name || !dateOfBirth || !phoneNumber || !countryCode) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, dateOfBirth, phoneNumber, countryCode'
      });
    }

    // Validate name (at least 2 characters)
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters long'
      });
    }

    // Validate date of birth (must be a valid date and not in the future)
    const dob = new Date(dateOfBirth);
    const today = new Date();
    if (isNaN(dob.getTime()) || dob > today) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid date of birth'
      });
    }

    // Validate phone number (basic validation)
    if (phoneNumber.trim().length < 7) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      });
    }

                    // Check if phone number already exists
                const existingPhone = await pool.query(
                  'SELECT id FROM Candidates WHERE phone_number = $1 AND country_code = $2',
                  [phoneNumber, countryCode]
                );

                if (existingPhone.rows.length > 0) {
                  return res.status(409).json({
                    success: false,
                    message: 'A Candidate with this phone number already exists'
                  });
                }

    // Generate unique Candidate ID
    const CandidateId = await generateCandidateId();

                    // Insert new Candidate
                const result = await pool.query(
                  `INSERT INTO Candidates (Candidate_id, name, date_of_birth, phone_number, country_code)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING id, Candidate_id, name, date_of_birth, phone_number, country_code, created_at`,
                  [CandidateId, name.trim(), dateOfBirth, phoneNumber.trim(), countryCode]
                );

                const newCandidate = result.rows[0];

                    res.status(201).json({
                  success: true,
                  message: 'Candidate registered successfully',
                  data: {
                    CandidateId: newCandidate.Candidate_id,
                    name: newCandidate.name,
                    dateOfBirth: newCandidate.date_of_birth,
                    phoneNumber: newCandidate.phone_number,
                    countryCode: newCandidate.country_code,
                    createdAt: newCandidate.created_at
                  }
                });

  } catch (error) {
    console.error('Error in Candidate signup:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

            // Get all Candidates (for admin purposes)
            router.get('/', async (req, res) => {
              try {
                const result = await pool.query(
                  'SELECT Candidate_id, name, date_of_birth, phone_number, country_code, created_at FROM Candidates ORDER BY created_at DESC'
                );

                res.json({
                  success: true,
                  data: result.rows
                });
              } catch (error) {
                console.error('Error fetching Candidates:', error);
                res.status(500).json({
                  success: false,
                  message: 'Internal server error'
                });
              }
            });

            // Get Candidate by ID
            router.get('/:CandidateId', async (req, res) => {
              try {
                const { CandidateId } = req.params;

                const result = await pool.query(
                  'SELECT Candidate_id, name, date_of_birth, phone_number, country_code, created_at FROM Candidates WHERE Candidate_id = $1',
                  [CandidateId]
                );

                if (result.rows.length === 0) {
                  return res.status(404).json({
                    success: false,
                    message: 'Candidate not found'
                  });
                }

                res.json({
                  success: true,
                  data: result.rows[0]
                });
              } catch (error) {
                console.error('Error fetching Candidate:', error);
                res.status(500).json({
                  success: false,
                  message: 'Internal server error'
                });
              }
            });

module.exports = router; 