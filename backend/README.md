# SRB Marine Exam Portal Backend

This is the backend API for the SRB Marine Exam Portal, built with Node.js, Express, and PostgreSQL (NeonDB).

## Features

- **Candidate Registration**: Register Candidates with unique IDs
- **Question Management**: Store and retrieve exam questions from database
- **Exam Results**: Calculate and store exam results with detailed analytics
- **Session Management**: Handle Candidate sessions
- **Security**: Rate limiting, CORS, and input validation
- **Database**: PostgreSQL with NeonDB for cloud hosting

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- NeonDB account (free tier available)

## Setup Instructions

### 1. Create NeonDB Database

1. Go to [NeonDB](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from your project dashboard
4. The connection string will look like:
   ```
   postgresql://username:password@host:port/database
   ```

### 2. Environment Configuration

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your NeonDB connection string:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # NeonDB Configuration
   DATABASE_URL=postgresql://username:password@host:port/database

   # JWT Configuration (for future authentication)
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=24h

   # CORS Configuration
   # Either single origin:
   FRONTEND_URL=http://localhost:5173
   # Or multiple explicit origins (comma-separated):
   # FRONTEND_URLS=http://localhost:5173,https://your-site.netlify.app
   # Or allow domains by suffix (use cautiously):
   # FRONTEND_ORIGIN_SUFFIXES=.netlify.app,.vercel.app
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will automatically:
- Connect to your NeonDB database
- Create the necessary tables (Candidates, questions)
- Seed the questions from the `aptitude_questions.json` file

## API Endpoints

### Candidates
- `POST /api/Candidates/signup` - Register a new Candidate
- `GET /api/Candidates` - Get all Candidates (admin)
- `GET /api/Candidates/:CandidateId` - Get Candidate by ID

### Questions
- `GET /api/questions` - Get all questions (limited to 20)
- `GET /api/questions/:id` - Get question by ID

### Results
- `POST /api/results/submit` - Submit exam results
- `GET /api/results/Candidate/:CandidateId` - Get results for a specific Candidate
- `GET /api/results/all` - Get all exam results (admin)

### Health Check
- `GET /health` - Server health status

## Database Schema

### Candidates Table
```sql
CREATE TABLE Candidates (
  id SERIAL PRIMARY KEY,
  Candidate_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  country_code VARCHAR(5) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Questions Table
```sql
CREATE TABLE questions (
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
```

### Exam Results Table
```sql
CREATE TABLE exam_results (
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
```

## Candidate ID Format

Candidate IDs are generated in the format: `YYYY####`
- `YYYY` = Current year
- `####` = Sequential number (0001, 0002, etc.)

Example: `20250001`, `20250002`

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Database connection errors
- Duplicate phone number detection
- Invalid date formats
- Missing required fields

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: All inputs are validated
- **SQL Injection Protection**: Parameterized queries

## Development

### Adding New Questions

1. Add questions to `aptitude_questions.json`
2. Restart the server - questions will be automatically seeded

### Database Migrations

For production, consider using a migration tool like `node-pg-migrate` for database schema changes.

## Troubleshooting

### Connection Issues
- Verify your NeonDB connection string
- Check if your IP is whitelisted (if required)
- Ensure SSL is properly configured

### Question Seeding Issues
- Check if the `aptitude_questions.json` file exists
- Verify JSON format is valid
- Check database permissions

### Port Conflicts
- Change the PORT in `.env` if 5000 is already in use

## License

MIT License 