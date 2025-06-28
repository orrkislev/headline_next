// Helper function to clean summary text by removing everything after language markers
const cleanSummaryText = (text) => {
    if (!text) return '';
    
    // Find the index of language markers and truncate at the first one found
    const markers = ['HEBREWSUMMARY:', 'LOCALSUMMARY:', 'SUMMARY:'];
    let cleanText = text;
    
    for (const marker of markers) {
        const markerIndex = text.indexOf(marker);
        if (markerIndex !== -1) {
            cleanText = text.substring(0, markerIndex).trim();
            break; // Stop at the first marker found
        }
    }
    
    return cleanText;
};

export const getHeadline = (dailySummary, locale) => {
    // console.log('getHeadline', dailySummary, locale);
    let selectedHeadline;

    if (!dailySummary) {
        return '';
    }

    if (locale === 'heb') {
        selectedHeadline = dailySummary.headlineHebrew?.split('\n')[0] ||
            dailySummary.headline_option_1?.split('\n')[0] ||
            dailySummary.headline?.split('\n')[0];  // Final fallback
    } else if (locale === 'translated') {
        selectedHeadline = dailySummary.headlineLocal;
    } else {
        selectedHeadline = dailySummary.headline?.split('\n')[0];
    }

    // console.log('selectedHeadline', selectedHeadline);

    // Clean the headline to remove language markers and everything after them
    return cleanSummaryText(selectedHeadline);
};

export const getSummaryContent = (dailySummary, locale) => {
    let rawContent;
    
    if (locale === 'heb') {
        rawContent = dailySummary.summaryHebrew ||
            dailySummary.summary ||
            dailySummary.summaryEnglish;  // Final fallback
    } else if (locale === 'translated') {
        rawContent = dailySummary.summary;
    } else {
        rawContent = dailySummary.summaryEnglish;
    }
    
    // Clean the content to remove language markers and everything after them
    return cleanSummaryText(rawContent);
};