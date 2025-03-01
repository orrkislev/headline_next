'use client'

import { useState } from "react";
import getSourceOrder from "@/utils/sources/source orders";
import dynamic from "next/dynamic";
import CountryPageContent from "./CountryPage_content";

const DataManipulator = dynamic(() => import('./DataManipulator'));

export default function ContentWrapper({ initialSummaries, initialSources, initialDailySummary, locale, country }) {
    const [sources, setSources] = useState(initialSources);
    const [summaries, setSummaries] = useState(initialSummaries);
    const [dailySummaries, setDailySummaries] = useState([initialDailySummary]);
    const [fetchedDates, setFetchedDates] = useState([]);
    const [date, setDate] = useState(new Date());
    const [activeWebsites, setActiveWebsites] = useState(() => {
        const sourceOrder = getSourceOrder(country, 'default');
        return sourceOrder.slice(0, 6)
    });
    const [order, setOrder] = useState('default');

    return (
        <>
            <DataManipulator {...{ 
                setSources, sources,
                setSummaries, initialSummaries,
                setDailySummaries, initialDailySummary,
                setFetchedDates, 
                setDate, country }}/>
            <CountryPageContent {...{ 
                sources, summaries, 
                locale, country, 
                date, setDate, 
                activeWebsites, setActiveWebsites, 
                order }}/>
        </>
    )

}