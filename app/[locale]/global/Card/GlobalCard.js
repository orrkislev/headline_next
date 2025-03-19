'use client'

import { useEffect, useState } from "react";
import CountryName from "./CountryName";
import Headline from "./Headline";
import Content from "./Content";
import useFirebase from "@/utils/database/useFirebase";
import { getTypographyOptions } from "@/utils/typography/typography";
import { useGlobalSort, useGlobalCountryCohesion } from "@/utils/store";


export default function GlobalCard({ country, locale, pinned, index }) {
    const [summary, setSummary] = useState(null)
    const setGlobalCountryCohesion = useGlobalCountryCohesion(state => state.setGlobalCountryCohesion)
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

    let typography = getTypographyOptions(locale == 'heb' ? 'israel' : 'us').options[index == 0 ? 1 : 0]
    typography = JSON.parse(JSON.stringify(typography))

    return (
        <div style={{ order: index }}
            className={`global-card source-card relative bg-neutral-50 hover:bg-white border border-dotted border-neutral-200 hover:shadow-xl
                        ${[0, 1, 11, 12, 16, 17].includes(index) ? 'col-span-3' : 'col-span-2'}
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