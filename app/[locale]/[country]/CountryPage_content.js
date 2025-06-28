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

export default function CountryPageContent({ sources, initialSummaries, yesterdaySummary, daySummary, locale, country, pageDate }) {
    const typography = getTypographyOptions(country);
    const currentSummary = useCurrentSummary();
    const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
    const { setCollapsed } = useRightPanel();

    // Sync local state with global store
    useEffect(() => {
        setCollapsed(isRightPanelCollapsed);
    }, [isRightPanelCollapsed, setCollapsed]);

    return (
        <div id='main' className={`absolute flex flex-col sm:flex-row w-full h-full overflow-auto sm:overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <EnglishFonts />
            {locale == 'heb' && <HebrewFonts />}
            <typography.component />
            <SideSlider {...{ locale, country, pageDate }} />
            <div className={`flex-[1 sm:border-l sm:border-r border-gray-200 flex max-w-[400px] `}>
                <RightPanel 
                    {...{ initialSummaries, locale, country, yesterdaySummary, daySummary, pageDate }} 
                    onCollapsedChange={setIsRightPanelCollapsed}
                    collapsed={isRightPanelCollapsed}
                />
            </div>

            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar 
                    {...{ locale, country, sources }} 
                    currentSummary={currentSummary}
                    isRightPanelCollapsed={isRightPanelCollapsed}
                    onExpandPanel={() => setIsRightPanelCollapsed(false)}
                />
                <MainSection {...{ country, sources, locale, pageDate }} />
            </div>
        </div>
    );
}