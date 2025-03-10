'use client'

import { useEffect, useState } from 'react';

const MIN_FONT_SIZE = 2.1;

const fontSizes = {
  small: {
    card0: '4rem',
    baseMax: 2.5,
    decrease: 0.1
  },
  regular: {
    card0: '4rem',
    baseMax: 2.5,
    decrease: 0.12
  },
  large: {
    card0: '4rem',
    baseMax: 2.5,
    decrease: 0.15
  },
  hd: {
    card0: '4rem',
    baseMax: 2.5,
    decrease: 0.12
  }
};

export const useResponsiveFontSizes = () => {
  const [screenSize, setScreenSize] = useState('regular');
  

  useEffect(() => {
    if (!window) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScreenSize('small');
      } else if (width >= 600 && width < 900) {
        setScreenSize('regular');
      } else if (width >= 900 && width < 1921) {
        setScreenSize('large');
      } else {
        setScreenSize('hd');
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return fontSizes[screenSize];
};

export const calculateTitleFontSize = (index, language, responsiveFontSizes) => {
  const { card0, baseMax, decrease } = responsiveFontSizes;
  
  if (index === 0) {
    return card0;
  } else {
    const baseFontSize = language === 'hebrew' ? baseMax + 0.5 : baseMax;
    return `${Math.max(MIN_FONT_SIZE, baseFontSize - (index - 1) * decrease)}rem`;
  }
}; 