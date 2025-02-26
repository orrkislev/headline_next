'use client'

import DynamicLogo from "@/components/Logo";
import SummariesSection from "./SummariesSection";
import SummariesSectionLive from "./SummariesSection_live";
import { useState, useEffect } from "react";


export default function RightPanel({ initialSummaries, locale }) {
    const [live, setLive] = useState(false)

    useEffect(() => {
        setLive(true)
    }, [])

    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden px-4 pb-2`}>
            {/* <SummariesTimeManager setCurrentSummaryId={setCurrentSummaryId} initialSummaries={initialSummaries} /> */}
            <DynamicLogo />
            {live ? <SummariesSectionLive initialSummaries={initialSummaries} locale={locale} /> :
                <SummariesSection summaries={initialSummaries} locale={locale} />}
        </div>
    );
}