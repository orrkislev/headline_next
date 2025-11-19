import { format } from 'date-fns';

/**
 * Fetches a daily snapshot JSON file from Firebase Storage
 * @param {string} country - Country code (lowercase, e.g., 'us', 'israel')
 * @param {Date} date - Date object for the snapshot
 * @returns {Promise<Object|null>} Object with headlines, summaries, and dailySummary, or null if not found
 */
export async function fetchDailySnapshot(country, date) {
    try {
        // Convert date to JSON filename format (yyyy-MM-dd)
        const dateStr = format(date, 'yyyy-MM-dd');

        // Country code should be uppercase in the filename
        const countryUpper = country.toUpperCase();

        // Construct the Firebase Storage URL
        const url = `https://storage.googleapis.com/headline-collector-c9bec.firebasestorage.app/daily-snapshots/${countryUpper}/${countryUpper}-${dateStr}.json`;

        // Fetch the JSON file with timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        let response;
        try {
            response = await fetch(url, {
                // Add cache control for better performance
                cache: 'force-cache', // Cache historical data aggressively
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                console.warn(`[fetchDailySnapshot] Timeout fetching JSON for ${country} on ${dateStr}`);
            } else {
                console.error(`[fetchDailySnapshot] Network error fetching JSON for ${country} on ${dateStr}:`, error);
            }
            return null;
        }

        if (!response.ok) {
            console.warn(`[fetchDailySnapshot] JSON not found for ${country} on ${dateStr} (${response.status})`);
            return null;
        }

        const json = await response.json();

        // Validate the JSON structure
        if (!json.data) {
            console.error(`[fetchDailySnapshot] Invalid JSON structure for ${country} on ${dateStr}`);
            return null;
        }

        // Convert timestamps from {seconds, nanoseconds} to Date objects
        // This matches exactly what prepareData() does in useFirebase.js
        const headlines = (json.data.headlines || []).map(h => {
            let timestamp;
            try {
                if (h.timestamp && typeof h.timestamp === 'object' && h.timestamp.seconds) {
                    timestamp = new Date(h.timestamp.seconds * 1000);
                } else if (h.timestamp) {
                    timestamp = new Date(h.timestamp);
                } else {
                    console.warn(`[fetchDailySnapshot] Headline ${h.id} has no timestamp`);
                    timestamp = null;
                }
            } catch (e) {
                console.error(`[fetchDailySnapshot] Error converting timestamp for headline ${h.id}:`, e);
                timestamp = null;
            }
            return { ...h, timestamp };
        });

        const summaries = (json.data.summaries || []).map(s => {
            let timestamp;
            try {
                if (s.timestamp && typeof s.timestamp === 'object' && s.timestamp.seconds) {
                    timestamp = new Date(s.timestamp.seconds * 1000);
                } else if (s.timestamp) {
                    timestamp = new Date(s.timestamp);
                } else {
                    console.warn(`[fetchDailySnapshot] Summary ${s.id} has no timestamp`);
                    timestamp = null;
                }
            } catch (e) {
                console.error(`[fetchDailySnapshot] Error converting timestamp for summary ${s.id}:`, e);
                timestamp = null;
            }
            return { ...s, timestamp };
        });

        const dailySummary = json.data.dailySummary ? (() => {
            let timestamp;
            try {
                if (json.data.dailySummary.timestamp && typeof json.data.dailySummary.timestamp === 'object' && json.data.dailySummary.timestamp.seconds) {
                    timestamp = new Date(json.data.dailySummary.timestamp.seconds * 1000);
                } else if (json.data.dailySummary.timestamp) {
                    timestamp = new Date(json.data.dailySummary.timestamp);
                } else {
                    timestamp = null;
                }
            } catch (e) {
                console.error(`[fetchDailySnapshot] Error converting timestamp for daily summary:`, e);
                timestamp = null;
            }
            return { ...json.data.dailySummary, timestamp };
        })() : null;

        return {
            headlines,
            summaries,
            dailySummary,
            // Include metadata for debugging/logging
            metadata: {
                country: json.country,
                date: json.date,
                generatedAt: json.generatedAt,
                timezone: json.timezone,
                stats: json.stats
            }
        };
    } catch (error) {
        console.error(`[fetchDailySnapshot] Error fetching snapshot for ${country} on ${format(date, 'yyyy-MM-dd')}:`, error);
        return null;
    }
}

/**
 * Fetches daily snapshot with automatic fallback to Firestore
 * @param {string} country - Country code
 * @param {Date} date - Date object
 * @param {Function} firestoreFallback - Function to call if JSON fetch fails
 * @returns {Promise<Object>} Data from JSON or Firestore
 */
export async function fetchDailySnapshotWithFallback(country, date, firestoreFallback) {
    // Try JSON first
    const jsonData = await fetchDailySnapshot(country, date);

    if (jsonData) {
        console.log(`[fetchDailySnapshot] ✅ Loaded from JSON: ${country} ${format(date, 'yyyy-MM-dd')}`);
        return jsonData;
    }

    // Fallback to Firestore
    console.log(`[fetchDailySnapshot] ⚠️ JSON not available, falling back to Firestore: ${country} ${format(date, 'yyyy-MM-dd')}`);

    if (typeof firestoreFallback === 'function') {
        return await firestoreFallback();
    }

    throw new Error('JSON not available and no Firestore fallback provided');
}
