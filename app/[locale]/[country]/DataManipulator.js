'use client'

import { getCountryDailySummary, getRecentHeadlines, getRecentSummaries } from "@/utils/database/countryData";
import { add, sub } from "date-fns";
import { useEffect } from "react";

export default function DataManipulator({ setSources, setSummaries, setDailySummaries, setFetchedDates, setDate, initialSummaries, initialDailySummary, sources, country }) {
    

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
        })()
    }, []);
}