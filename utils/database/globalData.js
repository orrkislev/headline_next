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
            .filter(item => item != undefined)
        
            Object.keys(countries).forEach(country => {
            if (!sortedOrder.includes(country)) {
                sortedOrder.push(country)
            }
        })

        return sortedOrder;
    } else {
        return [];
    }
}

// Server-side cached version for SSR
export const getAICountrySortServer = unstable_cache(
  _getAICountrySortServer, 
  ['getAICountrySortServer'], 
  { tags: ['getAICountrySortServer'], 
  revalidate: 60 * 10 } // 10 minutes
);
async function _getAICountrySortServer() {
    try {
        return await getAICountrySort();
    } catch (error) {
        console.error('Error fetching AI country sort:', error);
        // Fallback to default country order
        return Object.keys(countries);
    }
};

// Get latest summary for a specific country
export const getCountryLatestSummary = unstable_cache(
  _getCountryLatestSummary, 
  ['getCountryLatestSummary'], 
  { tags: ['getCountryLatestSummary'], 
  revalidate: 60 * 10 } // 10 minutes
);
async function _getCountryLatestSummary(countryName) {
    try {
        const countriesCollection = collection(db, '- Countries -');
        const countryID = countries[countryName].english;
        const countryDoc = doc(countriesCollection, countryID);
        const summariesCollection = collection(countryDoc, 'summaries');
        
        const q = query(summariesCollection, orderBy('timestamp', 'desc'), limit(1));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) return null;
        
        const summaryDoc = snapshot.docs[0];
        const data = summaryDoc.data();
        const cleanedData = JSON.parse(JSON.stringify(data));
        const timestamp = new Date(data.timestamp.seconds * 1000);
        
        return { id: summaryDoc.id, ...cleanedData, timestamp };
    } catch (error) {
        console.error(`Error fetching summary for ${countryName}:`, error);
        return null;
    }
};

// Get latest summaries for all countries
export const getAllCountriesLatestSummaries = unstable_cache(
  _getAllCountriesLatestSummaries, 
  ['getAllCountriesLatestSummaries'], 
  { tags: ['getAllCountriesLatestSummaries'], 
  revalidate: 60 * 10 } // 10 minutes
);
async function _getAllCountriesLatestSummaries() {
    const countryNames = Object.keys(countries);
    const summaryPromises = countryNames.map(async (country) => {
        const summary = await getCountryLatestSummary(country);
        return { country, summary };
    });
    
    const results = await Promise.all(summaryPromises);
    return results.reduce((acc, { country, summary }) => {
        if (summary) {
            acc[country] = summary;
        }
        return acc;
    }, {});
};

// Get latest global overview

export const getGlobalOverview = unstable_cache(
  _getGlobalOverview, 
  ['getGlobalOverview'], 
  { tags: ['getGlobalOverview'], 
  revalidate: 60 * 10 } // 10 minutes
);
async function _getGlobalOverview() {
    try {
        const globalOverviewsRef = collection(db, '- metadata -', 'globalOverviews', 'overviews');
        const q = query(globalOverviewsRef, orderBy('timestamp', 'desc'), limit(1));
        
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        
        const overviewDoc = snapshot.docs[0];
        const data = overviewDoc.data();
        const cleanedData = JSON.parse(JSON.stringify(data));
        const timestamp = new Date(data.timestamp.seconds * 1000);
        
        // Structure data similar to the client hook
        return {
            id: overviewDoc.id,
            timestamp,
            english: {
                headline: cleanedData.english?.headline || '',
                overview: cleanedData.english?.overview || ''
            },
            hebrew: {
                headline: cleanedData.hebrew?.headline || '',
                overview: cleanedData.hebrew?.overview || ''
            }
        };
    } catch (error) {
        console.error('Error fetching global overview:', error);
        return null;
    }
};