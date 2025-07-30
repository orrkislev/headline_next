import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "./CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { createMetadata, LdJson } from "./metadata";
import { ServerHeadlineLinks, ServerCountryNavigation, ServerYesterdayNavigation, ServerAboutContent, ServerCountrySEOContent } from "@/utils/ServerSideLinks";
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

    return <>
        <LdJson {...{ country, locale, headlines, initialSummaries, sources, yesterdaySummary }} />
        
        {/* Server-rendered SEO content for crawlers */}
        <ServerCountrySEOContent locale={locale} country={country} />
        <ServerHeadlineLinks headlines={headlines} locale={locale} country={country} />
        <ServerCountryNavigation locale={locale} currentCountry={country} />
        <ServerYesterdayNavigation locale={locale} country={country} />
        <ServerAboutContent locale={locale} />
        
        <CountryPageContent 
            {...{ sources, 
                initialSummaries, 
                yesterdaySummary, 
                locale, 
                country }}
        />
    </>
}