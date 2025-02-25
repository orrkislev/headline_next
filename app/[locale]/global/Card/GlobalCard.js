'use client'

import { useEffect, useMemo, useState } from "react";
import CountryName from "./CountryName";
import Headline from "./Headline";
import Content from "./Content";
import { subscribeToSummaries } from "@/utils/database/countryData";
import { useParams } from "next/navigation";
import { choose } from "@/utils/utils";

export default function GlobalCard({ country, index }) {
    const { locale } = useParams()
    const [summary, setSummary] = useState(null)

    useEffect(() => {
        const unsubscribe = subscribeToSummaries(country, (summaries) => {
            setSummary(summaries[0])
        })
        return () => unsubscribe();
    }, [country])

    if (!summary) return null;


    return (
        <div className={`source-card relative bg-neutral-100 hover:bg-white border-b border-gray-200 transition-colors duration-200 
                        ${index % 8 < 2 ? 'col-span-3' : 'col-span-2'}
                        ${locale == 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-4 mb-4 p-4">
                    <CountryName country={country} />
                    <Headline summary={summary} country={country} index={index} />
                </div>
                <div>
                    <Content summary={summary} />
                </div>
            </div>
        </div>
    );
}