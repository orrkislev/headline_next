// This is a shared component used by both static and live versions
// It should only include the presentation logic, no data fetching

import MainSection from "./MainSection";

export default function CountryPageContent({ 
    sources, 
    summaries, 
    locale, 
    country, 
    date, 
    setDate, 
    activeWebsites, 
    setActiveWebsites, 
    order 
}) {
    return (
        <div className={`flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            {/* Shared layout for both static and dynamic versions */}
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <MainSection {...{ sources, locale, country, date, setDate, activeWebsites, setActiveWebsites, order }} />
            </div>
        </div>
    );
}