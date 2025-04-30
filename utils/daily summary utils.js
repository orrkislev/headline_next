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

    return selectedHeadline;
};

export const getSummaryContent = (dailySummary, locale) => {
    if (locale === 'heb') {
        return dailySummary.summaryHebrew ||
            dailySummary.summary ||
            dailySummary.summaryEnglish;  // Final fallback
    } else if (locale === 'translated') {
        return dailySummary.summary;
    } else {
        return dailySummary.summaryEnglish;
    }
};