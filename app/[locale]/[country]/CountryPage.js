'use client'

import TopBar from "./TopBar/TopBar";
// import DataManager from "@/components/DataManager";
// import PreferencesManager from "@/components/PreferencesManager";

// import SideSlider from "./SideSlider";
import MainSection from "./MainSection";
import RightPanel from "./RightPanel";
import { useEffect, useState } from "react";
import { add, sub } from "date-fns";
import { getCountryDailySummary, getRecentHeadlines, getRecentSummaries } from "@/utils/database/countryData";
import SideSlider from "./SideSlider";

export default function CountryPage({ initialSummaries, initialSources, initialDailySummary, locale, country }) {
    const [sources, setSources] = useState(initialSources);
    const [summaries, setSummaries] = useState(initialSummaries);
    const [dailySummaries, setDailySummaries] = useState([initialDailySummary]);
    const [fetchedDates, setFetchedDates] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        (async () => {
            const allInitialHeadlines = Object.values(sources).flat().sort((a, b) => b.timestamp - a.timestamp)
            const headlineTime = add(allInitialHeadlines[0].timestamp, { minute: 1 })
            const newHeadlines = await getRecentHeadlines(country, headlineTime)
            setSources(prev => {
                const newSources = { ...prev }
                newHeadlines.forEach(headline => {
                    if (!newSources[headline.website_id]) newSources[headline.website_id] = []
                    if (!newSources[headline.website_id].some(existingHeadline => existingHeadline.id === headline.id)) {
                        newSources[headline.website_id].push(headline)
                    }
                })
                Object.keys(newSources).forEach(key => {
                    newSources[key].sort((a, b) => b.timestamp - a.timestamp)
                })
                return newSources
            })

            const summaryTime = add(initialSummaries[0].timestamp, { minute: 1 })
            const newSummaries = await getRecentSummaries(country, summaryTime)
            setSummaries(prev => {
                const existingIds = new Set(prev.map(summary => summary.id))
                const s = newSummaries.filter(summary => !existingIds.has(summary.id))
                return [...prev, ...s]
            })

            const dailySummaryDate = new Date(initialDailySummary.timestamp);
            const daysSince = Math.floor((new Date() - dailySummaryDate) / (1000 * 60 * 60 * 24));
            const dates = []
            for (let i = 0; i < daysSince; i++) {
                const newDate = sub(dailySummaryDate, { days: i + 2 });
                const newDailySummary = await getCountryDailySummary(country, newDate.toDateString());
                setDailySummaries(prev => [newDailySummary, ...prev])
                dates.push(newDate.toDateString());
            }
            setFetchedDates(dates);
        })()
    }, []);



    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            {/* <DataManager initialHeadlines={initialHeadlines} initialSummaries={initialSummaries} initialDailySummary={initialDailySummary} /> */}
            {/* <PreferencesManager locale={locale} /> */}
            <SideSlider summaries={summaries} locale={locale} date={date} setDate={setDate} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[400px] `}>
                <div className={`flex-1 ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200`}>
                    <RightPanel summaries={summaries} locale={locale} date={date} setDate={setDate} />
                </div>
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar date={date} locale={locale} />
                {/* <MainSection sources={sources} locale={locale} country={country} date={date} setDate={setDate}/> */}
                <MainSection {...{sources, locale, country, date, setDate}} />
            </div>
        </div>
    );
}