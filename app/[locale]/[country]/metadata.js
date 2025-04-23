import { countries } from "@/utils/sources/countries";

export async function createMetadata({ country, locale }) {
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

export function LdJson({ country, locale }) {
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

    return (
        <>
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
        </>
    )

}