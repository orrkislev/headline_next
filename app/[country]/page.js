import { getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { getAllCountryNames } from "@/utils/database/globalData";
import SourceGrid from "./SourceGrid";
import TopBar from "./TopBar/TopBar";
import SidePanel from "./SidePanel";

export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    const countries = await getAllCountryNames();
    return countries.map(country => ({ country }));
}

export default async function CountryPage({ params }) {
    const { country } = await params;
    const headlinesSources = await getCountryDayHeadlines(country, new Date());
    const summaries = await getCountryDaySummaries(country, new Date());

    if (summaries.length === 0) {
        return 'no summaries found';
    }

    return (
        <div className="absolute flex w-full h-full overflow-hidden direction-rtl">
            <div className="flex-[1] border-l border-gray-200 flex">
                <SidePanel summaries={summaries} />
            </div>
            <div className="flex-[3] flex flex-col">
                <TopBar country={country} summary={summaries[0]} />
                <SourceGrid sources={headlinesSources} />
            </div>
        </div>
    );
}