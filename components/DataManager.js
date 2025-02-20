'use client'

import { sub } from "date-fns"
import { create } from "zustand"
import { useDate } from "./PresetTimeManager"
import { useEffect } from "react"
import { getCountryDayHeadlines } from "@/utils/database/countryData"
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
    dates: [],
    setDates: (dates) => set({ dates }),
}))

export default function DataManager({ headlines, summaries }) {
    const { country } = useParams()
    const data = useData()
    const day = useDate(state => state.date.toDateString())

    useEffect(() => {
        data.addHeadlines(headlines)
        data.addSummaries(summaries)
    }, [headlines, summaries])

    useEffect(() => {
        const doStuff = async () => {
            const theDayBefore = sub(new Date(day), { days: 1 }).toDateString()
            if (!data.dates.includes(day)) {
                let daysInclude = 1
                if (!data.dates.includes(theDayBefore)) {
                    daysInclude = 2
                }
                const newHeadlines = await getCountryDayHeadlines(country, new Date(day), 1)
                data.addHeadlines(newHeadlines)
            } else if (!data.dates.includes(theDayBefore)) {
                const newHeadlines = await getCountryDayHeadlines(country, new Date(theDayBefore), 1)
                data.addHeadlines(newHeadlines)
            } else {
                console.log('no new headlines')
            }
        }
        doStuff()
    }, [day])


    return null
}