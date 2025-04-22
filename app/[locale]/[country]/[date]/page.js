// app/[locale]/[country]/[date]/page.js
import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { add, isToday, parse } from "date-fns";
import { countries } from "@/utils/sources/countries";
import CountryPageContent from "../CountryPage_content"; // adjust if needed
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { createMetadata, LdJson } from "./metadata";

export const revalidate = false; // generate once, never revalidate
export const dynamicParams = true; // allow on-demand generation

export async function generateStaticParams() {
    return []; // don’t prebuild any paths
}

// Generate SEO metadata for a specific day
export async function generateMetadata({ params }) {
    return createMetadata(params);
}

export default async function Page({ params }) {
    const { country, locale, date } = await params;

    const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    if (isToday(parsedDate) || parsedDate > new Date() || isNaN(parsedDate.getTime()))
        redirect(`/${locale}/${country}`);

    const headlines = await getCountryDayHeadlines(country, parsedDate, 1);
    const initialSummaries = await getCountryDaySummaries(country, parsedDate, 1);
    const initialDailySummaries = [
        await getCountryDailySummary(country, parsedDate),
        await getCountryDailySummary(country, add(parsedDate, { days: 1 })),
    ].filter(s => s);

    if (initialSummaries.length === 0 && initialDailySummaries.length === 0)
        return 'No data found for this date.';

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
        sources[sourceName].headlines.push(headline);
    });

    return <>
        <LdJson {...{ country, locale }} date={parsedDate} />
        <CountryPageContent
            {...{
                sources,
                initialSummaries,
                initialDailySummaries,
                locale,
                country,
                date: parsedDate
            }}
        />
    </>
}
