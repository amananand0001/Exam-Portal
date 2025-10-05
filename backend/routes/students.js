const express = require('express');
const router = express.Router();
const { pool, generatestudentId } = require('../database');

// student login endpoint
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

    // Check if student exists with the provided credentials
    const result = await pool.query(
      'SELECT id, student_id, name, date_of_birth, phone_number, country_code, created_at FROM students WHERE name = $1 AND phone_number = $2 AND country_code = $3',
      [name.trim(), phoneNumber.trim(), countryCode]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid name or phone number. Please check your credentials and try again.'
      });
    }

    const student = result.rows[0];

    // Check if student has already attempted the exam
    const examResult = await pool.query(
      'SELECT id FROM exam_results WHERE phone_number = $1',
      [phoneNumber.trim()]
    );

    if (examResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'student has already attempted the exam',
        hasAttempted: true,
        data: {
          studentId: student.student_id,
          name: student.name,
          dateOfBirth: student.date_of_birth,
          phoneNumber: student.phone_number,
          countryCode: student.country_code,
          createdAt: student.created_at
        }
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        studentId: student.student_id,
        name: student.name,
        dateOfBirth: student.date_of_birth,
        phoneNumber: student.phone_number,
        countryCode: student.country_code,
        createdAt: student.created_at
      }
    });

  } catch (error) {
    console.error('Error in student login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// student signup endpoint
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
                  'SELECT id FROM students WHERE phone_number = $1 AND country_code = $2',
                  [phoneNumber, countryCode]
                );

                if (existingPhone.rows.length > 0) {
                  return res.status(409).json({
                    success: false,
                    message: 'A student with this phone number already exists'
                  });
                }

    // Generate unique student ID
    const studentId = await generatestudentId();

                    // Insert new student
                const result = await pool.query(
                  `INSERT INTO students (student_id, name, date_of_birth, phone_number, country_code)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING id, student_id, name, date_of_birth, phone_number, country_code, created_at`,
                  [studentId, name.trim(), dateOfBirth, phoneNumber.trim(), countryCode]
                );

                const newstudent = result.rows[0];

                    res.status(201).json({
                  success: true,
                  message: 'student registered successfully',
                  data: {
                    studentId: newstudent.student_id,
                    name: newstudent.name,
                    dateOfBirth: newstudent.date_of_birth,
                    phoneNumber: newstudent.phone_number,
                    countryCode: newstudent.country_code,
                    createdAt: newstudent.created_at
                  }
                });

  } catch (error) {
    console.error('Error in student signup:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

            // Get all students (for admin purposes)
            router.get('/', async (req, res) => {
              try {
                const result = await pool.query(
                  'SELECT student_id, name, date_of_birth, phone_number, country_code, created_at FROM students ORDER BY created_at DESC'
                );

                res.json({
                  success: true,
                  data: result.rows
                });
              } catch (error) {
                console.error('Error fetching students:', error);
                res.status(500).json({
                  success: false,
                  message: 'Internal server error'
                });
              }
            });

            // Get student by ID
            router.get('/:studentId', async (req, res) => {
              try {
                const { studentId } = req.params;

                const result = await pool.query(
                  'SELECT student_id, name, date_of_birth, phone_number, country_code, created_at FROM students WHERE student_id = $1',
                  [studentId]
                );

                if (result.rows.length === 0) {
                  return res.status(404).json({
                    success: false,
                    message: 'student not found'
                  });
                }

                res.json({
                  success: true,
                  data: result.rows[0]
                });
              } catch (error) {
                console.error('Error fetching student:', error);
                res.status(500).json({
                  success: false,
                  message: 'Internal server error'
                });
              }
            });

module.exports = router; 