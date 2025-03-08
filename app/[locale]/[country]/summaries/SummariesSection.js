'use client'

import Disclaimer from "@/components/Disclaimer";
import DailySummary from "./DailySummary";
import SummariesList from "./SummariesList";
import YesterdaySummaryTitle from "./YesterSummaryTitle";
import { useTime } from "@/utils/store";
import { useEffect, useMemo, useState } from "react";
import useSummariesManager from "@/utils/database/useSummariesManager";
import useDailySummariesManager from "@/utils/database/useDailySummariesManager";

const calculateDisplaySummaries = (day, summaries) => {
    const daySummaries = summaries.filter(summary => summary.timestamp.toDateString() === day).sort((a, b) => b.timestamp - a.timestamp)
    const dayBefore = new Date(day + 'UTC')
    dayBefore.setDate(dayBefore.getDate() - 1)
    const dayBeforeString = dayBefore.toDateString()
    const lastSummaryDayBefore = summaries.filter(summary => summary.timestamp.toDateString() === dayBeforeString)[0]
    return [...daySummaries, lastSummaryDayBefore]
}

export default function SummariesSection({ initialSummaries, locale, country, initialDailySummaries }) {
    const dailySummaries = useDailySummariesManager(country, initialDailySummaries);
    const summaries = useSummariesManager(country, initialSummaries);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const [displaySummaries, setDisplaySummaries] = useState(date ? calculateDisplaySummaries(date.toDateString(), summaries) : calculateDisplaySummaries(new Date().toDateString(), summaries));
    const [activeSummaryId, setActiveSummaryId] = useState(summaries.sort((a, b) => b.timestamp - a.timestamp)[0]?.id);


    useEffect(() => {
        if (!date) return
        setDay(date.toDateString());
        const sortedSummaries = summaries.sort((a, b) => b.timestamp - a.timestamp);
        setActiveSummaryId(sortedSummaries.find(summary => summary.timestamp <= date)?.id);
    }, [date, summaries]);

    useEffect(() => {
        setDisplaySummaries(calculateDisplaySummaries(day, summaries))
    }, [day, summaries])

    return (
        <>
            <DailySummary {...{ locale, day, dailySummaries }} />
            <SummariesList summaries={displaySummaries} {...{ activeSummaryId, locale }} />
            <div className='py-2 bg-white border-t border-gray-200'>
                <YesterdaySummaryTitle {...{ locale, day, dailySummaries }} summary={displaySummaries[displaySummaries.length - 1]} />
                <Disclaimer {...{ locale }} />
            </div>
        </>
    )
}