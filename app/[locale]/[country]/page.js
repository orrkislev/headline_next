import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { sub } from "date-fns";
// import { countries } from "@/utils/sources/countries";
import CountryPageContent from "./CountryPage_content";
// import getSourceOrder from "@/utils/sources/source orders";
// import { redirect } from "next/navigation";

// export const revalidate = 900 // 15 minutes
// export const dynamicParams = false

// export async function generateStaticParams() {
//     const countryNames = Object.keys(countries);

//     const routes = countryNames.flatMap(country => [
//         // { country, locale: 'en' },
//         { country, locale: 'heb' }
//     ]);
//     return routes;
// }

export default async function Page({ params }) {
    const { country, locale } = await params;
    let headlines, summaries, dailySummaries;

    const today = new Date()
    headlines = await getCountryDayHeadlines(country, today, 2);
    summaries = await getCountryDaySummaries(country, today, 2);
    dailySummaries = [
        await getCountryDailySummary(country, sub(today, { days: 1 })),
        await getCountryDailySummary(country, sub(today, { days: 2 }))
    ];
    // }

    const sources = {};
    headlines.forEach(headline => {
        if (!sources[headline.website_id]) sources[headline.website_id] = [];
        sources[headline.website_id].push(headline);
    });

    if (summaries.length === 0) {
        return 'no summaries found';
    }

    return <>
        <CountryPageContent
            sources={sources}
            summaries={summaries}
            dailySummaries={dailySummaries}
            locale={locale}
            country={country}
        />
    </>
}