'use client'

import { useData } from "@/components/DataManager";
import { usePreferences } from "@/components/PreferencesManager";
import getSourceOrder from "@/utils/sources/source orders";
import { useDate } from "@/components/TimeManager";
import { useMemo } from "react";
import SourcesGrid from "./SourcesGrid";

export default function MainSectionLive({ initialSources, locale, country }) {
    const date = useDate((state) => state.date);
    const day = useDate((state) => state.date.toDateString());

    const sources = useData((state) => state.sources || initialSources);
    const activeWebsites = usePreferences((state) => state.activeWebsites || []);
    const order = usePreferences((state) => state.order || 'default');

    const orderedSources = useMemo(() => {
        const sourceOrder = getSourceOrder(country, order);
        return Object.entries(sources).sort((a, b) => sourceOrder.indexOf(a[0]) - sourceOrder.indexOf(b[0]))
    }, [sources, country, order]);

    let displaySources = useMemo(() => {
        if (activeWebsites.length > 0) 
            return orderedSources.filter(source => activeWebsites.includes(source[0].toLowerCase()) || activeWebsites.includes(source[0]));
        return orderedSources.slice(0, 6);
    }, [activeWebsites, orderedSources]);

    return (
        <SourcesGrid sources={displaySources} locale={locale} date={date} day={day} country={country} />
    );
}