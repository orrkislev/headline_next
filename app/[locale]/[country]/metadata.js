import { countries } from "@/utils/sources/countries";
import Script from 'next/script';

function getFlagEmoji(countryKey) {
    // Map countryKey to ISO alpha-2 code
    const mapping = {
        israel: 'IL', china: 'CN', finland: 'FI', france: 'FR', germany: 'DE', india: 'IN', iran: 'IR', italy: 'IT',
        japan: 'JP', lebanon: 'LB', netherlands: 'NL', palestine: 'PS', poland: 'PL', russia: 'RU', spain: 'ES',
        turkey: 'TR', uk: 'GB', us: 'US', ukraine: 'UA', uae: 'AE'
    };
    const code = mapping[countryKey];
    if (!code) return '';
    return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
}

export async function createMetadata(params) {
    const { country, locale } = await params;
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const flagEmoji = locale === 'heb' ? '' : ` ${getFlagEmoji(country)}`;
    const siteName = 'Headlines';
    const title = locale === 'heb'
        ? `📰 כותרות העיתונים מ${countryName}`
        : `📰 Live Headlines from ${countryName}${flagEmoji} | The Hear`;
    const description = locale === 'heb'
        ? `דוכן כותרות חי של עיתונים מ-${countryName}; ארכיון חדשות המעדכן בזמן אמת.`
        : `A Living Newsstand of Main Headlines from ${countryName}${flagEmoji}, displayed side by side.`;
    const url = `https://www.the-hear.com/${locale}/${country}`;
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
                'en': `https://www.the-hear.com/en/${country}`,
                'he': `https://www.the-hear.com/heb/${country}`,
                'x-default': `https://www.the-hear.com/en/${country}`
            }
        },
    };
}

export function LdJson({ country, locale }) {
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const flagEmoji = locale === 'heb' ? '' : ` ${getFlagEmoji(country)}`;
    const url = `https://www.the-hear.com/${locale}/${country}`;
    const description = locale === 'heb'
        ? `דוכן כותרות חי של עיתונים מ-${countryName}; ארכיון חדשות המעדכן בזמן אמת.`
        : `A Living Newsstand of Main Headlines from ${countryName}${flagEmoji}, displayed side by side.`;
    const image = 'https://www.the-hear.com/logo192.png';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': `The Hear - News and Overviews from many newspapers in ${countryName}`,
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
                'url': image
            }
        }
    };
    return (
        <Script 
            id={`jsonld-country-${country}-${locale}`}
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
    )
}
