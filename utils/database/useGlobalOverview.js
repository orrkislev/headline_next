'use client'

import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

export default function useGlobalOverviews(locale) {

    const [overview, setOverview] = useState(null);
    const firebase = useFirebase();

    useEffect(() => {
        if (!firebase.db) return;

        const unsubscribe = firebase.subscribeToGlobalOverviews((newOverview) => {
            if (newOverview) {
                if (locale === 'en') {
                    setOverview({ ...newOverview.english, timestamp: newOverview.timestamp });
                } else {
                    setOverview({ ...newOverview.hebrew, timestamp: newOverview.timestamp });
                }
            }
        })

        return unsubscribe
    }, [firebase.db])

    return overview;
}