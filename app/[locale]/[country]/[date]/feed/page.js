import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { isSameDay, parse, sub } from "date-fns";
import { getWebsiteName, getSourceData } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { countries } from "@/utils/sources/countries";
import { isHebrewContentAvailable, getHeadline } from "@/utils/daily summary utils";
import FeedJsonLd from "./FeedJsonLd";
import FeedView from "./FeedView";
import FeedPopup from "./popup";
import InactivityRedirect from "./InactivityRedirect";

// Feed pages are immutable historical content that never changes
export const revalidate = false; // Disable ISR - these pages never change once created
export const dynamic = 'error'; // Fail build if route tries to be dynamic - forces static generation

// Generate SEO metadata for feed view
export async function generateMetadata({ params }) {
    const { country, locale, date } = await params;
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    const flagEmoji = {
        "israel": "🇮🇱", "china": "🇨🇳", "finland": "🇫🇮", "france": "🇫🇷",
        "germany": "🇩🇪", "india": "🇮🇳", "iran": "🇮🇷", "italy": "🇮🇹",
        "japan": "🇯🇵", "lebanon": "🇱🇧", "netherlands": "🇳🇱", "palestine": "🇵🇸",
        "poland": "🇵🇱", "russia": "🇷🇺", "spain": "🇪🇸", "turkey": "🇹🇷",
        "uk": "🇬🇧", "us": "🇺🇸", "ukraine": "🇺🇦", "uae": "🇦🇪"
    }[country] || '';

    const formattedDate = date.replace(/-/g, '.');
    const parsedDate = parse(date, 'dd-MM-yyyy', new Date(2000, 0, 1));
    parsedDate.setHours(12, 0, 0, 0);

    // Get the day's summary to extract the main headline for description
    const daySummary = await getCountryDailySummary(country, parsedDate);
    const currentHeadline = daySummary ? getHeadline(daySummary, locale) : null;

    const title = locale === 'heb'
        ? `${flagEmoji} ${countryName} | ${formattedDate} | ארכיון כותרות`
        : `${flagEmoji} ${countryName} | ${formattedDate} | Headline Archive`;

    const description = locale === 'heb'
        ? `${currentHeadline ? `${currentHeadline}. ` : ''}ארכיון מלא של כותרות חדשות מ-${countryName} ל-${formattedDate} - כל הכותרות כפי שהתפתחו במהלך היום עם סיכומי בינה מלאכותית בזמן אמת`
        : `An archive of news headlines from ${countryName} for ${formattedDate}; ${currentHeadline ? `${currentHeadline}. ` : ''}All headlines as they unfolded throughout the day, with real-time AI overviews`;

    const url = `https://www.the-hear.com/${locale}/${country}/${date}/feed`;

    return {
        title,
        description,
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
            siteName: 'The Hear',
            locale: locale === 'heb' ? 'he_IL' : 'en_US',
            type: 'article',
            publishedTime: parsedDate.toISOString(),
            modifiedTime: parsedDate.toISOString(),
            authors: ['The Hear'],
            section: 'News Archive',
            tags: [countryName, 'news', 'headlines', formattedDate, 'archive', 'chronological'],
            images: [{
                url: 'https://www.the-hear.com/logo192.png',
                width: 192,
                height: 192,
                alt: 'The Hear logo',
            }],
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
            canonical: url, // Self-canonical - this is the version that should be indexed
            languages: {
                'en': `https://www.the-hear.com/en/${country}/${date}/feed`,
                'he': `https://www.the-hear.com/heb/${country}/${date}/feed`,
                'x-default': `https://www.the-hear.com/en/${country}/${date}/feed`
            }
        },
    };
}

export default async function FeedPage({ params }) {
    try {
        const { country, locale, date } = await params;
        
        // Date parsing (no current date comparison for static generation)
        const parsedDate = parse(date, 'dd-MM-yyyy', new Date(2000, 0, 1));
        parsedDate.setHours(12, 0, 0, 0);

        // Skip date validation for static generation - handle redirects client-side if needed
        // Archive pages are historical and won't be "today" after they're built
        if (isNaN(parsedDate.getTime())) {
            redirect(`/${locale}/${country}`);
        }
        
        // Fetch same data as main page
        const headlines = await getCountryDayHeadlines(country, parsedDate, 1);
        const initialSummaries = await getCountryDaySummaries(country, parsedDate, 1);
        const daySummary = await getCountryDailySummary(country, parsedDate);
        const yesterdaySummary = await getCountryDailySummary(country, sub(parsedDate, { days: 1 }));
        
        // Hebrew content check
        if (locale === 'heb') {
            const hasHebrewContent = initialSummaries.some(summary => isHebrewContentAvailable(summary)) ||
                                    (daySummary && isHebrewContentAvailable(daySummary)) ||
                                    (yesterdaySummary && isHebrewContentAvailable(yesterdaySummary));
            
            if (!hasHebrewContent) {
                redirect(`/en/${country}/${date}/feed`);
            }
        }
        
        // Prepare sources for JSON-LD
        const sources = {};
        headlines.forEach(headline => {
            const sourceName = getWebsiteName(country, headline.website_id);
            if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
            sources[sourceName].headlines.push(headline);
        });
        
        return (
            <div className="min-h-screen bg-gray-50 pb-4">
                {/* JSON-LD structured data for feed page */}
                <FeedJsonLd
                    country={country}
                    locale={locale}
                    date={parsedDate}
                    daySummary={daySummary}
                    headlines={headlines}
                    initialSummaries={initialSummaries}
                />

                {/* Feed view with all content visible */}
                <FeedView
                    {...{
                        headlines,
                        initialSummaries,
                        daySummary,
                        yesterdaySummary,
                        locale,
                        country,
                        date: parsedDate
                    }}
                />

                {/* Feed popup */}
                <FeedPopup
                    country={country}
                    locale={locale}
                    pageDate={parsedDate}
                />

                {/* Inactivity redirect to time machine */}
                <InactivityRedirect
                    locale={locale}
                    country={country}
                    date={date}
                    timeoutSeconds={40}
                />
            </div>
        );
    } catch (error) {
        console.error('❌ [FEED-PAGE] FATAL ERROR:', error);
        return <div>ERROR: {error.message}</div>;
    }
}

