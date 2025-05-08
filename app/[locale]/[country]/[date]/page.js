import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { isToday, parse, sub } from "date-fns";
import CountryPageContent from "../CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { createMetadata, LdJson } from "./metadata";
import { NextStep, NextStepProvider } from "nextstepjs";
import { getCountryDatePageSteps, getCountryPageSteps } from "./onboarding";

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
    const daySummary = await getCountryDailySummary(country, parsedDate)
    const yesterdaySummary = await getCountryDailySummary(country, sub(parsedDate, { days: 1 }))

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
        sources[sourceName].headlines.push(headline);
    });

    return (
        <NextStepProvider>
            <NextStep steps={getCountryDatePageSteps(country, locale, parsedDate)} >
                <LdJson {...{ country, locale, daySummary }} date={parsedDate} />
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
            </NextStep>
        </NextStepProvider>

    )
}
