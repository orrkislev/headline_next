'use client'

import { useEffect, useState } from "react";
import { add, sub } from "date-fns";
import { getCountryDailySummary, getRecentHeadlines, getRecentSummaries } from "@/utils/database/countryData";
import getSourceOrder from "@/utils/sources/source orders";
import CountryPageContent from "./CountryPage_content";

export default function CountryPageLive({ initialSummaries, initialSources, initialDailySummary, locale, country }) {
    // State management
    const [display, setDisplay] = useState(false);
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

    // Load live data
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
            setDisplay(true);
        })()
    }, []);

    // Hide static content when dynamic content is loaded
    useEffect(() => {
        if (!display) return;
        const element = document.getElementById('remove_me');
        if (element) element.style.display = 'none';
    }, [display])

    // Don't render until live data is ready
    if (!display) return null

    // Once data is loaded, render using the shared content component
    return (
        <div className="absolute z-10">
            <CountryPageContent
                sources={sources}
                summaries={summaries}
                locale={locale}
                country={country}
                date={date}
                setDate={setDate}
                activeWebsites={activeWebsites}
                setActiveWebsites={setActiveWebsites}
                order={order}
            />
        </div>
    );
}