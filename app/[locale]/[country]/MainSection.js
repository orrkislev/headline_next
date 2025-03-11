'use client'

import { Suspense, useMemo } from "react";
import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import { countries } from "@/utils/sources/countries";
import useWebsites from "@/utils/useWebsites";
import { getSourceData } from "@/utils/sources/getCountryData";

export default function MainSection({ sources, country, locale }) {
    const { websites } = useWebsites(country, locale, sources)

    const sourcesData = useMemo(() => Object.entries(sources).map(([sourceName, source]) => ({
        name: sourceName,
        headlines: source,
        data: getSourceData(country, sourceName)
    })), [sources, country])

    const activeSources = sourcesData.filter(source => websites.includes(source.name))

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
<<<<<<< HEAD
            {Object.entries(sources).map(([sourceName, source]) => (
                <Suspense key={sourceName} fallback={null}>
=======
            {activeSources.map((source,index) => (
                <Suspense key={source.name} fallback={<div>Loading...</div>}>
>>>>>>> 5936f9db238181a71ca6553f48745dcd9a5a8475
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
<<<<<<< HEAD
            <Suspense fallback={null}>
                <AddSourceButton {...{ locale, country, sources}} />
=======
            <Suspense fallback={<div>Loading...</div>}>
                <AddSourceButton {...{ locale, country, sources }} />
>>>>>>> 5936f9db238181a71ca6553f48745dcd9a5a8475
            </Suspense>
        </div>
    );
}