import { useEffect, useRef, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";
import { sub } from "date-fns";
import useWebsites from "../useWebsites";

export default function useHeadlinesManager(country, name, initialHeadlines) {
    const [headlines, setHeadlines] = useState(initialHeadlines);
    const { websites } = useWebsites(country);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const dates = useRef();
    const firebase = useFirebase();

    const addHeadlines = (newHeadlines) => {
        setHeadlines(prev => {
            const onlyNewOnes = newHeadlines.filter(newHeadline => !prev.some(headline => headline.id === newHeadline.id));
            console.log('headlines at', name, ':', prev.length + onlyNewOnes.length);
            return [...prev, ...onlyNewOnes];
        });
    };

    useEffect(() => {
        if (date) setDay(date.toDateString());
    }, [date]);

    useEffect(() => {
        console.log('useEffect at', name);
        setHeadlines(initialHeadlines);
        const initialDates = initialHeadlines.reduce((acc, headline) => {
            const date = headline.timestamp.toDateString();
            if (!acc.includes(date)) acc.push(date);
            return acc;
        }, []);
        dates.current = initialDates;
    }, [initialHeadlines]);

    useEffect(() => {
        if (!firebase.db || !dates.current || !day) return;
        if (!websites.includes(name)) return;
        getDayHeadlines(day);
    }, [firebase.db, day, websites]);

    const getDayHeadlines = async (day) => {
        const dayDate = new Date(day + ' UTC');
        if (!dates.current.includes(day)) {
            console.log('getting headlines for', dayDate);
            const headlinesData = await firebase.getCountrySourceDayHeadlines(country, name, dayDate);
            addHeadlines(headlinesData);
            dates.current.push(day);
        }

        const dayBefore = sub(dayDate, { days: 1 });
        if (!dates.current.includes(dayBefore.toDateString())) {
            console.log('getting headlines for', dayBefore);
            const dayBeforeHeadlines = await firebase.getCountrySourceDayHeadlines(country, name, dayBefore);
            addHeadlines(dayBeforeHeadlines);
            dates.current.push(dayBefore.toDateString());
        }
    };

    return headlines;
}