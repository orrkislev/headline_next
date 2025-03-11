import { Suspense } from "react";
import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import { countries } from "@/utils/sources/countries";

export default function MainSection({ sources, country, locale }) {
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
            {Object.entries(sources).map(([sourceName, source]) => (
                <Suspense key={sourceName} fallback={null}>
                    <SourceCard
                        name={sourceName}
                        initialHeadlines={source}
                        country={country}
                        locale={locale}
                    />
                </Suspense>
            ))}
            <Suspense fallback={null}>
                <AddSourceButton {...{ locale, country, sources}} />
            </Suspense>
        </div>
    );
}