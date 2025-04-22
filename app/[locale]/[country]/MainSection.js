'use client'

import { Suspense } from "react";
import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import { countries } from "@/utils/sources/countries";
import { getSourceData } from "@/utils/sources/getCountryData";
import useWebsitesManager from "@/utils/useWebsites";


export default function MainSection({ sources, country, locale, date }) {
    const websitesManager = useWebsitesManager(country, sources)

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
            {Object.keys(sources).map((source) => (
                <Suspense key={source} fallback={
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-500 h-[300px]" />
                }>
                    <SourceCard
                        key={source}
                        name={source}
                        initialHeadlines={sources[source].headlines}
                        country={country}
                        locale={locale}
                        data={getSourceData(country, source)}
                        date={date}
                    />
                </Suspense>
            ))}
            <Suspense fallback={
                <div className="animate-pulse bg-neutral-100 dark:bg-neutral-500 h-[300px]" />
            }>
                <AddSourceButton {...{ locale, country, sources }} />
            </Suspense>
        </div>
    );
}