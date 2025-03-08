import DynamicLogo from "@/components/Logo";
import SummariesSection from "./summaries/SummariesSection";

export default function RightPanel({ summaries, locale, country, dailySummaries }) {
    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden px-4 pb-2`}>
            <DynamicLogo {...{ locale }} />
            <SummariesSection {...{ country, locale}}
                initialDailySummaries={dailySummaries}   
                initialSummaries={summaries} />
        </div>
    );
}