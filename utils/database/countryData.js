import { endOfDay, sub } from "date-fns";
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, where, getFirestore } from "firebase/firestore";
import { cache } from "react";

import { firebaseConfig } from './firebaseConfig';
import { countries } from "../sources/countries";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function getCountryCollectionRef(countryName, collectionName) {
  const countriesCollection = collection(db, '- Countries -');

  const countryID = countries[countryName].english;
  const countryDoc = doc(countriesCollection, countryID);
  return collection(countryDoc, collectionName);
}


function prepareData(doc) {
  const data = doc.data();
  const cleanedData = JSON.parse(JSON.stringify(data));
  const timestamp = new Date(data.timestamp.seconds * 1000);
  return { id: doc.id, ...cleanedData, timestamp };
}


// ----------------- Headlines -----------------
// ---------------------------------------------

function prepareHeadline(doc) {
  const data = doc.data();
  const cleanedData = JSON.parse(JSON.stringify(data));
  const timestamp = new Date(data.timestamp.seconds * 1000);
  return {
    id: doc.id,
    headline: cleanedData.headline,
    subtitle: cleanedData.subtitle,
    link: cleanedData.link,
    timestamp: timestamp,
    website_id: cleanedData.website_id,
  };
}

export const getCountryDayHeadlines = cache(async (countryName, day, daysInclude = 1) => {
  const headlinesCollection = getCountryCollectionRef(countryName, 'headlines');

  const theDay = endOfDay(day);
  const dayBefore = sub(theDay, { days: daysInclude });
  const q = query(
    headlinesCollection,
    where('timestamp', '>=', dayBefore),
    where('timestamp', '<=', theDay),
    orderBy('timestamp', 'desc'),
  );

  let headlines = await getDocs(q);
  if (headlines.empty) return [];
  headlines = headlines.docs.map(headline => prepareHeadline(headline));
  return headlines;
});

export const getRecentHeadlines = async (countryName, fromTime) => {
  const headlinesCollection = getCountryCollectionRef(countryName, 'headlines');
  const q = query(
    headlinesCollection,
    where('timestamp', '>', fromTime),
    orderBy('timestamp', 'desc'),
  );
  let headlines = await getDocs(q);
  if (headlines.empty) return [];
  headlines = headlines.docs.map(headline => prepareData(headline));
  return headlines;
}

export const subscribeToHeadlines = (countryName, callback) => {
  const headlinesCollection = getCountryCollectionRef(countryName, 'headlines');
  const q = query(
    headlinesCollection,
    orderBy('timestamp', 'desc'),
    limit(1),
  );
  return onSnapshot(q, snapshot => {
    if (snapshot.empty) return
    const headlines = snapshot.docs.map(doc => prepareHeadline(doc));
    callback(headlines);
  });
}

// ----------------- Summaries -----------------
// ---------------------------------------------

function prepareSummary(doc) {
  const data = doc.data();
  const cleanedData = JSON.parse(JSON.stringify(data));
  const timestamp = new Date(data.timestamp.seconds * 1000);
  return {
    id: doc.id,
    summary: cleanedData.summary,
    hebrewSummary: cleanedData.hebrewSummary,
    translatedSummary: cleanedData.translatedSummary,
    englishHeadline: cleanedData.englishHeadline,
    hebrewHeadline: cleanedData.hebrewHeadline,
    translatedHeadline: cleanedData.translatedHeadline,
    timestamp: timestamp,
  }
}

export const getCountryDaySummaries = cache(async (countryName, day, daysInclude = 1) => {
  const summariesCollection = getCountryCollectionRef(countryName, 'summaries');

  const theDay = endOfDay(day);
  const dayBefore = sub(theDay, { days: daysInclude });
  const q = query(
    summariesCollection,
    where('timestamp', '>=', dayBefore),
    where('timestamp', '<=', theDay),
    orderBy('timestamp', 'desc'),
  );

  let summaries = await getDocs(q);
  if (summaries.empty) return [];
  summaries = summaries.docs.map(doc => prepareSummary(doc));
  return summaries;
})

export const getRecentSummaries = async (countryName, fromTime) => {
  const summariesCollection = getCountryCollectionRef(countryName, 'summaries');
  const q = query(
    summariesCollection,
    where('timestamp', '>', fromTime),
    orderBy('timestamp', 'desc'),
  );
  let summaries = await getDocs(q);
  if (summaries.empty) return [];
  summaries = summaries.docs.map(doc => prepareSummary(doc));
  return summaries;
}

export const subscribeToSummaries = (countryName, callback) => {
  const summariesCollection = getCountryCollectionRef(countryName, 'summaries');
  const q = query(
    summariesCollection,
    orderBy('timestamp', 'desc'),
    limit(1),
  );
  return onSnapshot(q, snapshot => {
    if (snapshot.empty) return
    const summaries = snapshot.docs.map(doc => prepareSummary(doc));
    callback(summaries);
  });
}

// ----------------- Daily Summaries -----------------
// ---------------------------------------------------

export const getCountryDailySummary = cache(async (countryName, day) => {
  // console.log('getting daily summary for', countryName, day);
  const date = day instanceof Date ? day : new Date(day);
  const dateString = date.toISOString().split('T')[0];

  const dailyCollection = getCountryCollectionRef(countryName, 'dailysummaries');
  const q = query(
    dailyCollection,
    where('date', '==', dateString),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return prepareData(snapshot.docs[0]);
})