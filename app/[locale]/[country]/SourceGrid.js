'use client'

import { useData } from "@/components/DataManager";
import SourceCard from "./Source/SourceCard";
import { usePreferences } from "@/components/PreferencesManager";
import getSourceOrder from "@/utils/sources/source orders";
import { useParams, usePathname } from "next/navigation";

export default function SourceGrid() {
    const { country } = useParams();

    const sources = useData((state) => state.sources);
    const activeWebsites = usePreferences((state) => state.activeWebsites);
    const order = usePreferences((state) => state.order);

    if (Object.keys(sources).length === 0) return null;

    const sourceOrder = getSourceOrder(country, order);
    const orderedSources = Object.entries(sources).sort((a, b) => sourceOrder.indexOf(a[0]) - sourceOrder.indexOf(b[0]));
    const filteredSources = orderedSources.filter(source => 
        activeWebsites.includes(source[0].toLowerCase()) || activeWebsites.includes(source[0]));

    if (filteredSources.length === 0) {
        return <div>No sources found</div>;
    }

    return (
        <div className={`overflow-y-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4`}>
            {filteredSources.map((source, i) => (
                <SourceCard
                    key={`${source[0]}-${source[1]?.length}`}
                    index={i}
                    headlines={source[1]}
                />
            ))}
        </div>
    );
}