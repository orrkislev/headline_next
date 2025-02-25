'use client'

import { add, sub } from "date-fns"
import { create } from "zustand"
import { useDate } from "./TimeManager"
import { useEffect } from "react"
import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries, getRecentHeadlines, getRecentSummaries, subscribeToHeadlines, subscribeToSummaries } from "@/utils/database/countryData"
import { useParams } from "next/navigation"

export const useData = create((set, get) => ({
    sources: {},
    addHeadlines: (headlines) => set(state => {
        const newSources = { ...state.sources }
        headlines.forEach(headline => {
            if (!newSources[headline.website_id]) newSources[headline.website_id] = []
            if (!newSources[headline.website_id].some(existingHeadline => existingHeadline.id === headline.id)) {
                newSources[headline.website_id].push(headline)
            }
        })
        return { sources: newSources }
    }),
    summaries: [],
    addSummaries: (summaries) => set(state => {
        const existingIds = new Set(state.summaries.map(summary => summary.id))
        const newSummaries = summaries.filter(summary => !existingIds.has(summary.id))
        return { summaries: [...state.summaries, ...newSummaries] }
    }),
    dailySummaries: [],
    addDailySummary: (summary) => set(state => {
        if (state.dailySummaries.some(existingSummary => existingSummary.id === summary.id)) return state
        return { dailySummaries: [...state.dailySummaries, summary] }
    }),

    dates: [],
    setDates: (dates) => set({ dates }),
    addDate: (date) => set(state => {
        if (state.dates.includes(date)) {
            return state
        }
        return { dates: [...state.dates, date] }
    })
}))



export default function DataManager({ headlines, summaries, dailySummary }) {
    const { country } = useParams()
    const data = useData()
    const day = useDate(state => state.date.toDateString())

    useEffect(() => {
        data.addHeadlines(headlines)
        data.addSummaries(summaries)
        data.addDailySummary(dailySummary)
        const dailySummaryDate = new Date(dailySummary.timestamp)
        data.addDate(dailySummaryDate.toDateString())
        data.addDate(sub(dailySummaryDate, { days: 1 }).toDateString())

        const getRecentData = async () => {
            const newHeadlines = await getRecentHeadlines(country, add(headlines[0].timestamp, { minute: 1 }))
            data.addHeadlines(newHeadlines)
            const newSummaries = await getRecentSummaries(country, add(summaries[0].timestamp, { minute: 1 }))
            data.addSummaries(newSummaries)

            const daysSince = Math.floor((new Date() - dailySummaryDate) / (1000 * 60 * 60 * 24))
            for (let i = 0; i < daysSince; i++) {
                const newDate = sub(dailySummaryDate, { days: i + 2 })
                const newDailySummary = await getCountryDailySummary(country, newDate.toDateString())
                if (!newDailySummary) continue
                data.addDailySummary(newDailySummary)
                data.addDate(newDate.toDateString())
            }
        }
        getRecentData()
    }, [])

    useEffect(() => {
        const unsubscribe = subscribeToHeadlines(country, (headlines) => {
            data.addHeadlines(headlines)
        })
        return unsubscribe
    }, [country])
    useEffect(() => {
        const unsubscribe = subscribeToSummaries(country, (summaries) => {
            data.addSummaries(summaries)
        })
        return unsubscribe
    }, [country])

    useEffect(() => {
        const theDate = new Date(day)
        getDayData(theDate)
        const theDayBefore = sub(theDate, { days: 1 })
        getDayData(theDayBefore)
    }, [day])

    const getDayData = async (dataDay) => {
        if (data.dates.length == 0) return
        if (data.dates.includes(dataDay.toDateString())) return

        const newHeadlines = await getCountryDayHeadlines(country, dataDay, 1)
        data.addHeadlines(newHeadlines)
        const newSummaries = await getCountryDaySummaries(country, dataDay, 1)
        data.addSummaries(newSummaries)
        const newDailySummary = await getCountryDailySummary(country, dataDay)
        data.addDailySummary(newDailySummary)
        data.addDate(dataDay.toDateString())
    }


    return null
}