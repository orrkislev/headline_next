'use client'

import useFirebase from "@/utils/database/useFirebase";
import { add, sub } from "date-fns";
import { useCallback, useEffect, useState } from "react";

export default function DataManipulator({ setSources, setSummaries, setDailySummaries, day, setDate, initialSummaries, initialDailySummary, sources, country }) {
    const [fetchedDates, setFetchedDates] = useState([]);
    const firebase = useFirebase()

    const updateHeadlines = useCallback((newHeadlines)=>{
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
    }, [])

    const updateSummaries = useCallback((newSummaries)=>{
        setSummaries(prev => {
            const existingIds = new Set(prev.map(summary => summary.id))
            const s = newSummaries.filter(summary => !existingIds.has(summary.id))
            return [...prev, ...s]
        })
    }, [])

    const addFetchedDate = useCallback((dates) => {
        if (Array.isArray(dates)) setFetchedDates(prev => Array.from(new Set([...prev, ...dates.map(date => date.toDateString())])));
        else setFetchedDates(prev => Array.from(new Set([...prev, dates.toDateString()])));
    }, []);

    useEffect(() => {
        if (!firebase.db) return
        (async () => {
            const allInitialHeadlines = Object.values(sources).flat().sort((a, b) => b.timestamp - a.timestamp)
            const headlineTime = add(allInitialHeadlines[0].timestamp, { minute: 1 })
            const newHeadlines = await firebase.getRecentHeadlines(country, headlineTime)
            updateHeadlines(newHeadlines)

            const summaryTime = add(initialSummaries[0].timestamp, { minute: 1 })
            const newSummaries = await firebase.getRecentSummaries(country, summaryTime)
            updateSummaries(newSummaries)

            const dailySummaryDate = new Date(initialDailySummary.date + 'UTC');
            const daysSince = Math.floor((new Date() - dailySummaryDate) / (1000 * 60 * 60 * 24));
            const dates = [dailySummaryDate]
            for (let i = 1; i < daysSince; i++) {
                const newDate = sub(dailySummaryDate, { days: i });
                const newDailySummary = await firebase.getCountryDailySummary(country, newDate.toDateString());
                setDailySummaries(prev => [newDailySummary, ...prev])
                dates.push(newDate);
            }
            addFetchedDate(dates)
            setDate(new Date())
        })()
    }, [firebase.db]);

    useEffect(() => {
        const theDate = new Date(day+'UTC')
        getDayData(theDate)
        const theDayBefore = sub(theDate, { days: 1 })
        getDayData(theDayBefore)
    }, [day])

    const getDayData = async (dataDay) => {
        if (fetchedDates.length == 0) return
        if (fetchedDates.includes(dataDay.toDateString())) return
        
        const newHeadlines = await firebase.getCountryDayHeadlines(country, dataDay, 1)
        updateHeadlines(newHeadlines)
        const newSummaries = await firebase.getCountryDaySummaries(country, dataDay, 1)
        updateSummaries(newSummaries)
        const newDailySummary = await firebase.getCountryDailySummary(country, dataDay)
        setDailySummaries(prev => [newDailySummary, ...prev])
        addFetchedDate(dataDay)
    }
}