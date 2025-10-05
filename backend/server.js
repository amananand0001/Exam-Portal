const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { initializeDatabase, testConnection, seedQuestions } = require('./database');
const studentsRoutes = require('./routes/students');
const questionsRoutes = require('./routes/questions');
const resultsRoutes = require('./routes/results');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// CORS configuration (supports multiple allowed origins via FRONTEND_URLS or FRONTEND_URL)
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

// Optional domain suffix allow-list via FRONTEND_ORIGIN_SUFFIXES, e.g.: ".netlify.app,.vercel.app"
const allowedOriginSuffixes = (process.env.FRONTEND_ORIGIN_SUFFIXES || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

console.log('CORS allowed origins:', allowedOrigins);
if (allowedOriginSuffixes.length > 0) {
  console.log('CORS allowed origin suffixes:', allowedOriginSuffixes);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin (no Origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (allowedOriginSuffixes.some((suffix) => origin.endsWith(suffix))) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  // Let cors package reflect requested methods/headers automatically
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Explicitly enable preflight for all routes
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SRB Marine Exam Portal API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

            // API routes
            app.use('/api/students', studentsRoutes);
            app.use('/api/questions', questionsRoutes);
            app.use('/api/results', resultsRoutes);
            app.use('/api/contacts', contactsRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

            // Initialize database and start server
            const startServer = async () => {
              try {
                // Test database connection
                const isConnected = await testConnection();
                if (!isConnected) {
                  console.error('Failed to connect to database. Exiting...');
                  process.exit(1);
                }

                // Initialize database tables
                await initializeDatabase();

                // Seed questions from JSON file
                await seedQuestions();

                // Start server
                app.listen(PORT, () => {
                  console.log(`🚀 Server running on port ${PORT}`);
                  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
                  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
                  console.log(`📚 API docs: http://localhost:${PORT}/api/students`);
                  console.log(`❓ Questions API: http://localhost:${PORT}/api/questions`);
                  console.log(`📧 Contacts API: http://localhost:${PORT}/api/contacts`);
                });

              } catch (error) {
                console.error('Failed to start server:', error);
                process.exit(1);
              }
            };

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer(); 