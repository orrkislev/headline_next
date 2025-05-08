import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";
import { getWebsiteName } from "../sources/getCountryData";
import { useTime } from "../store";

export default function useSourcesManager(country, initialSources, enabled = true) {

    const [sources, setSources] = useState(initialSources);
    const firebase = useFirebase();
    const [loading, setLoading] = useState(true);
    const setDate = useTime(state => state.setDate);

    const updateSources = (newHeadlines) => {
        setSources(prevSources => {
            newHeadlines.forEach(headline => {
                const sourceName = getWebsiteName(country, headline.website_id);
                if (!prevSources[sourceName]) prevSources[sourceName] = { headlines: [], website_id: headline.website_id };
                if (!prevSources[sourceName].headlines.find(h => h.id === headline.id)) {
                    prevSources[sourceName].headlines.push(headline);
                }
            });
            Object.values(prevSources).forEach(source => {
                source.headlines.sort((a, b) => b.timestamp - a.timestamp);
            });
            return prevSources;
        });
    }

    useEffect(() => {
        setSources(initialSources);
    }, [initialSources]);

    useEffect(() => {
        if (!enabled) return
        if (!firebase.ready) return

        getRecentHeadlines()

        const headlinesCollection = firebase.getCountryCollectionRef(country, 'headlines');
        const q = firebase.firestore.query(
            headlinesCollection,
            firebase.firestore.orderBy('timestamp', 'desc'),
            firebase.firestore.limit(1),
        );
        // const unsubscribe = firebase.firestore.onSnapshot(q, snapshot => {
        //     if (snapshot.empty) return
        //     const headlines = snapshot.docs.map(doc => firebase.prepareData(doc));
        //     updateSources(headlines);
        // });

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") getRecentHeadlines()
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            // unsubscribe()
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };

    }, [firebase.ready, country, enabled]);


    const getRecentHeadlines = async () => {
        setLoading(true);

        const allHeadlines = Object.values(sources).flatMap(source => source.headlines);
        const headlinesCollection = firebase.getCountryCollectionRef(country, 'headlines');
        const initialTimes = allHeadlines.map(headline => headline.timestamp)
        const lastHeadlineTime = new Date(Math.max(...initialTimes));
        const q = firebase.firestore.query(
            headlinesCollection,
            firebase.firestore.where('timestamp', '>=', lastHeadlineTime),
            firebase.firestore.orderBy('timestamp', 'desc'),
        );
        let newHeadlines = await firebase.firestore.getDocs(q);

        setLoading(false);
        if (newHeadlines.empty) return;
        newHeadlines = newHeadlines.docs.map(headline => firebase.prepareData(headline));
        updateSources(newHeadlines);
        setDate(new Date())
    }

    return { sources, loading }
}