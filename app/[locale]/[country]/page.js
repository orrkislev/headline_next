import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageStatic from "./CountryPage_static";
import dynamic from "next/dynamic";
import CountryPageLiveWrapper from "./CountryPage_live_wrapper";

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

export default async function Page({ params }) {
    const { country, locale } = await params;
    const initialHeadlines = await getCountryDayHeadlines(country, new Date(), 2);
    const initialSummaries = await getCountryDaySummaries(country, new Date(), 2);
    const initialDailySummary = await getCountryDailySummary(country, sub(new Date(), { days: 2 }));

    const initialSources = {};
    initialHeadlines.forEach(headline => {
        if (!initialSources[headline.website_id]) initialSources[headline.website_id] = [];
        initialSources[headline.website_id].push(headline);
    });

    if (initialSummaries.length === 0) {
        return 'no summaries found';
    }

    return <>
        <CountryPageStatic
            initialSummaries={initialSummaries}
            initialSources={initialSources}
            initialDailySummary={initialDailySummary}
            locale={locale}
            country={country} />
        <CountryPageLiveWrapper
            initialSummaries={initialSummaries}
            initialSources={initialSources}
            initialDailySummary={initialDailySummary}
            locale={locale}
            country={country} />
    </>
}