import TimeDisplay from "./TimeDisplay.js";
import Flag from "./Flag.js";
import { SettingsButton } from "./SettingsButton.js";
import { useTranslate } from "@/utils/store";

export default function TopBar({ locale, country, sources, currentSummary, isRightPanelCollapsed, onExpandPanel }) {
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage);

    // Get the appropriate headline based on locale and language settings
    const getCurrentHeadline = () => {
        if (!currentSummary) return null;
        
        let headline = currentSummary.englishHeadline;
        if (locale === 'heb') {
            headline = currentSummary.hebrewHeadline || currentSummary.headline;
        } 
        if (useLocalLanguage) {
            headline = currentSummary.translatedHeadline || currentSummary.headline;
        }
        return headline;
    };

    const currentHeadline = getCurrentHeadline();

    return (
        <div className="hidden sm:flex border-b border-gray-200 px-2 py-1">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    {locale !== 'heb' && (
                        <>
                            <h1 className="text-sm font-medium cursor-default hover:text-blue transition-colors font-['Geist'] pl-4">The Hear</h1>
                            <div className="border-l border-dotted border-gray-300 h-[50%] mx-5"></div>
                        </>
                    )}
                    <TimeDisplay locale={locale} />
                    <div className="border-l border-dotted border-gray-300 h-[50%] mx-5"></div>
                    <Flag {...{ country, locale}} />
                    {/* Show current summary title when right panel is collapsed */}
                    {isRightPanelCollapsed && currentHeadline && (
                        <>
                            <div className="border-l border-gray-300 border-dotted h-[50%] mx-5"></div>
                            <div 
                                className={`text-gray-800 max-w-md truncate cursor-pointer hover:underline hover:underline-offset-2 ${locale === 'heb' ? 'frank-re text-base' : 'font-["Geist"] text-sm'}`}
                                onClick={onExpandPanel}
                            >
                                {currentHeadline}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center hidden md:flex px-2">
                    <SettingsButton {...{ locale, country, sources}} />
                </div>
            </div>
        </div>
    );
}

