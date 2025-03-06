import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "./CountryPage_content";
import getSourceOrder from "@/utils/sources/source orders";
import { redirect } from "next/navigation";

export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    const countryNames = Object.keys(countries);

    const routes = countryNames.flatMap(country => [
        // { country, locale: 'en' },
        { country, locale: 'heb' }
    ]);
    return routes;
}

export default async function Page({ params, searchParams }) {
    const { country, locale } = await params;
    const query = await searchParams;

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


    let websites = query.websites?.split(',');
    if (!websites || websites.length === 0) {
        const sourceOrder = getSourceOrder(country, 'default');
        websites = sourceOrder.slice(0, 4);
        const url = `/${locale}/${country}?websites=${websites.join(',')}`;
        redirect(url);
    }

    return <CountryPageContent
        sources={initialSources}
        summaries={initialSummaries}
        dailySummaries={[initialDailySummary]}
        locale={locale}
        country={country}
        websites={websites}
    />
}