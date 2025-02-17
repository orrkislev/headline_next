import { getDb } from "@/utils/database/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

export async function getAllCountryNames() {
    const db = getDb();
    const countriesCollection = collection(db, '- Countries -');
    const docs = await getDocs(countriesCollection);
    const countryNames = docs.docs.map(doc => doc.id);
    return countryNames;
}