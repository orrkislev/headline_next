import { useEffect, useRef, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";
import { sub } from "date-fns";
import { create } from "zustand";

export const useDailySummary = create((set) => ({
    dailySummary: null,
    day: null,
    setDailySummary: (dailySummary, day) => set({ dailySummary, day }),
}));

export default function useDailySummariesManager(country, initialDailySummaries) {
    const [dailySummaries, setDailySummaries] = useState(initialDailySummaries);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const dates = useRef();
    const firebase = useFirebase();
    const setDailySummary = useDailySummary(state => state.setDailySummary);

    const addDailySummary = (newDailySummary) => {
        setDailySummaries(prev => {
            if (prev.find(summary => summary.date === newDailySummary.date)) return prev;
            return [...prev, newDailySummary];
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
        const dayDate = new Date(day + 'UTC');
        getDayDailySummaries(dayDate);
        getDayDailySummaries(sub(dayDate, { days: 1 }));
        getDayDailySummaries(sub(dayDate, { days: 2 }));
    }, [firebase.db, day]);

    useEffect(()=>{
        const dayString = new Date(day + ' UTC').toISOString().split('T')[0]
        const dailySummary = dailySummaries.find(summary => summary.date === dayString);
        setDailySummary(dailySummary, day);
    },[dailySummaries,day])

    const getDayDailySummaries = async (dayDate) => {
        if (!dates.current.includes(dayDate.toDateString())) {
            const dailySummary = await firebase.getCountryDailySummary(country, dayDate);
            if (dailySummary) addDailySummary(dailySummary);
            dates.current.push(dayDate.toDateString());
        }
    };

    return dailySummaries;
}