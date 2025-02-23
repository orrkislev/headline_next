import { getDb } from "@/utils/database/firebase";
import { endOfDay, sub } from "date-fns";
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";

export function getCountryCollectionRef(countryName, collectionName) {
  const db = getDb();
  const countriesCollection = collection(db, '- Countries -');

  let processedName = countryName.replace(/-/g, ' ');
  let countryNameWithCapital;

  if (['us', 'uk'].includes(processedName.toLowerCase())) {
    countryNameWithCapital = processedName.toUpperCase();
  } else if (processedName.toLowerCase() === 'united arab emirates') {
    countryNameWithCapital = 'United Arab Emirates';
  } else {
    countryNameWithCapital = processedName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  const countryDoc = doc(countriesCollection, countryNameWithCapital);
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

export const getCountryDayHeadlines = async (countryName, day, daysInclude = 1) => {
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
  headlines = headlines.docs.map(headline => prepareData(headline));
  return headlines;
}

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

// ----------------- Summaries -----------------
// ---------------------------------------------

export const getCountryDaySummaries = async (countryName, day, daysInclude = 1) => {
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
  summaries = summaries.docs.map(doc => prepareData(doc));
  return summaries;
}

export const getRecentSummaries = async (countryName, fromTime) => {
  const summariesCollection = getCountryCollectionRef(countryName, 'summaries');
  const q = query(
    summariesCollection,
    where('timestamp', '>', fromTime),
    orderBy('timestamp', 'desc'),
  );
  let summaries = await getDocs(q);
  if (summaries.empty) return [];
  summaries = summaries.docs.map(doc => prepareData(doc));
  return summaries;
}

// ----------------- Daily Summaries -----------------
// ---------------------------------------------------

export const getCountryDailySummary = async (countryName, day) => {
  const date = new Date(day);
  const dateString = date.toISOString().split('T')[0];

  const dailyCollection = getCountryCollectionRef(countryName, 'dailysummaries');
  const q = query(
    dailyCollection,
    where('date', '==', dateString),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return prepareData(snapshot.docs[0]);
}