import { countries } from "@/utils/sources/countries";

export async function createMetadata(params) {
    const { country, locale, date } = await params;
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

export function LdJson({country,locale, date}) {
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
        'datePublished': date.toISOString().split('T')[0],
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
    </>
}