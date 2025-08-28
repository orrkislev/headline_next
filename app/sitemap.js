import { countries } from "@/utils/sources/countries"
import { createDateString } from "@/utils/utils"

// Revalidate the sitemap every 24 hours for better performance
export const revalidate = 86400 // 24 hours in seconds

// Per-country launch dates - actual dates when data became available
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

export default function sitemap() {
    const res = []
    const locales = ['en', 'heb']
    // Canonical domain - using www.the-hear.com to match hosting redirect setup
    const baseUrl = 'https://www.the-hear.com'
    const today = new Date()

    // HIGHEST PRIORITY ROUTES (1.0)
    
    // Main country pages - HIGHEST priority (core functionality)
    Object.keys(countries).forEach(country => {
        locales.forEach(locale => {
            res.push({
                url: `${baseUrl}/${locale}/${country}`,
                lastModified: new Date(),
                changeFrequency: 'hourly',
                priority: 1.0
            });
        });
    });

    // HIGH PRIORITY ROUTES (0.95)
    
    // Global pages - high priority
    locales.forEach(locale => {
        res.push({
            url: `${baseUrl}/${locale}/global`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.87
        });
    });



    // Static information pages - high priority (important for SEO and user understanding)
    res.push({
        url: `${baseUrl}/about`,
        lastModified: new Date('2025-08-28'), // Static page, rarely changes
        changeFrequency: 'monthly',
        priority: 0.85
    });

    res.push({
        url: `${baseUrl}/methodology`,
        lastModified: new Date('2025-08-28'), // Static page, rarely changes
        changeFrequency: 'monthly',
        priority: 0.85
    });

    // MEDIUM PRIORITY ROUTES (0.6)

    // LOWER PRIORITY ROUTES (0.1-0.6)
    
    // Monthly archive pages - medium priority
    Object.keys(countries).forEach(country => {
        // Exclude Finland - no archive data available
        if (country === 'finland') return;
        
        const countryLaunchDate = countryLaunchDates[country];
        if (!countryLaunchDate) return;

        locales.forEach(locale => {
            // Generate all month/year combinations from launch date to current month
            let date = new Date(countryLaunchDate.getFullYear(), countryLaunchDate.getMonth(), 1);
            const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

            while (date <= currentMonthStart) {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const isCurrentMonth = date.getTime() === currentMonthStart.getTime();
                
                res.push({
                    url: `${baseUrl}/${locale}/${country}/history/${year}/${month}`,
                    lastModified: isCurrentMonth ? new Date() : new Date(year, parseInt(month) - 1, 1),
                    changeFrequency: isCurrentMonth ? 'daily' : 'never',
                    priority: 0.65 // Medium priority for archive pages
                });
                
                // Move to next month
                date.setMonth(date.getMonth() + 1);
            }
        });
    });
    
    // Date-specific pages - based on actual per-country launch dates
    // NOTE: Start from yesterday (i=1) since today's date-specific URLs aren't generated until day is over
    Object.keys(countries).forEach(country => {
        const countryLaunchDate = countryLaunchDates[country];
        if (!countryLaunchDate) {
            console.warn(`No launch date found for country: ${country}`);
            return;
        }

        // Calculate days since this country launched
        const daysSinceLaunch = Math.floor((today - countryLaunchDate) / (1000 * 60 * 60 * 24));
        
        // Only include days where data actually exists, with reasonable maximum
        const maxDaysForCountry = Math.min(daysSinceLaunch, 365);

        locales.forEach(locale => {
            // Start from i=1 (yesterday) since today's date URLs don't exist yet
            for (let i = 1; i <= maxDaysForCountry; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                
                // Skip dates before this country launched
                if (date < countryLaunchDate) {
                    continue;
                }
                
                const dateString = createDateString(date);

                // Priority decreases with age: yesterday = 0.6, oldest = 0.1
                // Adjust priority calculation since we start from i=1
                const priority = 0.6 - ((i - 1) / maxDaysForCountry) * 0.5;

                res.push({
                    url: `${baseUrl}/${locale}/${country}/${dateString}`,
                    lastModified: date, // Use the actual historical date
                    changeFrequency: 'never', // Historical data doesn't change
                    priority: Math.max(0.1, priority) // Ensure minimum priority of 0.1
                });
            }
        });
    });

    // Global daily archive pages - starting from September 14, 2024
    const globalStartDate = new Date('2024-09-14');
    locales.forEach(locale => {
        // Calculate days since global archive launch
        const daysSinceGlobalLaunch = Math.floor((today - globalStartDate) / (1000 * 60 * 60 * 24));
        
        // Only include days where data actually exists, with reasonable maximum
        const maxDaysForGlobal = Math.min(daysSinceGlobalLaunch, 365);

        // Start from i=1 (yesterday) since today's date URLs don't exist yet
        for (let i = 1; i <= maxDaysForGlobal; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Skip dates before global archive launch
            if (date < globalStartDate) {
                continue;
            }
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            // Priority increases with age: yesterday = 0.3, oldest = 0.6
            // Older pages are more important as they contain established historical data
            const priority = 0.3 + ((i - 1) / maxDaysForGlobal) * 0.3;

            res.push({
                url: `${baseUrl}/${locale}/global/history/${year}/${month}/${day}`,
                lastModified: date, // Use the actual historical date
                changeFrequency: 'never', // Historical data doesn't change
                priority: Math.max(0.3, Math.min(0.6, priority)) // Ensure priority stays between 0.3 and 0.6
            });
        }
    });

    return res;
}