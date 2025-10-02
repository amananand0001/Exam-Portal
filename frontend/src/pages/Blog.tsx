import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-teal-200 flex items-center justify-center">
              <span className="text-4xl">📰</span>
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Maritime Industry • 2 days ago</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Latest Trends in Marine Technology</h3>
              <p className="text-gray-600 mb-4">
                Exploring the cutting-edge technologies that are revolutionizing the maritime industry and improving vessel efficiency.
              </p>
              <button className="text-teal-600 hover:text-teal-800 font-medium">Read More →</button>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-teal-200 flex items-center justify-center">
              <span className="text-4xl">🌊</span>
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Sustainability • 1 week ago</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Shipping Practices</h3>
              <p className="text-gray-600 mb-4">
                How the maritime industry is adopting eco-friendly practices to reduce environmental impact and meet global standards.
              </p>
              <button className="text-teal-600 hover:text-teal-800 font-medium">Read More →</button>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-teal-200 flex items-center justify-center">
              <span className="text-4xl">⚓</span>
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Operations • 2 weeks ago</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Port Operations Optimization</h3>
              <p className="text-gray-600 mb-4">
                Strategies for improving port efficiency and reducing turnaround times in modern maritime operations.
              </p>
              <button className="text-teal-600 hover:text-teal-800 font-medium">Read More →</button>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-teal-200 flex items-center justify-center">
              <span className="text-4xl">🎓</span>
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Education • 3 weeks ago</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maritime Education Evolution</h3>
              <p className="text-gray-600 mb-4">
                How maritime education is adapting to meet the changing needs of the industry and prepare future professionals.
              </p>
              <button className="text-teal-600 hover:text-teal-800 font-medium">Read More →</button>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-teal-200 flex items-center justify-center">
              <span className="text-4xl">🔧</span>
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Technology • 1 month ago</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI in Maritime Operations</h3>
              <p className="text-gray-600 mb-4">
                The role of artificial intelligence in transforming maritime operations and improving decision-making processes.
              </p>
              <button className="text-teal-600 hover:text-teal-800 font-medium">Read More →</button>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-teal-200 flex items-center justify-center">
              <span className="text-4xl">🚢</span>
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Industry News • 1 month ago</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Shipping Market Update</h3>
              <p className="text-gray-600 mb-4">
                Current trends and developments in the global shipping market and their impact on maritime businesses.
              </p>
              <button className="text-teal-600 hover:text-teal-800 font-medium">Read More →</button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog; 