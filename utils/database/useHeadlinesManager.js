import { useEffect, useRef, useState } from "react";
import useFirebase from "./useFirebase";
import { useTime } from "../store";
import { endOfDay, sub } from "date-fns";

export default function useHeadlinesManager(country, name, initialHeadlines) {

    const [headlines, setHeadlines] = useState(initialHeadlines);
    const date = useTime(state => state.date);
    const [day, setDay] = useState(date ? date.toDateString() : new Date().toDateString());
    const dates = useRef();
    const firebase = useFirebase();


    const addHeadlines = (newHeadlines) => {
        setHeadlines(prev => {
            const onlyNewOnes = newHeadlines.filter(newHeadline => !prev.some(headline => headline.id === newHeadline.id));
            return [...prev, ...onlyNewOnes];
        });
    };

    useEffect(() => {
        if (date) setDay(date.toDateString());
    }, [date]);

    useEffect(() => {
        setHeadlines(initialHeadlines);
        const initialDates = initialHeadlines.reduce((acc, headline) => {
            const date = headline.timestamp.toDateString();
            if (!acc.includes(date)) acc.push(date);
            return acc;
        }, []);
        dates.current = initialDates;

        (async () => {
            const headlinesCollection = firebase.getCountryCollectionRef(country, 'headlines');
            const initialTimes = initialHeadlines.map(headline => headline.timestamp);
            const lastHeadlineTime = Math.max(...initialTimes);
            const q = firebase.firestore.query(
                headlinesCollection,
                firebase.firestore.where('timestamp', '>=', lastHeadlineTime),
                firebase.firestore.where('website_id', '==', name),
                firebase.firestore.orderBy('timestamp', 'desc'),
            );
            let newHeadlines = await firebase.firestore.getDocs(q);
            if (newHeadlines.empty) return [];
            newHeadlines = newHeadlines.docs.map(headline => firebase.prepareData(headline));
            addHeadlines(newHeadlines);
        })();
    }, [initialHeadlines]);



    useEffect(() => {
        if (!firebase.db || !dates.current || !day) return;
        getDayHeadlines(day);
        getDayHeadlines(sub(new Date(day + ' UTC'), { days: 1 }).toDateString());
    }, [firebase.db, day]);


    useEffect(() => {
        if (!firebase.db) return;

        const headlinesCollection = firebase.getCountryCollectionRef(country, 'headlines');
        const q = firebase.firestore.query(
            headlinesCollection,
            firebase.firestore.where('website_id', '==', name),
            firebase.firestore.orderBy('timestamp', 'desc'),
            firebase.firestore.limit(1),
        );

        const unsubscribe = firebase.firestore.onSnapshot(q, snapshot => {
            if (snapshot.empty) return
            const headlines = snapshot.docs.map(doc => firebase.prepareData(doc));
            addHeadlines(headlines);
        });
        return unsubscribe;
    }, [firebase.db])





    // functions
    const getDayHeadlines = async (dayString) => {
        if (dates.current.includes(dayString)) return;

        const headlinesCollection = firebase.getCountryCollectionRef(country, 'headlines');

        const dayDate = new Date(dayString + ' UTC');
        const theDay = endOfDay(dayDate);
        const dayBefore = sub(theDay, { days: 1 });
        const q = firebase.firestore.query(
            headlinesCollection,
            firebase.firestore.where('timestamp', '>=', dayBefore),
            firebase.firestore.where('timestamp', '<=', theDay),
            firebase.firestore.where('website_id', '==', name),
            firebase.firestore.orderBy('timestamp', 'desc'),
        );
        let newHeadlines = await firebase.firestore.getDocs(q);
        if (newHeadlines.empty) return [];
        newHeadlines = newHeadlines.docs.map(headline => firebase.prepareData(headline));
        addHeadlines(newHeadlines);
        dates.current.push(dayString);
    }

    // const getRecentHeadlines = async (countryName, fromTime) => {
    //     const headlinesCollection = getCountryCollectionRef(countryName, 'headlines');
    //     const q = firestore.query(
    //         headlinesCollection,
    //         firestore.where('timestamp', '>', fromTime),
    //         firestore.orderBy('timestamp', 'desc'),
    //     );
    //     let headlines = await firestore.getDocs(q);
    //     if (headlines.empty) return [];
    //     headlines = headlines.docs.map(headline => prepareData(headline));
    //     return headlines;
    // }

    return headlines;
}