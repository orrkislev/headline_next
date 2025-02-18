'use client'

import { useLayoutEffect, useMemo, useRef } from "react";
import Summary from "./summaries/Summary";
import { useDate } from "@/components/PresetTimeManager";
import DynamicLogo from "@/components/Logo";
import ScrollToDiv from "@/components/ScrollToDiv";

export default function SummarySection({ summaries }) {
    const date = useDate((state) => state.date);
    const ref = useRef();

    const summariesBefore = useMemo(() => summaries.filter(summary => summary.timestamp < date), [summaries, date]);
    const summariesAfter = useMemo(() => summaries.filter(summary => summary.timestamp > date), [summaries, date]);

    // useLayoutEffect(() => {
    //     const childIndex = summariesAfter.length;
    //     const child = ref.current.children[childIndex];
    //     // ref.current.scrollTo({ top: child.offsetTop, behavior: 'smooth' });
    //     console.log('scrolling to', childIndex);
    //     // if (child) child.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, [summariesAfter]);

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
            </div>
        </div>
    );
}
