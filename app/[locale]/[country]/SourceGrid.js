'use client'

import { useData } from "@/components/DataManager";
import SourceCard from "./Source/SourceCard";
import { usePreferences } from "@/components/PreferencesManager";
import getSourceOrder from "@/utils/sources/source orders";
import AddSourceButton from "./Source/AddSourceButton";

export default function SourceGrid({ initialSources, locale, country}) {
    const sources = useData((state) => state.sources || initialSources);
    const activeWebsites = usePreferences((state) => state.activeWebsites || []);
    const order = usePreferences((state) => state.order || 'default');

    const sourceOrder = getSourceOrder(country, order);
    const orderedSources = Object.entries(sources).sort((a, b) => sourceOrder.indexOf(a[0]) - sourceOrder.indexOf(b[0]));

    let displaySources = orderedSources;
    if (activeWebsites.length > 0) {
        displaySources = orderedSources.filter(source => activeWebsites.includes(source[0].toLowerCase()) || activeWebsites.includes(source[0]));
    }

    return (
        <div className={`custom-scrollbar h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 qhd:grid-cols-6 gap-4 p-4`}>
            {displaySources.map((source, i) => (
                <SourceCard
                    key={`${source[0]}-${source[1]?.length}`}
                    index={i}
                    headlines={source[1]}
                    country = {country}
                />
            ))}
            <AddSourceButton />
        </div>
    );
}