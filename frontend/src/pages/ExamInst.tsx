import React, { useState, useEffect } from 'react';
import { GraduationCap, Calendar, Clock, FileText, CheckCircle, Info, Flag, Eye, AlertTriangle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamInstructionsPage: React.FC = () => {
  const [agreedToIntegrity, setAgreedToIntegrity] = useState(false);
  const [CandidateData, setCandidateData] = useState({ CandidateId: '', name: '' });
  const navigate = useNavigate();

  // Get present date
  const getPresentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    // Fetch Candidate data from session storage
    const sessionData = sessionStorage.getItem('CandidateSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      setCandidateData({
        CandidateId: parsedData.CandidateId || '',
        name: parsedData.name || ''
      });
    } else {
      // Redirect to login if no session data
      navigate('/login');
    }
  }, [navigate]);

  const handleStartExam = () => {
    navigate('/exam');
  };

  const handleTryPractice = () => {
    console.log('Starting practice questions...');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('CandidateSession');
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F5F7FF'}}>
      {/* Header */}
      <header className="shadow-sm border-b " style={{backgroundColor: '#1D4ED8'}}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 sm:py-0 sm:h-16 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="/SRB-Marine-1001.png" alt="SRB Marine Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-base sm:text-xl font-semibold text-white">Nursing Exam Portal</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
              <span className="text-white">Candidate ID: {CandidateData.CandidateId}</span>
              <span className="text-white">Candidate Name: {CandidateData.name}</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-900 text-xs sm:text-sm bg-transparent border border-gray-300 px-2 sm:px-3 py-1 rounded hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Exam Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">NCLEX-RN Practice Test</h1>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{getPresentDate()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Duration: 20 minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>20 Nursing Scenario Questions</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Instructions */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Exam Instructions */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 text-left">Exam Instructions</h2>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-left text-sm">Please read the following instructions carefully before starting the exam.</p>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">This exam contains <strong>20 nursing scenario questions</strong>. Each question has only one best answer.</p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">You have <strong>20 minutes</strong> to complete the exam. A timer will be displayed at the top of the screen.</p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">Each question is worth <strong>1 point</strong>. There is no negative marking for incorrect answers.</p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">You can navigate between questions using the <strong>Next</strong> and <strong>Previous</strong> buttons or the question navigator panel.</p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <Flag className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">You can <strong>flag questions</strong> to review later by clicking the flag icon next to the question.</p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">Once you submit the exam, you cannot return to <strong>review or change your answers</strong> and you can attempt this exam only once.</p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 group p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs sm:text-sm text-gray-700 text-left">Do not refresh the page or navigate away from the exam as this may result in submission of your answers.</p>
                </div>
              </div>
            </div>

            {/* Academic Integrity Statement */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-left">Academic Integrity Statement</h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 text-left">
                By starting this exam, you agree to uphold academic integrity. <span className="text-red-600">This means:</span>
              </p>
              
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                <li className="flex items-start space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <span className="text-gray-400">•</span>
                  <span className="text-left">You will not communicate with others during the exam</span>
                </li>
                <li className="flex items-start space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <span className="text-gray-400">•</span>
                  <span className="text-left">You will not use unauthorized materials or devices</span>
                </li>
                <li className="flex items-start space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <span className="text-gray-400">•</span>
                  <span className="text-left">You will not share exam content with others</span>
                </li>
                <li className="flex items-start space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50 hover:-translate-x-0.5">
                  <span className="text-gray-400">•</span>
                  <span className="text-left">You will follow all nursing education examination policies</span>
                </li>
              </ul>
              <div className="flex items-center space-x-2">
                <input
                  id="integrityAgreement"
                  type="checkbox"
                  checked={agreedToIntegrity}
                  onChange={(e) => setAgreedToIntegrity(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="integrityAgreement" className="text-xs sm:text-sm text-gray-700 text-left">
                  I have read and agree to uphold academic integrity during this exam
                </label>
              </div>
            </div>

            {/* Ready to Begin */}
            <div className="text-white rounded-lg p-4 sm:p-6" style={{backgroundColor: '#1D4ED8'}}>
              <div className="flex items-center space-x-2 mb-3">
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                <h3 className="text-base sm:text-lg font-semibold text-left">Ready to begin?</h3>
              </div>
              <p className="text-slate-200 mb-3 sm:mb-4 text-left text-sm">
                Once you click "<strong>Start Exam</strong>", the timer will begin and you will be presented with the first question.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleStartExam}
                  disabled={!agreedToIntegrity}
                  className="bg-white text-blue-700 px-3 sm:px-4 py-2 rounded font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Exam Overview */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-left">Exam Overview</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 text-left">Topics Covered</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50">
                      <CheckCircle className="h-3 w-3 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-left">Safe & Effective Care Environment</span>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50">
                      <CheckCircle className="h-3 w-3 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-left">Health Promotion & Maintenance</span>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50">
                      <CheckCircle className="h-3 w-3 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-left">Psychosocial Integrity</span>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50">
                      <CheckCircle className="h-3 w-3 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-left">Physiological Integrity</span>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-50">
                      <CheckCircle className="h-3 w-3 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-left">Nursing Process & Critical Thinking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Question Format */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-left">Question Format</h3>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 transition-colors duration-200 group hover:bg-gray-100">
                <div className="flex items-start space-x-2 mb-2">
                  <span className="text-white text-xs px-2 py-1 rounded" style={{backgroundColor: '#1D4ED8'}}>
                    Sample Question
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 text-left">A nurse is caring for a client with diabetes. Which action should the nurse take first when the client reports feeling dizzy?</p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-white">
                    <input type="radio" name="sample" className="h-3 w-3" />
                    <span className="text-left">Check blood glucose level</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-white">
                    <input type="radio" name="sample" className="h-3 w-3" />
                    <span className="text-left">Administer insulin</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-white">
                    <input type="radio" name="sample" className="h-3 w-3" />
                    <span className="text-left">Provide orange juice</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:bg-white">
                    <input type="radio" name="sample" className="h-3 w-3" />
                    <span className="text-left">Call the physician</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-700 text-white mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-xs sm:text-sm">
            <div>
              © 2025 Nursing Exam Portal. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <a href="#" className="hover:text-gray-300">Help</a>
              <a href="#" className="hover:text-gray-300">Technical Support</a>
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExamInstructionsPage;