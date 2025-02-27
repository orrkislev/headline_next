'use client'

import TopBar from "./TopBar/TopBar";

// import SideSlider from "./SideSlider";
import MainSection from "./MainSection";
import RightPanel from "./RightPanel";
import { useEffect, useMemo, useState } from "react";
import { add, sub } from "date-fns";
import { getCountryDailySummary, getRecentHeadlines, getRecentSummaries } from "@/utils/database/countryData";
import SideSlider from "./SideSlider";
import getSourceOrder from "@/utils/sources/source orders";
import { getTypographyOptions } from "@/utils/typography/typography";
import HebrewFonts, { Typography_Hebrew } from "@/utils/typography/HebrewFonts";

export default function CountryPage({ initialSummaries, initialSources, initialDailySummary, locale, country }) {
    const [sources, setSources] = useState(initialSources);
    const [summaries, setSummaries] = useState(initialSummaries);
    const [dailySummaries, setDailySummaries] = useState([initialDailySummary]);
    const [fetchedDates, setFetchedDates] = useState([]);
    const [date, setDate] = useState(new Date());
    const [activeWebsites, setActiveWebsites] = useState(() => {
        const sourceOrder = getSourceOrder(country, 'default');
        return sourceOrder.slice(0, 6)
    });
    const [order, setOrder] = useState('default');

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

            setDate(new Date())
        })()
    }, []);


    const typography = useMemo(() => getTypographyOptions(country), [country]);

    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <typography.component />
            <SideSlider summaries={summaries} locale={locale} date={date} setDate={setDate} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[400px] `}>
                <div className={`flex-1 ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200`}>
                    <RightPanel summaries={summaries} locale={locale} date={date} setDate={setDate} />
                </div>
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar date={date} locale={locale} />
                <MainSection {...{ sources, locale, country, date, setDate, activeWebsites, setActiveWebsites, order }} />
            </div>
        </div>
    );
}