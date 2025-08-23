'use client'

import { getGridColumnClasses } from '@/app/[locale]/global/responsiveGrid';
import { countries } from '@/utils/sources/countries';
import InnerLink from '@/components/InnerLink';
import ArchiveCard from './ArchiveCard';
import TitleCard from './TitleCard';
import LiveCard from './LiveCard';
import { getTypographyOptions } from '@/utils/typography/typography';
import EnglishFonts from '@/utils/typography/EnglishFonts';
import HebrewFonts from '@/utils/typography/HebrewFonts';
import ArchiveTopBar from './ArchiveTopBar';



export default function MonthlyArchiveGrid({ 
    dailySummaries, 
    country, 
    locale, 
    year, 
    month, 
    monthName 
}) {
    const typography = getTypographyOptions(country);

    if (!dailySummaries || dailySummaries.length === 0) {
        return (
            <>
                <EnglishFonts />
                {locale == 'heb' && <HebrewFonts />}
                <typography.component />
                <ArchiveTopBar {...{ country, locale, year, month, monthName }} />
                <div className="min-h-screen bg-white">
                    <div className="max-w-6xl mx-auto p-6">
                        <div className="text-center py-12">
                            <p className={`text-gray-500 ${locale === 'heb' ? 'frank-re' : 'font-[\"Geist\"]'}`}>
                                {locale === 'heb' 
                                    ? 'לא נמצאו סיכומים יומיים לחודש זה' 
                                    : 'No daily summaries found for this month'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <EnglishFonts />
            {locale == 'heb' && <HebrewFonts />}
            <typography.component />
            <ArchiveTopBar {...{ country, locale, year, month, monthName }} />
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-6 pb-6">
                    <div className={`custom-scrollbar 
                            gap-4 p-4
                            flex flex-col sm:grid 
                            sm:grid-cols-1 
                            md:grid-cols-2 
                            lg:grid-cols-3 
                            fhd:grid-cols-4 
                            qhd:grid-cols-6 
                            direction-${countries[country].languageDirection}
                            `}>
                        {/* Title Card - Always First */}
                        <TitleCard 
                            country={country}
                            locale={locale}
                            year={year}
                            month={month}
                        />
                        
                        {/* Daily Summary Cards */}
                        {dailySummaries
                            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort ascending (first day first)
                            .map((dailySummary) => (
                                <ArchiveCard 
                                    key={dailySummary.date}
                                    dailySummary={dailySummary}
                                    country={country}
                                    locale={locale}
                                />
                            ))}
                        
                        {/* Live Card - Links to current country page (Last) */}
                        <LiveCard 
                            country={country}
                            locale={locale}
                        />
                    </div>
                    

                </div>
            </div>
        </>
    );
}