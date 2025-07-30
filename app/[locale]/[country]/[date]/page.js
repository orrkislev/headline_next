import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { isSameDay, isToday, parse, sub } from "date-fns";
import CountryPageContent from "../CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { createMetadata, LdJson } from "./metadata";
import { countries } from "@/utils/sources/countries";
import { ServerHeadlineLinks, ServerCountryNavigation, ServerDateNavigation, ServerAboutContent, ServerCountrySEOContent } from "@/utils/ServerSideLinks";

export const revalidate = false; // generate once, never revalidate
export const dynamicParams = true; // allow on-demand generation

export async function generateStaticParams() {
    return []; // don't prebuild any paths
}

// Generate SEO metadata for a specific day
export async function generateMetadata({ params }) {
    return createMetadata(params);
}

export default async function Page({ params }) {
    const { country, locale, date } = await params;

    const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    // Shift to noon to avoid timezone rollover issues when later converted to ISO strings
    parsedDate.setHours(12, 0, 0, 0);
    const timezone = countries[country]?.timezone || 'UTC';
    const todayInTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    if (isSameDay(parsedDate, todayInTimezone) || parsedDate > new Date() || isNaN(parsedDate.getTime()))
        redirect(`/${locale}/${country}`);

    const headlines = await getCountryDayHeadlines(country, parsedDate, 2);
    const initialSummaries = await getCountryDaySummaries(country, parsedDate, 2);
    const daySummary = await getCountryDailySummary(country, parsedDate)
    const yesterdaySummary = await getCountryDailySummary(country, sub(parsedDate, { days: 1 }))

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
        sources[sourceName].headlines.push(headline);
    });

    return <>
        <LdJson {...{ country, locale, daySummary, headlines, initialSummaries, sources }} date={parsedDate} />
        
        {/* Server-rendered SEO content for crawlers */}
        <ServerCountrySEOContent locale={locale} country={country} date={parsedDate} />
        <ServerHeadlineLinks headlines={headlines} locale={locale} country={country} date={parsedDate} />
        <ServerDateNavigation locale={locale} country={country} date={parsedDate} />
        <ServerCountryNavigation locale={locale} currentCountry={country} />
        <ServerAboutContent locale={locale} />
        
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
}
