"use client";
// import { useSearchParams } from "next/navigation";
import getSourceOrder from "./sources/source orders";
import { useActiveWebsites, useOrder } from "./store";
import { useEffect, useMemo } from "react";

export default function useWebsites(country, locale, sources) {
    const { order, setOrder } = useOrder()
    const { activeWebsites, setActiveWebsites } = useActiveWebsites()
    // const searchParams = useSearchParams();
    // const websites = useMemo(() => {
    //     return searchParams.get('websites')?.split(',');
    // }, [searchParams]);

    useEffect(() => {
        if (!sources) return;
        const sourceOrder = getSourceOrder(country, order);
        setActiveWebsites(sourceOrder.filter(source => sources[source] || sources[source.toLowerCase()] || Object.keys(sources).find(s => s.toLowerCase() === source.toLowerCase())).slice(0, 6));
    }, [sources])

    // let orderedWebsites
    // if (websites) orderedWebsites = websites.map(website => sourceOrder.indexOf(website)).sort((a, b) => a - b).map(index => sourceOrder[index])
    // else orderedWebsites = sourceOrder.slice(0, 6);

    const addNextWebsite = () => {
        const sourceOrder = getSourceOrder(country, order);
        const availableSources = sources ? sourceOrder.filter(source => sources[source]) : sourceOrder;

        const nextSource = availableSources.find((source) => !activeWebsites.includes(source));
        if (nextSource) {
            setActiveWebsites([...activeWebsites, nextSource]);
            // changeUrl([...websites, nextSource]);
        }
    };

    const toggleSource = (source) => {
        const newWebsites = activeWebsites.includes(source)
            ? activeWebsites.filter(website => website !== source)
            : [...activeWebsites, source];
        // changeUrl(newWebsites);
        const sourceOrder = getSourceOrder(country, order);
        const orderedWebsites = sourceOrder.filter(source => newWebsites.includes(source));
        setActiveWebsites(orderedWebsites);
    };

    // const changeUrl = (newWebsites) => {
    //     const url = `/${locale}/${country}?websites=${newWebsites.join(',')}`;
    //     if (window) window.history.replaceState(null, '', url);
    // }

    const isActive = (source) => activeWebsites.find(website => website.toLowerCase() === source.toLowerCase());
    const getIndex = (source) => activeWebsites.findIndex(website => website.toLowerCase() === source.toLowerCase());

    return { websites: activeWebsites, addNextWebsite, toggleSource, isActive, getIndex }
}