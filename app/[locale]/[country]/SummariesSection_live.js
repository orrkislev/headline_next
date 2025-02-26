'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Summary from "./summaries/Summary";
import { useDate } from "@/components/TimeManager";
import { add, sub } from "date-fns";
import { useData } from "@/components/DataManager";
import YesterdaySummaryTitle from "./summaries/YesterSummaryTitle";
import DailySummary from "./summaries/DailySummary";
import { useParams } from "next/navigation";
import Disclaimer from "@/components/Disclaimer";
import { SummariesContainer } from "./SummariesSection";

export default function SummariesSectionLive({ initialSummaries, locale }) {
    const summaries = useData((state) => state.summaries);
    const date = useDate((state) => state.date);
    const setDate = useDate((state) => state.setDate);
    const day = useDate((state) => state.date.toDateString());
    const ref = useRef();

    // const [currentSummaryId, setCurrentSummaryId] = useState(initialSummaries[0]?.id);
    const currentSummaryId = useMemo(() => {
        return summaries.find(summary => summary.timestamp < date)?.id;
    }, [summaries, date])

    const lastSummaryDayBefore = useMemo(() => {
        const date = new Date(day)
        const dayBefore = sub(date, { days: 1 });
        const dayBeforeSummaries = summaries.filter(summary => summary.timestamp.toDateString() === dayBefore.toDateString());
        return dayBeforeSummaries.length > 0 ? dayBeforeSummaries[0] : null;
    }, [day, summaries]);

    const daySummaries = useMemo(() => summaries.filter(summary => summary.timestamp.toDateString() === day), [day, summaries]);

    useLayoutEffect(() => {
        const childIndex = daySummaries.findIndex(summary => summary.id === currentSummaryId);
        if (childIndex === -1) return;
        const child = ref.current.children[childIndex];
        if (child) child.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [currentSummaryId, daySummaries]);

    return (
        <>
            {/* <SummariesTimeManager setCurrentSummaryId={setCurrentSummaryId} initialSummaries={initialSummaries} /> */}
            {/* <DailySummary locale={locale} /> */}
            <SummariesContainer locale={locale} ref={ref}>
                {daySummaries.map((summary, i) => (
                    <Summary key={i} summary={summary} active={summary.id === currentSummaryId}
                        click={() => setDate(add(summary.timestamp, { minutes: 1 }))} locale={locale}
                    />
                ))}

                {lastSummaryDayBefore && (
                    <>
                        <div className={`text-gray-200 text-lg pt-4 ${locale === 'en' ? 'font-sans' : 'frank-re'}`}>{locale === 'heb' ? 'היום הקודם' : 'PREVIOUS DAY'}</div>
                        <div className={`py-2 ${locale === 'en' ? 'font-sans' : 'frank-re'} leading-none font-normal cursor-pointer text-gray-200 hover:text-gray-500 transition-colors border-b border-dashed border-gray-200`} />
                        <Summary summary={lastSummaryDayBefore} active={false} locale={locale} />
                    </>
                )}

            </SummariesContainer>
            <div className='py-2 bg-white border-t border-gray-200'>
                <YesterdaySummaryTitle lastSummaryDayBefore={lastSummaryDayBefore} locale={locale} />
                <Disclaimer />
            </div>
        </>
    );
}


function SummariesTimeManager({ setCurrentSummaryId, initialSummaries }) {
    const minutes = useDate(state => state.date.getHours() * 60 + state.date.getMinutes());
    const day = useDate(state => state.date.toDateString());
    const summaries = useData(state => state.summaries || initialSummaries);
    const [data, setData] = useState([]);
    const currentId = useRef(null)

    useEffect(() => {
        const todaySummaries = summaries.filter(headline => headline.timestamp.toDateString() === day);
        const newData = todaySummaries.map(summary => ({
            time: summary.timestamp.getHours() * 60 + summary.timestamp.getMinutes(),
            id: summary.id,
        }));
        newData.sort((a, b) => b.time - a.time);
        setData(newData);
    }, [day, summaries.length]);

    useEffect(() => {
        const newCurrent = data.find(item => item.time < minutes);
        if (newCurrent && newCurrent.id !== currentId.current) {
            currentId.current = newCurrent.id;
            setCurrentSummaryId(newCurrent.id);
        }
    }, [data, minutes, setCurrentSummaryId]);


    return null;
}