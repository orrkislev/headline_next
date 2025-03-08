import { useEffect, useRef, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";
import { sub } from "date-fns";

export default function useDailySummariesManager(country, initialDailySummaries) {
    const [dailySummaries, setDailySummaries] = useState(initialDailySummaries);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const dates = useRef();
    const firebase = useFirebase();

    const addDailySummaries = (newDailySummaries) => {
        setDailySummaries(prev => {
            const onlyNewOnes = newDailySummaries.filter(newSummary => !prev.some(summary => summary.id === newSummary.id));
            return [...prev, ...onlyNewOnes];
        });
    };

    useEffect(() => {
        if (date) setDay(date.toDateString());
    }, [date]);

    useEffect(() => {
        setDailySummaries(initialDailySummaries);
        const initialDates = initialDailySummaries.reduce((acc, summary) => {
            const date = summary.date;
            if (!acc.includes(date)) acc.push(date);
            return acc;
        }, []);
        dates.current = initialDates;
    }, [initialDailySummaries]);

    useEffect(() => {
        if (!firebase.db || !dates.current || !day) return;
        getDayDailySummaries(day);
    }, [firebase.db, day]);

    const getDayDailySummaries = async (day) => {
        const dayDate = new Date(day + ' UTC');
        if (!dates.current.includes(day)) {
            const dailySummary = await firebase.getCountryDailySummary(country, dayDate);
            if (dailySummary) addDailySummaries([dailySummary]);
        }

        const dayBefore = sub(dayDate, { days: 1 });
        if (!dates.current.includes(dayBefore.toDateString())) {
            const dailySummaryBefore = await firebase.getCountryDailySummary(country, dayBefore);
            if (dailySummaryBefore) addDailySummaries([dailySummaryBefore]);
        }
    };

    return dailySummaries;
}