import React, { useRef, useState, useEffect } from 'react';

export default function Collapse({ in: open, children, style, ...props }) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(open ? 'auto' : 0);
    
    useEffect(() => {
        if (open) {
            // Set to measured height then turn to auto
            const scrollHeight = contentRef.current ? contentRef.current.scrollHeight : 0;
            setHeight(scrollHeight);
            const timer = setTimeout(() => setHeight('auto'), 300);
            return () => clearTimeout(timer);
        } else {
            if (contentRef.current) {
                const scrollHeight = contentRef.current.scrollHeight;
                // Set to fixed height to trigger transition
                setHeight(scrollHeight);
                requestAnimationFrame(() => {
                    setHeight(0);
                });
            }
        }
    }, [open]);

    return (
        <div
            {...props}
            style={{
                height,
                overflow: 'hidden',
                transition: 'height 300ms ease',
                ...style,
            }}
        >
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
}
