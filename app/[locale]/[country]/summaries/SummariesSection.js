'use client'

import Disclaimer from "@/components/Disclaimer";
import SummariesList from "./SummariesList";
import YesterdaySummaryTitle from "./YesterSummaryTitle";
import { useTime } from "@/utils/store";
import { useEffect, useState } from "react";
import useSummariesManager from "@/utils/database/useSummariesManager";
import DailySummary from "./DailySummary";

const calculateDisplaySummaries = (day, summaries) => {
    const daySummaries = summaries.filter(summary => summary.timestamp.toDateString() === day).sort((a, b) => b.timestamp - a.timestamp)
    const dayBefore = new Date(day + 'UTC')
    dayBefore.setDate(dayBefore.getDate() - 1)
    const dayBeforeString = dayBefore.toDateString()
    const lastSummaryDayBefore = summaries.filter(summary => summary.timestamp.toDateString() === dayBeforeString)[0]
    return [...daySummaries, lastSummaryDayBefore]
}

export default function SummariesSection({ initialSummaries, locale, country, initialDailySummaries, pageDate }) {
    const summaries = useSummariesManager(country,initialSummaries, !Boolean(pageDate));
    
    const date = useTime(state => state.date);
    const [day, setDay] = useState(new Date().toDateString());
    const [displaySummaries, setDisplaySummaries] = useState(calculateDisplaySummaries(new Date().toDateString(), summaries));
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
            <DailySummary {...{locale, initialDailySummaries}}/>
            <SummariesList summaries={displaySummaries} {...{ activeSummaryId, locale, country}} />
            <div className='py-2 bg-white border-t border-gray-200'>
                <YesterdaySummaryTitle {...{ locale, country, day, initialDailySummaries }} summary={displaySummaries[displaySummaries.length - 1]} />
                <Disclaimer {...{ locale }} />
            </div>
        </>
    )
}