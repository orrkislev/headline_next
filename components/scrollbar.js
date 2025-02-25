import React from 'react';

// Add a style tag with the CSS for the scrollbar
const ScrollbarCSS = () => (
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.1);
      border-radius: 4px;
      display: none;
    }
    
    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
      display: block;
    }
    
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0,0,0,.1) transparent;
      overflow-y: auto;
      max-height: 100%;
    }
  `}</style>
);

export const ScrollbarStyles = ({ children, className = '', style = {}, ...props }) => {
  return (
    <>
      <ScrollbarCSS />
      <div
        className={`custom-scrollbar ${className}`}
        style={{
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default ScrollbarStyles; 