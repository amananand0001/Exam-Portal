import React from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage?: string;
  className?: string;
  children: React.ReactNode;
  coverHeader?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  fallbackImage,
  className = '',
  children,
  coverHeader = false
}) => {
  return (
    <div className={`video-background ${coverHeader ? 'video-background-header' : ''} ${className}`}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage}
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        {fallbackImage && (
          <img src={fallbackImage} alt="Background" className="w-full h-full object-cover" />
        )}
      </video>
      
      {/* Overlay for better text readability */}
      <div className="overlay"></div>
      
      {/* Content */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
