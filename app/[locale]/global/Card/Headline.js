'use client'

import InnerLink from "@/components/InnerLink";

export default function Headline({ country, locale, summary, typography, index }) {
    let headline = summary.englishHeadline;
    if (locale === 'heb') {
        headline = summary.hebrewHeadline || summary.headline
    } else if (locale === 'translated') {
        headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    }

    // Apply 1.5x font size multiplier for the first card (index 0)
    const updatedTypography = index === 0 ? {
        ...typography,
        fontSize: `calc(${typography.fontSize} * 1.5)`
    } : typography;

    return (
        <InnerLink locale={locale} href={`/${locale}/${country}`}>
            <h2 className={`animate-headline w-full text-lg font-semibold break-words px-1`}
                style={{
                    ...updatedTypography,
                    width: '100%',
                    // Preserve the typography fontSize to maintain font-specific multipliers
                    fontFamily: updatedTypography.fontFamily
                }} key={summary.id}>
                {headline}
            </h2>
        </InnerLink>
    );
}