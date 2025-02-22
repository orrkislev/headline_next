import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { getAllCountryNames } from "@/utils/database/globalData";
import SourceGrid from "./SourceGrid";
import TopBar from "./TopBar/TopBar";
import DataManager from "@/components/DataManager";
import PreferencesManager from "@/components/PreferencesManager";
import { sub } from "date-fns";
import SideSlider from "./SideSlider";
import SummarySection from "./SummarySection";

import path from 'path';
import fs from 'fs';

export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    const countries = await getAllCountryNames();

    const filePath = path.join(process.cwd(), 'public', 'countries.json');
    fs.writeFileSync(filePath, JSON.stringify(countries));

    const routes = countries.flatMap(country => [
        { country, locale: 'en' },
        { country, locale: 'heb' }
    ]);
    return routes;
}

export default async function CountryPage({ params }) {
    const { country, locale } = await params;
    const headlinesSources = await getCountryDayHeadlines(country, new Date(), 2);
    const summaries = await getCountryDaySummaries(country, new Date(), 2);
    const dailySummary = await getCountryDailySummary(country, sub(new Date(), { days: 2 }));

    if (summaries.length === 0) {
        return 'no summaries found';
    }

    return (
        <div className={`absolute flex w-full h-full overflow-hidden ${locale === 'heb' ? 'direction-rtl' : 'direction-ltr'}`}>
            <DataManager headlines={headlinesSources} summaries={summaries} dailySummary={dailySummary} />
            <PreferencesManager locale={locale} />
            <div className={`flex-[1] ${locale == 'heb' ? 'border-l' : 'border-r'} border-gray-200 flex min-w-[400px] `}>
                <SideSlider />
                <SummarySection />
            </div>
            <div className="flex flex-col flex-[1] sm:flex-[1] md:flex-[2] lg:flex-[3] 2xl:flex-[4]">
                <TopBar />
                <SourceGrid />
            </div>
        </div>
    );
}