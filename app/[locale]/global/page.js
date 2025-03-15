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
            <div className={`absolute custom-scrollbar flex w-full h-full overflow-auto ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
                <HebrewFonts />
                <EnglishFonts />
                <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[300px]`}>
                    <GlobalSummarySection locale={locale}/>
                </div>
                <div className="flex flex-col flex-[1] sm:flex-[2] md:flex-[3] lg:flex-[4] 2xl:flex-[5]">
                    <GlobalTopBar {...{locale}} />
                    <GlobalGrid {...{locale, AICountrySort}} />
                </div>
            </div>
        );
}