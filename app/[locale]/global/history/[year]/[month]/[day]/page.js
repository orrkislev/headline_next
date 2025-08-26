import { countries } from "@/utils/sources/countries";
import { getGlobalDailySummariesForDate } from "@/utils/database/countryData";
import { isHebrewContentAvailable } from "@/utils/daily summary utils";
import GlobalDailyArchiveGrid from "./GlobalDailyArchiveGrid";
import { createMetadata, LdJson } from "./metadata";
import { redirect, notFound } from "next/navigation";
import { createDateString } from "@/utils/utils";

// Server-side navigation component for SEO
function ServerArchiveNavigation({ locale, year, month, day }) {
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    // Calculate previous day
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    
    // Calculate next day  
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    
    // Check if navigation days should be available based on current date
    const today = new Date();
    const hasNextDay = nextDay <= today;

    const formatDateUrl = (date) => {
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            {/* Hidden server-rendered navigation links for crawlers */}
            <nav>
                {/* Day navigation */}
                <a href={`/${locale}/global/history/${formatDateUrl(prevDay)}`}>
                    {locale === 'heb' ? 'יום קודם' : 'Previous Day'}: {prevDay.toLocaleDateString(locale === 'heb' ? 'he' : 'en', { day: 'numeric', month: 'long', year: 'numeric' })}
                </a>
                {hasNextDay && (
                    <a href={`/${locale}/global/history/${formatDateUrl(nextDay)}`}>
                        {locale === 'heb' ? 'יום הבא' : 'Next Day'}: {nextDay.toLocaleDateString(locale === 'heb' ? 'he' : 'en', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </a>
                )}
                
                {/* Country navigation - link to each country's archive for this date */}
                {Object.keys(countries)
                    .filter(c => c !== 'uae' && c !== 'finland')
                    .map((c) => (
                        <a key={c} href={`/${locale}/${c}/${createDateString(currentDate)}`}>
                            {locale === 'heb' ? `${countries[c].hebrew} - ${currentDate.toLocaleDateString('he', { day: 'numeric', month: 'long', year: 'numeric' })}` : `${countries[c].english} - ${currentDate.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                        </a>
                    ))}
                
                {/* Global live page link */}
                <a href={`/${locale}/global`}>
                    {locale === 'heb' ? 'תצוגה עולמית חיה' : 'Live Global Headlines View'}
                </a>
                
                {/* Month archive links for each country */}
                {Object.keys(countries)
                    .filter(c => c !== 'uae' && c !== 'finland')
                    .map((c) => (
                        <a key={`${c}-archive`} href={`/${locale}/${c}/history/${year}/${String(month).padStart(2, '0')}`}>
                            {locale === 'heb' ? `${countries[c].hebrew} ארכיון חודשי` : `${countries[c].english} Monthly Archive`}
                        </a>
                    ))}
            </nav>
        </div>
    );
}

// Historical dates cached forever, current date updates daily
export const revalidate = 86400; // 24 hours - will be optimized at edge for historical dates

export const dynamicParams = true;

export async function generateStaticParams() {
    const routes = [];
    const currentDate = new Date();
    const locales = ['en', 'heb'];

    // Global archive starts from September 14, 2024
    const globalStartDate = new Date('2024-09-14');

    locales.forEach(locale => {
        // Generate all date combinations from global start date to current date
        let date = new Date(globalStartDate);
        
        while (date <= currentDate) {
            routes.push({
                locale,
                year: date.getFullYear().toString(),
                month: String(date.getMonth() + 1).padStart(2, '0'),
                day: String(date.getDate()).padStart(2, '0')
            });
            
            // Move to next day
            date.setDate(date.getDate() + 1);
        }
    });

    return routes;
}

export async function generateMetadata({ params }) {
    return createMetadata({ params });
}

export default async function GlobalDailyArchivePage({ params }) {
    const { locale, year, month, day } = await params;
    
    // Check if it's today or future date - redirect to live view
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    
    // Define minimum date (September 14, 2024)
    const minDate = new Date(2024, 8, 14); // Month is 0-indexed, so 8 = September
    
    // Check if date is before minimum date - return 404
    if (currentDate < minDate) {
        notFound();
    }
    
    if (currentDate >= today) {
        redirect(`/${locale}/global`);
    }
    
    // Fetch all daily summaries for this date across all countries
    const dailySummaries = await getGlobalDailySummariesForDate(parseInt(year), parseInt(month), parseInt(day));
    
    // Check if Hebrew content is available for Hebrew locale
    if (locale === 'heb' && dailySummaries.length > 0) {
        const hasHebrewContent = dailySummaries.some(summary => isHebrewContentAvailable(summary));
        
        // If no Hebrew content is available, redirect to English
        if (!hasHebrewContent) {
            redirect(`/en/global/history/${year}/${month}/${day}`);
        }
    }
    
    const dateString = locale === 'heb' 
        ? `${String(currentDate.getDate()).padStart(2, '0')}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`
        : currentDate.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            {/* JSON-LD structured data for SEO */}
            <LdJson 
                locale={locale}
                year={year}
                month={month}
                day={day}
                currentDate={currentDate}
                dailySummaries={dailySummaries}
                headlines={dailySummaries.flatMap(summary => summary.headlines || [])}
            />
            
            {/* Server-side navigation links for SEO - hidden but crawlable */}
            <ServerArchiveNavigation locale={locale} year={year} month={month} day={day} />
            
            {/* Client-side interactive UI */}
            <GlobalDailyArchiveGrid 
                dailySummaries={dailySummaries}
                locale={locale}
                year={year}
                month={month}
                day={day}
                currentDate={currentDate}
                dateString={dateString}
            />
        </>
    );
}