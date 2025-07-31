import { getHeadline, getSummaryContent } from "@/utils/daily summary utils";
import { getCountryDailySummary } from "@/utils/database/countryData";
import { countries } from "@/utils/sources/countries";
import { getWebsiteName, getSourceData } from "@/utils/sources/getCountryData";
import { add, parse } from "date-fns";

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

export function LdJson({ country, locale, date, daySummary, headlines, initialSummaries, sources }) {
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const headline = daySummary ? getHeadline(daySummary, locale) : '';
    const siteName = 'The Hear';
    // Format date consistently (DD-MM-YYYY format to match canonical URL)
    const formattedDate = typeof date === 'string' ? date : 
        `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    
    const title = `${countryName} | ${formattedDate} | ${headline} | Headlines as they Unfolded`;
    const url = `https://www.the-hear.com/${locale}/${country}/${formattedDate}`;
    
    // Create concise description for CollectionPage
    const description = locale === 'heb'
        ? `ארכיון כותרות מ-${countryName} ל-${formattedDate}, כפי שהתפתחו בזמן אמת.`
        : `An archive of the Headlines from major news sources in ${countryName} for ${formattedDate}, as they unfolded in real time: relive the news.`;
    
    // Prepare main content (daily summary) for SEO prominence
    const mainContent = daySummary ? getSummaryContent(daySummary, locale) : null;
    
    // Prepare hourly summaries as abstracts (analytical summaries)
    const abstracts = [];
    
    if (initialSummaries && Array.isArray(initialSummaries) && initialSummaries.length > 0) {
        initialSummaries.forEach((summary, index) => {
            // Use direct field access for summary content
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
                    'about': `News analysis for ${formattedDate}`
                });
            }
        });
    }
    
    const image = 'https://www.the-hear.com/logo192.png';
    
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
                'datePublished': date instanceof Date ? date.toISOString() : new Date(date).toISOString(),
                'dateModified': date instanceof Date ? date.toISOString() : new Date(date).toISOString(),
                'mainEntity': {
                    '@id': `${url}#headlines`
                },
                ...(mainContent && {
                    'mainContentOfPage': {
                        '@type': 'WebPageElement',
                        'text': mainContent,
                        'name': headline || 'Daily Summary'
                    }
                }),
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
                'name': `Headlines for ${countryName} - ${formattedDate}`,
                'numberOfItems': itemListElements.length,
                'itemListElement': itemListElements
            }
        ]
    };
    
    return (
        <script 
            id={`jsonld-country-${country}-${locale}-${formattedDate}`}
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
    )
}