import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronLeft, ChevronRight, Flag, Eye, Calculator, X, AlertTriangle, Lock } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    description: string;
  }[];
  answered: boolean;
  flagged: boolean;
  selectedAnswer?: string;
}

interface Toast {
  id: string;
  type: 'warning' | 'error' | 'success';
  message: string;
  duration?: number;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
}

const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(1200);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [studentData, setstudentData] = useState({ studentId: '', name: '' });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [calculatorMemory, setCalculatorMemory] = useState(0);
  const [calculatorHistory, setCalculatorHistory] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [isLeavingPage, setIsLeavingPage] = useState(false);
  const [isShowingNavigationWarning, setIsShowingNavigationWarning] = useState(false);
  const [isSubmittingExam, setIsSubmittingExam] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const tabSwitchCountRef = useRef(0);
  const beforeUnloadHandlerRef = useRef<((e: BeforeUnloadEvent) => any) | null>(null);
  const isInitializedRef = useRef(false);

  const [questionStates, setQuestionStates] = useState(questions);

  // Add toast function
  const addToast = (type: Toast['type'], message: string, duration: number = 5000, actions?: Toast['actions']) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, message, duration, actions };
    setToasts(prev => [...prev, newToast]);
    
    // Only auto-remove if no actions are provided
    if (!actions) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  };

  // Remove toast function
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Lock navigation and prevent leaving exam page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Allow submission if user is intentionally submitting exam
      if (isSubmittingExam) {
        return undefined;
      }
      
      const currentRefreshCount = parseInt(sessionStorage.getItem('examRefreshCount') || '0');
      
      if (currentRefreshCount === 0) {
        // First refresh - show warning
        e.preventDefault();
        e.returnValue = 'Do not refresh!! Your exam will be submitted on the refresh.';
        return e.returnValue;
      } else if (currentRefreshCount === 1) {
        // Second refresh - submit exam
        sessionStorage.setItem('examRefreshCount', '2');
        // The exam will be submitted when the page reloads
      } else {
        // Any other attempt to leave the page - prevent browser popup completely
        // Don't set returnValue to prevent browser popup
        e.preventDefault();
        return undefined;
      }
    };
    
    // Store reference to the handler
    beforeUnloadHandlerRef.current = handleBeforeUnload;



    // Prevent navigation using browser back/forward buttons
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      // Push the current state back to prevent navigation
      window.history.pushState(null, '', window.location.href);
      
      // Show custom navigation warning modal only if not already showing
      if (!isShowingNavigationWarning) {
        setIsShowingNavigationWarning(true);
        setIsLeavingPage(true);
      }
    };

    // Prevent context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      addToast('warning', 'Right-click is disabled during the exam. Please use the exam controls.', 2000);
    };

    // Prevent keyboard shortcuts for navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F5, Ctrl+R, Ctrl+Shift+R, Ctrl+U, F12, Ctrl+Shift+I
      if (
        e.key === 'F5' ||
        (e.ctrlKey && e.key === 'r') ||
        (e.ctrlKey && e.shiftKey && e.key === 'R') ||
        (e.ctrlKey && e.key === 'u') ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
        addToast('warning', 'This action is not allowed during the exam. Your exam will be submitted if you continue.', 3000);
      }
    };

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    // Prevent visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCountRef.current += 1;
        const newCount = tabSwitchCountRef.current;
        setTabSwitchCount(newCount);
        
        if (newCount >= 3) {
          // Submit exam after 3 tab switches
          addToast('error', 'Exam submitted due to excessive tab switching. Redirecting...', 3000);
          setTimeout(() => {
            handleSubmitExam();
          }, 2000);
        } else {
          const remainingSwitches = 3 - newCount;
          addToast('warning', `Tab switching detected! ${remainingSwitches} more switches will submit your exam.`, 4000);
        }
      }
    };



    // Only run refresh detection logic once per component mount
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      
      // Set initial refresh count if not set
      if (!sessionStorage.getItem('examRefreshCount')) {
        sessionStorage.setItem('examRefreshCount', '0');
      }

      // Check if this is a refresh by looking for a flag we set
      const isRefresh = sessionStorage.getItem('examPageLoaded');
      if (isRefresh) {
        // This is a refresh - increment refresh count
        const currentRefreshCount = parseInt(sessionStorage.getItem('examRefreshCount') || '0');
        const newRefreshCount = currentRefreshCount + 1;
        sessionStorage.setItem('examRefreshCount', newRefreshCount.toString());
        
        if (currentRefreshCount === 0) {
          // First refresh
          addToast('warning', 'Warning: Your exam will be automatically submitted on the next refresh!', 8000);
          setRefreshCount(1);
        } else if (currentRefreshCount === 1) {
          // Second refresh - show warning and store flag to submit on next load
          addToast('warning', 'Final warning: Your exam will be submitted on the next refresh!', 5000);
          sessionStorage.setItem('submitOnLoad', 'true');
        }
      } else {
        // This is the initial load - set the flag for future refresh detection
        sessionStorage.setItem('examPageLoaded', 'true');
      }
    }

    // Push initial state to prevent back navigation
    window.history.pushState(null, '', window.location.href);

    // Add all event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (beforeUnloadHandlerRef.current) {
        window.removeEventListener('beforeunload', beforeUnloadHandlerRef.current);
      }
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Cleanup session storage when component unmounts
  useEffect(() => {
    return () => {
      // Only clear if user navigates away (not on refresh)
      if (!sessionStorage.getItem('examPageLoaded')) {
        sessionStorage.removeItem('examRefreshCount');
        sessionStorage.removeItem('examPageLoaded');
      }
      // Reset initialization flag
      isInitializedRef.current = false;
    };
  }, []);

  // Fetch student data from session storage and questions from API
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch student data from session storage
        const sessionData = sessionStorage.getItem('studentSession');
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          setstudentData({
            studentId: parsedData.studentId || '',
            name: parsedData.name || ''
          });
        }

        // Fetch questions from API
        const response = await fetch('https://exam-portal-7hg7.onrender.com/api/questions');
        const data = await response.json();
        
        if (data.success) {
          // Transform the data to match our Question interface
          const transformedQuestions = data.data.map((q: any, index: number) => ({
            id: index + 1,
            text: q.question,
            options: [
              { id: 'A', text: q.choiceA, description: '' },
              { id: 'B', text: q.choiceB, description: '' },
              { id: 'C', text: q.choiceC, description: '' },
              { id: 'D', text: q.choiceD, description: '' }
            ],
            answered: false,
            flagged: false
          }));
          
          setQuestions(transformedQuestions);
          setQuestionStates(transformedQuestions);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          // Time's up - auto submit exam
          addToast('warning', 'Time is up! Submitting exam automatically...', 2000);
          setTimeout(() => {
            addToast('error', 'Exam submitted due to time expiration. Redirecting...', 3000);
            setTimeout(() => {
              handleSubmitExam();
            }, 2000);
          }, 2000);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setQuestionStates(prev => 
      prev.map(q => 
        q.id === currentQuestion 
          ? { ...q, answered: true, selectedAnswer: answerId }
          : q
      )
    );
  };

  const handleFlagToggle = () => {
    setQuestionStates(prev => 
      prev.map(q => 
        q.id === currentQuestion 
          ? { ...q, flagged: !q.flagged }
          : q
      )
    );
  };

  const navigateToQuestion = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
    const question = questionStates.find(q => q.id === questionNumber);
    setSelectedAnswer(question?.selectedAnswer || '');
  };

  const handleQuestionClick = (questionNumber: number) => {
    const question = questionStates.find(q => q.id === questionNumber);
    
    // Only allow navigation to answered questions
    if (!question?.answered) {
      addToast('warning', 'You can only navigate to questions that have been answered.', 3000);
      return;
    }
    
    navigateToQuestion(questionNumber);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      navigateToQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    // Check if current question is answered
    const currentQuestionData = questionStates.find(q => q.id === currentQuestion);
    if (!currentQuestionData?.answered) {
      addToast('warning', 'Please answer the current question before proceeding to the next one.', 3000);
      return;
    }
    
    if (currentQuestion < 20) {
      navigateToQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitExam = async () => {
    // Remove beforeunload event listener to prevent browser popup
    if (beforeUnloadHandlerRef.current) {
      window.removeEventListener('beforeunload', beforeUnloadHandlerRef.current);
    }
    
    try {
      // Prepare answers object
      const answers = {};
      questionStates.forEach(question => {
        if (question.selectedAnswer) {
          answers[question.id] = question.selectedAnswer;
        }
      });

      // Get student data from session
      const sessionData = sessionStorage.getItem('studentSession');
      if (!sessionData) {
        // Redirect to login if session not found
        navigate('/login', { replace: true });
        return;
      }

      const studentSession = JSON.parse(sessionData);

      // Submit exam results
      const response = await fetch('https://exam-portal-7hg7.onrender.com/api/results/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentSession.studentId,
          studentName: studentSession.name,
          phoneNumber: studentSession.phoneNumber,
          dateOfBirth: studentSession.dateOfBirth,
          answers: answers
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store results in session for display
        sessionStorage.setItem('examResults', JSON.stringify(data.data));
        
        // Clear student session to prevent re-access to exam
        sessionStorage.removeItem('studentSession');
        
        // Navigate to submitted page (client-side)
        navigate('/submitted', { replace: true });
      } else {
        // Clear student session even on error
        sessionStorage.removeItem('studentSession');
        // Redirect to submitted page even if there's an error
        navigate('/submitted', { replace: true });
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      // Clear student session even on error
      sessionStorage.removeItem('studentSession');
      // Redirect to submitted page even if there's an error
      navigate('/submitted', { replace: true });
    }
  };

  // Handle submission on load after second refresh
  useEffect(() => {
    const submitOnLoad = sessionStorage.getItem('submitOnLoad');
    if (submitOnLoad === 'true') {
      addToast('warning', 'Submitting exam due to page refresh...', 2000);
      sessionStorage.removeItem('submitOnLoad');
      setTimeout(() => {
        addToast('error', 'Exam submitted due to page refresh. Redirecting...', 3000);
        setTimeout(() => {
          handleSubmitExam();
        }, 2000);
      }, 2000);
    }
  }, []);

  const getQuestionStatus = (question: Question) => {
    if (question.flagged) return 'flagged';
    if (question.answered) return 'answered';
    return 'unanswered';
  };

  const getQuestionButtonClass = (question: Question, isCurrent: boolean) => {
    const baseClass = "font-medium rounded border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg";
    
    if (isCurrent) {
      return `${baseClass} bg-gray-800 text-white border-gray-800 hover:scale-110 hover:shadow-lg`;
    }
    
    const status = getQuestionStatus(question);
    switch (status) {
      case 'answered':
        return `${baseClass} bg-green-600 text-white border-green-600 hover:scale-110 hover:shadow-lg`;
      case 'flagged':
        return `${baseClass} bg-orange-500 text-white border-orange-500 hover:scale-110 hover:shadow-lg`;
      default:
        return `${baseClass} bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-110 hover:shadow-lg`;
    }
  };

  // Calculator functions
  const handleCalculatorInput = (value: string) => {
    if (calculatorDisplay === '0' && value !== '.') {
      setCalculatorDisplay(value);
    } else {
      setCalculatorDisplay(calculatorDisplay + value);
    }
  };

  const handleCalculatorOperation = (operation: string) => {
    const currentValue = parseFloat(calculatorDisplay);
    setCalculatorHistory([...calculatorHistory, `${calculatorDisplay} ${operation}`]);
    setCalculatorDisplay('0');
    setCalculatorMemory(currentValue);
  };

  const handleCalculatorEquals = () => {
    const currentValue = parseFloat(calculatorDisplay);
    const history = [...calculatorHistory, calculatorDisplay];
    setCalculatorHistory(history);
    
    // Simple calculation (you can expand this for more complex operations)
    const result = currentValue; // Placeholder for actual calculation
    setCalculatorDisplay(result.toString());
  };

  const handleCalculatorClear = () => {
    setCalculatorDisplay('0');
    setCalculatorMemory(0);
    setCalculatorHistory([]);
  };

  const handleCalculatorScientific = (operation: string) => {
    const currentValue = parseFloat(calculatorDisplay);
    let result = 0;
    
    switch (operation) {
      case 'sin':
        result = Math.sin(currentValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(currentValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(currentValue * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(currentValue);
        break;
      case 'ln':
        result = Math.log(currentValue);
        break;
      case 'sqrt':
        result = Math.sqrt(currentValue);
        break;
      case 'square':
        result = currentValue * currentValue;
        break;
      case 'factorial':
        result = Array.from({length: currentValue}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
        break;
      default:
        result = currentValue;
    }
    
    setCalculatorDisplay(result.toString());
    setCalculatorHistory([...calculatorHistory, `${operation}(${currentValue}) = ${result}`]);
  };

  const currentQuestionData = questionStates.find(q => q.id === currentQuestion);
  const answeredCount = questionStates.filter(q => q.answered).length;
  const flaggedCount = questionStates.filter(q => q.flagged).length;
  const unansweredCount = questionStates.filter(q => !q.answered).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#F5F7FF'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F5F7FF'}}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{backgroundColor: '#1D4ED8'}}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 sm:py-0 sm:h-16 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="/SRB-Marine-1001.png" alt="SRB Marine Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-base sm:text-xl font-semibold text-white">Nursing Exam Portal</span>
              <div className="flex items-center space-x-1 ml-2 px-2 py-1 bg-blue-600 rounded-full">
                <Lock className="h-3 w-3 text-white" />
                <span className="text-xs text-white font-medium">LOCKED</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
              <span className="text-white">Candidate ID: {studentData.studentId}</span>
              <span className="text-white">Candidate Name: {studentData.name}</span>
              {tabSwitchCount > 0 && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-red-600 rounded-full">
                  <span className="text-xs text-white font-medium">TAB SWITCHES: {tabSwitchCount}/3</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Question Header */}
              <div className="border-b px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <div>
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900">NCLEX-RN Practice Examination</h1>
                    <p className="text-xs sm:text-sm text-gray-600 text-left">Date: {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl sm:text-2xl font-bold ${timeRemaining <= 300 ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-xs text-gray-500">Time Remaining</div>
                    {timeRemaining <= 300 && (
                      <div className="text-xs text-red-600 font-medium mt-1">⚠️ Time is running out!</div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                  <div>
                    <span className="font-medium">Total Questions: 20</span>
                    <span className="ml-2 sm:ml-4">Max Marks: 20</span>
                  </div>
                  <div>
                    <span className="font-medium">Instructions: </span>
                    <span>Select the best answer for each nursing scenario</span>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center space-x-2 text-xs text-yellow-800">
                    <Lock className="h-3 w-3" />
                    <span className="font-medium">Navigation Locked:</span>
                    <span>Browser navigation, refresh, and keyboard shortcuts are disabled during the exam.</span>
                  </div>
                </div>
              </div>

              {/* Question Navigation */}
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Question {currentQuestion} of 20</span>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 1}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentQuestion === 20 || !currentQuestionData?.answered}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="mt-3 sm:mt-4">
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {questionStates.slice(0, 10).map((question) => (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionClick(question.id)}
                        className={`${getQuestionButtonClass(question, question.id === currentQuestion)} w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm`}
                      >
                        {question.id}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-2">
                    {questionStates.slice(10, 20).map((question) => (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionClick(question.id)}
                        className={`${getQuestionButtonClass(question, question.id === currentQuestion)} w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm`}
                      >
                        {question.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-3 md:gap-6 mt-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-800 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                    <span>Unanswered</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>Flagged</span>
                  </div>
                </div>
              </div>

                              {/* Question Content */}
                <div className="p-3 sm:p-6">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <h2 className="text-base sm:text-lg font-medium text-gray-900">
                        Question {currentQuestion} <span className="text-xs sm:text-sm font-normal text-gray-500">(1 mark)</span>
                      </h2>
                    </div>
                    <p className="text-gray-800 mb-4 sm:mb-6 text-left text-sm sm:text-base">{currentQuestionData?.text}</p>

                  {/* Answer Options */}
                  <div className="space-y-2 sm:space-y-3">
                    {currentQuestionData?.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option.id}
                          checked={selectedAnswer === option.id}
                          onChange={() => handleAnswerSelect(option.id)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-left text-sm sm:text-base">{option.id}. {option.text}</div>
                          <div className="text-xs sm:text-sm text-gray-600 mt-1 text-left">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 sm:pt-6 border-t space-y-3 sm:space-y-0">
                  <button
                    onClick={handleFlagToggle}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded font-medium transition-colors text-sm sm:text-base ${
                      currentQuestionData?.flagged
                        ? 'bg-orange-100 text-orange-700 border border-orange-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{currentQuestionData?.flagged ? 'Unflag' : 'Flag for Review'}</span>
                  </button>

                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 1}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      Previous
                    </button>
                    {currentQuestion === 20 ? (
                      <button
                        onClick={handleSubmitExam}
                        className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 text-sm sm:text-base"
                      >
                        Submit Exam
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={!currentQuestionData?.answered}
                        className={`px-3 sm:px-4 py-2 rounded font-medium text-sm sm:text-base ${
                          currentQuestionData?.answered
                            ? 'bg-gray-800 text-white hover:bg-gray-900'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-6">
            {/* Review and Submit */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="space-y-2 sm:space-y-3">
                <button 
                  onClick={() => setShowReview(true)}
                  className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Review All</span>
                </button>
                <button 
                  onClick={() => setShowCalculator(true)}
                  className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                >
                  <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Calculator</span>
                </button>
                <button 
                  onClick={handleSubmitExam}
                  className="w-full px-3 sm:px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-900 text-sm sm:text-base"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 sm:mt-8">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm space-y-1 sm:space-y-0">
              <span className="font-medium">Progress: {answeredCount}/20 answered</span>
              <span className="text-blue-600">You can navigate to answered questions using the number buttons above</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(answeredCount / 20) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:w-96 max-h-[90vh] overflow-hidden">
            {/* Calculator Header */}
            <div className="text-white p-4 flex justify-between items-center" style={{backgroundColor: '#1D4ED8'}}>
              <h3 className="text-lg font-semibold">Calculator</h3>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Calculator Display */}
            <div className="p-3 sm:p-4 bg-gray-100">
              <div className="bg-white p-2 sm:p-3 rounded border text-right text-lg sm:text-2xl font-mono min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-end">
                {calculatorDisplay}
              </div>
              {/* History */}
              {calculatorHistory.length > 0 && (
                <div className="mt-2 text-xs text-gray-600 max-h-16 sm:max-h-20 overflow-y-auto">
                  {calculatorHistory.slice(-3).map((item, index) => (
                    <div key={index} className="text-right">{item}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculator Buttons */}
            <div className="p-3 sm:p-4 grid grid-cols-5 gap-1 sm:gap-2">
              {/* Scientific Functions */}
              <button onClick={() => handleCalculatorScientific('sin')} className="p-1.5 sm:p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs sm:text-sm">sin</button>
              <button onClick={() => handleCalculatorScientific('cos')} className="p-1.5 sm:p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs sm:text-sm">cos</button>
              <button onClick={() => handleCalculatorScientific('tan')} className="p-1.5 sm:p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs sm:text-sm">tan</button>
              <button onClick={() => handleCalculatorScientific('log')} className="p-1.5 sm:p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs sm:text-sm">log</button>
              <button onClick={() => handleCalculatorScientific('ln')} className="p-1.5 sm:p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs sm:text-sm">ln</button>
              
              <button onClick={() => handleCalculatorScientific('sqrt')} className="p-1.5 sm:p-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-xs sm:text-sm">√</button>
              <button onClick={() => handleCalculatorScientific('square')} className="p-1.5 sm:p-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-xs sm:text-sm">x²</button>
              <button onClick={() => handleCalculatorScientific('factorial')} className="p-1.5 sm:p-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-xs sm:text-sm">n!</button>
              <button onClick={() => handleCalculatorOperation('+')} className="p-1.5 sm:p-2 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 text-xs sm:text-sm">+</button>
              <button onClick={() => handleCalculatorOperation('-')} className="p-1.5 sm:p-2 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 text-xs sm:text-sm">-</button>

              {/* Numbers and Basic Operations */}
              <button onClick={() => handleCalculatorInput('7')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">7</button>
              <button onClick={() => handleCalculatorInput('8')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">8</button>
              <button onClick={() => handleCalculatorInput('9')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">9</button>
              <button onClick={() => handleCalculatorOperation('*')} className="p-1.5 sm:p-2 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 text-xs sm:text-sm">×</button>
              <button onClick={() => handleCalculatorOperation('/')} className="p-1.5 sm:p-2 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 text-xs sm:text-sm">÷</button>

              <button onClick={() => handleCalculatorInput('4')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">4</button>
              <button onClick={() => handleCalculatorInput('5')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">5</button>
              <button onClick={() => handleCalculatorInput('6')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">6</button>
              <button onClick={() => handleCalculatorInput('.')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">.</button>
              <button onClick={() => handleCalculatorEquals()} className="p-1.5 sm:p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm">=</button>

              <button onClick={() => handleCalculatorInput('1')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">1</button>
              <button onClick={() => handleCalculatorInput('2')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">2</button>
              <button onClick={() => handleCalculatorInput('3')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm sm:text-base">3</button>
              <button onClick={() => handleCalculatorInput('0')} className="p-2 sm:p-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 col-span-2 text-sm sm:text-base">0</button>
              <button onClick={() => handleCalculatorClear()} className="p-1.5 sm:p-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm">C</button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Review Modal */}
      {showReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Review Header */}
            <div className="text-white p-4 flex justify-between items-center" style={{backgroundColor: '#1D4ED8'}}>
              <h3 className="text-lg font-semibold">Exam Review</h3>
              <button
                onClick={() => setShowReview(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Review Content */}
            <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-green-600">{answeredCount}</div>
                  <div className="text-xs sm:text-sm text-green-700">Answered</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-orange-600">{flaggedCount}</div>
                  <div className="text-xs sm:text-sm text-orange-700">Flagged</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-gray-600">{unansweredCount}</div>
                  <div className="text-xs sm:text-sm text-gray-700">Unanswered</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">{Math.round((answeredCount / 20) * 100)}%</div>
                  <div className="text-xs sm:text-sm text-blue-700">Progress</div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Question Overview</h4>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
                  {questionStates.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => {
                        navigateToQuestion(question.id);
                        setShowReview(false);
                      }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm font-medium rounded border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg flex items-center justify-center ${
                        question.id === currentQuestion
                          ? 'bg-gray-800 text-white border-gray-800'
                          : question.flagged
                          ? 'bg-orange-500 text-white border-orange-500'
                          : question.answered
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {question.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Details */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Question Details</h4>
                <div className="space-y-2 sm:space-y-3">
                  {questionStates.map((question) => (
                    <div
                      key={question.id}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                        question.id === currentQuestion
                          ? 'border-gray-800 bg-gray-50'
                          : question.flagged
                          ? 'border-orange-500 bg-orange-50'
                          : question.answered
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-300 bg-white'
                      }`}
                      onClick={() => {
                        navigateToQuestion(question.id);
                        setShowReview(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            question.id === currentQuestion
                              ? 'bg-gray-800 text-white'
                              : question.flagged
                              ? 'bg-orange-500 text-white'
                              : question.answered
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-300 text-gray-700'
                          }`}>
                            Q{question.id}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600">
                            {question.flagged ? 'Flagged' : question.answered ? 'Answered' : 'Not answered'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {question.flagged ? (
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                          ) : question.answered ? (
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full"></div>
                          ) : (
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Footer */}
            <div className="border-t p-3 sm:p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div className="text-xs sm:text-sm text-gray-600">
                  Click on any question to navigate directly to it
                </div>
                <button
                  onClick={() => setShowReview(false)}
                  className="px-3 sm:px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-900 text-sm sm:text-base"
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right duration-300 ${
            toast.type === 'warning' 
              ? 'bg-yellow-500 text-white border-l-4 border-yellow-600' 
              : toast.type === 'error' 
              ? 'bg-red-500 text-white border-l-4 border-red-600' 
              : 'bg-green-500 text-white border-l-4 border-green-600'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Action Buttons */}
          {toast.actions && (
            <div className="flex space-x-2 mt-3">
              {toast.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    action.variant === 'danger'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : action.variant === 'primary'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
              ))}

        {/* Navigation Warning Modal */}
        {isLeavingPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Navigation Warning</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Navigating may lead to exam submission!! Are you sure you want to leave this page?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsLeavingPage(false);
                    setIsShowingNavigationWarning(false);
                    addToast('success', 'Navigation cancelled. Continue with your exam.', 3000);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsLeavingPage(false);
                    setIsShowingNavigationWarning(false);
                    addToast('warning', 'Submitting exam due to navigation...', 2000);
                    setTimeout(() => {
                      handleSubmitExam();
                    }, 2000);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default ExamPage;