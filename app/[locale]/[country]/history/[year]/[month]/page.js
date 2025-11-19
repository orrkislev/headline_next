import { countries } from "@/utils/sources/countries";
import { getCountryDailySummariesForMonth } from "@/utils/database/countryData";
import { isHebrewContentAvailable } from "@/utils/daily summary utils";
import MonthlyArchiveGrid from "./MonthlyArchiveGrid";
import { createMetadata, LdJson } from "./metadata";
import { redirect } from "next/navigation";

// Server-side navigation component for SEO
function ServerArchiveNavigation({ country, locale, year, month }) {
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

    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            {/* Hidden server-rendered navigation links for crawlers */}
            <nav>
                {/* Month navigation */}
                <a href={`/${locale}/${country}/history/${prevYear}/${prevMonth.toString().padStart(2, '0')}`}>
                    {locale === 'heb' ? 'חודש קודם' : 'Previous Month'}: {new Date(prevYear, prevMonth - 1).toLocaleDateString(locale === 'heb' ? 'he' : 'en', { month: 'long', year: 'numeric' })}
                </a>
                {hasNextMonth && (
                    <a href={`/${locale}/${country}/history/${nextYear}/${nextMonth.toString().padStart(2, '0')}`}>
                        {locale === 'heb' ? 'חודש הבא' : 'Next Month'}: {new Date(nextYear, nextMonth - 1).toLocaleDateString(locale === 'heb' ? 'he' : 'en', { month: 'long', year: 'numeric' })}
                    </a>
                )}

                {/* Country navigation - matches ArchiveCountryNavigator exactly */}
                {Object.keys(countries)
                    .filter(c => c !== 'uae' && c !== 'finland') // Same filter as ArchiveCountryNavigator
                    .map((c) => (
                        <a key={c} href={`/${locale}/${c}/history/${year}/${month.toString().padStart(2, '0')}`}>
                            {locale === 'heb' ? `${countries[c].english} ארכיון` : `${countries[c].english} Headlines Archive`} - {new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(locale === 'heb' ? 'he' : 'en', { month: 'long', year: 'numeric' })}
                        </a>
                    ))}

                {/* Global page link */}
                <a href={`/${locale}/global`}>
                    {locale === 'heb' ? 'תצוגה עולמית' : 'Global Headlines View'}
                </a>

                {/* Additional SEO-friendly internal links */}
                <a href={`/${locale}/${country}`}>
                    {locale === 'heb' ? 'כותרות חיות מ' : 'Live Headlines from'} {locale === 'heb' ? countries[country].hebrew : countries[country].english}
                </a>
            </nav>
        </div>
    );
}

// Historical months are immutable - cache forever
// Current month updates daily
// Note: We'll check this at runtime in the page component
export const revalidate = false; // Cache historical months forever

export const dynamicParams = false;

export async function generateStaticParams() {
    const countryLaunchDates = {
        'israel': new Date('2024-07-04'),
        'germany': new Date('2024-07-28'),
        'us': new Date('2024-07-31'),
        'italy': new Date('2024-08-28'),
        'russia': new Date('2024-08-29'),
        'iran': new Date('2024-08-29'),
        'france': new Date('2024-08-29'),
        'lebanon': new Date('2024-08-29'),
        'poland': new Date('2024-08-30'),
        'uk': new Date('2024-09-05'),
        'india': new Date('2024-09-05'),
        'ukraine': new Date('2024-09-05'),
        'spain': new Date('2024-09-05'),
        'netherlands': new Date('2024-09-05'),
        'china': new Date('2024-09-06'),
        'japan': new Date('2024-09-07'),
        'turkey': new Date('2024-09-07'),
        'uae': new Date('2024-09-08'),
        'palestine': new Date('2024-09-10'),
        'finland': new Date('2025-02-20')
    };

    const routes = [];
    const currentDate = new Date();
    const locales = ['en', 'heb'];

    Object.keys(countries).forEach(country => {
        const launchDate = countryLaunchDates[country];
        if (!launchDate) return;

        locales.forEach(locale => {
            // Generate all month/year combinations from launch date to current month
            let date = new Date(launchDate.getFullYear(), launchDate.getMonth(), 1);
            const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

            while (date <= currentMonthStart) {
                routes.push({
                    country,
                    locale,
                    year: date.getFullYear().toString(),
                    month: (date.getMonth() + 1).toString().padStart(2, '0')
                });

                // Move to next month
                date.setMonth(date.getMonth() + 1);
            }
        });
    });

    return routes;
}

export async function generateMetadata({ params }) {
    return createMetadata(params);
}

export default async function MonthlyArchivePage({ params }) {
    const { country, locale, year, month } = await params;

    // Fetch all daily summaries for this month
    const dailySummaries = await getCountryDailySummariesForMonth(country, parseInt(year), parseInt(month));

    // Check if Hebrew content is available for Hebrew locale
    if (locale === 'heb' && dailySummaries.length > 0) {
        const hasHebrewContent = dailySummaries.some(summary => isHebrewContentAvailable(summary));

        // If no Hebrew content is available, redirect to English
        if (!hasHebrewContent) {
            redirect(`/en/${country}/history/${year}/${month}`);
        }
    }

    // Note: Sorting will be handled in the component for proper grid ordering

    const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
        locale === 'heb' ? 'he' : 'en',
        { month: 'long', year: 'numeric' }
    );

    return (
        <>
            {/* JSON-LD structured data for SEO */}
            <LdJson
                country={country}
                locale={locale}
                year={year}
                month={month}
                dailySummaries={dailySummaries}
                headlines={dailySummaries.flatMap(summary => summary.headlines || [])}
            />

            {/* Server-side navigation links for SEO - hidden but crawlable */}
            <ServerArchiveNavigation country={country} locale={locale} year={year} month={month} />

            {/* Client-side interactive UI */}
            <MonthlyArchiveGrid
                dailySummaries={dailySummaries}
                country={country}
                locale={locale}
                year={year}
                month={month}
                monthName={monthName}
            />
        </>
    );
}

