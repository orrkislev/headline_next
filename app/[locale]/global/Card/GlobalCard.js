'use client'

import { useEffect, useMemo, useState } from "react";
import CountryName from "./CountryName";
import Headline from "./Headline";
import Content from "./Content";
import useFirebase from "@/utils/database/useFirebase";
import { getTypographyOptions } from "@/utils/typography/typography";

export default function GlobalCard({ country, locale, index }) {
    const [summary, setSummary] = useState(null)
    const firebase = useFirebase()

    useEffect(() => {
        if (!firebase.db) return;
        const unsubscribe = firebase.subscribeToSummaries(country, (newSummaries) => {
            setSummary(newSummaries[0])
        })
        return () => unsubscribe();
    }, [country, firebase.db])

    if (!summary) return null;

    let typography = getTypographyOptions(locale == 'heb' ? 'Israel' : 'US').options[index == 0 ? 0 : 1]
    typography = JSON.parse(JSON.stringify(typography))
    
    return (
        <div className={`source-card relative bg-white hover:bg-neutral-100 transition-colors duration-200 border border-dotted border-neutral-200
                        ${[0, 11, 12, 17].includes(index) ? 'col-span-2' : 'col-span-1'}
                        ${locale == 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-4 mb-1 p-4">
                    <CountryName country={country} typography={typography} />
                    <Headline {...{ summary, country, locale, typography, index }} />
                </div>
                <Content {...{ summary, locale }} />
            </div>
        </div>
    );
}