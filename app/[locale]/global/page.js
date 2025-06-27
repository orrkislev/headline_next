'use client'

import React, { useState, useEffect } from "react";
import HebrewFonts from "@/utils/typography/HebrewFonts";
import GlobalGrid from "./GlobalGrid";
import GlobalSummarySection from "./GlobalSummarySection";
import GlobalTopBar from "./GlobalTopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";

export default function GlobalPage({ params }) {
    const [locale, setLocale] = useState(null);
    const [isGlobalSummaryCollapsed, setIsGlobalSummaryCollapsed] = useState(false);

    // Extract locale from params
    useEffect(() => {
        const extractLocale = async () => {
            const resolvedParams = await params;
            setLocale(resolvedParams.locale);
        };
        extractLocale();
    }, [params]);

    if (!locale) {
        return null; // Loading state while extracting locale
    }

    return (
        <div className={`absolute flex flex-col sm:flex-row w-full h-full overflow-auto sm:overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <HebrewFonts />
            <EnglishFonts />
            <div className={`${isGlobalSummaryCollapsed ? 'w-[48px]' : 'w-full sm:w-[380px]'} flex-shrink-0 sm:border-l sm:border-r border-gray-200 flex transition-all duration-300`}>
                <GlobalSummarySection 
                    locale={locale}
                    onCollapsedChange={setIsGlobalSummaryCollapsed}
                />
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <div className="hidden sm:block">
                    <GlobalTopBar {...{locale}} />
                </div>
                <GlobalGrid {...{locale}} />
            </div>
        </div>
    );
}