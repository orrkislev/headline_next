'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HebrewFonts from "@/utils/typography/HebrewFonts";
import GlobalGrid from "./GlobalGrid";
import GlobalSummarySection from "./GlobalSummarySection";
import GlobalTopBar from "./GlobalTopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";
import useMobile from "@/components/useMobile";
import Loader from "@/components/loader";
import { useFont } from "@/utils/store";
import { ServerCountryNavigation } from "@/utils/ServerSideLinks";

export default function GlobalPage({ params }) {
    const router = useRouter();
    const { isMobile, isLoading } = useMobile();
    const [locale, setLocale] = useState(null);
    const [isGlobalSummaryCollapsed, setIsGlobalSummaryCollapsed] = useState(false);
    const { setFont } = useFont();

    // Set font to random for global page random font experience
    useEffect(() => {
        setFont("random");
    }, [setFont]);

    // Redirect mobile users to mobile page
    useEffect(() => {
        if (!isLoading && isMobile) {
            router.replace('/mobile');
        }
    }, [isMobile, isLoading, router]);

    // Extract locale from params
    useEffect(() => {
        const extractLocale = async () => {
            const resolvedParams = await params;
            setLocale(resolvedParams.locale);
        };
        extractLocale();
    }, [params]);

    if (!locale) {
        return <Loader />; // Loading state while extracting locale
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
            {/* Server-side links for SEO - links to all country main pages */}
            <ServerCountryNavigation locale={locale} currentCountry="global" />
        </div>
    );
}