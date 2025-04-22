// app/[locale]/[country]/[date]/page.js
import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { parse } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "../CountryPage_content"; // adjust if needed
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";

export const revalidate = false; // generate once, never revalidate
export const dynamicParams = true; // allow on-demand generation

export async function generateStaticParams() {
    return []; // don’t prebuild any paths
}

// Generate SEO metadata for a specific day
export async function generateMetadata({ params }) {
    const { country, locale, date } = params;
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;

    const siteName = 'The Hear';
    const title = locale === 'heb'
        ? `כותרות מה־${date} ב${countryName} | ${siteName}`
        : `Headlines from ${countryName} on ${date} | ${siteName}`;

    const description = locale === 'heb'
        ? `כותרות וסיכומי חדשות מ${countryName} מתאריך ${date}.`
        : `News headlines and summaries from ${countryName} for ${date}.`;

    const url = `https://headlines.sh/${locale}/${country}/${date}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName,
            locale: locale === 'heb' ? 'he_IL' : 'en_US',
            type: 'article',
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
    const { country, locale, date } = params;

    // date is dd-mm-yyyy
    const parsedDate = parse(date, 'dd-MM-yyyy', new Date());

    // Redirect to /[locale]/[country] if the date is today
    const today = new Date();

    // Check if parsedDate is invalid
    if (isNaN(parsedDate.getTime())) {
        redirect(`/${locale}/${country}`);
    }

    // Check if date is today
    if (
        parsedDate.getDate() === today.getDate() &&
        parsedDate.getMonth() === today.getMonth() &&
        parsedDate.getFullYear() === today.getFullYear()
    ) {
        redirect(`/${locale}/${country}`);
    }

    // Check if date is in the future
    if (parsedDate > today) {
        redirect(`/${locale}/${country}`);
    }

    const headlines = await getCountryDayHeadlines(country, parsedDate, 1);
    const initialSummaries = await getCountryDaySummaries(country, parsedDate, 1);
    const initialDailySummaries = [
        await getCountryDailySummary(country, parsedDate)
    ].filter(summary => summary);

    if (initialSummaries.length === 0 && initialDailySummaries.length === 0) {
        return 'No data found for this date.';
    }

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
        sources[sourceName].headlines.push(headline);
    });

    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const url = `https://headlines.sh/${locale}/${country}/${date}`;
    const description = locale === 'heb'
        ? `כותרות וסיכומי חדשות מ${countryName} מתאריך ${date}.`
        : `News headlines and summaries from ${countryName} for ${date}.`;

    const siteName = 'The Hear';
    const title = locale === 'heb'
        ? `כותרות מה־${date} ב${countryName} | ${siteName}`
        : `Headlines from ${countryName} on ${date} | ${siteName}`;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'name': title,
        'url': url,
        'inLanguage': locale === 'heb' ? 'he' : 'en',
        'description': description,
        'datePublished': parsedDate.toISOString().split('T')[0],
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
            {...{
                sources,
                initialSummaries,
                initialDailySummaries,
                locale,
                country,
                date: parsedDate
            }}
        />
    </>
}
