'use client'

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import InnerLink from '@/components/InnerLink';
import Flag from '@/app/[locale]/[country]/TopBar/Flag';
import { countries } from '@/utils/sources/countries';

function MonthNavigation({ country, locale, year, month, monthName, position = 'left' }) {
    const currentMonth = parseInt(month);
    const currentYear = parseInt(year);
    
    // Calculate previous month
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    
    // Calculate next month  
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    
    // Check if navigation months should be available based on launch dates and current date
    const today = new Date();
    const nextMonthDate = new Date(nextYear, nextMonth - 1, 1);
    const hasNextMonth = nextMonthDate <= today;

    if (position === 'left') {
        return (
            <InnerLink 
                href={`/${locale}/${country}/history/${prevYear}/${prevMonth.toString().padStart(2, '0')}`}
                className="flex items-center text-blue-600 hover:text-blue-800"
            >
                                        <IconButton size="small" sx={{ padding: '2px' }}>
                            <ArrowBackIosNew sx={{ fontSize: '14px' }} />
                        </IconButton>
            </InnerLink>
        );
    } else {
        return hasNextMonth ? (
            <InnerLink 
                href={`/${locale}/${country}/history/${nextYear}/${nextMonth.toString().padStart(2, '0')}`}
                className="flex items-center text-blue-600 hover:text-blue-800"
            >
                <IconButton size="small" sx={{ padding: '2px' }}>
                    <ArrowForwardIos sx={{ fontSize: '14px' }} />
                </IconButton>
            </InnerLink>
        ) : null;
    }
}

export default function ArchiveTopBar({ country, locale, year, month, monthName }) {
    return (
        <nav className="sticky top-0 w-full bg-white z-50 py-1 direction-ltr">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center h-10 relative">
                    {/* Left: Previous Month Navigation */}
                    <div className="flex-1 flex justify-start">
                        <MonthNavigation {...{ country, locale, year, month, monthName }} position="left" />
                    </div>

                    {/* Center: The Hear • Flag • Month */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                        <h1 className="text-sm font-medium cursor-default hover:text-blue transition-colors font-['Geist']">The Hear</h1>
                        <span className="text-gray-400">•</span>
                        <Flag country={country} locale={locale} originalLocale={locale} />
                        <span className="text-gray-400">•</span>
                        <h2 className={`text-sm font-medium ${locale === 'heb' ? 'frank-re text-right' : 'font-[\"Geist\"] text-left'}`}>
                            {new Date(year, month - 1).toLocaleDateString(locale === 'heb' ? 'he' : 'en', { month: 'long' })}, {year}
                            <span className="text-gray-400 mx-2">•</span>
                            {locale === 'heb' ? 'ארכיון כותרות' : 'Headlines Archive'}
                        </h2>
                    </div>

                    {/* Right: Next Month Navigation */}
                    <div className="flex-1 flex justify-end">
                        <MonthNavigation {...{ country, locale, year, month, monthName }} position="right" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
