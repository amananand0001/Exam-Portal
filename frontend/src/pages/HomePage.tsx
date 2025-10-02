import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/HomePage/HomeFooter';
import Button from '../components/HomePage/Button';
import EditText from '../components/HomePage/EditText';
import VideoBackground from '../components/VideoBackground';
import TypewriterText from '../components/TypewriterText';
import CounterAnimation from '../components/CounterAnimation';
import AnimatedCard from '../components/AnimatedCard';
import CircularText from '../components/CircularText';
import ScrollToTop from '../components/ScrollToTop';
import { useSidebar } from '../context/SidebarContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HomePage = () => {
  const navigate = useNavigate();
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

  const [activeTab, setActiveTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Scroll animation hooks
  const { elementRef: whyChooseUsRef, isVisible: whyChooseUsVisible } = useScrollAnimation(0.2);
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation(0.2);

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
      const response = await fetch('https://exam-portal-7hg7.onrender.com/api/contacts', {
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

  const programs = [
    {
      id: 1,
      title: 'NCLEX Preparation',
      description: 'Comprehensive NCLEX-RN exam preparation with practice tests, study materials, and expert guidance for registered nurse licensing.',
      image: '/images/img_mask_group.svg'
    },
    {
      id: 2,
      title: 'Nursing Education',
      description: 'Professional nursing education support including BSN programs, continuing education, and specialty certification preparation.',
      image: '/images/img_mask_group.svg'
    },
    {
      id: 3,
      title: 'Healthcare Career Support',
      description: 'Complete career assistance including job placement, interview preparation, resume building, and healthcare facility connections.',
      image: '/images/img_mask_group.svg'
    }
  ];

  const facilities = [
    { id: '01', title: 'NCLEX-RN Prep Course', description: 'Duration: 3-6 months - Comprehensive preparation for registered nurse licensing exam.' },
{ id: '02', title: 'BSN Bridge Program', description: 'Duration: 12-18 months - Bridge program for ADN to BSN degree completion.' },
{ id: '03', title: 'Specialty Certifications', description: 'Duration: 2-4 months - ICU, ER, Pediatric, and other specialty nursing certifications.' },
{ id: '04', title: 'MSN Degree Support', description: 'Duration: 2 Years - Master of Science in Nursing program guidance and support.' },
{ id: '05', title: 'Nurse Practitioner Prep', description: 'Duration: 2-3 years - Advanced practice nursing education and certification support.' },
{ id: '06', title: 'Clinical Skills Training', description: 'Duration: 6-12 months - Hands-on clinical skills development and competency training.' }
  ];

  const whyChooseUs = [
    {
      icon: '/images/img_group_1281.svg',
      title: 'Expert NCLEX Preparation',
description: 'Hundreds of successful NCLEX pass rates with comprehensive study materials and expert instruction.'
    },
    {
      icon: '/images/img_vector_white_a700.svg',
      title: 'Personalized Learning Support',
description: 'From study planning to career guidance, we provide individualized support for every nursing student.'
    },
    {
      icon: '/images/img_vector_white_a700_20x20.svg',
      title: 'Healthcare Network',
description: 'Connected with leading hospitals and healthcare facilities, offering excellent career opportunities.'
    }
  ];

 const features = [
{
icon: '/images/ExpertTraining.png',
title: 'Expert Instruction',
description: 'Industry-aligned nursing programs meeting healthcare education standards.'
},
{
icon: '/images/GlobalPlacement.png',
title: 'Healthcare Placement',
description: 'Nationwide job placement in hospitals, clinics, and healthcare facilities.'
},
{
icon: '/images/Documentation.png',
title: 'Licensing Support',
description: 'Complete assistance with nursing license applications and certifications.'
},
{
icon: '/images/CareerSupport.png',
title: 'Career Advancement',
description: 'Lifelong guidance and support for your nursing career development.'
}
];

  const faqs = [
{
question: 'What nursing programs do you offer?',
answer: 'We offer comprehensive nursing education including NCLEX-RN preparation, BSN bridge programs, specialty certifications, MSN support, and clinical skills training.',
isExpanded: true
},
{
question: 'Do you provide job placement assistance?',
answer: 'Yes, we provide complete job placement assistance for hospitals, clinics, long-term care facilities, and other healthcare settings nationwide.',
isExpanded: false
},
{
question: 'What is required for nursing license application?',
answer: 'We assist with all nursing license requirements including NCLEX registration, state board applications, background checks, and continuing education credits.',
isExpanded: false
},
{
question: 'Do you offer NCLEX preparation courses?',
answer: 'Yes, we provide comprehensive NCLEX-RN preparation including practice tests, study materials, tutoring, and test-taking strategies.',
isExpanded: false
}
];

  return (
    <div className="w-full flex flex-col">

      {/* Video Background for Header */}
          <VideoBackground
      videoSrc="/videos/hero-vid.mp4"
      coverHeader={true}
    >
        <div></div>
      </VideoBackground>

      {/* Hero Section */}
                     <VideoBackground
          videoSrc="/videos/hero-vid.mp4"
          className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex items-center justify-center"
        >
                    <div className="w-full max-w-7xl mx-auto">
              <div className="flex flex-col items-center text-center gap-8 lg:gap-12">
             <div className="flex flex-col gap-6 lg:gap-12 w-full max-w-4xl">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                   <p className="text-base font-inter font-medium leading-5 text-white">
Expert Nursing Training • NCLEX Preparation • Healthcare Career Support
                  </p>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-inter font-bold leading-tight lg:leading-[75px] text-white">
Launch Your Registered Nursing Career with Expert Exam Preparation
                  </h2>
                </div>
                 <p className="text-base lg:text-lg font-inter font-normal leading-6 lg:leading-7 text-white">
We're not just an exam preparation service – we're your pathway to nursing excellence. Exam Portal empowers aspiring registered nurses to achieve their dreams through comprehensive NCLEX preparation, career guidance, and healthcare placement support. From study materials to career success, we support you at every step of your nursing journey.
                </p>
              </div>
              <Button
                variant="primary"
                size="medium"
                 className="w-auto mx-auto"
                 onClick={() => navigate('/about')}
              >
                Known More
              </Button>
            </div>
            </div>
          </div>
       </VideoBackground>

      {/* Innovation Section */}
      <section className="w-full bg-global-9 px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-[54%] flex justify-center lg:justify-start">
              <div className="relative">
                {/* Circular Badge */}
                 <div className="absolute top-[350px] sm:top-80 left-0 lg:left-0 z-10 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] bg-global-1 rounded-full flex items-center justify-center p-4 shadow-xl circular-badge">
                   <CircularText
                     words={["Future", ", Our", "Mission", "your"]}
                     icon="/SRB-Marine-1001.png"
                     radius={70}
                     fontSize={16}
                     className="w-full h-full"
                   />
                </div>
                
                {/* Main Image */}
                <div className="bg-global-2 rounded-[20px] shadow-lg ml-0 lg:ml-20 mt-12 lg:mt-0">
                  <img 
                    src="/images/img_mask_group.svg" 
                    className="w-full max-w-[376px] h-auto rounded-[20px]" 
                    alt="innovation image" 
                  />
                </div>
                
                {/* Side Images */}
                <div className="hidden lg:flex flex-col gap-8 absolute right-[-140px] top-0">
                  <div className="bg-global-2 rounded-[20px] shadow-lg">
                    <img 
                      src="/images/img_mask_group.svg" 
                      className="w-[248px] h-[246px] rounded-[20px]" 
                      alt="side image 1" 
                    />
                  </div>
                  <div className="bg-global-2 rounded-[20px] shadow-lg">
                    <img 
                      src="/images/img_mask_group.svg" 
                      className="w-[328px] h-[288px] rounded-[20px]" 
                      alt="side image 2" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[38%] flex flex-col gap-8 lg:gap-14">
              <div className="flex flex-col gap-8 lg:gap-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-base font-inter font-medium leading-5 text-global-1">
                       <TypewriterText
                         staticText="Learn More About"
                         toggleTexts={["Nursing Excellence", "Healthcare Education"]}
                         typeSpeed={80}
                         pauseDuration={1000}
                       />
                    </p>
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-inter font-semibold leading-tight lg:leading-[66px] text-global-3">
Empowering Future Nurses with Excellence and Compassion
                    </h3>
                  </div>
                  <p className="text-base lg:text-lg font-inter font-normal leading-6 lg:leading-7 text-global-3">
Founded with the belief that healthcare belongs to compassionate and dedicated individuals, Exam Portal has become a guiding light for aspiring nurses across the nation. Whether it's passing the NCLEX, advancing your nursing education, or securing positions in top healthcare facilities, we prepare our students not just for exams – but for transformative healthcare careers.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="medium"
                  className="w-auto"
                  onClick={() => { }}
                >
                  Explore More
                </Button>
              </div>
              {/* Statistics */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-6 lg:gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl lg:text-4xl font-inter font-bold leading-tight text-global-6">
                     <CounterAnimation
                       end={500}
                       suffix="+"
                       duration={2500}
                       className="text-2xl lg:text-4xl font-inter font-bold leading-tight text-global-6"
                     />
                  </span>
                  <span className="text-base font-inter font-normal leading-5 text-global-2">
NCLEX Pass Rate
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl lg:text-4xl font-inter font-bold leading-tight text-global-6">
                     <CounterAnimation
                       end={15}
                       suffix="+"
                       duration={2000}
                       className="text-2xl lg:text-4xl font-inter font-bold leading-tight text-global-6"
                     />
                  </span>
                  <span className="text-base font-inter font-normal leading-5 text-global-2">
Years in Nursing Education
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl lg:text-4xl font-inter font-bold leading-tight text-global-6">
                     <CounterAnimation
                       end={50}
                       suffix="+"
                       duration={2200}
                       className="text-2xl lg:text-4xl font-inter font-bold leading-tight text-global-6"
                     />
                  </span>
                  <span className="text-base font-inter font-normal leading-5 text-global-2">
Healthcare Partners
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="w-full bg-global-8 px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-inter font-semibold leading-tight text-global-2">
Our Nursing Services
              </h3>
              <p className="text-base font-inter font-normal leading-6 text-global-2 max-w-4xl mx-auto">
                Comprehensive nursing education and career services designed to launch your healthcare career with confidence and clinical expertise.

              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {programs.map((program) => (
                <div 
                  key={program.id}
                  className="flex flex-col gap-6 bg-global-6 border border-global-9 rounded-[20px] p-8 lg:p-12"
                >
                  <div className="flex flex-col gap-6 lg:gap-7 items-center">
                    <div className="bg-global-2 rounded-lg">
                      <img 
                        src={program.image} 
                        className="w-[118px] h-[112px]" 
                        alt={program.title} 
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-center">
                      <h4 className="text-xl font-inter font-semibold leading-6 text-global-3">
                        {program.title}
                      </h4>
                      <p className="text-base font-inter font-normal leading-6 text-global-3">
                        {program.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="small"
                    className="w-auto mx-auto"
                    onClick={() => {
                      // You can add navigation or modal logic here if needed
                      console.log(`Explore More clicked for program: ${program.title}`);
                    }}
                  >
                    Explore More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="w-full bg-global-9 px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 lg:gap-5 text-center">
              <p className="text-base font-inter font-medium leading-5 text-global-1">
Nursing Education
              </p>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-inter font-semibold leading-tight text-global-3">
Professional Nursing Programs
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {facilities.map((facility, index) => (
                 <AnimatedCard
                  key={facility.id}
                   delay={index * 150}
                   direction="up"
                   className="flex justify-between items-start bg-global-5 rounded-[10px] p-6 lg:p-8 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="flex flex-col gap-3 lg:gap-4 flex-1">
                    <h4 className="text-xl font-inter font-semibold leading-6 text-global-3">
                      {facility.title}
                    </h4>
                    <p className="text-base font-inter font-normal leading-6 text-global-3">
                      {facility.description}
                    </p>
                  </div>
                  <span className="text-2xl font-inter font-bold leading-7 text-global-1 ml-4">
                    {facility.id}
                  </span>
                 </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-global-5 px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12" ref={whyChooseUsRef}>
            <div className="w-full lg:w-[56%] flex flex-col gap-8 lg:gap-10">
              <div className="flex flex-col gap-6">
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-inter font-semibold leading-tight text-global-1">
Why Choose Exam Portal for Nursing?
                </h3>
                <p className="text-base lg:text-lg font-inter font-normal leading-6 lg:leading-7 text-global-3">
At Exam Portal, we believe in providing exceptional nursing education and career opportunities. With our expert NCLEX preparation, proven pass rates, and comprehensive support, we are dedicated to helping you achieve your nursing career goals and excel in healthcare.
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="medium"
                  className="w-auto"
                  onClick={() => { /* TODO: Add explore more action */ }}
                >
Start Your Nursing Career
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-[44%] flex flex-col gap-8 lg:gap-10 relative">
              {/* Connecting Line */}
              <div className={`absolute left-[30px] top-[30px] bottom-[30px] w-[2px] bg-gradient-to-b from-global-1 to-transparent opacity-0 ${whyChooseUsVisible ? 'animate-connectingLine' : ''}`}></div>
              
              {whyChooseUs.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex gap-4 ${whyChooseUsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ 
                    animationDelay: whyChooseUsVisible ? `${index * 300}ms` : '0ms',
                    animationFillMode: 'both'
                  }}
                >
                  <div className={`flex-shrink-0 w-[60px] h-[60px] bg-global-1 rounded-full flex items-center justify-center ${whyChooseUsVisible ? 'animate-iconPulse' : ''}`}>
                    <img src={item.icon} className="w-[20px] h-[20px]" alt="icon" />
                  </div>
                  <div className="flex flex-col gap-3 lg:gap-4">
                    <h4 className="text-xl lg:text-2xl font-inter font-semibold leading-6 lg:leading-7 text-global-1">
                      {item.title}
                    </h4>
                    <p className="text-base font-inter font-normal leading-6 text-global-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
            <section
        className="w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-32"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-12 lg:gap-16 items-center text-center">
                          <div className="flex flex-col gap-6 items-center">
                <div className="w-[94px] h-[94px] flex items-center justify-center">
                  <img src="/SRB-Marine-1001.png" className="w-full h-full" alt="SRB Marine Logo" />
                </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-inter font-bold leading-tight capitalize text-global-5">
Message from Our Founder
              </h2>
             <div className="max-w-4xl">
<blockquote className="text-lg lg:text-xl font-inter font-medium leading-6 lg:leading-7 text-blue-100 italic">
"From humble beginnings to healthcare excellence, Exam Portal was born from a personal calling: to open doors for aspiring nurses who dream of making a difference."
</blockquote>
<p className="text-lg lg:text-xl font-inter font-semibold leading-6 lg:leading-7 text-white mt-6">
We don't just prepare students for exams - we nurture compassionate healers. At Exam Portal, nursing excellence is not a goal, it's our commitment.
</p>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="w-full bg-global-5 px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-28">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col gap-5 items-center lg:items-start ${featuresVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ 
                  animationDelay: featuresVisible ? `${index * 200}ms` : '0ms', 
                  animationFillMode: 'both'
                }}
              >
                <div className="bg-teal-800 rounded-lg p-2">
                  <img 
                    src={feature.icon} 
                    className="w-8 h-8" 
                    alt={feature.title} 
                  />
                </div>
                <div className="flex flex-col gap-3 lg:gap-4 text-center lg:text-left">
                  <h4 className="text-xl font-inter font-semibold leading-6 text-global-3">
                    {feature.title}
                  </h4>
                  <p className="text-base font-inter font-normal leading-6 text-global-3">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="w-full bg-global-9 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative">
            <img 
              src="/images/img_quotation_1.png" 
              className="w-[110px] h-[110px] absolute top-0 left-8 lg:left-12 z-10" 
              alt="quotation" 
            />
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-12">
              <div className="w-full lg:w-[50%] relative">
                <div 
                  className="bg-global-2 rounded-[20px] w-full h-[400px] lg:h-[646px]"
                  style={{ backgroundImage: 'url(/images/img_frame_2418.svg)' }}
                >
                  <img 
                    src="/images/img_mask_group.svg" 
                    className="w-full h-full object-cover rounded-[20px]" 
                    alt="registration background" 
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-[42%] flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-inter font-semibold leading-tight lg:leading-[66px] capitalize text-global-4">
Step Into Your Nursing Future with Exam Portal
                  </h3>
                  <p className="text-base font-inter font-normal leading-6 lg:leading-7 text-global-3">
                    Fill out the form below if you have any queries and we'll connect you with the right opportunities and training programs to launch your nursing career.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="transform focus-within:scale-105 transition-transform duration-300">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
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
                        : 'bg-global-1 text-white hover:bg-teal-700'
                    }`}
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-global-9 px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className="w-full lg:w-[52%] flex flex-col gap-12 lg:gap-16">
              <div className="flex flex-col gap-8 lg:gap-10">
                <div className="flex flex-col gap-4 lg:gap-5">
                  <div className="flex items-center">
                    <button className="text-base font-inter font-medium leading-5 text-global-1">
                      FAQS
                    </button>
                  </div>
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-inter font-semibold leading-tight lg:leading-[66px] text-global-2">
                    Got questions? <br />We have got answers
                  </h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 lg:gap-3">
                    {faqs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col gap-2 animate-fadeInLeft"
                        style={{ 
                          animationDelay: `${index * 200}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                          className="flex items-center gap-4 text-left"
                        >
                          <img 
                            src={expandedFaq === index ? "/images/img_group.svg" : "/images/img_group_teal_800.svg"} 
                            className="w-[22px] h-[22px] flex-shrink-0" 
                            alt="faq icon" 
                          />
                          <span className="text-base font-inter font-normal leading-5 text-global-3">
                            {faq.question}
                          </span>
                        </button>
                        {expandedFaq === index && (
                          <div className="ml-10">
                            <p className="text-base font-inter font-normal leading-7 text-global-3 text-left">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="medium"
                className="w-auto"
                onClick={() => {
                  // You can replace this with your actual contact logic
                  window.location.href = "#contact";
                }}
              >
                Contact Us
              </Button>
            </div>
            <div className="w-full lg:w-[48%] bg-global-2 rounded-[20px] shadow-lg">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0059,40.7128,-73.9352,40.7589&layer=mapnik"
                className="w-full h-[300px] lg:h-[500px] border-0 rounded-[20px]"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default HomePage;