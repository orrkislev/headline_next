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
