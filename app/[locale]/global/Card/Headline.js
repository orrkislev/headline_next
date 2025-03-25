'use client'

import Link from "next/link";
import { useResponsiveFontSizes, calculateTitleFontSize } from "@/utils/typography/responsiveFontSizes";
import InnerLink from "@/components/InnerLink";

export default function Headline({ country, locale, summary, typography, index }) {
    const responsiveFontSizes = useResponsiveFontSizes();
    
    let headline = summary.englishHeadline;
    if (locale === 'heb') {
        headline = summary.hebrewHeadline || summary.headline
    } else if (locale === 'translated') {
        headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    }

    // Determine language for font size calculation
    const language = locale === 'heb' ? 'hebrew' : 'english';
    
    // Calculate font size based on index and language
    const fontSize = calculateTitleFontSize(index, language, responsiveFontSizes);
    
    // Update typography with calculated font size
    const updatedTypography = {
        ...typography,
        fontSize
    };

    return (
        <InnerLink href={`/${locale}/${country}`}>
            <div className={`animate-headline w-full text-lg font-semibold break-words px-1`}
                style={{ ...updatedTypography, width: '100%' }} key={summary.id}>
                {headline}
            </div>
        </InnerLink>
    );
}