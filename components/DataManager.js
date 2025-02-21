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
        const theDayBefore = sub(new Date(day), { days: 1 }).toDateString()
        if (!data.dates.includes(day)) {
            if (!data.dates.includes(theDayBefore)) {
                getData(day, 2)
            } else {
                getData(day, 1)
            }
        } else if (!data.dates.includes(theDayBefore)) {
            getData(theDayBefore, 1)
        }
    }, [day])

    const getData = async (dataDay, days) => {
        const newHeadlines = await getCountryDayHeadlines(country, new Date(dataDay), days)
        data.addHeadlines(newHeadlines)
        const newSummaries = await getCountryDaySummaries(country, new Date(dataDay), days)
        data.addSummaries(newSummaries)
        for (let i = 0; i < days; i++) {
            const day = sub(new Date(dataDay), { days: i })
            const newDailySummary = await getCountryDailySummary(country, day)
            data.addDailySummary(newDailySummary)
            data.addDate(day.toDateString())
        }
    }


    return null
}