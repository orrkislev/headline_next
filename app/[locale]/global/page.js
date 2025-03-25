import HebrewFonts from "@/utils/typography/HebrewFonts";
import GlobalGrid from "./GlobalGrid";
import GlobalSummarySection from "./GlobalSummarySection";
import GlobalTopBar from "./GlobalTopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";
import { getAICountrySort } from "@/utils/database/globalData";

export default async function GlobalPage({ params }) {
    const { locale } = await params;  
    const AICountrySort = await getAICountrySort();
    return (
        <div className={`absolute flex flex-col sm:flex-row w-full h-full overflow-auto sm:overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <HebrewFonts />
            <EnglishFonts />
            <div className={`w-[370px] flex-shrink-0 sm:border-l sm:border-r border-gray-200 flex`}>
                <GlobalSummarySection locale={locale}/>
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <GlobalTopBar {...{locale}} />
                <GlobalGrid {...{locale, AICountrySort}} />
            </div>
        </div>
    );
}