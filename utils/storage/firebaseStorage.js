// Firebase Storage utilities for search archive management
import { getStorage, ref, uploadString, getDownloadURL, getMetadata } from 'firebase/storage';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../database/firebaseConfig';

// Initialize Firebase if not already done
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);

/**
 * Upload JSON data to Firebase Storage
 * @param {string} country - Country code (e.g., 'us')
 * @param {string} monthKey - Month in YYYY-MM format
 * @param {Object} data - JSON data to upload
 * @param {string} type - 'headlines' or 'summaries'
 * @returns {Promise<string>} Download URL
 */
export async function uploadArchiveFile(country, monthKey, data, type) {
    const fileName = `${country}-${type}-${monthKey}.json`;
    const filePath = `search-archives/${country}/${fileName}`;
    const fileRef = ref(storage, filePath);
    
    const jsonString = JSON.stringify(data, null, 2);
    
    try {
        console.log(`📤 Attempting to upload ${fileName} to path: ${filePath}`);
        console.log(`📤 Data size: ${Math.round(jsonString.length / 1024)}KB`);
        console.log(`📤 Storage bucket: ${storage.app.options.storageBucket}`);
        
        await uploadString(fileRef, jsonString, 'raw', {
            contentType: 'application/json',
            customMetadata: {
                country,
                monthKey,
                type,
                lastUpdated: new Date().toISOString(),
                version: '1.0'
            }
        });
        
        const downloadURL = await getDownloadURL(fileRef);
        console.log(`✅ Uploaded ${fileName} (${Math.round(jsonString.length / 1024)}KB) to Firebase Storage`);
        return downloadURL;
    } catch (error) {
        console.error(`❌ Failed to upload ${fileName}:`, error);
        console.error(`❌ Error details:`, {
            code: error.code,
            message: error.message,
            serverResponse: error.serverResponse,
            customData: error.customData,
            status: error.status_
        });
        
        // More specific error handling
        if (error.code === 'storage/unauthorized') {
            console.error(`❌ Unauthorized access - check Firebase Storage rules`);
        } else if (error.code === 'storage/unknown' && error.status_ === 404) {
            console.error(`❌ Storage bucket not found or path inaccessible`);
        }
        
        throw error;
    }
}

/**
 * Download JSON data from Firebase Storage
 * @param {string} country - Country code
 * @param {string} monthKey - Month in YYYY-MM format  
 * @param {string} type - 'headlines' or 'summaries'
 * @returns {Promise<Object>} Parsed JSON data
 */
export async function downloadArchiveFile(country, monthKey, type) {
    const fileName = `${country}-${type}-${monthKey}.json`;
    const filePath = `search-archives/${country}/${fileName}`;
    const fileRef = ref(storage, filePath);
    
    try {
        const downloadURL = await getDownloadURL(fileRef);
        const response = await fetch(downloadURL);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        console.log(`📥 Downloaded ${fileName} from Firebase Storage`);
        return jsonData;
    } catch (error) {
        console.error(`❌ Failed to download ${fileName}:`, error);
        return null;
    }
}

/**
 * Get file metadata from Firebase Storage
 * @param {string} country - Country code
 * @param {string} monthKey - Month in YYYY-MM format
 * @param {string} type - 'headlines' or 'summaries'  
 * @returns {Promise<Object|null>} File metadata or null if not found
 */
export async function getArchiveFileMetadata(country, monthKey, type) {
    const fileName = `${country}-${type}-${monthKey}.json`;
    const filePath = `search-archives/${country}/${fileName}`;
    const fileRef = ref(storage, filePath);
    
    try {
        const metadata = await getMetadata(fileRef);
        return {
            lastUpdated: metadata.customMetadata?.lastUpdated || metadata.timeCreated,
            size: metadata.size,
            contentType: metadata.contentType,
            ...metadata.customMetadata
        };
    } catch (error) {
        // File doesn't exist
        return null;
    }
}

/**
 * Check if archive file needs updating by comparing with Firestore timestamps
 * @param {string} country - Country code
 * @param {string} monthKey - Month in YYYY-MM format
 * @param {string} type - 'headlines' or 'summaries'
 * @param {Date} latestFirestoreTimestamp - Most recent timestamp from Firestore
 * @returns {Promise<boolean>} True if update is needed
 */
export async function needsUpdate(country, monthKey, type, latestFirestoreTimestamp) {
    const metadata = await getArchiveFileMetadata(country, monthKey, type);
    
    if (!metadata) {
        // File doesn't exist, needs creation
        return true;
    }
    
    const fileLastUpdated = new Date(metadata.lastUpdated);
    
    // If Firestore has newer data, update is needed
    return latestFirestoreTimestamp > fileLastUpdated;
}

/**
 * Upload index file with archive metadata
 * @param {string} country - Country code
 * @param {Object} indexData - Index data with months/stats
 * @returns {Promise<string>} Download URL
 */
export async function uploadArchiveIndex(country, indexData) {
    const fileName = `${country}-index.json`;
    const filePath = `search-archives/${country}/${fileName}`;
    const fileRef = ref(storage, filePath);
    
    const jsonString = JSON.stringify(indexData, null, 2);
    
    try {
        await uploadString(fileRef, jsonString, 'raw', {
            contentType: 'application/json',
            customMetadata: {
                country,
                type: 'index',
                lastUpdated: new Date().toISOString()
            }
        });
        
        const downloadURL = await getDownloadURL(fileRef);
        console.log(`✅ Uploaded ${fileName} index to Firebase Storage`);
        return downloadURL;
    } catch (error) {
        console.error(`❌ Failed to upload ${fileName}:`, error);
        throw error;
    }
}

/**
 * Download archive index
 * @param {string} country - Country code
 * @returns {Promise<Object|null>} Index data or null if not found
 */
export async function downloadArchiveIndex(country) {
    const fileName = `${country}-index.json`;
    const filePath = `search-archives/${country}/${fileName}`;
    const fileRef = ref(storage, filePath);
    
    try {
        const downloadURL = await getDownloadURL(fileRef);
        const response = await fetch(downloadURL);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const indexData = await response.json();
        console.log(`📥 Downloaded ${fileName} index from Firebase Storage`);
        return indexData;
    } catch (error) {
        console.error(`❌ Failed to download ${fileName}:`, error);
        return null;
    }
}