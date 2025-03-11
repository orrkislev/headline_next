'use client'

import { Suspense, useMemo } from "react";
import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import { countries } from "@/utils/sources/countries";
import useWebsites from "@/utils/useWebsites";
import { getSourceData } from "@/utils/sources/getCountryData";

export default function MainSection({ sources, country, locale }) {
    const { websites } = useWebsites(country, locale, sources)

    const activeSources = websites.map(website => ({
        name: website,
        headlines: sources[website],
        data: getSourceData(country, website)
    }));

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
            {activeSources.map((source,index) => (
                <Suspense key={source.name} fallback={<div>Loading...</div>}>
                    <SourceCard
                        index={index}
                        name={source.name}
                        initialHeadlines={source.headlines}
                        country={country}
                        locale={locale}
                        data={source.data}
                    />
                </Suspense>
            ))}
            <Suspense fallback={<div>Loading...</div>}>
                <AddSourceButton {...{ locale, country, sources }} />
            </Suspense>
        </div>
    );
}