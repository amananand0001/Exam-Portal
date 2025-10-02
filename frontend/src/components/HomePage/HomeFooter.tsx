import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-global-5 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="flex flex-col gap-6 w-full lg:w-[30%]">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl lg:text-3xl font-inter font-semibold leading-8 lg:leading-10 text-global-1">
              Nursing Exam Portal
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-sm font-inter font-normal leading-6 text-global-3">
                  Empowering nursing dreams with expert NCLEX preparation, healthcare placements, and quality education.
Your trusted partner for Nursing Excellence, Career Success & Healthcare Education.
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <img src="/images/img_vector_teal_800_16x12.svg" className="w-[12px] h-[16px]" alt="location" />
                    <span className="text-sm font-inter font-normal leading-4 text-global-3">
                      California, New York, United States
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_vector_teal_800_12x16.svg" className="w-[16px] h-[12px]" alt="email" />
                    <span className="text-sm font-inter font-normal leading-4 text-global-3">
                      info@nursingexamportal.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_vector_teal_800_16x16.svg" className="w-[16px] h-[16px]" alt="phone" />
                    <span className="text-sm font-inter font-normal leading-4 text-global-3">
                      + 1 653 73638
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-base font-inter font-normal leading-5 text-global-3">
              Copyright © 2025 All rights reserved
            </p>
          </div>

          {/* About Us */}
          <div className="flex flex-col w-full sm:w-auto lg:w-[10%]">
            <div className="flex flex-col gap-3 mb-10">
              <h3 className="text-base font-inter font-semibold leading-5 text-global-3 mb-2">
                About Us
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <button className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Programs
                  </button>
                </li>
                <li>
                  <button className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Facilities
                  </button>
                </li>
                <li>
                  <button className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Event
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col w-full sm:w-auto lg:w-[16%]">
            <div className="flex flex-col gap-4 mb-10">
              <h3 className="text-base font-inter font-semibold leading-5 text-global-3">
                Useful Links
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Study Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Privacy & Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Healthcare Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    FAQS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter font-normal leading-4 text-global-3 hover:text-global-1 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2 w-full sm:w-auto lg:w-[12%]">
            <h3 className="text-base font-inter font-semibold leading-5 text-global-3">
              Social Media:
            </h3>
            <img src="/images/img_frame_1396.svg" className="w-full max-w-[142px] h-[24px]" alt="social media icons" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;