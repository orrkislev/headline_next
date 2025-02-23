'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Summary from "./summaries/Summary";
import { useDate } from "@/components/TimeManager";
import DynamicLogo from "@/components/Logo";
import { sub } from "date-fns";
import { useData } from "@/components/DataManager";
import YesterdaySummaryTitle from "./summaries/YesterSummaryTitle";
import DailySummary from "./summaries/DailySummary";
import { useParams } from "next/navigation";

export default function SummarySection() {
    const summaries = useData((state) => state.summaries);
    const day = useDate((state) => state.date.toDateString());
    const ref = useRef();
    const [currentSummaryId, setCurrentSummaryId] = useState(null);

    const lastSummaryDayBefore = useMemo(() => {
        const date = new Date(day)
        const dayBefore = sub(date, { days: 1 });
        const dayBeforeSummaries = summaries.filter(summary => summary.timestamp.toDateString() === dayBefore.toDateString());
        return dayBeforeSummaries.length > 0 ? dayBeforeSummaries[0] : null;
    }, [day, summaries]);

    const currentSummary = useMemo(() => summaries.find(summary => summary.id === currentSummaryId), [currentSummaryId, summaries]);

    useLayoutEffect(() => {
        const childIndex = summaries.findIndex(summary => summary.id === currentSummaryId);
        if (childIndex === -1) return;
        const child = ref.current.children[childIndex];
        if (child) child.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [currentSummaryId, summaries]);

    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden p-2`}>
            <DynamicLogo />
            <DailySummary />
            <div className="flex flex-col gap-2 h-full overflow-auto divide-y divide-gray-200 p-2" ref={ref}>
                <SummariesTimeManager setCurrentSummaryId={setCurrentSummaryId} />
                {summaries.map((summary, i) => (
                    <Summary key={i} summary={summary} active={summary.id === currentSummaryId} />
                ))}

                <YesterdaySummary lastSummaryDayBefore={lastSummaryDayBefore} />
            </div>
            <div className='py-2 px-4 bg-white border-t border-gray-200'>
                <YesterdaySummaryTitle lastSummaryDayBefore={lastSummaryDayBefore} />
                <Disclaimer />
            </div>
        </div>
    );
}

function Disclaimer() {
    const { locale } = useParams()
    return (
        <div className='text-gray-400 pt-4 font-semibold border-t border-gray-200 frank-re'>
            {locale === 'heb' ? 'סקירות אלו נכתבו על ידי הבינה' : 'These overviews were written by an AI'}
        </div>
    );
}

function YesterdaySummary({ lastSummaryDayBefore }) {
    const { locale } = useParams()
    if (!lastSummaryDayBefore) return null;
    return (
        <>
            <div className='text-gray-200 font-semibold text-lg pt-4 frank-re'>{locale === 'heb' ? 'היום הקודם' : 'PREVIOUS DAY'}</div>
            <Summary summary={lastSummaryDayBefore} />
        </>
    );
}

function SummariesTimeManager({ setCurrentSummaryId }) {
    const minutes = useDate(state => state.date.getHours() * 60 + state.date.getMinutes());
    const day = useDate(state => state.date.toDateString());
    const summaries = useData(state => state.summaries);
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
    }, [day, summaries]);

    useEffect(() => {
        const newCurrent = data.find(item => item.time < minutes);
        if (newCurrent && newCurrent.id !== currentId.current) {
            currentId.current = newCurrent.id;
            setCurrentSummaryId(newCurrent.id);
        }
    }, [data, minutes, setCurrentSummaryId]);

    return null;
}