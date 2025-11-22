/**
 * Helper function to get timezone offset string for Date constructor
 * Converts IANA timezone names to offset strings (e.g., "-05:00", "+02:00")
 * This is a simplified version - for production, consider using a library like date-fns-tz
 *
 * @param {string} timezone - IANA timezone name (e.g., "America/New_York")
 * @returns {string} - Offset string (e.g., "-05:00")
 */
function getTimezoneOffset(timezone) {
    // Common timezone mappings (simplified - this doesn't account for DST)
    // For a production solution, use date-fns-tz or Temporal API
    const timezoneOffsets = {
        'America/New_York': '-05:00',    // EST (DST: -04:00)
        'America/Chicago': '-06:00',     // CST (DST: -05:00)
        'America/Denver': '-07:00',      // MST (DST: -06:00)
        'America/Los_Angeles': '-08:00', // PST (DST: -07:00)
        'Europe/London': '+00:00',       // GMT (DST: +01:00)
        'Europe/Paris': '+01:00',        // CET (DST: +02:00)
        'Europe/Berlin': '+01:00',       // CET (DST: +02:00)
        'Europe/Moscow': '+03:00',       // MSK
        'Europe/Athens': '+02:00',       // EET (DST: +03:00)
        'Asia/Jerusalem': '+02:00',      // IST (DST: +03:00)
        'Asia/Dubai': '+04:00',          // GST
        'Asia/Tokyo': '+09:00',          // JST
        'Asia/Shanghai': '+08:00',       // CST
        'Asia/Kolkata': '+05:30',        // IST
        'Asia/Tehran': '+03:30',         // IRST (DST: +04:30)
        'Asia/Beirut': '+02:00',         // EET (DST: +03:00)
        'Europe/Istanbul': '+03:00',     // TRT
        'Europe/Kiev': '+02:00',         // EET (DST: +03:00)
        'Europe/Warsaw': '+01:00',       // CET (DST: +02:00)
        'Europe/Madrid': '+01:00',       // CET (DST: +02:00)
        'Europe/Rome': '+01:00',         // CET (DST: +02:00)
        'Europe/Amsterdam': '+01:00',    // CET (DST: +02:00)
        'Europe/Helsinki': '+02:00',     // EET (DST: +03:00)
        'Asia/Gaza': '+02:00',           // EET (DST: +03:00)
        'UTC': '+00:00',
    };

    return timezoneOffsets[timezone] || '+00:00'; // Default to UTC if unknown
}

/**
 * Filters a multi-day dataset to show only one day's content, with continuity.
 *
 * WHY THIS EXISTS:
 * - Headlines can spill across day boundaries due to timezone differences
 * - A user in Tel Aviv viewing "US 20-11-2025" might see headlines timestamped in US 21-11-2025
 * - We fetch a 3-day window (previous/current/next) but only display the requested day
 *
 * CONTINUITY FEATURE:
 * - For each news source, we include the last headline from the previous day
 * - This ensures the timeline doesn't have gaps (users see where yesterday ended)
 * - Same logic applies to summaries (include previous day's last summary)
 *
 * @param {Object} data - The data object containing headlines, summaries
 * @param {Array} data.headlines - Array of headline objects with timestamp and website_id
 * @param {Array} data.summaries - Array of summary objects with timestamp
 * @param {Date} parsedDate - The date to filter to (will be treated as local day boundaries)
 * @returns {Object} - { headlines, initialSummaries } filtered to the day + continuity items
 */
export function filterToDayWithContinuity(data, parsedDate) {
    // Define day boundaries in local time
    const startOfDay = new Date(parsedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // ============= HEADLINES =============
    // Get all headlines within the day boundaries
    const dayHeadlines = data.headlines.filter(h =>
        h.timestamp >= startOfDay && h.timestamp <= endOfDay
    );

    // Get unique news sources from ALL headlines (not just today's)
    const allSources = [...new Set(data.headlines.map(h => h.website_id))];

    // For continuity: add the last headline from previous day for each source
    const previousDayLastHeadlines = allSources.map(sourceId => {
        const sourceHeadlines = data.headlines
            .filter(h => h.website_id === sourceId && h.timestamp < startOfDay)
            .sort((a, b) => b.timestamp - a.timestamp);
        return sourceHeadlines[0]; // Most recent headline before startOfDay
    }).filter(Boolean); // Remove undefined entries (sources with no previous headlines)

    // Merge and sort all headlines by timestamp (newest first)
    const headlines = [...dayHeadlines, ...previousDayLastHeadlines]
        .sort((a, b) => b.timestamp - a.timestamp);

    // ============= SUMMARIES =============
    // Get all summaries within the day boundaries
    const daySummaries = data.summaries.filter(s =>
        s.timestamp >= startOfDay && s.timestamp <= endOfDay
    );

    // For continuity: add the last summary from previous day
    const previousDayLastSummary = data.summaries
        .filter(s => s.timestamp < startOfDay)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

    // Merge and sort (if previous summary exists)
    const initialSummaries = previousDayLastSummary
        ? [previousDayLastSummary, ...daySummaries].sort((a, b) => b.timestamp - a.timestamp)
        : daySummaries;

    return { headlines, initialSummaries };
}

/**
 * Filters a multi-day dataset to show STRICTLY one day's content only.
 *
 * DIFFERENCE FROM filterToDayWithContinuity:
 * - NO continuity feature - only items strictly within day boundaries
 * - Used for feed/archive pages where we want exact chronological display
 * - Does NOT include previous day's last headline/summary
 * - Filters based on country's local timezone (from metadata)
 *
 * @param {Object} data - The data object containing headlines, summaries, and metadata
 * @param {Array} data.headlines - Array of headline objects with timestamp
 * @param {Array} data.summaries - Array of summary objects with timestamp
 * @param {Object} data.metadata - Metadata object containing timezone info
 * @param {Date} parsedDate - The date to filter to (will be treated in country's timezone)
 * @returns {Object} - { headlines, initialSummaries } filtered to ONLY the requested day
 */
export function filterToStrictDay(data, parsedDate) {
    // Get timezone from metadata, fallback to UTC if not available
    const timezone = data.metadata?.timezone || 'UTC';

    // Format date as YYYY-MM-DD for the target day
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Create day boundaries in the country's timezone
    // Start: YYYY-MM-DD 00:00:00 in country timezone
    const startOfDayStr = `${dateStr}T00:00:00`;
    const startOfDay = new Date(startOfDayStr + getTimezoneOffset(timezone));

    // End: YYYY-MM-DD 23:59:59.999 in country timezone
    const endOfDayStr = `${dateStr}T23:59:59.999`;
    const endOfDay = new Date(endOfDayStr + getTimezoneOffset(timezone));

    // ============= HEADLINES =============
    // Get ONLY headlines within the day boundaries (no continuity)
    const headlines = data.headlines
        .filter(h => h.timestamp >= startOfDay && h.timestamp <= endOfDay)
        .sort((a, b) => b.timestamp - a.timestamp);

    // ============= SUMMARIES =============
    // Get ONLY summaries within the day boundaries (no continuity)
    const initialSummaries = data.summaries
        .filter(s => s.timestamp >= startOfDay && s.timestamp <= endOfDay)
        .sort((a, b) => b.timestamp - a.timestamp);

    return { headlines, initialSummaries };
}
