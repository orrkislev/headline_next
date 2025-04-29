
import DynamicLogo from "@/components/Logo";
import SummariesSection from "./summaries/SummariesSection";
import MobileBar from "./MobileBar";

export default function RightPanel({ initialSummaries, locale, country, initialDailySummaries, pageDate }) {

    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden px-4 pb-2`}>
            <DynamicLogo {...{ locale }} />
            <MobileBar {...{ locale, country, pageDate }} />
            <SummariesSection {...{ locale, initialSummaries, country, initialDailySummaries, pageDate }} />
        </div>
    );
}