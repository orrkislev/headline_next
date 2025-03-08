import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";

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
        if (!firebase.db || !dates.current || !day) return
        if (dates.current.includes(day)) return

        (async () => {
            const summaries = await firebase.getCountryDaySummaries(country, day)
            addSummaries(summaries)
        })()
    }, [firebase.db, day])

    return summaries
}