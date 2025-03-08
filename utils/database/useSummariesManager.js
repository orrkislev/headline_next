import { useEffect, useRef, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";
import { sub } from "date-fns";
import { create } from "zustand";

export const useDaySummaries = create(set => ({
    daySummaries: [],
    setDaySummaries: (newSummaries) => set({ daySummaries: newSummaries })
}))

export default function useSummariesManager(country, initialSummaries) {
    const [summaries, setSummaries] = useState(initialSummaries);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const dates = useRef()
    const firebase = useFirebase()
    const setDailySummaries = useDaySummaries(state => state.setDaySummaries)

    const addSummaries = (newSummaries) => {
        setSummaries(prev => {
            const onlyNewOnes = newSummaries.filter(newSummary => !prev.some(summary => summary.id === newSummary.id))
            return [...prev, ...onlyNewOnes]
        })
    }

    useEffect(() => {
        if (date) setDay(date.toDateString());
    }, [date])

    useEffect(() => {
        setSummaries(initialSummaries)
        const initialDates = initialSummaries.reduce((acc, summary) => {
            const date = summary.timestamp.toDateString()
            if (!acc.includes(date)) acc.push(date)
            return acc
        }, [])
        dates.current = initialDates
    }, [initialSummaries])

    useEffect(() => {
        if (!firebase.db || !dates.current || !day) return
        getDaySummaries(day)

        const unsubscribe = firebase.subscribeToSummaries(country, (newSummary) => {
            addSummaries([newSummary])
        })
        return unsubscribe
    }, [firebase.db, day])

    useEffect(() => {
        const daySummaries = summaries.filter(summary => summary.timestamp.toDateString() === day);
        setDailySummaries(daySummaries)
    }, [summaries, day])

    const getDaySummaries = async (day) => {
        const dayDate = new Date(day + ' UTC')
        if (!dates.current.includes(day)) {
            const summaries = await firebase.getCountryDaySummaries(country, dayDate)
            addSummaries(summaries)
        }

        const dayBefore = sub(dayDate, { days: 1 })
        if (!dates.current.includes(dayBefore.toDateString())) {
            const dayBeforeSummaries = await firebase.getCountryDaySummaries(country, dayBefore)
            addSummaries(dayBeforeSummaries)
        }
    }

    return summaries
}