import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage'
import Academics from './pages/Academics'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ExamInstructionsPage from './pages/ExamInst';
import ExamPage from './pages/ExamPage';
import Submitted from './pages/Submitted';
import { SidebarProvider } from './context/SidebarContext';

// Protected Route Component
const ProtectedRoute = ({ children, requiredSession, redirectTo = '/signup' }) => {
  const hasSession = sessionStorage.getItem(requiredSession);
  
  if (!hasSession) {
    // Redirect to home page if no valid session
    return <Navigate to={redirectTo} replace />; 
  }
  
  return children;
};

// Exam Route Guard - Prevents access to exam after submission
const ExamRouteGuard = ({ children }) => {
  const examResults = sessionStorage.getItem('examResults');
  
  if (examResults) {
    // Exam has been submitted, redirect to results page
    return <Navigate to="/submitted" replace />;
  }
  
  return children;
};

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/exam-instructions' || location.pathname === '/exam' || location.pathname === '/submitted';
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/exam-instructions" element={
          <ProtectedRoute requiredSession="studentSession">
            <ExamRouteGuard>
              <ExamInstructionsPage />
            </ExamRouteGuard>
          </ProtectedRoute>
        } />
        <Route path="/exam" element={
          <ProtectedRoute requiredSession="studentSession">
            <ExamRouteGuard>
              <ExamPage />
            </ExamRouteGuard>
          </ProtectedRoute>
        } />
        <Route path="/submitted" element={
          <ProtectedRoute requiredSession="examResults">
            <Submitted />
          </ProtectedRoute>
        } />
        {/* Catch all unknown routes and redirect to signup */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <SidebarProvider>
      <Router>
        <AppContent />
      </Router>
    </SidebarProvider>
  )
}

export default App
