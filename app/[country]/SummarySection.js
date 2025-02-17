'use client'

import { useLayoutEffect, useMemo, useRef } from "react";
import { sum } from "firebase/firestore";
import { useDate } from "./SideSlider";
import Summary from "./summaries/Summary";

export default function SummarySection({ summaries }) {
    const date = useDate((state) => state.date);
    const ref = useRef();

    const summariesBefore = useMemo(() => summaries.filter(summary => summary.timestamp < date), [summaries, date]);
    const summariesAfter = useMemo(() => summaries.filter(summary => summary.timestamp > date), [summaries, date]);

    useLayoutEffect(() => {
        const childIndex = summariesAfter.length;
        const child = ref.current.children[childIndex];
        ref.current.scrollTo({ top: child.offsetTop, behavior: 'smooth' });
        if (child) child.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [summariesAfter]);

    return (
        <div className="flex-[5] flex flex-col gap-4 h-full overflow-auto divide-y divide-gray-200" ref={ref}>
            {summariesAfter.map((summary, i) => (
                <Summary key={i} summary={summary} />
            ))}
            {summariesBefore.map((summary, i) => (
                <Summary key={i} summary={summary} active={i === 0} />
            ))}
        </div>
    );
}
