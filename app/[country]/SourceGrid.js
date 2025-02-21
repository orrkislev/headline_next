'use client'

import { useData } from "@/components/DataManager";
import SourceCard from "./Source/SourceCard";
import { usePreferences } from "@/components/PreferencesManager";
import getSourceOrder from "@/utils/sources/source orders";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SourceGrid() {
    const { country } = useParams();
    const sources = useData((state) => state.sources);
    const activeWebsites = usePreferences((state) => state.activeWebsites);
    const order = usePreferences((state) => state.order);

    if (Object.keys(sources).length === 0) return null;

    const sourceOrder = getSourceOrder(country, order);
    const orderedSources = sourceOrder.map((sourceName) => Object.entries(sources).find(entry => entry[0] === sourceName))
                                      .filter(source => source !== undefined);
    
    let filteredSources;
    if (activeWebsites.length > 0) filteredSources = orderedSources.filter(source => activeWebsites.includes(source[0]));
    else filteredSources = orderedSources.slice(0,6);

    if (filteredSources.length === 0) {
        return <div>No sources found</div>;
    }

    

    return (
        <div className="grid grid-cols-3 gap-4 overflow-auto p-4">
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