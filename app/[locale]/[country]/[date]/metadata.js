import { getHeadline } from "@/utils/daily summary utils";
import { getCountryDailySummary } from "@/utils/database/countryData";
import { countries } from "@/utils/sources/countries";
import { add, parse } from "date-fns";
import Script from 'next/script';

export async function createMetadata(params) {
    const { country, locale, date } = await params;
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    const formattedDate = date.replace(/-/g, '.');
    const dailySummary = await getCountryDailySummary(country, parsedDate)
    const headline = getHeadline(dailySummary, locale);

    const siteName = 'The Hear';
    const title = locale === 'heb'
        ? `${countryName} | ${formattedDate} | ${headline} | כותרות החדשות כפי שהתפתחו בזמן אמת`
        : `${countryName} | ${formattedDate} | ${headline} | Headlines as they Unfolded`;

    const description = locale === 'heb'
        ? `ארכיון כותרות מ-${countryName} ל-${date}, כפי שהתפתחו בזמן אמת.`
        : `An archive of the Headlines from major news sources in ${countryName} for ${date}, as they unfolded in real time: relive the news.`;

    const url = `https://www.the-hear.com/${locale}/${country}/${date}`;

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
                    url: 'https://www.the-hear.com/logo192.png',
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
            images: ['https://www.the-hear.com/logo512.png'],
        },
        alternates: {
            canonical: url,
            languages: {
                'en': `https://www.the-hear.com/en/${country}/${date}`,
                'he': `https://www.the-hear.com/heb/${country}/${date}`,
                'x-default': `https://www.the-hear.com/en/${country}/${date}`
            }
        },
    };
}

export function LdJson({ country, locale, date, daySummary }) {
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const headline = daySummary ? getHeadline(daySummary, locale) : '';
    const siteName = 'The Hear';
    const title = `${countryName} ${date}: ${headline} | ${siteName}`;
    const url = `https://www.the-hear.com/${locale}/${country}/${date}`;
    const description = locale === 'heb'
        ? `כותרות וסיכומי חדשות מ${countryName} מתאריך ${date}.`
        : `News headlines and summaries from ${countryName} for ${date}.`;
    const image = 'https://www.the-hear.com/logo192.png';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': headline || title,
        'name': title,
        'url': url,
        'mainEntityOfPage': url,
        'inLanguage': locale === 'heb' ? 'he' : 'en',
        'description': description,
        'datePublished': date instanceof Date ? date.toISOString() : new Date(date).toISOString(),
        'dateModified': date instanceof Date ? date.toISOString() : new Date(date).toISOString(),
        'image': image,
        'publisher': {
            '@type': 'Organization',
            'name': 'The Hear',
            'logo': {
                '@type': 'ImageObject',
                'url': image
            }
        }
    };
    return (
        <Script 
            id={`jsonld-country-${country}-${locale}-${date instanceof Date ? date.toISOString().split('T')[0] : date}`}
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
    )
}