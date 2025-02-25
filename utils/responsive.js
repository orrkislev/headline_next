import { useEffect, useState } from 'react';

// Centralized breakpoint values (in pixels)
export const breakpoints = {
  xs: 600,    // Mobile (600px - 915px)
  sm: 915,    // Tablet (915px - 1024px)
  md: 1024,   // HD Ready (1024px - 1366px)
  lg: 1366,   // HD (1366px - 1600px)
  xl: 1600,   // HD+ (1600px - 1920px)
  fhd: 1920,  // Full HD (1920px - 2560px)
  qhd: 2560,  // 2K/QHD (≥2560px)
};

// Card size configurations for different breakpoints
export const cardSizes = {
  mobile: {
    width: 'minmax(280px, 1fr)',    
    gridWidth: 'minmax(280px, 1fr)',
    fontSize: 1,
    gap: '10px',
    padding: '10px',
    summaryWidth: '100%',
    summaryFontSize: 1.1,
    breakpoint: 'mobile',
  },
  xs: {
    width: 'minmax(250px, 1fr)',    
    gridWidth: 'minmax(250px, 1fr)',
    fontSize: 0.8,
    gap: '12px',
    padding: '12px',
    summaryWidth: '270px',
    summaryFontSize: 0.87,
    breakpoint: 'xs',
  },
  sm: {
    width: 'minmax(250px, 1fr)',    
    gridWidth: 'minmax(250px, 1fr)',
    fontSize: 0.8,
    gap: '12px',
    padding: '12px',
    summaryWidth: '270px',
    summaryFontSize: 0.87,
    breakpoint: 'sm',
  },
  md: {
    width: 'minmax(290px, 1fr)',    
    gridWidth: 'minmax(290px, 1fr)',
    fontSize: 0.93,
    gap: '14px',
    padding: '14px',
    summaryWidth: '310px',
    summaryFontSize: 0.87,
    breakpoint: 'md',
  },
  lg: {
    width: 'minmax(300px, 1fr)',    
    gridWidth: 'minmax(300px, 1fr)',
    fontSize: 0.9,
    gap: '16px',
    padding: '16px',
    summaryWidth: '310px',
    summaryFontSize: 0.87,
    breakpoint: 'lg',
  },
  xl: {
    width: 'minmax(280px, 1fr)',    
    gridWidth: 'minmax(280px, 1fr)',
    fontSize: 1,
    gap: '18px',
    padding: '18px',
    summaryWidth: '300px',
    summaryFontSize: 0.9,
    breakpoint: 'xl',
  },
  fhd: {
    width: 'minmax(330px, 1fr)',    
    gridWidth: 'minmax(330px, 1fr)',
    fontSize: 1,
    gap: '20px',
    padding: '20px',
    summaryWidth: '330px',
    summaryFontSize: 0.95,
    breakpoint: 'fhd',
  },
  qhd: {
    width: 'minmax(330px, 1fr)',    
    gridWidth: 'minmax(330px, 1fr)',
    fontSize: 1.1,
    gap: '20px',
    padding: '22px',
    summaryWidth: '350px',
    summaryFontSize: 1,
    breakpoint: 'qhd',
  }
};

// Custom hook for responsive values using window.matchMedia instead of MUI
export function useResponsiveSize() {
  const [currentSize, setCurrentSize] = useState(cardSizes.md); // Default fallback
  
  useEffect(() => {
    // Function to determine the current breakpoint
    const updateSize = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.xs) {
        setCurrentSize(cardSizes.mobile);
      } else if (width < breakpoints.sm) {
        setCurrentSize(cardSizes.xs);
      } else if (width < breakpoints.md) {
        setCurrentSize(cardSizes.sm);
      } else if (width < breakpoints.lg) {
        setCurrentSize(cardSizes.md);
      } else if (width < breakpoints.xl) {
        setCurrentSize(cardSizes.lg);
      } else if (width < breakpoints.fhd) {
        setCurrentSize(cardSizes.xl);
      } else if (width < breakpoints.qhd) {
        setCurrentSize(cardSizes.fhd);
      } else {
        setCurrentSize(cardSizes.qhd);
      }
    };

    // Initial call
    updateSize();
    
    // Add event listener
    window.addEventListener('resize', updateSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return currentSize;
} 