import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
} from 'lucide-react';
import Footer from '../components/HomePage/HomeFooter';
import HeroLine from '../components/HeroLine';
import ScrollToTop from '../components/ScrollToTop';
import { useSidebar } from '../context/SidebarContext';

const Academics: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApplyNow = () => {
    console.log('Apply Now clicked');
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked');
  };

  const handleViewMore = () => {
    console.log('View More clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-left">
      
      {/* Hero Section */}
      <section className="text-white py-0 pb-20 md:pb-40 relative overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-start -mt-20 pt-10 z-10" style={{ backgroundColor: '#1D4ED8' }}>
        <HeroLine className="absolute left-0 right-0 top-0 w-full h-[300px] -mt-20 z-0" />
        <div className="max-w-6xl mx-auto px-5 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-20 md:mt-32">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 text-left">Academics</h1>
          </div>
          <div className="flex items-center space-x-3 text-xs md:text-sm opacity-80 mt-4 md:mt-0">
            <img src="/home.png" alt="Home" className="w-4 h-3 md:w-5 md:h-4 inline-block mr-1" />
            <span>HOME</span>
            <span>{'>'}</span>
            <span>ACADEMICS</span>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              <div className="text-xs md:text-sm text-red-600 font-semibold mb-4 tracking-wider">ADMISSION</div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Academics</h2>
              <h3 className="text-lg md:text-2xl font-semibold text-blue-600 mb-4">
                Ready to apply? It's easy to do!<br />
                And currently, there's no<br />
                undergraduate application fee.
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                Sem facilisis purus mollis elit enim sagittis, eleifend. Vulputate hac ridiculus placerat 
                elementum arcu dui ut orci. Id ac eros libero suscipit nibh quam lorem. Vel orci, 
                donec feugiat rutrum tristique enim imperdiet vitae velit. Sem facilisis purus mollis elit 
                enim sagittis, eleifend. Vulputate hac ridiculus placerat elementum arcu dui
              </p>
              <button 
                onClick={handleApplyNow}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                APPLY NOW
              </button>
            </div>
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
              <div className="bg-gray-300 aspect-square rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* College Education Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              <div className="text-xs md:text-sm text-red-600 font-semibold mb-4 tracking-wider">VALUE</div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">A College Education</h2>
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                Sem facilisis purus mollis elit enim sagittis, eleifend. Vulputate hac ridiculus placerat 
                elementum arcu dui ut orci. Id ac eros libero suscipit nibh quam lorem. Vel orci, donec 
                feugiat rutrum tristique enim imperdiet vitae elit. Sem facilisis purus mollis elit enim sagittis, 
                eleifend. Vulputate hac ridiculus placerat elementum arcu dui
              </p>
            </div>
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">TOP 2%</div>
                  <div className="text-sm">AMONG BEST UNIVERSITIES IN WORLD NEXT</div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">90%</div>
                  <div className="text-sm">OF studentS RECEIVE SOME FORM OF FINANCIAL AID</div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm">OF studentS GRADUATE IN FOUR YEARS</div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm">PLACEMENT RATE AFTER GRADUATION SINCE 2019</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA Section */}
      <section className="py-16 bg-slate-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Is the most important investment<br />
              you'll ever make in yourself
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-8 leading-relaxed">
              Sem facilisis purus mollis elit enim sagittis, eleifend. Vulputate hac ridiculus
            </p>
            <button 
              onClick={handleLearnMore}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Campus Life content */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              <div className="text-xs md:text-sm text-red-600 font-semibold mb-4 tracking-wider">CAMPUS</div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Campus Life</h2>
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <button 
                onClick={handleViewMore}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
              >
                VIEW MORE
              </button>
              {/* Large image placeholder at bottom */}
              <div className="bg-gray-300 h-80 rounded-lg mt-8"></div>
            </div>
            
                         {/* Right side - Three identical Clubs & Organizations cards */}
             <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
               <div className="space-y-6">
                 {[1, 2, 3].map((item) => (
                   <div key={item} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                     <div className="flex">
                       {/* Left side - Image placeholder */}
                       <div className="w-1/2 bg-gray-300 aspect-square"></div>
                       {/* Right side - Content */}
                       <div className="w-1/2 p-6 flex flex-col justify-between">
                         <div>
                           <h4 className="font-semibold text-gray-900 mb-3">Clubs & Organizations</h4>
                           <p className="text-sm text-gray-600">
                             Sem facilisis purus mollis elit enim sagittis eleifend volutpat hac ridiculus placerat elementum.
                           </p>
                         </div>
                         <div className="flex justify-end mt-4">
                           <div className="bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                             <ArrowRight className="h-4 w-4" />
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Academics;