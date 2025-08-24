import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "./CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { createMetadata, LdJson } from "./metadata";
import ArchiveLinksData from "./TopBar/settings/ArchiveLinksData";
import CountryLinksData from "./TopBar/CountryLinksData";
import DateLinksData from "./TopBar/DateLinksData";
import { headers } from "next/headers";
import { isHebrewContentAvailable } from "@/utils/daily summary utils";
import { redirect } from "next/navigation";

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

export async function generateMetadata({ params }) {
    return createMetadata(params);
}

export default async function Page({ params }) {
    const { country, locale } = await params;
    const userCountry = headers().get('x-user-country') || 'us';

    const today = new Date()
    const headlines = await getCountryDayHeadlines(country, today, 2);
    const initialSummaries = await getCountryDaySummaries(country, today, 2);
    const yesterdaySummary = await getCountryDailySummary(country, sub(today, { days: 1 }))

    // Check if Hebrew content is available for Hebrew locale
    if (locale === 'heb') {
        const hasHebrewContent = initialSummaries.some(summary => isHebrewContentAvailable(summary)) ||
                                (yesterdaySummary && isHebrewContentAvailable(yesterdaySummary));
        
        // If no Hebrew content is available, redirect to English
        if (!hasHebrewContent) {
            redirect(`/en/${country}`);
        }
    }

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = {headlines: [], website_id: headline.website_id};
        sources[sourceName].headlines.push(headline);
    });

    if (initialSummaries.length === 0) {
        return 'no summaries found';
    }

    const countryName = locale === 'heb' ? countries[country].hebrew || country : countries[country].english || country;

    return (
        <>
            {/* This correctly handles all your SEO needs for the entire collection */}
            <LdJson {...{ country, locale, headlines, initialSummaries, sources, yesterdaySummary }} />
            
            {/* Navigation links for crawlers */}
            <ArchiveLinksData locale={locale} country={country} />
            <CountryLinksData locale={locale} currentCountry={country} />
            <DateLinksData locale={locale} country={country} />
            
            {/* This is the interactive UI for your users */}
            <CountryPageContent 
                {...{ sources, 
                    initialSummaries, 
                    yesterdaySummary, 
                    locale, 
                    country,
                    userCountry }}
            />
        </>
    );
}