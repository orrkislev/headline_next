'use client'

import { useState } from "react";
import DynamicLogo from "@/components/Logo";
import { useTranslate, useTime } from "@/utils/store";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function MobileSummary({ locale, country, pageDate, initialSummaries, yesterdaySummary, daySummary }) {
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage);
    const currentTime = useTime(state => state.date);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);

    // Find the current summary based on the selected time
    const getCurrentSummary = () => {
        if (!initialSummaries || initialSummaries.length === 0) return null;
        
        // Find the summary that matches the current selected time
        // This logic matches how the desktop version works
        const currentSummary = initialSummaries.find(summary => {
            const timeDiff = Math.abs(summary.timestamp.getTime() - currentTime.getTime());
            return timeDiff < 30 * 60 * 1000; // Within 30 minutes
        });

        if (currentSummary) return currentSummary;

        // If no exact match, find the most recent summary before the current time
        const pastSummaries = initialSummaries
            .filter(summary => summary.timestamp <= currentTime)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        return pastSummaries[0] || initialSummaries[0];
    };

    const currentSummary = getCurrentSummary();

    // Get the appropriate summary text and headline based on locale and language settings
    let summaryText = currentSummary.summary;
    let headline = currentSummary.englishHeadline;
    
    if (locale === 'heb') {
        summaryText = currentSummary.hebrewSummary || currentSummary.summary;
        headline = currentSummary.hebrewHeadline || currentSummary.headline;
    }
    
    if (useLocalLanguage) {
        summaryText = currentSummary.translatedSummary || currentSummary.summary;
        headline = currentSummary.translatedHeadline || currentSummary.headline;
    }

    const timestamp = currentSummary.timestamp.getHours().toString().padStart(2, '0') + ':' + 
                     currentSummary.timestamp.getMinutes().toString().padStart(2, '0');

    const fontClass = locale === 'heb' ? 'frank-re' : 'font-["Geist"]';

    const handleInteraction = () => {
        setIsLogoHovered(true);
        // Reset after 3 seconds
        setTimeout(() => setIsLogoHovered(false), 3000);
    };

    return (
        <div 
            className={`flex flex-col gap-4 px-2 h-full overflow-hidden ${isLogoHovered ? 'mobile-logo-active-hover' : ''}`}
            onClick={handleInteraction}
        >
            <DynamicLogo locale={locale} padding="p-0" />
            
            <div 
                className="flex-1 overflow-y-auto custom-scrollbar"
                onScroll={handleInteraction}
            >
                <div className="mb-0">
                    <h3 className={`text-blue mb-2 ${locale === 'heb' ? 'text-lg' : 'text-default'} font-medium ${fontClass}`}
                        style={{
                            lineHeight: '1.5',
                            marginTop: '0px',
                            marginBottom: '10px',
                            direction: locale === 'heb' ? 'rtl' : 'ltr',
                        }}
                    >
                        <span className={`font-['GeistMono', 'Consolas', 'monospace'] ${locale === 'heb' ? 'text-lg' : 'text-default'}`}>{timestamp}</span>
                        <span className="mx-1">{locale == 'heb' ? '⇠' : '⇢'}</span>
                        <span>{headline}</span>
                    </h3>
                    
                    <div 
                        className={`${locale === 'heb' ? 'text-base' : 'text-sm'} text-justify ${fontClass} ${
                            !isExpanded ? 'line-clamp-5' : ''
                        } cursor-pointer`}
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: isExpanded ? 'unset' : 'vertical',
                            overflow: isExpanded ? 'visible' : 'hidden',
                            WebkitLineClamp: isExpanded ? 'unset' : 5,
                            direction: locale === 'heb' ? 'rtl' : 'ltr',
                            lineHeight: '1.4',
                        }}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {summaryText.split(/(\(.*?\))/g).map((part, index) => (
                            <span 
                                key={index} 
                                className={part.startsWith('(') && part.endsWith(')') ? `text-gray-300 ${locale === 'heb' ? 'text-xs' : 'text-xs'}` : ''}
                            >
                                {part}
                            </span>
                        ))}
                    </div>
                    
                    {/* Expand/Collapse Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-center w-full mt-2 mb-2 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                <span className={`${locale === 'heb' ? 'text-sm' : 'text-xs'} mr-1 ${fontClass}`}>
                                    {locale === 'heb' ? '' : ''}
                                </span>
                                <KeyboardArrowUp sx={{ fontSize: 16 }} />
                            </>
                        ) : (
                            <>
                                <span className={`${locale === 'heb' ? 'text-sm' : 'text-xs'} mr-1 ${fontClass}`}>
                                    {locale === 'heb' ? '' : ''}
                                </span>
                                <KeyboardArrowDown sx={{ fontSize: 16 }} />
                            </>
                        )}
                    </button>
                </div>
            </div>
            
            {/* Add CSS to trigger logo hover effect on interaction */}
            <style jsx global>{`
                .mobile-logo-active-hover .logo-hover-container .logo-background {
                    opacity: 1 !important;
                }
                .mobile-logo-active-hover .logo-hover-container .logo-text-right {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
} 