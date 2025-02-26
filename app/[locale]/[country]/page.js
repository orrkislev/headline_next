import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import TopBar from "./TopBar/TopBar";
import DataManager from "@/components/DataManager";
import PreferencesManager from "@/components/PreferencesManager";
import { sub } from "date-fns";
import SideSlider from "./SideSlider";
import SummarySection from "./RightPanel";
import { countries } from "@/utils/sources/countries";

import path from 'path';
import fs from 'fs';
import MainSection from "./MainSection";
import RightPanel from "./RightPanel";

export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    const countryNames = Object.keys(countries);

    const filePath = path.join(process.cwd(), 'public', 'countries.json');
    fs.writeFileSync(filePath, JSON.stringify(countries));

    const routes = countryNames.flatMap(country => [
        { country, locale: 'en' },
        { country, locale: 'heb' }
    ]);
    return routes;
}

export default async function CountryPage({ params }) {
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

    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            {/* <DataManager initialHeadlines={initialHeadlines} initialSummaries={initialSummaries} initialDailySummary={initialDailySummary} /> */}
            {/* <PreferencesManager locale={locale} /> */}
            <SideSlider initialSummaries={initialSummaries} locale={locale} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[400px] `}>
                <div className={`flex-1 ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200`}>
                    <RightPanel initialSummaries={initialSummaries} locale={locale} />
                </div>
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar />
                <MainSection initialSources={initialSources} locale={locale} country={country} />
            </div>
        </div>
    );
}