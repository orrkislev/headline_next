'use client'

import { useState, useEffect } from "react";
import RightPanel from "./RightPanel";
import SideSlider from "./SideSlider";
import TopBar from "./TopBar/TopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";
import { getTypographyOptions } from "@/utils/typography/typography";
import MainSection from "./MainSection";
import HebrewFonts from "@/utils/typography/HebrewFonts";
import useCurrentSummary from "@/utils/database/useCurrentSummary";
import { useRightPanel } from "@/utils/store";
import useMobile from "@/components/useMobile";
import Loader from "@/components/loader";
import FirstVisitModal from './FirstVisitModal';
import AboutMenu from './TopBar/AboutMenu';
import DateNavigator from '@/components/DateNavigator';

export default function CountryPageContent({ sources, initialSummaries, yesterdaySummary, daySummary, locale, country, pageDate, userCountry }) {
    const typography = getTypographyOptions(country);
    const currentSummary = useCurrentSummary();
    const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
    const { setCollapsed } = useRightPanel();
    const { isMobile, isLoading } = useMobile();
    const [aboutOpen, setAboutOpen] = useState(false);

    // Force English behavior on mobile
    const effectiveLocale = isMobile ? 'en' : locale;

    // Sync local state with global store
    useEffect(() => {
        setCollapsed(isRightPanelCollapsed);
    }, [isRightPanelCollapsed, setCollapsed]);

    // Show loading until mobile detection is complete
    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <FirstVisitModal openAbout={() => setAboutOpen(true)} country={country} locale={locale} pageDate={pageDate} />
            <AboutMenu open={aboutOpen} onClose={() => setAboutOpen(false)} />
            <div id='main' className={`absolute flex flex-col sm:flex-row w-full h-full overflow-auto sm:overflow-hidden ${effectiveLocale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
                <EnglishFonts />
                {locale == 'heb' && <HebrewFonts />}
                <typography.component />
                <SideSlider {...{ locale, country, pageDate }} />
                
                {/* Right Panel - only show on desktop */}
                <div className={`hidden sm:flex flex-[1 sm:border-l sm:border-r border-gray-200 max-w-[400px] `}>
                    <RightPanel 
                        {...{ initialSummaries, locale, country, yesterdaySummary, daySummary, pageDate }} 
                        onCollapsedChange={setIsRightPanelCollapsed}
                        collapsed={isRightPanelCollapsed}
                    />
                </div>

                <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                    <TopBar 
                        {...{ locale, country, sources, userCountry }} 
                        currentSummary={currentSummary}
                        isRightPanelCollapsed={isRightPanelCollapsed}
                        onExpandPanel={() => setIsRightPanelCollapsed(false)}
                    />
                    <MainSection {...{ country, sources, locale, pageDate, initialSummaries, yesterdaySummary, daySummary }} />
                    {pageDate && (
                        <DateNavigator {...{ locale, country, pageDate }} />
                    )}
                </div>
            </div>
        </>
    );
}