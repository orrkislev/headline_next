'use client'

import { useEffect, useState } from 'react';
import { firebaseConfig } from './firebaseConfig';
import { endOfDay, sub } from 'date-fns';

let cachedFirestore;
let cachedDb;

export default function useFirebase() {
  const [firestore, setFirestore] = useState(cachedFirestore);
  const [db, setDb] = useState(cachedDb);

  useEffect(() => {
    const loadFirebase = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { initializeApp } = await import('firebase/app');
      const _firestore = await import('firebase/firestore');

      const app = initializeApp(firebaseConfig);
      const _db = _firestore.getFirestore(app);
      setDb(_db);
      setFirestore(_firestore);
    }
    if (!firestore) loadFirebase()
  }, []);


  // ----------------- Helpers -----------------
  // ---------------------------------------------

  const getCountryCollectionRef = (countryName, collectionName) => {
    const countriesCollection = firestore.collection(db, '- Countries -');

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
    const countryDoc = firestore.doc(countriesCollection, countryNameWithCapital);
    return firestore.collection(countryDoc, collectionName);
  }


  const prepareData = (doc) => {
    const data = doc.data();
    const cleanedData = JSON.parse(JSON.stringify(data));
    const timestamp = new Date(data.timestamp.seconds * 1000);
    return { id: doc.id, ...cleanedData, timestamp };
  }


  // ----------------- Summaries -----------------
  // ---------------------------------------------

  const getCountryDaySummaries = async (countryName, day, daysInclude = 1) => {
    const summariesCollection = getCountryCollectionRef(countryName, 'summaries');

    const theDay = endOfDay(day);
    const dayBefore = sub(theDay, { days: daysInclude });
    const q = firestore.query(
      summariesCollection,
      firestore.where('timestamp', '>=', dayBefore),
      firestore.where('timestamp', '<=', theDay),
      firestore.orderBy('timestamp', 'desc'),
    );

    let summaries = await firestore.getDocs(q);
    if (summaries.empty) return [];
    summaries = summaries.docs.map(doc => prepareData(doc));
    return summaries;
  }

  const getRecentSummaries = async (countryName, fromTime) => {
    const summariesCollection = getCountryCollectionRef(countryName, 'summaries');
    const q = firestore.query(
      summariesCollection,
      firestore.where('timestamp', '>', fromTime),
      firestore.orderBy('timestamp', 'desc'),
    );
    let summaries = await firestore.getDocs(q);
    if (summaries.empty) return [];
    summaries = summaries.docs.map(doc => prepareData(doc));
    return summaries;
  }

  const subscribeToSummaries = (countryName, callback) => {
    const summariesCollection = getCountryCollectionRef(countryName, 'summaries');
    const q = firestore.query(
      summariesCollection,
      firestore.orderBy('timestamp', 'desc'),
      firestore.limit(1),
    );
    return firestore.onSnapshot(q, snapshot => {
      if (snapshot.empty) return;
      const summaries = snapshot.docs.map(doc => prepareData(doc));
      callback(summaries);
    });
  }

  // ----------------- Daily Summaries -----------------
  // ---------------------------------------------------

  const getCountryDailySummary = async (countryName, day) => {
    const date = new Date(day);
    const dateString = date.toISOString().split('T')[0];

    const dailyCollection = getCountryCollectionRef(countryName, 'dailysummaries');
    const q = firestore.query(
      dailyCollection,
      firestore.where('date', '==', dateString),
    );
    const snapshot = await firestore.getDocs(q);
    if (snapshot.empty) return null;
    return prepareData(snapshot.docs[0]);
  }

  // ---------------- Global Overviews ----------------
  // --------------------------------------------------

  const subscribeToGlobalOverviews = async (callback) => {
    const globalOverviewsRef = firestore.collection(db, '- metadata -', 'globalOverviews', 'overviews');
    const q = firestore.query(globalOverviewsRef, firestore.orderBy('timestamp', 'desc'), firestore.limit(1));

    return firestore.onSnapshot(q, { includeMetadataChanges: false }, (snapshot) => {
      if (!snapshot.empty) {
        const data = prepareData(snapshot.docs[0]);

        data.overview = data.english?.overview || data.english || null;
        data.english = {
          headline: data.english?.headline || '',
          overview: data.english?.overview || ''
        };
        data.hebrew = {
          headline: data.hebrew?.headline || '',
          overview: data.hebrew?.overview || ''
        };
        callback(data);
      }
    });
  }

  return {
    db, firestore,
    getCountryCollectionRef,
    prepareData,
    getCountryDaySummaries,
    getRecentSummaries,
    subscribeToSummaries,
    getCountryDailySummary,
    subscribeToGlobalOverviews
  }
}