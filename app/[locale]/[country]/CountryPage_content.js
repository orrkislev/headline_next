import { useMemo } from "react";
import MainSection from "./MainSection";
import RightPanel from "./RightPanel";
import SideSlider from "./SideSlider";
import TopBar from "./TopBar/TopBar";
import EnglishFonts from "@/utils/typography/EnglishFonts";

export default function CountryPageContent({ sources, summaries, dailySummaries, locale, country, date, setDate, day, activeWebsites, setActiveWebsites, order, setOrder, typoOptions, view, setView, font, setFont }) {

    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <EnglishFonts />
            <typoOptions.component />
            <SideSlider summaries={summaries} locale={locale} date={date} setDate={setDate} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex max-w-[400px] `}>
                <div className={`flex-1 ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200`}>
                    <RightPanel {...{ summaries, locale, date, setDate, day, dailySummaries }} />
                </div>
            </div>

            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar {...{ date, locale, setDate, country, font, setFont, view, setView, order, setOrder, sources, activeWebsites, setActiveWebsites }} />
                <div className="overflow-auto">
                    <MainSection {...{ sources, locale, country, date, setDate, activeWebsites, setActiveWebsites, order, font }} />
                </div>
            </div>
        </div>
    );
}