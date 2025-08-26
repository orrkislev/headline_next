import TimeDisplay from "./TimeDisplay.js";
import Flag from "./Flag.js";
import { SettingsButton } from "./SettingsButton.js";
import { useTranslate } from "@/utils/store";
import useMobile from "@/components/useMobile";
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

export default function TopBar({ locale, country, sources, currentSummary, isRightPanelCollapsed, onExpandPanel, userCountry }) {
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage);
    const { isMobile } = useMobile();
    
    // Force English behavior on mobile
    const effectiveLocale = isMobile ? 'en' : locale;

    // Get the appropriate headline based on locale and language settings
    const getCurrentHeadline = () => {
        if (!currentSummary) return null;
        
        let headline = currentSummary.englishHeadline;
        if (effectiveLocale === 'heb') {
            headline = currentSummary.hebrewHeadline || currentSummary.headline;
        } 
        if (useLocalLanguage) {
            headline = currentSummary.translatedHeadline || currentSummary.headline;
        }
        return cleanSummaryText(headline);
    };

    const currentHeadline = getCurrentHeadline();

    return (
        <div className="sticky top-0 z-40 flex border-b border-gray-200 px-2 py-2 bg-white">
            <div className="flex justify-between w-full">
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
                    {/* Show current summary title when right panel is collapsed */}
                    {isRightPanelCollapsed && currentHeadline && (
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
                <div className="flex items-center hidden md:flex px-2">
                    <SettingsButton {...{ locale: effectiveLocale, country, sources, isRightPanelCollapsed, userCountry }} />
                </div>
            </div>
        </div>
    );
}

