'use client'

import { useLayoutEffect, useMemo, useRef } from "react";
import Summary from "./summaries/Summary";
import { useDate } from "@/components/TimeManager";
import DynamicLogo from "@/components/Logo";
import { sub } from "date-fns";
import { useData } from "@/components/DataManager";
import YesterdaySummaryTitle from "./summaries/YesterSummaryTitle";
import DailySummary from "./summaries/DailySummary";
import { usePreferences } from "@/components/PreferencesManager";

export default function SummarySection() {
    const summaries = useData((state) => state.summaries);
    const date = useDate((state) => state.date);
    const day = useDate((state) => state.date.toDateString());
    const ref = useRef();

    const todaySummaries = useMemo(() => summaries.filter(summary => summary.timestamp.toDateString() === day), [summaries, day]);
    const summariesBefore = useMemo(() => todaySummaries.filter(summary => summary.timestamp < date), [todaySummaries, date]);
    const summariesAfter = useMemo(() => todaySummaries.filter(summary => summary.timestamp > date), [todaySummaries, date]);

    const lastSummaryDayBefore = useMemo(() => {
        const dayBefore = sub(date, { days: 1 });
        const dayBeforeSummaries = summaries.filter(summary => summary.timestamp.toDateString() === dayBefore.toDateString());
        return dayBeforeSummaries.length > 0 ? dayBeforeSummaries[0] : null;
    }, [day, summaries]);

    useLayoutEffect(() => {
        const childIndex = summariesAfter.length;
        const child = ref.current.children[childIndex];
        if (child) child.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [summariesAfter]);

    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden p-2`}>
            <DynamicLogo />
            <DailySummary />
            <div className="flex flex-col gap-2 h-full overflow-auto divide-y divide-gray-200 p-2" ref={ref}>
                {summariesAfter.map((summary, i) => (
                    <Summary key={i} summary={summary} />
                ))}
                {summariesBefore.map((summary, i) => (
                    <Summary key={i} summary={summary} active={i === 0} />
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
    const locale = usePreferences((state) => state.locale);
    return (
        <div className='text-gray-400 pt-4 font-semibold border-t border-gray-200 frank-re'>
            {locale === 'heb' ? 'סקירות אלו נכתבו על ידי הבינה' : 'These overviews were written by an AI'}
        </div>
    );
}

function YesterdaySummary({ lastSummaryDayBefore }) {
    const locale = usePreferences((state) => state.locale);
    if (!lastSummaryDayBefore) return null;
    return (
        <>
            <div className='text-gray-200 font-semibold text-lg pt-4 frank-re'>{locale === 'heb' ? 'היום הקודם' : 'PREVIOUS DAY'}</div>
            <Summary summary={lastSummaryDayBefore} />
        </>
    );
}