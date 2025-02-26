// 'use client'

import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
// import MainSectionLive from "./MainSection_live";
// import { useEffect, useState } from "react";
import getSourceOrder from "@/utils/sources/source orders";

export default function MainSection({ sources, locale, country, date, setDate }) {

    const activeWebsites = getSourceOrder(country, 'default')
    const orderedSources = Object.entries(sources).sort((a, b) => activeWebsites.indexOf(a[0]) - activeWebsites.indexOf(b[0]));
    const displaySources = orderedSources.slice(0, 6);


    if (displaySources.length === 0) {
        return <div className="text-center">No sources available.</div>;
    }

    return (
        <div className={`custom-scrollbar h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4`}>
            {/* {isLive ? <MainSectionLive initialSources={initialSources} locale={locale} country={country} /> */}
            {/* : <SourcesGrid sources={displaySources} locale={locale} country={country} />} */}

            {displaySources.map((source, i) => (
                <SourceCard
                    key={source[0]}
                    index={i}
                    name={source[0]}
                    headlines={source[1]}
                    country={country}
                    locale={locale}
                    date={date}
                    setDate={setDate}
                />
            ))}

            {/* <AddSourceButton /> */}
        </div>
    );
}