import HebrewFonts from "@/utils/typography/HebrewFonts";
import GlobalGrid from "./GlobalGrid";
import GlobalSummarySection from "./GlobalSummarySection";
import GlobalTopBar from "./GlobalTopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";

export default async  function GlobalPage({ params }) {
    const { locale } = await params;  

    return (
            <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
                <HebrewFonts />
                <EnglishFonts />
                <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[300px]`}>
                    <GlobalSummarySection />
                </div>
                <div className="flex flex-col flex-[1] sm:flex-[2] md:flex-[3] lg:flex-[4] 2xl:flex-[5]">
                    <GlobalTopBar {...{locale}} />
                    <GlobalGrid {...{locale}} />
                </div>
            </div>
        );
}