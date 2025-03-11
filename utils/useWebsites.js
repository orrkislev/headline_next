"use client";
import { getSourceOrder } from "./sources/getCountryData";
import { useActiveWebsites, useOrder } from "./store";
import { useEffect } from "react";

export default function useWebsites(country, locale, sources) {
    const { order, setOrder } = useOrder()
    const { activeWebsites, setActiveWebsites } = useActiveWebsites();

    useEffect(() => {
        if (!sources) return;
        const sourceOrder = getSourceOrder(country, order);
        setActiveWebsites(sourceOrder.filter(source => sources[source] || sources[source.toLowerCase()] || Object.keys(sources).find(s => s.toLowerCase() === source.toLowerCase())).slice(0, 6));
    }, [sources])


    const addNextWebsite = () => {
        const sourceOrder = getSourceOrder(country, order);
        const availableSources = sources ? sourceOrder.filter(source => sources[source]) : sourceOrder;

        const nextSource = availableSources.find((source) => !activeWebsites.includes(source));
        if (nextSource) {
            setActiveWebsites([...activeWebsites, nextSource]);
        }
    };

    const toggleSource = (source) => {
        const newWebsites = activeWebsites.includes(source)
            ? activeWebsites.filter(website => website !== source)
            : [...activeWebsites, source];
        const sourceOrder = getSourceOrder(country, order);
        const orderedWebsites = sourceOrder.filter(source => newWebsites.includes(source));
        setActiveWebsites(orderedWebsites);
    };

    const isActive = (source) => activeWebsites.find(website => website.toLowerCase() === source.toLowerCase());
    const getIndex = (source) => activeWebsites.findIndex(website => website.toLowerCase() === source.toLowerCase());

    return { websites: activeWebsites, addNextWebsite, toggleSource, isActive, getIndex }
}