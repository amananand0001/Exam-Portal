import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg text-gray-700 mb-8">
            Exam Portal provides a comprehensive range of maritime services to support the global shipping industry.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚢</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Vessel Management</h3>
              <p className="text-gray-600">Complete vessel management services including operations, maintenance, and crew management.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚓</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Port Operations</h3>
              <p className="text-gray-600">Efficient port operations and logistics services to optimize your maritime operations.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Technical Support</h3>
              <p className="text-gray-600">Expert technical support and engineering services for marine equipment and systems.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Consulting</h3>
              <p className="text-gray-600">Strategic consulting services for maritime businesses and regulatory compliance.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Training</h3>
              <p className="text-gray-600">Professional training programs for maritime personnel and certification courses.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Marine Solutions</h3>
              <p className="text-gray-600">Innovative marine solutions and technology integration for modern vessels.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 