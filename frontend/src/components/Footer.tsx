import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-teal-800 text-white py-16">
    <div className="max-w-6xl mx-auto px-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-5">Nexaroma</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Empowering maritime dreams with expert training, global placements, and ethical recruitment.
Your trusted partner for Merchant Navy, Cruise Careers & Maritime Education.
          </p>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📧 inquiry@nexaroma.com</p>
            <p>📞 +1 (555) 789-0123</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-5">About Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#departments" className="hover:text-white transition-colors">Departments</a></li>
            <li><a href="#faculties" className="hover:text-white transition-colors">Faculties</a></li>
            <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#event" className="hover:text-white transition-colors">Event</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-5">Useful Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#library" className="hover:text-white transition-colors">Research Library</a></li>
            <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Cookies</a></li>
            <li><a href="#links" className="hover:text-white transition-colors">For links</a></li>
            <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold mb-3">Social Media</h4>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">📘</a>
            <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">🐦</a>
            <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">📷</a>
            <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">💼</a>
          </div>
        </div>
      </div>
      <div className="border-t border-teal-600 pt-5 mt-10 text-center text-sm text-gray-300">
        <p>Copyright © 2019. All rights reserved</p>
      </div>
    </div>
  </footer>
);

export default Footer; 