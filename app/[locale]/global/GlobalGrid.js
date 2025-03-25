'use client'

import { countries } from "@/utils/sources/countries";
import GlobalCard from "./Card/GlobalCard";
import { useEffect } from "react";
import { useGlobalCountryCohesion, useGlobalSort } from "@/utils/store";
import { getGridColumnClasses } from "./responsiveGrid";

export default function GlobalGrid({ locale, AICountrySort }) {
    const globalSort = useGlobalSort(state => state.globalSort)
    const pinnedCountries = useGlobalSort(state => state.pinnedCountries)
    const setPinnedCountries = useGlobalSort(state => state.setPinnedCountries)
    const globalCountryCohesion = useGlobalCountryCohesion(state => state.globalCountryCohesion)

    useEffect(() => {
        const pinnedCountries = localStorage.getItem('pinnedCountries');
        if (pinnedCountries) {
            setPinnedCountries(JSON.parse(pinnedCountries));
        }
    }, [])

    let countryOrder = [...AICountrySort]
    if (globalSort == 'cohesion') countryOrder = Object.entries(globalCountryCohesion).sort((a, b) => b[1] - a[1]).map(c => c[0])
    if (globalSort == 'population') countryOrder = Object.entries(countries).sort((a, b) => b[1].population - a[1].population).map(c => c[0])
    if (globalSort == 'softPower') countryOrder = Object.entries(countries).sort((a, b) => a[1].softPower - b[1].softPower).map(c => c[0])
    if (globalSort == 'pressFreedom') countryOrder = Object.entries(countries).sort((a, b) => a[1].pressFreedom - b[1].pressFreedom).map(c => c[0])

    countryOrder.sort((a, b) => {
        const pinnedA = pinnedCountries.indexOf(a)
        const pinnedB = pinnedCountries.indexOf(b)
        if (pinnedA != -1 && pinnedB != -1) return pinnedA - pinnedB
        if (pinnedA != -1) return -1
        if (pinnedB != -1) return 1
        return 0
    })

    return (
        <div className={`custom-scrollbar overflow-y-auto grid ${getGridColumnClasses()} gap-4 p-4`}>
            {countryOrder.map((country, index) => (
                <GlobalCard key={index} {...{ country, locale, index }} pinned={pinnedCountries.indexOf(country)} />
            ))}
        </div>
    );
}