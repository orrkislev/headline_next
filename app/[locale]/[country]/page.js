import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "./CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    const countryNames = Object.keys(countries);

    const routes = countryNames.flatMap(country => [
        { country, locale: 'en' },
        { country, locale: 'heb' }
    ]);
    return routes;
}

// SEO metadata for each country/locale page
export async function generateMetadata({ params }) {
    const { country, locale } = await params;
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const siteName = 'Headlines';
    const title = locale === 'heb'
        ? `חדשות וסיכומים מ${countryName} | ${siteName}`
        : `Latest News and Summaries from ${countryName} | ${siteName}`;
    const description = locale === 'heb'
        ? `קבלו את כותרות החדשות והסיכומים האחרונים מ${countryName}, מתעדכן יומית בעברית ובאנגלית.`
        : `Get the latest headlines and news summaries from ${countryName}, updated daily in English and Hebrew.`;
    const url = `https://headlines.sh/${locale}/${country}`;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName,
            locale: locale === 'heb' ? 'he_IL' : 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://the-hear.com/logo192.png',
                    width: 192,
                    height: 192,
                    alt: `${siteName} logo`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://the-hear.com/logo512.png'],
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function Page({ params }) {
    const { country, locale } = await params;

    const today = new Date()
    const headlines = await getCountryDayHeadlines(country, today, 2);
    const initialSummaries = await getCountryDaySummaries(country, today, 2);
    const initialDailySummaries = [
        await getCountryDailySummary(country, sub(today, { days: 1 })),
        await getCountryDailySummary(country, sub(today, { days: 2 }))
    ].filter(summary => summary);

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = {headlines: [], website_id: headline.website_id};
        sources[sourceName].headlines.push(headline);
    });

    if (initialSummaries.length === 0) {
        return 'no summaries found';
    }

    // JSON-LD structured data for SEO
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const url = `https://headlines.sh/${locale}/${country}`;
    const description = locale === 'heb'
        ? `קבלו את כותרות החדשות והסיכומים האחרונים מ${countryName}, מתעדכן יומית בעברית ובאנגלית.`
        : `Get the latest headlines and news summaries from ${countryName}, updated daily in English and Hebrew.`;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'The Hear - Latest News and Summaries',
        'url': url,
        'inLanguage': locale === 'heb' ? 'he' : 'en',
        'description': description,
        'datePublished': new Date().toISOString().split('T')[0],
        'about': countryName,
        'publisher': {
            '@type': 'Organization',
            'name': 'The Hear',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://the-hear.com/logo192.png'
            }
        }
    };

    return <>
        <head>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </head>
        <CountryPageContent 
            {...{ sources, 
                initialSummaries, 
                initialDailySummaries, 
                locale, 
                country }}
        />
    </>
}