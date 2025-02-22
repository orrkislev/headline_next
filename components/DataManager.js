'use client'

import { sub } from "date-fns"
import { create } from "zustand"
import { useDate } from "./TimeManager"
import { useEffect } from "react"
import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData"
import { useParams } from "next/navigation"

export const useData = create((set, get) => ({
    sources: {},
    addHeadlines: (headlines) => set(state => {
        const newSources = { ...state.sources }
        headlines.forEach(headline => {
            if (!newSources[headline.website_id]) {
                newSources[headline.website_id] = []
            }
            newSources[headline.website_id].push(headline)
        })
        return { sources: newSources }
    }),
    summaries: [],
    addSummaries: (summaries) => set(state => ({ summaries: [...state.summaries, ...summaries] })),
    dailySummaries: [],
    addDailySummary: (summary) => set(state => ({ dailySummaries: [...state.dailySummaries, summary] })),

    dates: [],
    setDates: (dates) => set({ dates }),
    addDate: (date) => set(state => ({ dates: [...state.dates, date] }))
}))



export default function DataManager({ headlines, summaries, dailySummary }) {
    const { country } = useParams()
    const data = useData()
    const day = useDate(state => state.date.toDateString())

    useEffect(() => {
        data.addHeadlines(headlines)
        data.addSummaries(summaries)
        data.addDailySummary(dailySummary)
        data.addDate(new Date().toDateString())
        data.addDate(sub(new Date(), { days: 1 }).toDateString())
    }, [])

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