import Summary from "./Summary";

export default function SummariesList({ summaries, activeSummaryId, locale }) {

    const lastSummary = summaries[summaries.length - 1]

    return (
        <div className={`custom-scrollbar h-full flex flex-col h-full p-2 ${locale === 'heb' ? 'pl-4' : 'pr-4'}`}>
            {summaries.slice(0, -1).map((summary, i) => (
                <Summary key={i} summary={summary} active={summary.id === activeSummaryId} locale={locale} />
            ))}
            {lastSummary && (
                <Summary summary={lastSummary} active={lastSummary.id === activeSummaryId} locale={locale} />
            )}
        </div>
    )
}