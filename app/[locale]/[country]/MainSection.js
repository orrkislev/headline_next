'use client'

import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import MobileSummary from "./MobileSummary";
import { countries } from "@/utils/sources/countries";
import useWebsitesManager from "@/utils/useWebsites";
import useSourcesManager from "@/utils/database/useSourcesManager";
import useMobile from "@/components/useMobile";


export default function MainSection({ sources, country, locale, pageDate, initialSummaries, yesterdaySummary, daySummary }) {
    useWebsitesManager(country, sources)
    const { sources: managedSources, loading: isLoading } = useSourcesManager(country, sources, !Boolean(pageDate));
    const { isMobile } = useMobile();

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
            {/* Mobile Summary - shows only on mobile, at the top */}
            {isMobile && (
                <div className="sm:hidden mb-2">
                    <MobileSummary {...{ locale, country, pageDate, initialSummaries, yesterdaySummary, daySummary }} />
                    <div className="border-b border-gray-200 mt-0"></div>
                </div>
            )}
            
            {Object.keys(managedSources).map((source) => (
                    <SourceCard 
                        key={source+managedSources[source].headlines.length}
                        headlines={managedSources[source].headlines}
                        {...{ source, country, locale, isLoading, pageDate }}
                    />
            ))}
            <AddSourceButton {...{ locale, country, sources }} />
        </div>
    );
}