import { countries } from "@/utils/sources/countries";
import { getCountryDailySummariesForMonth } from "@/utils/database/countryData";
import MonthlyArchiveGrid from "./MonthlyArchiveGrid";
import { createMetadata } from "./metadata";

// Conditional revalidation - historical months cached forever, current month updates daily
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

// Note: This will be set at build time for each route
export const revalidate = 86400; // Default to 24 hours - will be optimized at edge for historical months

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
    
    // Note: Sorting will be handled in the component for proper grid ordering
    
    const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
        locale === 'heb' ? 'he' : 'en', 
        { month: 'long', year: 'numeric' }
    );

    return (
        <MonthlyArchiveGrid 
            dailySummaries={dailySummaries}
            country={country}
            locale={locale}
            year={year}
            month={month}
            monthName={monthName}
        />
    );
}

