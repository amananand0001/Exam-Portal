import React, { useEffect, useRef, useState } from 'react';

interface CircularTextProps {
  words: string[];
  icon?: string;
  className?: string;
  radius?: number;
  fontSize?: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  words,
  icon,
  className = '',
  radius = 70,
  fontSize = 18
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive scaling
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate responsive values
  const responsiveRadius = isMobile ? radius * 0.6 : radius; // 75% smaller on mobile
  const responsiveFontSize = isMobile ? fontSize * 0.7 : fontSize; // 65% smaller on mobile

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  // Scroll event listener for rotation
  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate rotation based on scroll position with faster speed
      const scrollProgress = scrollY / (documentHeight - windowHeight);
      const maxRotation = 720; // Two full rotations for faster effect
      const newRotation = scrollProgress * maxRotation;
      
      setRotation(newRotation);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with responsive scaling
    const size = responsiveRadius * 2 + 20;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Center point
    const centerX = size / 2;
    const centerY = size / 2;

    // Draw continuous text around the circle with rotation
    const fullText = "Shaping Maritime Future ";
    const characters = fullText.split('');
    const totalCharacters = characters.length;
    
    // Calculate spacing for continuous text with rotation offset
    const startAngle = -Math.PI / 2 + (rotation * Math.PI / 180); // Convert degrees to radians
    const angleStep = (2 * Math.PI) / totalCharacters;
    
    characters.forEach((char, index) => {
      const angle = startAngle + (index * angleStep);
      const x = centerX + responsiveRadius * Math.cos(angle);
      const y = centerY + responsiveRadius * Math.sin(angle);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      
      // Flip text on bottom half for readability
      if (angle > 0 && angle < Math.PI) {
        ctx.rotate(Math.PI);
      }
      
      ctx.font = `bold ${responsiveFontSize}px Inter, sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  }, [responsiveRadius, responsiveFontSize, rotation]);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: `${responsiveRadius * 2 + 20}px`, 
        height: `${responsiveRadius * 2 + 20}px`,
        minWidth: `${responsiveRadius * 2 + 20}px`,
        minHeight: `${responsiveRadius * 2 + 20}px`,
        maxWidth: `${responsiveRadius * 2 + 20}px`,
        maxHeight: `${responsiveRadius * 2 + 20}px`
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full circular-text-canvas"
        style={{ width: '100%', height: '100%' }}
      />
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={icon} 
            alt="icon" 
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
          />
        </div>
      )}
    </div>
  );
};

export default CircularText;
