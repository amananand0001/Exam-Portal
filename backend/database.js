const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Create Candidates table
    const createCandidatesTable = `
      CREATE TABLE IF NOT EXISTS Candidates (
        id SERIAL PRIMARY KEY,
        Candidate_id VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        country_code VARCHAR(5) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create questions table
    const createQuestionsTable = `
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        choice_a TEXT NOT NULL,
        choice_b TEXT NOT NULL,
        choice_c TEXT NOT NULL,
        choice_d TEXT NOT NULL,
        answer VARCHAR(1) NOT NULL CHECK (answer IN ('A', 'B', 'C', 'D')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create exam_results table
    const createExamResultsTable = `
      CREATE TABLE IF NOT EXISTS exam_results (
        id SERIAL PRIMARY KEY,
        Candidate_id VARCHAR(20) NOT NULL,
        Candidate_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        date_of_birth DATE NOT NULL,
        exam_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        marks_obtained INTEGER NOT NULL,
        total_marks INTEGER NOT NULL DEFAULT 20,
        percentage DECIMAL(5,2) NOT NULL,
        answers JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (Candidate_id) REFERENCES Candidates(Candidate_id) ON DELETE CASCADE
      );
    `;

    // Create contacts table
    const createContactsTable = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes for faster lookups
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_Candidate_id ON Candidates(Candidate_id);
      CREATE INDEX IF NOT EXISTS idx_phone_number ON Candidates(phone_number);
      CREATE INDEX IF NOT EXISTS idx_questions_answer ON questions(answer);
      CREATE INDEX IF NOT EXISTS idx_exam_results_Candidate_id ON exam_results(Candidate_id);
      CREATE INDEX IF NOT EXISTS idx_exam_results_exam_date ON exam_results(exam_date);
      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
    `;

    await pool.query(createCandidatesTable);
    await pool.query(createQuestionsTable);
    await pool.query(createExamResultsTable);
    await pool.query(createContactsTable);
    await pool.query(createIndexes);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Generate unique Candidate ID
const generateCandidateId = async () => {
  const currentYear = new Date().getFullYear();

  try {
    // Get the count of Candidates for this year
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM Candidates WHERE Candidate_id LIKE $1',
      [`${currentYear}%`]
    );

    const count = parseInt(result.rows[0].count) + 1;
    const CandidateId = `${currentYear}${count.toString().padStart(4, '0')}`;

    return CandidateId;
  } catch (error) {
    console.error('Error generating Candidate ID:', error);
    throw error;
  }
};

// Seed questions from JSON file
const seedQuestions = async () => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Check if questions already exist
    const questionCount = await pool.query('SELECT COUNT(*) as count FROM questions');
    if (parseInt(questionCount.rows[0].count) > 0) {
      console.log('Questions already seeded, skipping...');
      return;
    }
    
    // Read and parse the JSON file
    const questionsPath = path.join(__dirname, 'aptitude_questions.json');
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    
    // Insert questions into database
    for (const question of questionsData) {
      await pool.query(
        `INSERT INTO questions (question, choice_a, choice_b, choice_c, choice_d, answer)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [question.question, question.choiceA, question.choiceB, question.choiceC, question.choiceD, question.answer]
      );
    }
    
    console.log(`Successfully seeded ${questionsData.length} questions`);
  } catch (error) {
    console.error('Error seeding questions:', error);
  }
};

// Save exam results
const saveExamResults = async (CandidateId, CandidateName, phoneNumber, dateOfBirth, answers) => {
  try {
    // Get correct answers from questions table
    const questionsResult = await pool.query('SELECT id, answer FROM questions ORDER BY id');
    const correctAnswers = questionsResult.rows;
    
    // Calculate marks
    let marksObtained = 0;
    const answerDetails = [];
    
    for (let i = 0; i < correctAnswers.length; i++) {
      const questionId = i + 1;
      const correctAnswer = correctAnswers[i].answer;
      const CandidateAnswer = answers[questionId] || null;
      const isCorrect = CandidateAnswer === correctAnswer;
      
      if (isCorrect) {
        marksObtained++;
      }
      
      answerDetails.push({
        questionId,
        CandidateAnswer,
        correctAnswer,
        isCorrect
      });
    }
    
    const totalMarks = 20;
    const percentage = ((marksObtained / totalMarks) * 100).toFixed(2);
    
    // Insert exam result
    const result = await pool.query(
      `INSERT INTO exam_results 
       (Candidate_id, Candidate_name, phone_number, date_of_birth, marks_obtained, total_marks, percentage, answers)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [CandidateId, CandidateName, phoneNumber, dateOfBirth, marksObtained, totalMarks, percentage, JSON.stringify(answerDetails)]
    );
    
    return {
      success: true,
      data: {
        marksObtained,
        totalMarks,
        percentage,
        answerDetails: result.rows[0]
      }
    };
  } catch (error) {
    console.error('Error saving exam results:', error);
    throw error;
  }
};

// Save contact form submission
const saveContact = async (name, email, message) => {
  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );
    
    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    console.error('Error saving contact form:', error);
    throw error;
  }
};

// Test database connection
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

module.exports = {
  pool,
  initializeDatabase,
  generateCandidateId,
  seedQuestions,
  saveExamResults,
  saveContact,
  testConnection
}; 