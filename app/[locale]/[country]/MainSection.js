'use client'

import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import { countries } from "@/utils/sources/countries";
import useWebsitesManager from "@/utils/useWebsites";
import useSourcesManager from "@/utils/database/useSourcesManager";


export default function MainSection({ sources, country, locale, date }) {
    useWebsitesManager(country, sources)
    const { sources: managedSources, loading: isLoading } = useSourcesManager(country, sources, !Boolean(date));

    return (
        <div className={`custom-scrollbar 
                        gap-4 p-4
                        flex flex-col sm:grid 
                        sm:grid-cols-1 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        fhd:grid-cols-4 
                        qhd:grid-cols-6 
                        direction-${countries[country].languageDirection}
                        `}>
            {Object.keys(managedSources).map((source) => (
                    <SourceCard 
                        key={source}
                        headlines={managedSources[source].headlines}
                        {...{ source, country, locale, date, isLoading }}
                    />
            ))}
            <AddSourceButton {...{ locale, country, sources }} />
        </div>
    );
}