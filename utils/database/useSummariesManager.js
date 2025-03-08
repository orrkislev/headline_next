import { useEffect, useRef, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";
import { sub } from "date-fns";

export default function useSummariesManager(country, initialSummaries) {
    const [summaries, setSummaries] = useState(initialSummaries);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const dates = useRef()
    const firebase = useFirebase()

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
        console.log('useEffect', firebase.db, dates.current, day)
        if (!firebase.db || !dates.current || !day) return
        getDaySummaries(day)
    }, [firebase.db, day])

    const getDaySummaries = async (day) => {
        const dayDate = new Date(day + ' UTC')
        if (!dates.current.includes(day)) {
            console.log('getting summaries for', dayDate)
            const summaries = await firebase.getCountryDaySummaries(country, dayDate)
            addSummaries(summaries)
        }

        const dayBefore = sub(dayDate, { days: 1 })
        if (!dates.current.includes(dayBefore.toDateString())) {
            console.log('getting summaries for', dayBefore)
            const dayBeforeSummaries = await firebase.getCountryDaySummaries(country, dayBefore)
            addSummaries(dayBeforeSummaries)
        }
    }

    return summaries
}