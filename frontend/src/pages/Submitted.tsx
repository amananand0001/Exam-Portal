import React, { useEffect, useState, useRef } from 'react';
import { Home, Check, Trophy, Award } from 'lucide-react';

interface ExamResults {
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  answerDetails: any;
}

interface CandidateData {
  CandidateId: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const Submitted: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [examResults, setExamResults] = useState<ExamResults | null>(null);
  const [CandidateData, setCandidateData] = useState<CandidateData | null>(null);

  useEffect(() => {
    // Fetch exam results from session storage
    const resultsData = sessionStorage.getItem('examResults');
    if (resultsData) {
      try {
        const parsedResults = JSON.parse(resultsData);
        setExamResults(parsedResults);
      } catch (error) {
        console.error('Error parsing exam results:', error);
      }
    }

    // Fetch Candidate data from exam results (since Candidate session is cleared)
    if (resultsData) {
      try {
        const parsedResults = JSON.parse(resultsData);
        // Extract Candidate data from exam results
        if (parsedResults.answerDetails) {
          setCandidateData({
            CandidateId: parsedResults.answerDetails.Candidate_id || '',
            name: parsedResults.answerDetails.Candidate_name || '',
            phoneNumber: parsedResults.answerDetails.phone_number || '',
            dateOfBirth: parsedResults.answerDetails.date_of_birth || ''
          });
        }
      } catch (error) {
        console.error('Error parsing Candidate data from results:', error);
      }
    }

    // Trigger animations after component mounts
    const timer1 = setTimeout(() => setShowStars(true), 200);
    const timer2 = setTimeout(() => setShowContent(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleReturnHome = () => {
    // Clear session data
    sessionStorage.removeItem('examResults');
    
    // Navigate to home
    window.location.replace('/');
  };

  // Star positions for background animation
  const stars = [
    { id: 1, color: 'text-yellow-400', top: '8%', left: '15%', delay: '0s' },
    { id: 2, color: 'text-purple-400', top: '12%', right: '20%', delay: '0.5s' },
    { id: 3, color: 'text-blue-400', top: '20%', left: '8%', delay: '1s' },
    { id: 4, color: 'text-green-400', top: '25%', right: '15%', delay: '1.5s' },
    { id: 5, color: 'text-pink-400', top: '35%', left: '25%', delay: '2s' },
    { id: 6, color: 'text-indigo-400', top: '40%', right: '25%', delay: '2.5s' },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Animated Background Stars */}
      {showStars && stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} animate-pulse hidden sm:block`}
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            animationDelay: star.delay,
            animationDuration: '2s'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.91 8.26L12 2Z" />
          </svg>
        </div>
      ))}

      {/* Main Content */}
      <div className={`text-center transition-all duration-1000 transform w-full max-w-md sm:max-w-lg lg:max-w-xl ${
        showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Success Checkmark with Badge Animation */}
        <div className="relative mb-6 sm:mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full transition-all duration-700 transform ${
            showContent ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          }`}>
            <div className="relative">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 transition-all duration-700 transform ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ animationDelay: '0.3s' }}>
          Exam Completed Successfully!
        </h1>

        {/* Subtitle */}
        <p className={`text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 transition-all duration-700 transform ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ animationDelay: '0.5s' }}>
          Congratulations! You have successfully completed your<br className="hidden sm:block" />
          university exam.
        </p>

        {/* Exam Score Display */}
        {examResults && (
          <div className={`mb-6 sm:mb-8 transition-all duration-700 transform ${
            showContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-75'
          }`} style={{ animationDelay: '0.6s' }}>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-2 border-blue-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Your Exam Score</h3>
                </div>
                
                {/* Candidate Info */}
                {CandidateData && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">Candidate:</span>
                        <span className="ml-1 text-gray-900 font-semibold">{CandidateData.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">ID:</span>
                        <span className="ml-1 text-gray-900 font-semibold">{CandidateData.CandidateId}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {examResults.marksObtained}
                    </div>
                    <div className="text-xs sm:text-sm text-blue-700">Marks Obtained</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-600">
                      {examResults.totalMarks}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700">Total Marks</div>
                  </div>
                  
                  <div className={`rounded-lg p-3 sm:p-4 ${
                    examResults.percentage >= 80 
                      ? 'bg-green-50' 
                      : examResults.percentage >= 60 
                      ? 'bg-yellow-50' 
                      : 'bg-red-50'
                  }`}>
                    <div className={`text-2xl sm:text-3xl font-bold ${
                      examResults.percentage >= 80 
                        ? 'text-green-600' 
                        : examResults.percentage >= 60 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                    }`}>
                      {examResults.percentage}%
                    </div>
                    <div className={`text-xs sm:text-sm ${
                      examResults.percentage >= 80 
                        ? 'text-green-700' 
                        : examResults.percentage >= 60 
                        ? 'text-yellow-700' 
                        : 'text-red-700'
                    }`}>Percentage</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <Award className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
                    examResults.percentage >= 80 
                      ? 'text-green-500' 
                      : examResults.percentage >= 60 
                      ? 'text-yellow-500' 
                      : 'text-red-500'
                  }`} />
                  <span className={`text-sm sm:text-base font-medium ${
                    examResults.percentage >= 80 
                      ? 'text-green-600' 
                      : examResults.percentage >= 60 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>
                    {examResults.percentage >= 80 
                      ? 'Excellent Performance!' 
                      : examResults.percentage >= 60 
                      ? 'Good Performance!' 
                      : 'Keep Practicing!'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SRB Marine Logo */}
        <div className={`mb-6 sm:mb-8 transition-all duration-700 transform ${
          showContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-75'
        }`} style={{ animationDelay: '0.7s' }}>
          <div className="inline-block animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 relative">
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{backgroundColor: '#1D4ED8'}}>
                <img 
                  src="/SRB-Marine-1001.png" 
                  alt="SRB Marine Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Return to Home Button */}
        <button
          onClick={handleReturnHome}
          className={`inline-flex items-center justify-center space-x-2 px-6 py-2 sm:px-8 sm:py-3 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ animationDelay: '0.8s', backgroundColor: '#1D4ED8' }}
        >
          <Home className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Return to Home</span>
        </button>

        {/* Footer */}
        <div className={`mt-8 sm:mt-12 transition-all duration-700 transform ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
              <img 
                src="/SRB-Marine-1001.png" 
                alt="SRB Marine Logo" 
                className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm text-center">Examination Portal</span>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Additional decorative elements */}
        <div className={`absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-blue-300 rounded-full animate-ping transition-opacity duration-1000 ${
          showStars ? 'opacity-60' : 'opacity-0'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-3/4 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-purple-300 rounded-full animate-pulse transition-opacity duration-1000 ${
          showStars ? 'opacity-60' : 'opacity-0'
        }`} style={{ animationDelay: '2.5s' }}></div>
        <div className={`absolute top-1/2 left-1/6 w-1 h-1 bg-green-400 rounded-full animate-bounce transition-opacity duration-1000 ${
          showStars ? 'opacity-80' : 'opacity-0'
        }`} style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Celebration particles effect */}
      {showContent && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-ping hidden sm:block`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Submitted;