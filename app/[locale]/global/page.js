import GlobalGrid from "./GlobalGrid";
import GlobalSummarySection from "./GlobalSummarySection";
import GlobalTopBar from "./GlobalTopBar";

export default async  function GlobalPage({ params }) {
    const { country, locale } = await params;  

    return (
            <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
                {/* <DataManager headlines={headlinesSources} summaries={summaries} dailySummary={dailySummary} /> */}
                {/* <PreferencesManager locale={locale} /> */}
                {/* <GlobalDataManager summaries={summaries} globalSummary={globalSummary} /> */}
                {/* <GlobalPreferencesManager /> */}

                <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[300px]`}>
                    <GlobalSummarySection />
                </div>
                <div className="flex flex-col flex-[1] sm:flex-[2] md:flex-[3] lg:flex-[4] 2xl:flex-[5]">
                    <GlobalTopBar />
                    <GlobalGrid />
                </div>
            </div>
        );
}