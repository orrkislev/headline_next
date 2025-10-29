'use client';

import { useEffect, useState } from "react";

export default function useVerticalScreen() {
    const [isVerticalScreen, setIsVerticalScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIsVerticalScreen = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const aspectRatio = height / width;

            // Consider it a vertical screen if:
            // - Aspect ratio > 1.5 (significantly taller than wide)
            // - Width > 915px (not mobile, matches useMobile breakpoint)
            // - Height > 1200px (large enough to be a public display)
            const isVertical = width > 915 && height > 1200 && aspectRatio > 1.5;
            setIsVerticalScreen(isVertical);
            setIsLoading(false);
        };

        // Set initial state
        checkIsVerticalScreen();

        // Add resize and orientation change listeners to update when window size changes
        window.addEventListener('resize', checkIsVerticalScreen);
        window.addEventListener('orientationchange', checkIsVerticalScreen);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIsVerticalScreen);
            window.removeEventListener('orientationchange', checkIsVerticalScreen);
        };
    }, []);

    return { isVerticalScreen, isLoading };
}
