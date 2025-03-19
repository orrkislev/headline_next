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
        <div className={`absolute flex w-full h-full overflow-auto ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <HebrewFonts />
            <EnglishFonts />
            <div className={`flex-[1] sm:border-l sm:border-r border-gray-200 flex max-w-[400px]`}>
                <GlobalSummarySection locale={locale}/>
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <GlobalTopBar {...{locale}} />
                <GlobalGrid {...{locale, AICountrySort}} />
            </div>
        </div>
    );
}