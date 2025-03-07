"use client";
import { useSearchParams } from "next/navigation";
import getSourceOrder from "./sources/source orders";

export default function useWebsites(country, locale) {
    const order = 'default'
    const searchParams = useSearchParams();
    let websites = searchParams.get('websites')?.split(',');
    
    if (!websites || websites.length === 0) {
        websites = getSourceOrder(country, order).slice(0, 4);
    }

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


    return { websites, addNextWebsite, toggleSource };
}