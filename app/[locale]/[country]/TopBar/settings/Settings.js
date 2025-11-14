'use client'

import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import LanguageToggle from "./LanguageToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import ArchiveToggle from "./ArchiveToggle";
import { Search } from "@mui/icons-material";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";
import InnerLink from "@/components/InnerLink";
import { useEffect, useState } from "react";
import { useTranslate } from "@/utils/store";

export default function Settings({ locale, country, sources, isRightPanelCollapsed, hideLanguageToggle, userCountry, pageDate }) {
    const [isXl, setIsXl] = useState(false);
    const [showHistoryGroup, setShowHistoryGroup] = useState(false);
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage);


    // Check if screen is xl (1600px+)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsXl(window.innerWidth >= 1600);
        };

        // Check on mount
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Check if screen is wide enough to show history group (1240px+)
    useEffect(() => {
        const checkScreenSize = () => {
            setShowHistoryGroup(window.innerWidth >= 1240);
        };

        // Check on mount
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Force the hiding based on direct check as a fallback
    const shouldHideLanguage = hideLanguageToggle ||
        (locale === 'heb' && country === 'Israel') ||
        (locale === 'en' && (country === 'US' || country === 'UK'));

    // Color scheme: sky for regular pages, amber for date pages
    const isDatePage = !!pageDate;
    const buttonClasses = isDatePage
        ? "bg-amber-50 shadow-lg hover:bg-amber-100"
        : "bg-sky-100 hover:bg-sky-200";

    // Dynamic label and color for language toggle
    const languageLabel = useLocalLanguage ? "Local Language" : "Overview Language";
    const languageLabelColor = useLocalLanguage && isDatePage ? "#D97706" : "text-gray-800";

    // Animation delays: RTL in English (right to left), LTR in Hebrew (left to right)
    const delays = locale === 'heb'
        ? { history: '0.05s', display: '0.15s', sources: '0.25s' }
        : { history: '0.25s', display: '0.15s', sources: '0.05s' };

    return (
        <>
            <div className="flex items-center justify-center gap-1 direction-ltr">
                {/* History Group */}
                {showHistoryGroup && (
                    <div className="flex items-center gap-1 animate-[fadeInUp_0.3s_ease-out_both]" style={{ animationDelay: delays.history }}>
                        <span className="text-xs font-['Geist'] mx-2 bg-gray-50 p-2 rounded-md">History ⟶</span>
                        <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                            <DateSelector {...{ locale, country }} />
                        </div>
                        <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                            <LabeledIcon label="Archives" icon={<ArchiveToggle locale={locale} country={country} />} tooltip="To the archives" />
                        </div>
                        <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                            <LabeledIcon
                                label="Search"
                                icon={
                                    <InnerLink locale={locale} href={`/${locale}/${country}/search`}>
                                        <CustomTooltip title="search the archives" placement="bottom" arrow>
                                            <TopBarButton>
                                                <Search />
                                            </TopBarButton>
                                        </CustomTooltip>
                                    </InnerLink>
                                }
                            />
                        </div>
                    </div>
                )}

                {/* Display Group */}
                <div className="flex items-center gap-1 animate-[fadeInUp_0.3s_ease-out_both]" style={{ animationDelay: delays.display }}>
                <span className="text-xs font-['Geist'] mx-2 bg-gray-50 p-2 rounded-md">Display ⟶</span>
                    <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                        <LabeledIcon label="Fonts" icon={<FontToggle country={country} isRightPanelCollapsed={isRightPanelCollapsed} pageDate={pageDate} />} tooltip="Change headlines font" />
                    </div>
                    {!shouldHideLanguage && isXl && (
                        <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                            <div className="flex items-center gap-1 px-4 direction-ltr">
                                <div className="flex items-center">
                                    <LanguageToggle pageDate={pageDate} />
                                </div>
                                <CustomTooltip title="Toggle Overview Language" placement="bottom" arrow>
                                    <p className={`text-sm font-semibold font-roboto ${languageLabelColor} my-2 select-none cursor-pointer`} onClick={(e) => {
                                        e.stopPropagation();
                                        const button = e.currentTarget.parentElement.parentElement.querySelector('button');
                                        if (button) {
                                            button.click();
                                        }
                                    }}>
                                        {languageLabel}
                                    </p>
                                </CustomTooltip>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sources Group */}
                <div className="flex items-center gap-1 animate-[fadeInUp_0.3s_ease-out_both]" style={{ animationDelay: delays.sources }}>
                <span className="text-xs font-['Geist'] mx-2 bg-gray-50 p-2 rounded-md">Sources ⟶</span>
                    <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                        <LabeledIcon label="Source Order" icon={<OrderToggle locale={locale} />} tooltip="Sort the sources" />
                    </div>
                    <div className={`flex items-center font-['Geist'] ${buttonClasses} rounded-md mx-1`}>
                        <LabeledIcon label="Sources" icon={<SourcesToggle {...{ country, locale, sources }} />} tooltip="Select news sources" />
                    </div>
                </div>
            </div>
        </>
    );
}