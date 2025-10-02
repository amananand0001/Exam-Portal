import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, CreditCard, Lock, Key, HelpCircle, Shield, FileText, Unlock, Phone } from 'lucide-react';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [examCode, setExamCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistered) {
      // Navigate to exam instructions page
      navigate('/exam-instructions');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    setIsUnlocking(true);

    try {
      const response = await fetch('https://exam-portal-7hg7.onrender.com/api/students/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dateOfBirth,
          phoneNumber,
          countryCode
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Registration successful! Your Student ID is: ${data.data.studentId}`);
        setStudentId(data.data.studentId);
        setIsRegistered(true);
        
        // Store session data
        const sessionData = {
          studentId: data.data.studentId,
          name: name,
          dateOfBirth: dateOfBirth,
          phoneNumber: phoneNumber,
          countryCode: countryCode
        };
        sessionStorage.setItem('studentSession', JSON.stringify(sessionData));
        
        // Don't reset form fields - keep them visible but disabled
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
      // Reset animation after 2 seconds
      setTimeout(() => {
        setIsUnlocking(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="shadow-sm border-b" style={{backgroundColor: '#1D4ED8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-white"> Exam Portal</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-white hover:text-blue-200 text-sm">Help</a>
              <a href="#" className="text-white hover:text-blue-200 text-sm">Contact</a>
              <button 
                onClick={() => navigate('/')} 
                className="text-white hover:text-blue-200 text-sm bg-transparent border-none cursor-pointer"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">

          {/* Signup Form */}
          <div className="bg-white py-8 px-6 shadow-sm rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Sign-Up</h2>
              <p className="text-gray-600 text-sm">Please enter your credentials to access the exam portal</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading || isRegistered}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    disabled={isLoading || isRegistered}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <div className="relative w-24">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={isLoading || isRegistered}
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+86">+86</option>
                      <option value="+81">+81</option>
                      <option value="+49">+49</option>
                      <option value="+33">+33</option>
                      <option value="+39">+39</option>
                      <option value="+34">+34</option>
                      <option value="+7">+7</option>
                      <option value="+61">+61</option>
                      <option value="+55">+55</option>
                      <option value="+52">+52</option>
                      <option value="+27">+27</option>
                      <option value="+971">+971</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your phone number"
                      required
                      disabled={isLoading || isRegistered}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {isUnlocking ? (
                      <Unlock className="h-5 w-5 text-slate-300 group-hover:text-slate-200 animate-pulse transform scale-110 rotate-12 transition-all duration-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-slate-300 group-hover:text-slate-200 transition-all duration-300" />
                    )}
                  </span>
                  {isLoading ? 'Registering...' : isRegistered ? 'Access Exam' : 'Register Student'}
                </button>
              </div>

              {/* Terms and Policy */}
              <div className="text-center text-xs text-gray-500">
                By registering, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Academic Integrity Policy
                </a>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-blue-600 hover:text-blue-500 font-medium underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              © 2025 Exam Portal. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="flex items-center space-x-1 hover:text-gray-700">
                <HelpCircle className="h-4 w-4" />
                <span>Support</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-gray-700">
                <Shield className="h-4 w-4" />
                <span>Privacy Policy</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-gray-700">
                <FileText className="h-4 w-4" />
                <span>Documentation</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage; 