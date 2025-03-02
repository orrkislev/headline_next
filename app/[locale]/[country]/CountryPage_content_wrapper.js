'use client'

import { useMemo, useState } from "react";
import getSourceOrder from "@/utils/sources/source orders";
import dynamic from "next/dynamic";
import CountryPageContent from "./CountryPage_content";
import { getTypographyOptions } from "@/utils/typography/typography";
import { choose } from "@/utils/utils";

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
    const [view, setView] = useState('grid');
    const [font, setFont] = useState(choose(getTypographyOptions(country).options));

    const day = useMemo(() => date.toDateString(), [date]);
    const typoOptions = useMemo(() => getTypographyOptions(country), [country]);

    return (
        <>
            <DataManipulator {...{
                country,
                setSources, sources,
                setSummaries, initialSummaries,
                setDailySummaries, initialDailySummary,
                setFetchedDates, fetchedDates,
                day, setDate,
            }} />
            <CountryPageContent {...{
                sources, summaries,
                locale, country,
                date, setDate, day,
                activeWebsites, setActiveWebsites,
                order, setOrder,
                view, setView,
                typoOptions, font, setFont
            }} />
        </>
    )

}