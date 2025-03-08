"use client";
import { useSearchParams } from "next/navigation";
import getSourceOrder from "./sources/source orders";
import { useOrder } from "./store";
import { useEffect, useMemo } from "react";

export default function useWebsites(country, locale) {
    const { order, setOrder } = useOrder()
    const searchParams = useSearchParams();
    const websites = useMemo(() => {
        return searchParams.get('websites')?.split(',');
    }, [searchParams]);
    
    const addNextWebsite = () => {
        const sourceOrder = getSourceOrder(country, order);
        const nextSource = sourceOrder.find((source) => !websites.includes(source));
        if (nextSource) {
            const newWebsite = [...websites, nextSource];
            changeUrl(newWebsite);
        }
    };

    const toggleSource = (source) => {
        const newWebsites = websites.includes(source)
            ? websites.filter(website => website !== source)
            : [...websites, source];
        changeUrl(newWebsites);
    };

    const changeUrl = (newWebsites) => {
        const url = `/${locale}/${country}?websites=${newWebsites.join(',')}`;
        window.history.replaceState(null, '', url);
    }

    const sourceOrder = getSourceOrder(country, order);
    const orderedWebsites = websites ? websites.map(website => sourceOrder.indexOf(website)).sort((a, b) => a - b).map(index => sourceOrder[index]) : [];

    return { websites: orderedWebsites, addNextWebsite, toggleSource };
}