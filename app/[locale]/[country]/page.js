import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "./CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { createMetadata, LdJson } from "./metadata";
import { ServerCountryNavigation, ServerYesterdayNavigation } from "@/utils/ServerSideLinks";
import { headers } from "next/headers";

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
            <ServerCountryNavigation locale={locale} currentCountry={country} />
            <ServerYesterdayNavigation locale={locale} country={country} />
            
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