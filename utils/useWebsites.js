"use client";
import { getSourceOrder } from "./sources/getCountryData";
import { useActiveWebsites, useOrder } from "./store";
import { useEffect } from "react";

export default function useWebsitesManager(country, sources) {
    const order = useOrder(state => state.order)
    const { activeWebsites, setActiveWebsites } = useActiveWebsites();

    useEffect(() => {
        if (!sources) return;
        const sourceOrder = getSourceOrder(country, order);
        const sourcesArray = Object.keys(sources).sort((a, b) => sourceOrder.indexOf(a) - sourceOrder.indexOf(b));
        setActiveWebsites(sourcesArray.slice(0, 6));
    }, [sources, country])

    useEffect(() => {
        if (activeWebsites.length == 0) return
        const sourceOrder = getSourceOrder(country, order)
        if (sourceOrder.includes(activeWebsites[0])) {
            const sortedWebsites = activeWebsites.sort((a, b) => sourceOrder.indexOf(a) - sourceOrder.indexOf(b))
            setActiveWebsites(sortedWebsites)
        }
    }, [activeWebsites, order])


    return null
}