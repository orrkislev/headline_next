import { countries } from "@/utils/sources/countries"

// Revalidate every 24 hours
export const revalidate = 86400

export async function GET() {
    const baseUrl = 'https://www.the-hear.com'
    const locales = ['en', 'heb']
    const res = []

    // Main country pages - medium-high priority (important for users, but harder for bots to crawl)
    Object.keys(countries).forEach(country => {
        locales.forEach(locale => {
            res.push({
                url: `${baseUrl}/${locale}/${country}`,
                lastModified: new Date(),
                changeFrequency: 'hourly',
                priority: 0.8 // Lowered from 1.0 - important but JS-heavy
            });
        });
    });

    // Global pages - medium-high priority
    locales.forEach(locale => {
        res.push({
            url: `${baseUrl}/${locale}/global`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.75 // Lowered from 0.87 - important but JS-heavy
        });
    });

    // Static information pages - very high priority (easy to crawl, help Google understand the site)
    res.push({
        url: `${baseUrl}/about`,
        lastModified: new Date('2025-08-28'),
        changeFrequency: 'monthly',
        priority: 0.95 // Increased - helps Google understand the site's purpose
    });

    res.push({
        url: `${baseUrl}/methodology`,
        lastModified: new Date('2025-08-28'),
        changeFrequency: 'monthly',
        priority: 0.95 // Increased - helps Google understand the site's methodology
    });

    // Convert to XML format
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${res.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
