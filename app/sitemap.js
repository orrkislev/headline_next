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
    
    // Global pages - very high priority
    locales.forEach(locale => {
        res.push({
            url: `${baseUrl}/${locale}/global`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.95
        });
    });

    // Mobile page - medium-high priority
    res.push({
        url: `${baseUrl}/mobile`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
    });

    // MEDIUM PRIORITY ROUTES (0.6)
    
    // About page - medium priority
    res.push({
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6
    });

    // LOWER PRIORITY ROUTES (0.1-0.6)
    
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

    return res;
}