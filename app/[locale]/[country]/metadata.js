import { countries } from "@/utils/sources/countries";
import { getSourceData } from "@/utils/sources/getCountryData";

// Flag emoji mapping for countries (same as date pages)
const countryFlags = {
    "israel": "🇮🇱",
    "china": "🇨🇳",
    "finland": "🇫🇮",
    "france": "🇫🇷",
    "germany": "🇩🇪",
    "india": "🇮🇳",
    "iran": "🇮🇷",
    "italy": "🇮🇹",
    "japan": "🇯🇵",
    "lebanon": "🇱🇧",
    "netherlands": "🇳🇱",
    "palestine": "🇵🇸",
    "poland": "🇵🇱",
    "russia": "🇷🇺",
    "spain": "🇪🇸",
    "turkey": "🇹🇷",
    "uk": "🇬🇧",
    "us": "🇺🇸",
    "ukraine": "🇺🇦",
    "uae": "🇦🇪"
};

export async function createMetadata(params) {
    const { country, locale } = await params;
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const flagEmoji = countryFlags[country] || '';
    const siteName = 'The Hear';
    
    // Consistent title format: [Flag] Live Headlines from [Country] | Unfiltered news
    const title = locale === 'heb'
        ? `${flagEmoji} כותרות חיות מ${countryName} | דוכן עיתונים מתעדכן `
        : `${flagEmoji} Live Headlines from ${countryName} | Unfiltered news`;
    
    const description = locale === 'heb'
        ? `דוכן כותרות חי של עיתונים מ-${countryName}; ארכיון חדשות המעדכן בזמן אמת.`
        : `Live news headlines from ${countryName} - Real-time updates from major news sources displayed side by side.`;
    
    const url = `https://www.the-hear.com/${locale}/${country}`;
    return {
        title,
        description,
        keywords: `${countryName}, live news, headlines, real-time, unfiltered news, ${flagEmoji}`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName,
            locale: locale === 'heb' ? 'he_IL' : 'en_US',
            type: 'website',
            publishedTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString(),
            authors: ['The Hear'],
            section: 'News',
            tags: [countryName, 'live news', 'headlines', 'real-time'],
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
            site: '@thehearnews',
            creator: '@thehearnews'
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

export function LdJson({ country, locale, headlines, initialSummaries, sources, yesterdaySummary }) {
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const flagEmoji = countryFlags[country] || '';
    const url = `https://www.the-hear.com/${locale}/${country}`;
    
    // Create concise description for CollectionPage
    const description = locale === 'heb'
        ? `דוכן כותרות חי של עיתונים מ-${countryName}; ארכיון חדשות המעדכן בזמן אמת.`
        : `Live news headlines from ${countryName} - Real-time updates from major news sources displayed side by side.`;
    
    const image = 'https://www.the-hear.com/logo192.png';
    const title = locale === 'heb'
        ? `${flagEmoji} כותרות חיות מ${countryName} | דוכן עיתונים מתעדכן`
        : `${flagEmoji} Live Headlines from ${countryName} | Unfiltered news`;
    
    // Prepare hourly summaries as abstracts (analytical summaries)
    const abstracts = [];
    if (initialSummaries && Array.isArray(initialSummaries) && initialSummaries.length > 0) {
        initialSummaries.forEach((summary, index) => {
            // Use direct field access for live summaries
            let summaryContent = '';
            
            if (locale === 'heb') {
                summaryContent = summary.hebrewSummary || summary.summary || summary.translatedSummary;
            } else {
                summaryContent = summary.summary || summary.translatedSummary || summary.hebrewSummary;
            }
            
            if (summaryContent && summaryContent.trim() && summaryContent.length > 20) {
                abstracts.push({
                    '@type': 'CreativeWork',
                    'abstract': summaryContent.trim(),
                    'dateCreated': summary.timestamp ? new Date(summary.timestamp).toISOString() : new Date().toISOString(),
                    'creator': {
                        '@type': 'NewsMediaOrganization',
                        'name': 'The Hear AI Analysis'
                    },
                    'about': `Live news analysis for ${countryName}`
                });
            }
        });
    }
    
    // Create ItemList elements for all headlines
    const itemListElements = [];
    if (headlines && headlines.length > 0) {
        // Sort headlines by timestamp (newest first)
        const sortedHeadlines = [...headlines].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        sortedHeadlines.forEach((h, index) => {
            const sourceData = getSourceData(country, h.website_id);
            const sourceName = sourceData?.name || h.website_id;
            
            const newsArticle = {
                '@type': 'NewsArticle',
                'headline': h.headline || '',
                'url': h.link || '',
                'datePublished': h.timestamp ? new Date(h.timestamp).toISOString() : '',
                'publisher': {
                    '@type': 'Organization',
                    'name': sourceName
                }
            };
            
            // Only add description if subtitle exists and is not empty
            if (h.subtitle && h.subtitle.trim()) {
                newsArticle.description = h.subtitle;
            }
            
            itemListElements.push({
                '@type': 'ListItem',
                'position': index + 1,
                'item': newsArticle
            });
        });
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': url,
                'name': title,
                'description': description,
                'url': url,
                'inLanguage': locale === 'heb' ? 'he' : 'en',
                'datePublished': new Date().toISOString(),
                'dateModified': new Date().toISOString(),
                'mainEntity': {
                    '@id': `${url}#headlines`
                },
                ...(abstracts.length > 0 && {
                    'hasPart': abstracts
                }),
                'publisher': {
                    '@type': 'NewsMediaOrganization',
                    'name': 'The Hear',
                    'logo': {
                        '@type': 'ImageObject',
                        'url': image
                    }
                }
            },
            {
                '@type': 'ItemList',
                '@id': `${url}#headlines`,
                'name': `Live Headlines for ${countryName}`,
                'numberOfItems': itemListElements.length,
                'itemListElement': itemListElements
            }
        ]
    };
    
    return (
        <script 
            id={`jsonld-country-${country}-${locale}`}
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
    )
}
