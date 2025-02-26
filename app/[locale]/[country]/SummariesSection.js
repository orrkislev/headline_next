import Summary from "./summaries/Summary";

export default function SummariesSection({ summaries, locale, day }) {

    return (
        <>
            {/* <DailySummary locale={locale} /> */}
            <div className={`custom-scrollbar h-full flex flex-col h-full p-2 ${locale === 'heb' ? 'pl-4' : 'pr-4'}`} ref={ref}>
                {summaries.map((summary, i) => (
                    <Summary key={i} summary={summary} active={i == 0} locale={locale} />
                ))}
            </div>
            {/* <div className='py-2 bg-white border-t border-gray-200'> */}
            {/* <YesterdaySummaryTitle lastSummaryDayBefore={lastSummaryDayBefore} /> */}
            {/* <Disclaimer /> */}
            {/* </div> */}
        </>
    )
}