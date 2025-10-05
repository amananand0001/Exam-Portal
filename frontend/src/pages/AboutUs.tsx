import React, { useEffect, useState, useRef } from 'react';
import Footer from '../components/HomePage/HomeFooter';
import HeroLine from '../components/HeroLine';
import ScrollToTop from '../components/ScrollToTop';
import { useSidebar } from '../context/SidebarContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';


const AboutUs: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  const [topPercent, setTopPercent] = useState(0);
  const [graduation, setGraduation] = useState(0);
  const [degree, setDegree] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [flagAnim, setFlagAnim] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const flagRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation hooks
  const { elementRef: founderRef, isVisible: founderVisible } = useScrollAnimation(0.2);
  const { elementRef: careerRef, isVisible: careerVisible } = useScrollAnimation(0.2);
  const { elementRef: cruiseRef, isVisible: cruiseVisible } = useScrollAnimation(0.2);
  const { elementRef: coursesRef, isVisible: coursesVisible } = useScrollAnimation(0.2);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }
    return () => {
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let topInterval: any, gradInterval: any, degreeInterval: any;
    setTopPercent(0);
    setGraduation(0);
    setDegree(0);
    topInterval = setInterval(() => {
      setTopPercent(prev => {
        if (prev < 2) return prev + 1;
        clearInterval(topInterval);
        return 2;
      });
    }, 300);
    gradInterval = setInterval(() => {
      setGraduation(prev => {
        if (prev < 98) return prev + 2;
        clearInterval(gradInterval);
        return 98;
      });
    }, 15);
    degreeInterval = setInterval(() => {
      setDegree(prev => {
        if (prev < 200) return prev + 5;
        clearInterval(degreeInterval);
        return 200;
      });
    }, 10);
    return () => {
      clearInterval(topInterval);
      clearInterval(gradInterval);
      clearInterval(degreeInterval);
    };
  }, [hasAnimated]);

  useEffect(() => {
    setTimeout(() => setFlagAnim(true), 300);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setFlagAnim(true);
        }
      },
      { threshold: 0.3 }
    );
    if (flagRef.current) {
      observer.observe(flagRef.current);
    }
    return () => {
      if (flagRef.current) observer.unobserve(flagRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Hero Section */}
      <section className="text-white py-0 pb-20 md:pb-40 relative overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-start -mt-20 pt-10 z-10" style={{ backgroundColor: '#1D4ED8' }}>
        <HeroLine className="absolute left-0 right-0 top-0 w-full h-[300px] -mt-20 z-0" />
        <div className="max-w-6xl mx-auto px-5 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-20 md:mt-32">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 text-left">About Us</h1>
          </div>
          <div className="flex items-center space-x-3 text-xs md:text-sm opacity-80 mt-4 md:mt-0">
            <img src="/home.png" alt="Home" className="w-4 h-3 md:w-5 md:h-4 inline-block mr-1" />
            <span>HOME</span>
            <span>{'>'}</span>
            <span>ABOUT</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* About Nexaroma Section */}
        <section style={{ backgroundColor: '#F5F7FF' }} >
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="py-12 text-left">
                <h6 className="text-red-600 text-xs font-bold tracking-wider mb-3">ABOUT</h6>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-800 mb-8 leading-tight text-left">
                  About<br />Nursing Exam Portal
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5 text-justify">
                  At Nursing Exam Portal, we're more than just an exam preparation service – we're a dedicated partner in shaping your nursing career. We empower aspiring registered nurses to unlock rewarding healthcare careers across hospitals, clinics, long-term care facilities, and specialized healthcare settings nationwide. Our comprehensive approach ensures you're supported at every step, from NCLEX preparation to career placement.
                </p>
                
                {!showMore && (
                  <button
                    onClick={() => setShowMore(true)}
                    className="text-global-1 font-semibold text-sm mb-5 hover:text-teal-700 transition-colors duration-300 flex items-center gap-2"
                  >
                    Show More
                    <svg 
                      className="w-4 h-4 transition-transform duration-300"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
                
                {showMore && (
                  <>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5 text-justify animate-fadeIn">
                      Founded on a deep understanding of the healthcare industry, our mission is to bridge nursing education with career success. We provide expert NCLEX preparation, personalized study guidance, and comprehensive career placement assistance, ensuring our Candidates are not just prepared for exams, but for a transformative nursing career journey. We stand by you at every step, navigating challenges so you can chart a clear course to nursing excellence.
                    </p>
                    <button
                      onClick={() => setShowMore(false)}
                      className="text-global-1 font-semibold text-sm mb-20 hover:text-teal-700 transition-colors duration-300 flex items-center gap-2"
                    >
                      Show Less
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 rotate-180"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div ref={flagRef} className="flex gap-4">
                <style>{`
                  @keyframes flagUnroll {
                    0% { transform: scaleY(0.1); box-shadow: 0 -8px 24px 0 rgba(0,0,0,0.15); }
                    40% { transform: scaleY(1.08); box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.10); }
                    60% { transform: scaleY(0.96); box-shadow: 0 -1px 4px 0 rgba(0,0,0,0.08); }
                    80% { transform: scaleY(1.02); box-shadow: 0 -1px 2px 0 rgba(0,0,0,0.04); }
                    100% { transform: scaleY(1); box-shadow: none; }
                  }
                `}</style>
                <div className={`overflow-hidden relative w-full h-[50vh] rounded-b-lg ${flagAnim ? '' : ''}`} style={{
                  transformOrigin: 'top',
                  animation: flagAnim ? 'flagUnroll 1.8s cubic-bezier(.4,2,.6,1) forwards' : undefined,
                  opacity: flagAnim ? 1 : 0
                }}>
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-800 to-blue-950">
                    <img src="/SRB-Marine-1001.png" alt="SRB Marine Logo" className="w-42 h-42 object-contain" />
                  </div>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'16px',background:'linear-gradient(to bottom,rgba(0,0,0,0.12),rgba(0,0,0,0))',opacity:flagAnim?0:1,transition:'opacity 0.5s'}}></div>
                </div>
                <div className={`overflow-hidden relative w-full h-[60vh] rounded-b-lg ${flagAnim ? '' : ''}`} style={{
                  transformOrigin: 'top',
                  animation: flagAnim ? 'flagUnroll 1.8s cubic-bezier(.4,2,.6,1) 0.3s forwards' : undefined,
                  opacity: flagAnim ? 1 : 0
                }}>
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" alt="Random 2" className="object-cover w-full h-full" />
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'16px',background:'linear-gradient(to bottom,rgba(0,0,0,0.12),rgba(0,0,0,0))',opacity:flagAnim?0:1,transition:'opacity 0.5s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-red-500 hover:-translate-y-3 hover:shadow-2xl transition-transform transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Proven NCLEX Success</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-5">
With hundreds of successful NCLEX pass rates nationwide, our track record speaks for itself. We've helped countless nursing Candidates achieve their licensing goals.                </p>
                
              </div>
              
              <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-blue-500 hover:-translate-y-3 hover:shadow-2xl transition-transform transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Personalized Study Plans</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-5">
From customized study schedules to comprehensive NCLEX preparation strategies, we provide tailored support for your unique learning needs.                </p>
                
              </div>
              
              <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-blue-600 hover:-translate-y-3 hover:shadow-2xl transition-transform transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Healthcare Network & Trust</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
Our extensive network includes top healthcare facilities across the nation. We prioritize transparency, ensuring your success and career advancement come first.                </p>
                
              </div>
            </div>
          </div>
        </section>

        {/* Value & Outcomes Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="bg-gray-300 rounded-lg h-96 w-full"></div>
              </div>
              <div>
                <h6 className="text-red-600 text-xs font-bold tracking-wider mb-3">OUR COMMITMENT</h6>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-800 mb-8 leading-tight">Our Mission & Distinct Advantage</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-5 text-justify">
                To empower every nursing Candidate with the knowledge, confidence, and support needed to build successful healthcare careers. We meticulously bridge education and opportunity through our expert NCLEX preparation programs, trusted career guidance, and unwavering lifelong support. Your nursing success is the compass that guides our every endeavor.
                </p>
                <div ref={cardsRef} className="grid grid-cols-3 gap-2 md:gap-5 mb-6 ml-[0vw] md:ml-[-10vw]">
                  <div className="bg-blue-600 text-white p-3 md:p-5 text-center rounded-lg">
                    <div className="text-xl md:text-3xl font-bold mb-1">TOP {topPercent}%</div>
                    <div className="text-xs font-bold tracking-wide">NCLEX PASS RATE</div>
                  </div>
                  <div className="bg-blue-600 text-white p-3 md:p-5 text-center rounded-lg">
                    <div className="text-xl md:text-3xl font-bold mb-1">{graduation}%</div>
                    <div className="text-xs font-bold tracking-wide">CAREER SUCCESS</div>
                  </div>
                  <div className="bg-blue-600 text-white p-3 md:p-5 text-center rounded-lg">
                    <div className="text-xl md:text-3xl font-bold mb-1">{degree}+</div>
                    <div className="text-xs font-bold tracking-wide">NURSING PROGRAMS</div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-10 text-justify">
                  We offer healthcare-aligned programs that not only meet but exceed national nursing standards, preparing you for the demands of modern healthcare. Our personalized mentoring and career planning ensure your path is clear and optimized. We uphold transparent processes and ethical education practices, because your success and professional integrity are paramount. This proven track record of successful NCLEX outcomes speaks volumes about our dedication and expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section ref={founderRef} className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">A Message From Our Founder</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  "From humble beginnings to healthcare excellence, Nursing Exam Portal was born from a personal calling: to open doors for aspiring nurses who dream of making a difference. We don't just teach exam strategies—we nurture compassionate healers. At Nursing Exam Portal, nursing excellence is not just a goal; it's a commitment ingrained in every program and Candidate we guide. We are dedicated to fostering a new generation of skilled, confident, and care-ready registered nurses."
                </p>
              </div>
              <div className={`grid grid-cols-3 gap-5 ${founderVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <div className="col-span-2 bg-gray-300 rounded-lg h-64"></div>
                <div className="bg-gray-300 rounded-lg h-32"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section ref={careerRef} className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-5 space-y-16">
            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`${careerVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <div className="bg-gray-300 rounded-lg h-64 w-full"></div>
              </div>
              <div className={`${careerVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">Healthcare Careers: Hospitals & Specialized Settings</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  We specialize in placing qualified nurses across diverse healthcare sectors. Our opportunities include roles in acute care hospitals, specialty clinics, long-term care facilities, rehabilitation centers, and community health settings. We handle all specialties, ensuring seamless integration with proper credentials and certifications. Explore the vast opportunities of a rewarding nursing career with Nursing Exam Portal.
                </p>
              </div>
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`lg:order-2 ${careerVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <div className="bg-gray-300 rounded-lg h-32 w-full"></div>
              </div>
              <div className={`lg:order-1 ${careerVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">Specialized Nursing & Advanced Practice</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Dreaming of an advanced nursing career? We support nurses pursuing specialized roles in ICU, Emergency, Pediatrics, Oncology, and other critical care areas. We welcome Candidates with various nursing backgrounds, providing comprehensive support from specialty certification preparation to advanced practice degree guidance, ensuring you're prepared for the next level of your nursing career.
                </p>
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`${careerVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <div className="bg-gray-300 rounded-lg h-64 w-full"></div>
              </div>
              <div className={`${careerVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">Nursing Education & Licensing Support</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Navigating nursing licensing can be complex. We offer comprehensive assistance for nursing credentials, including NCLEX registration, state board applications, license verification, and continuing education requirements. Our expert team also provides guidance for specialty certification exams. Furthermore, we offer a range of accredited nursing programs tailored for various educational backgrounds, including NCLEX-RN preparation, BSN bridge programs, MSN support, and advanced practice nursing guidance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default AboutUs;

