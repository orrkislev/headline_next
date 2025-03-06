import RightPanel from "./RightPanel";
import SideSlider from "./SideSlider";
import TopBar from "./TopBar/TopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";
import { getTypographyOptions } from "@/utils/typography/typography";
import MainSection from "./MainSection";


export default function CountryPageContent({ sources, summaries, dailySummaries, locale, country, websites }) {

    const typography = getTypographyOptions(country);

    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <EnglishFonts />
            <typography.component />
            <SideSlider summaries={summaries} locale={locale} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex max-w-[400px] `}>
                <div className={`flex-1 ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200`}>
                    <RightPanel {...{ summaries, locale, dailySummaries }} />
                </div>
            </div>

            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar {...{ locale, country}} />
                <MainSection {...{ country, sources, locale, websites }} />
            </div>
        </div>
    );
}