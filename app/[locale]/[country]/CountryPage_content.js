import MainSection from "./MainSection";
import RightPanel from "./RightPanel";
import SideSlider from "./SideSlider";
import TopBar from "./TopBar/TopBar";

export default function CountryPageContent({ sources, summaries, locale, country, date, setDate, activeWebsites, setActiveWebsites, order }) {
    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <SideSlider summaries={summaries} locale={locale} date={date} setDate={setDate} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex max-w-[400px] `}>
                <div className={`flex-1 ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200`}>
                    <RightPanel summaries={summaries} locale={locale} date={date} setDate={setDate} />
                </div>
            </div>

            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar date={date} locale={locale} />
                <div className="overflow-auto">
                    <MainSection {...{ sources, locale, country, date, setDate, activeWebsites, setActiveWebsites, order }} />
                </div>
            </div>
        </div>
    );
}