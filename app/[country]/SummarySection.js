'use client'

import { useLayoutEffect, useMemo, useRef } from "react";
import Summary from "./summaries/Summary";
import { useDate } from "@/components/PresetTimeManager";
import DynamicLogo from "@/components/Logo";
import ScrollToDiv from "@/components/ScrollToDiv";
import { sub } from "date-fns";
import { useData } from "@/components/DataManager";

export default function SummarySection() {
    const summaries = useData((state) => state.summaries);
    const date = useDate((state) => state.date);
    const day = useDate((state) => state.date.toDateString());
    const ref = useRef();

    const daySummaries = useMemo(() => summaries.filter(summary => summary.timestamp.toDateString() === day), [summaries, day]);
    const summariesBefore = useMemo(() => daySummaries.filter(summary => summary.timestamp < date), [daySummaries, date]);
    const summariesAfter = useMemo(() => daySummaries.filter(summary => summary.timestamp > date), [daySummaries, date]);

    const lastSummaryDayBefore = useMemo(()=>{
        const dayBefore = sub(date, {days: 1});
        const dayBeforeSummaries = summaries.filter(summary => summary.timestamp.toDateString() === dayBefore.toDateString());
        return dayBeforeSummaries.length > 0 ? dayBeforeSummaries[0] : null;
    }, [day, summaries]);

    useLayoutEffect(() => {
        const childIndex = summariesAfter.length;
        const child = ref.current.children[childIndex];
        if (child) child.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [summariesAfter]);

    return (
        <div className="flex flex-col gap-4 h-full overflow-hidden p-2">
            <DynamicLogo />
            <div className="flex flex-col gap-4 h-full overflow-auto divide-y divide-gray-200 p-4" ref={ref}>
                {summariesAfter.map((summary, i) => (
                    <Summary key={i} summary={summary} />
                ))}
                {summariesBefore.map((summary, i) => (
                    <Summary key={i} summary={summary} active={i === 0} />
                ))}

                {lastSummaryDayBefore && (
                    <>
                    <div style={{fontFamily:'var(--font-frank-re)'}} className='text-gray-200 font-semibold text-lg pt-4'>היום הקודם</div>
                    <Summary summary={lastSummaryDayBefore} />
                    </>
                )}
            </div>
        </div>
    );
}
