'use client'

import { countries } from "@/utils/sources/countries";
import GlobalCard from "./Card/GlobalCard";
import { useEffect, useState, useMemo } from "react";
import { useGlobalCountryCohesion, useGlobalSort, useGlobalCountryTimestamps, useFont } from "@/utils/store";
import { getGridColumnClasses } from "./responsiveGrid";
import { getAICountrySort } from "@/utils/database/globalData";
import { getTypographyOptions } from "@/utils/typography/typography";
import { choose } from "@/utils/utils";

export default function GlobalGrid({ locale, AICountrySort: initialAICountrySort, countrySummaries }) {
    const [AICountrySort, setAICountrySort] = useState(initialAICountrySort || []);
    const [isLoading, setIsLoading] = useState(!initialAICountrySort);
    const [mounted, setMounted] = useState(false);
    
    // Use hooks with fallback for SSR
    const globalSort = useGlobalSort(state => state?.globalSort) || 'ai';
    const pinnedCountries = useGlobalSort(state => state?.pinnedCountries) || [];
    const setPinnedCountries = useGlobalSort(state => state?.setPinnedCountries);
    const filteredCountries = useGlobalSort(state => state?.filteredCountries) || [];
    const setFilteredCountries = useGlobalSort(state => state?.setFilteredCountries) || (() => {});
    const globalCountryCohesion = useGlobalCountryCohesion(state => state?.globalCountryCohesion) || {};
    const globalCountryTimestamps = useGlobalCountryTimestamps(state => state?.globalCountryTimestamps) || {};
    const font = useFont((state) => state?.font) || 'random';

    useEffect(() => {
        setMounted(true);
    }, []);

    // Select typography consistently for all cards, following SourceCard pattern
    const typography = useMemo(() => {
        let typo = font
        const options = getTypographyOptions(locale == 'heb' ? 'israel' : 'us').options
        if (typeof font === 'number') typo = options[font % options.length]
        else if (font == 'random') typo = choose(options)
        
        // Create a deep copy to avoid mutations
        return JSON.parse(JSON.stringify(typo))
    }, [font, locale]);

    useEffect(() => {
        if (mounted && setPinnedCountries) {
            const pinnedCountries = localStorage.getItem('pinnedCountries');
            if (pinnedCountries) {
                setPinnedCountries(JSON.parse(pinnedCountries));
            }
        }
    }, [mounted, setPinnedCountries])

    // Fetch AI country sort if not provided (client-side only)
    useEffect(() => {
        if (!initialAICountrySort && mounted) {
            getAICountrySort().then(data => {
                setAICountrySort(data);
                setIsLoading(false);
            }).catch(() => {
                // Fallback to default country order
                setAICountrySort(Object.keys(countries));
                setIsLoading(false);
            });
        }
    }, [initialAICountrySort, mounted]);

    // For SSR, always render with the provided data
    if (isLoading && !initialAICountrySort) {
        return null;
    }

    let countryOrder = [...AICountrySort]
    if (globalSort == 'cohesion') countryOrder = Object.entries(globalCountryCohesion).sort((a, b) => b[1] - a[1]).map(c => c[0])
    if (globalSort == 'population') countryOrder = Object.entries(countries).sort((a, b) => b[1].population - a[1].population).map(c => c[0])
    if (globalSort == 'softPower') countryOrder = Object.entries(countries).sort((a, b) => a[1].softPower - b[1].softPower).map(c => c[0])
    if (globalSort == 'pressFreedom') countryOrder = Object.entries(countries).sort((a, b) => a[1].pressFreedom - b[1].pressFreedom).map(c => c[0])
    if (globalSort == 'recency') countryOrder = Object.entries(globalCountryTimestamps).sort((a, b) => new Date(b[1]) - new Date(a[1])).map(c => c[0])

    countryOrder.sort((a, b) => {
        const pinnedA = pinnedCountries.indexOf(a)
        const pinnedB = pinnedCountries.indexOf(b)
        if (pinnedA != -1 && pinnedB != -1) return pinnedA - pinnedB
        if (pinnedA != -1) return -1
        if (pinnedB != -1) return 1
        return 0
    })

    // Filter out countries that are in the filteredCountries array
    const visibleCountries = countryOrder.filter(country => !filteredCountries.includes(country));

    return (
        <div className={`custom-scrollbar overflow-y-auto grid ${getGridColumnClasses()} gap-4 p-4`}>
            {visibleCountries.map((country, index) => (
                <GlobalCard 
                    key={index} 
                    {...{ country, locale, index, typography }} 
                    pinned={pinnedCountries.indexOf(country)} 
                    initialSummary={countrySummaries?.[country] || null}
                />
            ))}
        </div>
    );
}