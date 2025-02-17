import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHL019u-2ZDIGpdcN0VIZy97x6d2FqnLA",
  authDomain: "headline-collector-c9bec.firebaseapp.com",
  projectId: "headline-collector-c9bec",
  storageBucket: "headline-collector-c9bec.appspot.com",
  messagingSenderId: "810831314251",
  appId: "1:810831314251:web:c4bdb80a92eb674042fcce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDb = () => db;