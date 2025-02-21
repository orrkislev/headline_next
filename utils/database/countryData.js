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
  headlines = headlines.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  headlines = headlines.map(headline => {
    const headlineData = JSON.parse(JSON.stringify(headline));
    headlineData.timestamp = new Date(headlineData.timestamp.seconds * 1000)
    return headlineData;
  });
  return headlines;
  // // group headlines by website_id
  // const groupedHeadlines = {};
  // headlines.forEach(headline => {
  //   if (!groupedHeadlines[headline.website_id]) {
  //     groupedHeadlines[headline.website_id] = [];
  //   }
  //   const headlineData = JSON.parse(JSON.stringify(headline));
  //   headlineData.timestamp = new Date(headlineData.timestamp.seconds*1000)
  //   groupedHeadlines[headline.website_id].push(headlineData);
  // });

  // return groupedHeadlines;
}

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
  summaries = summaries.docs.map(doc => {
    const data = doc.data()
    const cleanedData = JSON.parse(JSON.stringify(data));
    const timestamp = new Date(data.timestamp.seconds * 1000);
    return { id: doc.id, ...cleanedData, timestamp };
  })

  return summaries;
}

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
  const data = snapshot.docs[0].data();
  const cleanedData = JSON.parse(JSON.stringify(data));
  cleanedData.timestamp = new Date(data.timestamp.seconds * 1000);
  return cleanedData;
}