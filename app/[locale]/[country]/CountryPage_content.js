import RightPanel from "./RightPanel";
import SideSlider from "./SideSlider";
import TopBar from "./TopBar/TopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";
import { getTypographyOptions } from "@/utils/typography/typography";
import MainSection from "./MainSection";
import DailySummary from "./summaries/DailySummary";


export default function CountryPageContent({ sources, initialSummaries, initialDailySummaries, locale, country }) {

    const typography = getTypographyOptions(country);

    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <EnglishFonts />
            <typography.component />
            <SideSlider locale={locale} />
            <div className={`flex-[1] border-l border-r border-gray-200 flex max-w-[400px] `}>
                <RightPanel {...{ initialSummaries, locale, country, initialDailySummaries }} />
            </div>
            <DailySummary locale={locale} />

            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar {...{ locale, country, sources}} />
                <MainSection {...{ country, sources, locale }} />
            </div>
        </div>
    );
}