import Disclaimer from "@/components/Disclaimer";
import DynamicLogo from "@/components/Logo";
import GlobalOverview from "./GlobalOverview";

export default async function GlobalSummarySection({ locale }) {
    return (
        <div className={`summary-section flex flex-col gap-4 h-full overflow-hidden px-4 pb-2 w-full`}>
            <DynamicLogo locale={locale} />
            
            <div className="h-full custom-scrollbar">
                <div className="px-4">
                    <GlobalOverview locale={locale} />
                </div>
            </div>
            <div className='py-2 bg-white border-t border-gray-200'>
                <Disclaimer locale={locale} />
            </div>
        </div>
    )
}