'use client'

import { useEffect, useState } from "react";
import CountryName from "./CountryName";
import Headline from "./Headline";
import Content from "./Content";
import useFirebase from "@/utils/database/useFirebase";
import { getTypographyOptions } from "@/utils/typography/typography";
import { useGlobalSort, useGlobalCountryCohesion } from "@/utils/store";
import { countries } from "@/utils/sources/countries";


export default function GlobalCard({ country, locale, AICountrySort }) {
    const [summary, setSummary] = useState(null)
    const { globalSort } = useGlobalSort()
    const { globalCountryCohesion, setGlobalCountryCohesion } = useGlobalCountryCohesion()
    const firebase = useFirebase()

    useEffect(() => {
        if (!firebase.db) return;
        const unsubscribe = firebase.subscribeToSummaries(country, (newSummaries) => {
            setSummary(newSummaries[0])
            setGlobalCountryCohesion(country, newSummaries[0].relativeCohesion)
        })
        return () => unsubscribe();
    }, [country, firebase.db])

    if (!summary) return null;


    let index = Object.keys(countries).indexOf(country)
    if (globalSort == 'ai') index = AICountrySort.indexOf(country)
    if (globalSort == 'cohesion') index = Object.entries(globalCountryCohesion).sort((a, b) => b[1] - a[1]).findIndex(c => c[0] == country)
    if (globalSort == 'population') index = Object.entries(countries).sort((a, b) => b[1].population - a[1].population).findIndex(c => c[0] == country)
    if (globalSort == 'softPower') index = Object.entries(countries).sort((a, b) => a[1].softPower - b[1].softPower).findIndex(c => c[0] == country)
    if (globalSort == 'pressFreedom') index = Object.entries(countries).sort((a, b) => a[1].pressFreedom - b[1].pressFreedom).findIndex(c => c[0] == country)
    if (index < 0) index = 100

    let typography = getTypographyOptions(locale == 'heb' ? 'israel' : 'us').options[0]
    typography = JSON.parse(JSON.stringify(typography))

    return (
        <div style={{ order: index }}
            className={`global-card source-card relative bg-white hover:bg-neutral-100 border border-dotted border-neutral-200 hover:shadow-xl
                        ${[0, 1, 11, 12, 16, 17].includes(index) ? 'col-span-3' : 'col-span-2'}
                        ${locale == 'heb' ? 'direction-rtl text-right' : 'direction-ltr'}
                        flex flex-col h-full justify-between`}>
            <div className="flex flex-col gap-4 mb-1 p-4">
                <CountryName country={country} typography={typography} />
                <Headline {...{ summary, country, locale, typography, index }} />
            </div>
            <Content {...{ summary, locale }} />
        </div>
    );
}