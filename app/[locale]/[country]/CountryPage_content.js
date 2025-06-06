import RightPanel from "./RightPanel";
import SideSlider from "./SideSlider";
import TopBar from "./TopBar/TopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";
import { getTypographyOptions } from "@/utils/typography/typography";
import MainSection from "./MainSection";
import HebrewFonts from "@/utils/typography/HebrewFonts";

export default function CountryPageContent({ sources, initialSummaries, yesterdaySummary, daySummary, locale, country, pageDate }) {
    const typography = getTypographyOptions(country);

    return (
        <div id='main' className={`absolute flex flex-col sm:flex-row w-full h-full overflow-auto sm:overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <EnglishFonts />
            {locale == 'heb' && <HebrewFonts />}
            <typography.component />
            <SideSlider {...{ locale, country, pageDate }} />
            <div className={`flex-[1 sm:border-l sm:border-r border-gray-200 flex max-w-[400px] `}>
                <RightPanel {...{ initialSummaries, locale, country, yesterdaySummary, daySummary, pageDate }} />
            </div>

            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar {...{ locale, country, sources }} />
                <MainSection {...{ country, sources, locale, pageDate }} />
            </div>
        </div>
    );
}