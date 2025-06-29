'use client'

import { useEffect, useState } from "react";
import CountryName from "./CountryName";
import Headline from "./Headline";
import Content from "./Content";
import useFirebase from "@/utils/database/useFirebase";
import { useGlobalSort, useGlobalCountryCohesion, useGlobalCountryTimestamps } from "@/utils/store";
import { getCardSpanClasses } from "../responsiveGrid";

export default function GlobalCard({ country, locale, pinned, index, typography }) {
    const [summary, setSummary] = useState(null)
    const setGlobalCountryCohesion = useGlobalCountryCohesion(state => state.setGlobalCountryCohesion)
    const setGlobalCountryTimestamp = useGlobalCountryTimestamps(state => state.setGlobalCountryTimestamp)
    const firebase = useFirebase()

    useEffect(() => {
        if (!firebase.db) return;
        const unsubscribe = firebase.subscribeToSummaries(country, (newSummaries) => {
            setSummary(newSummaries[0])
            setGlobalCountryCohesion(country, newSummaries[0].relativeCohesion)
            setGlobalCountryTimestamp(country, newSummaries[0].timestamp)
        })
        return () => unsubscribe();
    }, [country, firebase.db])

    if (!summary) return null;

    return (
        <div style={{ order: index }}
            className={`global-card source-card relative ${pinned >= 0 ? 'bg-white border border-gray-100' : 'bg-gray-100'} hover:bg-white hover:shadow-xl
                        ${getCardSpanClasses(index)}
                        ${locale == 'heb' ? 'direction-rtl text-right' : 'direction-ltr'}
                        flex flex-col h-full justify-between`}>
            <div className="flex flex-col gap-4 mb-1 p-4">
                <CountryName {...{ country, typography, locale }} />    
                <Headline {...{ summary, country, locale, typography, index }} />
            </div>
            <Content {...{ country, summary, locale, pinned }} />
        </div>
    );
}