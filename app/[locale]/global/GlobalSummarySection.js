
import Disclaimer from "@/components/Disclaimer";
import DynamicLogo from "@/components/Logo";
import GlobalOverview from "./GlobalOverview";

export default async function GlobalSummarySection({ locale }) {
    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden p-2 w-full`}>
            <DynamicLogo locale={locale} />
            
            <GlobalOverview locale={locale} />
            <div className='py-2 px-4 bg-white border-t border-gray-200'>
                <Disclaimer />
            </div>
        </div>
    )
}