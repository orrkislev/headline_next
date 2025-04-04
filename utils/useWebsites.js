"use client";
import { getSourceOrder } from "./sources/getCountryData";
import { useActiveWebsites, useOrder } from "./store";
import { useEffect, useState } from "react";

export default function useWebsitesManager(country, sources) {
    const order = useOrder(state => state.order)
    const { activeWebsites, setActiveWebsites } = useActiveWebsites();
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    // Add window resize listener
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!sources) return;
        const sourceOrder = getSourceOrder(country, order);
        const sourcesArray = Object.keys(sources).sort((a, b) => sourceOrder.indexOf(a) - sourceOrder.indexOf(b));
        
        // Determine number of cards based on screen width
        let cardLimit = 6;
        if (windowWidth > 1920) {
            cardLimit = 11; // or any other number you prefer for larger screens
        }
        
        setActiveWebsites(sourcesArray.slice(0, cardLimit));
    }, [sources, country, windowWidth]);

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