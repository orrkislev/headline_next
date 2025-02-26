'use client'

import AddSourceButton from "./Source/AddSourceButton";
import SourcesGrid from "./SourcesGrid";
import MainSectionLive from "./MainSection_live";
import { useEffect, useState } from "react";
import getSourceOrder from "@/utils/sources/source orders";

export default function MainSection({ initialSources, locale, country }) {
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        setIsLive(true);
    }, []);

    const activeWebsites = getSourceOrder(country, 'default')
    const orderedSources = Object.entries(initialSources).sort((a, b) => activeWebsites.indexOf(a[0]) - activeWebsites.indexOf(b[0]));
    const displaySources = orderedSources.slice(0,6)

    return (
        <div className={`custom-scrollbar h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4`}>
            {isLive ? <MainSectionLive initialSources={initialSources} locale={locale} country={country} />
                : <SourcesGrid sources={displaySources} locale={locale} country={country} />}
            <AddSourceButton />
        </div>
    );
}