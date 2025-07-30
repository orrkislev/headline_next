import { countries } from "@/utils/sources/countries"
import { createDateString } from "@/utils/utils"

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

export async function GET() {
    const res = []
    const locales = ['en', 'heb']
    const baseUrl = 'https://www.the-hear.com'
    const today = new Date()
    
    // CRITICAL: Set this to the deployment date when you want Google to recrawl
    const RECRAWL_DATE = new Date().toISOString()

    // Only include archive pages (date-specific URLs)
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

                res.push({
                    url: `${baseUrl}/${locale}/${country}/${dateString}`,
                    lastModified: RECRAWL_DATE, // This signals Google to recrawl
                    changeFrequency: 'never',
                    priority: 0.5 // Medium priority for recrawling
                });
            }
        });
    });

    // Convert to XML format
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${res.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>
`).join('')}
</urlset>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
} 