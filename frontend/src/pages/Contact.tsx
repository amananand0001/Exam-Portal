import React, { useState } from 'react';
import HeroLine from '../components/HeroLine';
import Footer from '../components/HomePage/HomeFooter';
import ScrollToTop from '../components/ScrollToTop';
import { useSidebar } from '../context/SidebarContext';

const Contact: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.'
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-left">

      {/* Hero Section */}
      <section className="text-white py-0 pb-20 md:pb-40 relative overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-start -mt-20 pt-10 z-10" style={{ backgroundColor: '#1D4ED8' }}>
        <HeroLine className="absolute left-0 right-0 top-0 w-full h-[300px] -mt-20 z-0" />
        <div className="max-w-6xl mx-auto px-10 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-20 md:mt-32">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 text-left">Contact Us</h1>
          </div>
          <div className="flex items-center space-x-3 text-xs md:text-sm opacity-80 mt-4 md:mt-0">
            <img src="/home.png" alt="Home" className="w-4 h-3 md:w-5 md:h-4 inline-block mr-1" />
            <span>HOME</span>
            <span>{'>'}</span>
            <span>CONTACT</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div className="animate-slideInLeft">
              <div className="mb-8">
                <h6 className="text-red-500 text-xs font-bold tracking-wider mb-3 uppercase">CONTACT Nursing Exam Portal</h6>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">Get In Touch With Our Nursing Experts</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
                  Have questions about nursing careers, NCLEX preparation, or our specialized education programs? Our dedicated team at Nursing Exam Portal is ready to assist you. Reach out today to begin your journey towards a successful nursing career in healthcare. Your nursing excellence starts with a conversation!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="transform hover:translate-x-2 transition-transform duration-300">
                <h6 className="text-blue-600 text-xs font-bold tracking-wider mb-2 uppercase">HEAD OFFICE</h6>
                  <p className="text-gray-800 font-semibold text-base md:text-lg">Exam Portal Headquarters, Marine Drive, Mumbai, India</p>
                </div>

                <div className="transform hover:translate-x-2 transition-transform duration-300">
                <h6 className="text-blue-600 text-xs font-bold tracking-wider mb-2 uppercase">PHONE SUPPORT</h6>
                  <p className="text-gray-800 font-semibold text-base md:text-lg">+91-98765 43210 (Mon-Sat, 9 AM - 6 PM IST)</p>
                </div>

                <div className="transform hover:translate-x-2 transition-transform duration-300">
                <h6 className="text-blue-600 text-xs font-bold tracking-wider mb-2 uppercase">EMAIL ASSISTANCE</h6>
                  <p className="text-gray-800 font-semibold text-base md:text-lg">info@srbmarine.com</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h6 className="text-blue-600 text-xs font-bold tracking-wider mb-4 uppercase">FOLLOW US</h6>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125">📘</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125">🐦</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125">📷</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125">📺</a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-300 rounded-lg h-64 w-full animate-fadeIn animation-delay-1000"></div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="animate-slideInRight">
              {/* Map Placeholder */}
              <div className="bg-gray-300 rounded-lg h-64 w-full mb-8 animate-fadeIn"></div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Send Us Message</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-6">
                Ready to embark on a new career? 
                Fill out the form below, and our team will get back to you promptly to discuss your aspirations and how Exam Portal can help you achieve them.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="transform focus-within:scale-105 transition-transform duration-300">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="transform focus-within:scale-105 transition-transform duration-300">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="transform focus-within:scale-105 transition-transform duration-300">
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Status Message */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop isSidebarOpen={isSidebarOpen} />

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Contact;
