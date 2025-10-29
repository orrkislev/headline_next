import TimeDisplay from "./TimeDisplay.js";
import Flag from "./Flag.js";
import { SettingsButton } from "./SettingsButton.js";
import { useTranslate, useTime } from "@/utils/store";
import useMobile from "@/components/useMobile";
import useVerticalScreen from "@/components/useVerticalScreen";
import Link from "next/link";

// Helper function to clean summary text by removing everything after language markers
const cleanSummaryText = (text) => {
    if (!text) return '';
    
    // Find the index of language markers and truncate at the first one found
    const markers = ['HEBREWSUMMARY:', 'LOCALSUMMARY:', 'SUMMARY:'];
    let cleanText = text;
    
    for (const marker of markers) {
        const markerIndex = text.indexOf(marker);
        if (markerIndex !== -1) {
            cleanText = text.substring(0, markerIndex).trim();
            break; // Stop at the first marker found
        }
    }
    
    return cleanText;
};

export default function TopBar({ locale, country, sources, currentSummary, initialSummaries, isRightPanelCollapsed, onExpandPanel, userCountry }) {
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage);
    const { isMobile } = useMobile();
    const { isVerticalScreen } = useVerticalScreen();
    const date = useTime(state => state.date);
    
    // Force English behavior on mobile
    const effectiveLocale = isMobile ? 'en' : locale;

    // Find the current summary from initialSummaries if currentSummary is not available
    const findCurrentSummary = () => {
        if (currentSummary) return currentSummary;
        if (!initialSummaries || !date) return null;

        const sortedSummaries = initialSummaries.sort((a, b) => b.timestamp - a.timestamp);
        return sortedSummaries.find(summary => summary.timestamp <= date) || null;
    };

    const actualCurrentSummary = findCurrentSummary();

    // Get the appropriate headline based on locale and language settings
    const getCurrentHeadline = () => {
        if (!actualCurrentSummary) return null;

        let headline = actualCurrentSummary.englishHeadline;
        if (effectiveLocale === 'heb') {
            headline = actualCurrentSummary.hebrewHeadline || actualCurrentSummary.headline;
        }
        if (useLocalLanguage) {
            headline = actualCurrentSummary.translatedHeadline || actualCurrentSummary.headline;
        }
        return cleanSummaryText(headline);
    };

    const currentHeadline = getCurrentHeadline();


    return (
        <div className={`sticky top-0 z-40 flex border-b border-gray-200 px-2 ${isVerticalScreen ? 'py-6' : 'py-2'} bg-white`}>
            <div className={`flex w-full ${isVerticalScreen ? 'justify-center' : 'justify-between'}`}>
                <div className="flex items-center min-w-0 flex-1">
                    {effectiveLocale !== 'heb' && (
                        <>
                            <Link href={`/${effectiveLocale}/global`} className="hover:text-blue transition-colors">
                                <h1 className="text-sm font-medium cursor-pointer font-['Geist'] pl-2 sm:pl-4 whitespace-nowrap">The Hear</h1>
                            </Link>
                            <div className="border-l border-dotted border-gray-300 h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>
                        </>
                    )}
                    <TimeDisplay locale={effectiveLocale} />
                    <div className="border-l border-dotted border-gray-300 h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>
                    <Flag {...{ country, locale: effectiveLocale, originalLocale: locale}} />
                    {/* Show current summary title when right panel is collapsed or on vertical screens */}
                    {(isRightPanelCollapsed || isVerticalScreen) && currentHeadline && (
                        <>
                            <div className="border-l border-gray-300 border-dotted h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>
                            <div 
                                className={`text-gray-800 truncate cursor-pointer hover:underline hover:underline-offset-2 min-w-0 flex-1 max-w-xs sm:max-w-md ${effectiveLocale === 'heb' ? 'frank-re text-base' : 'font-["Geist"] text-sm'}`}
                                onClick={onExpandPanel}
                            >
                                {currentHeadline}
                            </div>
                        </>
                    )}
                </div>
                {!isVerticalScreen && (
                    <div className="flex items-center hidden md:flex px-2">
                        <SettingsButton {...{ locale: effectiveLocale, country, sources, isRightPanelCollapsed, userCountry }} />
                    </div>
                )}
            </div>
        </div>
    );
}

