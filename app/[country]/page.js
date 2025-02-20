import { getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { getAllCountryNames } from "@/utils/database/globalData";
import SourceGrid from "./SourceGrid";
import TopBar from "./TopBar/TopBar";
import SidePanel from "./SidePanel";
import DataManager from "@/components/DataManager";

export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    const countries = await getAllCountryNames();
    return countries.map(country => ({ country }));
}

export default async function CountryPage({ params }) {
    const { country } = await params;
    const headlinesSources = await getCountryDayHeadlines(country, new Date(), 2);
    const summaries = await getCountryDaySummaries(country, new Date(), 2);

    if (summaries.length === 0) {
        return 'no summaries found';
    }

    return (
        <div className="absolute flex w-full h-full overflow-hidden direction-rtl">
            <DataManager headlines={headlinesSources} summaries={summaries} />
            <div className="flex-[1] border-l border-gray-200 flex">
                <SidePanel />
            </div>
            <div className="flex-[3] flex flex-col">
                <TopBar />
                <SourceGrid />
            </div>
        </div>
    );
}