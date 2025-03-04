import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import ContentWrapper from "./CountryPage_content_wrapper";

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
    const initialDailySummary = await getCountryDailySummary(country, sub(new Date(), { days: 1 }));

    const initialSources = {};
    initialHeadlines.forEach(headline => {
        if (!initialSources[headline.website_id]) initialSources[headline.website_id] = [];
        initialSources[headline.website_id].push(headline);
    });

    if (initialSummaries.length === 0) {
        return 'no summaries found';
    }

    return <>
        <ContentWrapper
            initialSummaries={initialSummaries}
            initialSources={initialSources}
            initialDailySummary={initialDailySummary}
            locale={locale}
            country={country} />
    </>
}