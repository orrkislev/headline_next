import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { isSameDay, isToday, parse, sub } from "date-fns";
import CountryPageContent from "../CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { createMetadata, LdJson } from "./metadata";
import { countries } from "@/utils/sources/countries";
import ArchiveLinksData from "../TopBar/settings/ArchiveLinksData";
import CountryLinksData from "../TopBar/CountryLinksData";
import DateLinksData from "../TopBar/DateLinksData";
import { isHebrewContentAvailable } from "@/utils/daily summary utils";

export const revalidate = 0; // Disable ISR, use pure SSR
export const dynamic = 'force-dynamic'; // Force dynamic rendering, no caching

// Generate SEO metadata for a specific day
export async function generateMetadata({ params }) {
    try {
        console.log('🔍 [DATE-META] generateMetadata called - params type:', typeof params, params);
        const { country, locale, date } = await params;
        console.log('🔍 [DATE-META] resolved params:', { country, locale, date });
        const result = await createMetadata({ country, locale, date });
        console.log('🔍 [DATE-META] metadata created:', !!result);
        return result;
    } catch (error) {
        console.error('❌ [DATE-META] ERROR in generateMetadata:', error);
        throw error;
    }
}

export default async function Page({ params }) {
    try {
        // Step 1: Params
        const { country, locale, date } = await params;

        // Step 2: Date parsing
        const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
        parsedDate.setHours(12, 0, 0, 0);

        // Step 3: Timezone check
        const timezone = countries[country]?.timezone || 'UTC';
        const todayInTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

        // Step 4: Redirect check
        const shouldRedirect = isSameDay(parsedDate, todayInTimezone) || parsedDate > new Date() || isNaN(parsedDate.getTime());

        if (shouldRedirect) {
            // Instead of redirecting during static generation, return a redirect component
            return (
                <>
                    <script dangerouslySetInnerHTML={{
                        __html: `window.location.href = '/${locale}/${country}';`
                    }} />
                    <div>Redirecting to current news...</div>
                </>
            );
        }

        console.log('🎯 [DATE-PAGE] fetching data...');
        const headlines = await getCountryDayHeadlines(country, parsedDate, 2);
        const initialSummaries = await getCountryDaySummaries(country, parsedDate, 2);
        const daySummary = await getCountryDailySummary(country, parsedDate)
        const yesterdaySummary = await getCountryDailySummary(country, sub(parsedDate, { days: 1 }))
        console.log('🎯 [DATE-PAGE] data fetched - headlines:', headlines?.length, 'summaries:', initialSummaries?.length, 'daySummary:', !!daySummary);

    // Check if Hebrew content is available for Hebrew locale
    if (locale === 'heb') {
        const hasHebrewContent = initialSummaries.some(summary => isHebrewContentAvailable(summary)) ||
                                (daySummary && isHebrewContentAvailable(daySummary)) ||
                                (yesterdaySummary && isHebrewContentAvailable(yesterdaySummary));
        
        // If no Hebrew content is available, redirect to English
        if (!hasHebrewContent) {
            redirect(`/en/${country}/${date}`);
        }
    }

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
        sources[sourceName].headlines.push(headline);
    });

    console.log('🎯 [DATE-PAGE] about to render - sources:', Object.keys(sources).length, 'parsedDate type:', typeof parsedDate);

    return (
        <>
            {/* DEBUG: Server-side render proof */}
            {/* SERVER_RENDER_TIME: {new Date().toISOString()} - COUNTRY: {country} - DATE: {date} */}

            {/* This correctly handles all your SEO needs for the entire collection */}
            <LdJson {...{ country, locale, daySummary, headlines, initialSummaries, sources }} date={parsedDate} />

            {/* Navigation links for crawlers */}
            <ArchiveLinksData locale={locale} country={country} />
            <CountryLinksData locale={locale} currentCountry={country} />
            <DateLinksData locale={locale} country={country} currentDate={parsedDate} />

            {/* This is the interactive UI for your users */}
            <CountryPageContent
                {...{
                    sources,
                    initialSummaries,
                    daySummary,
                    yesterdaySummary,
                    locale,
                    country,
                    pageDate: parsedDate
                }}
            />
        </>
    );
    } catch (error) {
        console.error('❌ [DATE-PAGE] FATAL ERROR:', error);
        return <div>ERROR: {error.message}</div>;
    }
}
