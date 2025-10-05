import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-global-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 lg:py-6 gap-4 lg:gap-0">
          {/* Social Media Icons */}
          <div className="flex justify-center lg:justify-start items-center gap-4 lg:gap-8">
            <img src="/images/img_.svg" className="w-[8px] h-[14px]" alt="social icon" />
            <img src="/images/img_teal_800.svg" className="w-[12px] h-[14px]" alt="social icon" />
            <img src="/images/img_teal_800_14x10.svg" className="w-[10px] h-[14px]" alt="social icon" />
            <img src="/images/img_teal_800_14x14.svg" className="w-[14px] h-[14px]" alt="social icon" />
          </div>

          {/* Information Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
            <p className="text-xs sm:text-sm font-source-sans font-normal leading-4 sm:leading-5 text-global-1 text-center sm:text-left">
              Information for:
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 lg:gap-6">
              <button className="text-xs font-barlow font-bold leading-4 tracking-wider uppercase text-global-1 hover:opacity-80 transition-opacity">
                Candidate
              </button>
              <button className="text-xs font-barlow font-bold leading-4 tracking-wider uppercase text-global-1 hover:opacity-80 transition-opacity">
                Staff
              </button>
              <button className="text-xs font-barlow font-bold leading-4 tracking-wider uppercase text-global-1 hover:opacity-80 transition-opacity">
                Alumni
              </button>
              <a 
                href="mailto:support@howard.com" 
                className="text-xs font-barlow font-bold leading-4 tracking-wider uppercase text-global-1 hover:opacity-80 transition-opacity"
              >
                support@howard.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;