"use client";
import { getSourceOrder } from "./sources/getCountryData";
import { useActiveWebsites, useOrder } from "./store";
import useVerticalScreen from "../components/useVerticalScreen";
import { useEffect, useState } from "react";

export default function useWebsitesManager(country, sources) {
    const order = useOrder(state => state.order)
    const { activeWebsites, setActiveWebsites } = useActiveWebsites();
    const { isVerticalScreen } = useVerticalScreen();
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
        
        // Determine number of cards based on screen width and orientation
        let cardLimit = 6;
        if (isVerticalScreen) {
            cardLimit = 8; // 8 cards for vertical screens
        } else if (windowWidth > 1920) {
            cardLimit = 11; // or any other number you prefer for larger screens
        }
        
        setActiveWebsites(sourcesArray.slice(0, cardLimit));
    }, [sources, country, windowWidth, isVerticalScreen]);

    useEffect(() => {
        if (activeWebsites.length == 0 || !sources) return
        const sourceOrder = getSourceOrder(country, order)
        if (sourceOrder.includes(activeWebsites[0])) {
            // Select first X sources from the new order, skipping sources without data
            const currentLimit = activeWebsites.length
            const availableSources = sourceOrder.filter(source => sources[source])
            setActiveWebsites(availableSources.slice(0, currentLimit))
        }
    }, [order, sources])

    return null
}