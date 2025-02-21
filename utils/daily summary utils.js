export const getHeadline = (dailySummary, language) => {
    let selectedHeadline;

    if (language === 'hebrew') {
        selectedHeadline = dailySummary.headlineHebrew?.split('\n')[0] ||
            dailySummary.headline_option_1?.split('\n')[0] ||
            dailySummary.headline?.split('\n')[0];  // Final fallback
    } else if (language === 'translated') {
        selectedHeadline = dailySummary.headlineLocal;
    } else {
        selectedHeadline = dailySummary.headline?.split('\n')[0];
    }

    return selectedHeadline;
};

export const getSummaryContent = (dailySummary, language) => {
    if (language === 'hebrew') {
        return dailySummary.summaryHebrew ||
            dailySummary.summary ||
            dailySummary.summaryEnglish;  // Final fallback
    } else if (language === 'translated') {
        return dailySummary.summary;
    } else {
        return dailySummary.summaryEnglish;
    }
};