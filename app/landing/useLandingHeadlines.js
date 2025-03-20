'use client';

import useFirebase from '@/utils/database/useFirebase';
import { countries } from '@/utils/sources/countries';
import { useState, useEffect } from 'react';
import { getSourceOrder } from '@/utils/sources/getCountryData';

export default function useLandingHeadlines() {
  const firebase = useFirebase()
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    if (!firebase.ready) return
    refreshHeadlines()
  }, [firebase.ready])

  const refreshHeadlines = async () => {
    if (!firebase.ready) return;

    const newHeadlines = []
    const allCountries = Object.keys(countries)
    for (let i = 0; i < 3; i++) {
      const country = allCountries[Math.floor(Math.random() * allCountries.length)]
      const sources = getSourceOrder(country, 'default')
      const source = sources[Math.floor(Math.random() * sources.length)]

      const headlinesCollection = firebase.getCountryCollectionRef(country, 'headlines');
      const q = firebase.firestore.query(
        headlinesCollection,
        firebase.firestore.where('website_id', '==', source),
        firebase.firestore.orderBy('timestamp', 'desc'),
        firebase.firestore.limit(1),
      );
      const docs = await firebase.firestore.getDocs(q);
      if (docs.empty) {
        i--;
        continue;
      };
      const headlineData = firebase.prepareData(docs.docs[0]);
      newHeadlines.push({ headlineData, country, source })
    }
    setHeadlines(newHeadlines)
  }

  return { headlines, refreshHeadlines }
}