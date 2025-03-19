import { endOfDay, sub } from "date-fns";
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, where, getFirestore } from "firebase/firestore";
import { cache } from "react";

import { firebaseConfig } from './firebaseConfig';
import { countries } from "../sources/countries";
import { countryToAlpha2 } from "country-to-iso";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getAICountrySort = async () => {
    const sortedHeadlinesRef = collection(db, '- metadata -', 'summaryCount', 'sortedHeadlines');
    const q = query(sortedHeadlinesRef, orderBy('timestamp', 'desc'), limit(1));

    const snapshot = await getDocs(q);
    const latestSortedHeadlines = snapshot.docs[0].data();

    if (latestSortedHeadlines.sortedHeadlines && Array.isArray(latestSortedHeadlines.sortedHeadlines)) {
        const sortedOrder = latestSortedHeadlines.sortedHeadlines
            .sort((a, b) => a.rank - b.rank)
            .map(item => item.country.toLowerCase())
            .map(item => Object.keys(countries).find(c => countryToAlpha2(c) == countryToAlpha2(item)))

        return sortedOrder;
    } else {
        return [];
    }
}