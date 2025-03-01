import DynamicLogo from "@/components/Logo";
import Summary from "./summaries/Summary";
import { useMemo } from "react";
import Disclaimer from "@/components/Disclaimer";

export default function RightPanel({ summaries, locale, date, setDate }) {

    const day = useMemo(() => date.toDateString(), [date])
    const daySummaries = useMemo(() => {
        return summaries.filter(summary => summary.timestamp.toDateString() === day)
    }, [summaries, day])

    const activeSummary = useMemo(() => {
        return daySummaries.find(summary => summary.timestamp <= date)
    }, [daySummaries, date]);

    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden px-4 pb-2`}>
            <DynamicLogo {...{ locale }} />
            {/* <DailySummary locale={locale} /> */}
            <div className={`custom-scrollbar h-full flex flex-col h-full p-2 ${locale === 'heb' ? 'pl-4' : 'pr-4'}`}>
                {daySummaries.map((summary, i) => (
                    <Summary key={i} summary={summary} active={summary.id === activeSummary.id} locale={locale} setDate={setDate} />
                ))}
            </div>
            <div className='py-2 bg-white border-t border-gray-200'>
                {/* <YesterdaySummaryTitle lastSummaryDayBefore={lastSummaryDayBefore} /> */}
                <Disclaimer {...{ locale }} />
            </div>
        </div>
    );
}