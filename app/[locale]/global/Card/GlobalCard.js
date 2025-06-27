'use client'

import { useEffect, useState } from "react";
import CountryName from "./CountryName";
import Headline from "./Headline";
import Content from "./Content";
import useFirebase from "@/utils/database/useFirebase";
import { getTypographyOptions } from "@/utils/typography/typography";
import { useGlobalSort, useGlobalCountryCohesion } from "@/utils/store";
import { getCardSpanClasses } from "../responsiveGrid";

const randomFontIndex = Math.floor(Math.random() * 100)

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

    const typographyOptions = getTypographyOptions(locale == 'heb' ? 'israel' : 'us').options
    let typography = typographyOptions[randomFontIndex % typographyOptions.length]
    typography = JSON.parse(JSON.stringify(typography))

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