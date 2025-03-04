import DynamicLogo from "@/components/Logo";
import Summary from "./summaries/Summary";
import { useMemo } from "react";
import Disclaimer from "@/components/Disclaimer";
import DailySummary from "./summaries/DailySummary";
import YesterdaySummaryTitle from "./summaries/YesterSummaryTitle";

export default function RightPanel({ summaries, locale, date, setDate, day, dailySummaries }) {

    const daySummaries = useMemo(() => {
        return summaries.filter(summary => summary.timestamp.toDateString() === day)
    }, [summaries, day])
    const lastSummaryDayBefore = useMemo(() => {
        const dayBefore = new Date(day + 'UTC')
        dayBefore.setDate(dayBefore.getDate() - 1)
        const dayBeforeString = dayBefore.toDateString()
        return summaries.filter(summary => summary.timestamp.toDateString() === dayBeforeString)[0]
    }, [summaries, day])

    const activeSummaryId = useMemo(() => {
        return summaries.find(summary => summary.timestamp <= date)?.id
    }, [summaries, date]);

    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden px-4 pb-2`}>
            <DynamicLogo {...{ locale }} />
            <DailySummary {...{locale, day, dailySummaries}} />
            <div className={`custom-scrollbar h-full flex flex-col h-full p-2 ${locale === 'heb' ? 'pl-4' : 'pr-4'}`}>
                {daySummaries.map((summary, i) => (
                    <Summary key={i} summary={summary} active={summary.id === activeSummaryId} locale={locale} setDate={setDate} />
                ))}
                {lastSummaryDayBefore && (
                    <Summary summary={lastSummaryDayBefore} active={lastSummaryDayBefore.id === activeSummaryId} locale={locale} setDate={setDate} />
                )}
            </div>
            <div className='py-2 bg-white border-t border-gray-200'>
                <YesterdaySummaryTitle {...{ locale, lastSummaryDayBefore, day, setDate, dailySummaries }} />
                <Disclaimer {...{ locale }} />
            </div>
        </div>
    );
}