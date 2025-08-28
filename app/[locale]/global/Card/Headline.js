'use client'

import Link from "next/link";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { createPortal } from "react-dom";

export default function Headline({ country, locale, summary, typography, index }) {
    const [showProgress, setShowProgress] = useState(false);
    
    let headline = summary.englishHeadline;
    if (locale === 'heb') {
        headline = summary.hebrewHeadline || summary.headline
    } else if (locale === 'translated') {
        headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    }

    // Apply 1.5x font size multiplier for the first card (index 0)
    const updatedTypography = index === 0 ? {
        ...typography,
        fontSize: `calc(${typography.fontSize} * 1.5)`
    } : typography;

    const handleClick = () => {
        setShowProgress(true);
        // Hide progress after navigation
        setTimeout(() => setShowProgress(false), 2000);
    };

    return (
        <>
            <Link href={`/${locale}/${country}`} hrefLang={locale} onClick={handleClick}>
                <h2 className={`animate-headline w-full text-lg font-semibold break-words px-1`}
                    style={{
                        ...updatedTypography,
                        width: '100%',
                        // Preserve the typography fontSize to maintain font-specific multipliers
                        fontFamily: updatedTypography.fontFamily
                    }} key={summary.id}>
                    {headline}
                </h2>
            </Link>
            {showProgress && typeof window !== 'undefined' && createPortal(
                <div className="fixed inset-0 w-full h-full z-[9999] pointer-events-auto">
                    <div className="absolute inset-0 bg-white bg-opacity-40 animate-pulse transition-all duration-200" />
                    <div className="fixed top-0 left-0 w-full">
                        <LinearProgress color="inherit" sx={{ opacity: 0.8, backgroundColor: 'white', height: '2px' }} />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}