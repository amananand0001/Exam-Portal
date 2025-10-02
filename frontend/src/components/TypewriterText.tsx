import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  staticText: string;
  toggleTexts: string[];
  className?: string;
  typeSpeed?: number;
  pauseDuration?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  staticText,
  toggleTexts,
  className = '',
  typeSpeed = 100,
  pauseDuration = 2000
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentToggleIndex, setCurrentToggleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showStatic, setShowStatic] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Type the static text first
      if (!showStatic) {
        const typeStaticText = async () => {
          for (let i = 0; i <= staticText.length; i++) {
            await new Promise(resolve => {
              timeout = setTimeout(resolve, typeSpeed);
            });
            setDisplayText(staticText.slice(0, i));
          }
          setShowStatic(true);
          setIsTyping(false);
        };
        typeStaticText();
      }
    } else {
      // Toggle between the two texts
      const currentText = toggleTexts[currentToggleIndex];
      
      const typeToggleText = async () => {
        // Clear the text first
        for (let i = currentText.length; i >= 0; i--) {
          await new Promise(resolve => {
            timeout = setTimeout(resolve, typeSpeed / 2);
          });
          setDisplayText(currentText.slice(0, i));
        }
        
        // Wait a bit before typing the next text
        await new Promise(resolve => {
          timeout = setTimeout(resolve, pauseDuration);
        });
        
        // Type the next text
        const nextIndex = (currentToggleIndex + 1) % toggleTexts.length;
        const nextText = toggleTexts[nextIndex];
        
        for (let i = 0; i <= nextText.length; i++) {
          await new Promise(resolve => {
            timeout = setTimeout(resolve, typeSpeed);
          });
          setDisplayText(nextText.slice(0, i));
        }
        
        // Wait before starting the next cycle
        await new Promise(resolve => {
          timeout = setTimeout(resolve, pauseDuration);
        });
        
        setCurrentToggleIndex(nextIndex);
      };
      
      typeToggleText();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isTyping, currentToggleIndex, staticText, toggleTexts, typeSpeed, pauseDuration, showStatic]);

  return (
    <span className={className}>
      {showStatic && <span>{staticText} </span>}
      <span className="inline-block min-w-[1ch]">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
};

export default TypewriterText;
